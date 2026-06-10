import { kv } from '../../lib/kv.js';
export default async function handler(req, res) {
  const tokens = await kv.getGoogleTokens();
  if (!tokens) return res.json({ connected: false });
  const email = await kv.getGoogleEmail();
  res.json({ connected: true, email });
}
