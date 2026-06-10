// GET /api/auth/google/start — kick off OAuth.
import { makeOAuth2Client, SCOPES } from '../../lib/google.js';
import { kv } from '../../lib/kv.js';
import crypto from 'crypto';

export default async function handler(req, res) {
  const state = crypto.randomBytes(16).toString('hex');
  await kv.setOAuthState(state);
  const oauth2 = makeOAuth2Client();
  const url = oauth2.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
    state,
  });
  res.writeHead(302, { Location: url });
  res.end();
}
