// Google OAuth + Calendar helpers.
import { google } from 'googleapis';
import { kv } from './kv.js';

export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'openid',
];

export function makeOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

// Get an authenticated client with auto-refresh. Returns null if not connected.
export async function getAuthedClient() {
  const tokens = await kv.getGoogleTokens();
  if (!tokens) return null;
  const oauth2 = makeOAuth2Client();
  oauth2.setCredentials(tokens);
  // Persist refreshed tokens
  oauth2.on('tokens', async (newTokens) => {
    const merged = { ...tokens, ...newTokens };
    await kv.setGoogleTokens(merged);
  });
  return oauth2;
}

export async function listEventsInRange(timeMinISO, timeMaxISO) {
  const auth = await getAuthedClient();
  if (!auth) return [];
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: timeMinISO,
    timeMax: timeMaxISO,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 250,
  });
  return res.data.items || [];
}

export async function insertEvent(event) {
  const auth = await getAuthedClient();
  if (!auth) throw new Error('Not connected to Google');
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.events.insert({ calendarId: 'primary', requestBody: event });
  return res.data;
}

// Normalize a Google event into a compact shape for the frontend.
export function compactEvent(ev) {
  const start = ev.start?.dateTime || ev.start?.date;
  const dateStr = (ev.start?.date) || (start ? start.slice(0, 10) : null);
  let time = null;
  if (ev.start?.dateTime) {
    const d = new Date(ev.start.dateTime);
    time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
  return {
    id: ev.id,
    summary: ev.summary,
    date: dateStr,
    time,
    htmlLink: ev.htmlLink,
  };
}
