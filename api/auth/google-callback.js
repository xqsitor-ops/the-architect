// GET /api/auth/google/callback — store tokens, redirect back to /settings.
import { makeOAuth2Client } from '../../lib/google.js';
import { kv } from '../../lib/kv.js';
import { google } from 'googleapis';

export default async function handler(req, res) {
  const { code, state } = req.query || {};
  if (!code || !state) return res.status(400).send('missing code/state');
  const ok = await kv.takeOAuthState(state);
  if (!ok) return res.status(400).send('bad state');

  const oauth2 = makeOAuth2Client();
  const { tokens } = await oauth2.getToken(code);
  oauth2.setCredentials(tokens);

  // Fetch email so the UI can show "connected as ..."
  try {
    const oauth2api = google.oauth2({ version: 'v2', auth: oauth2 });
    const me = await oauth2api.userinfo.get();
    if (me.data?.email) await kv.setGoogleEmail(me.data.email);
  } catch {}

  await kv.setGoogleTokens(tokens);
  res.writeHead(302, { Location: '/?gconnected=1#settings' });
  res.end();
}
