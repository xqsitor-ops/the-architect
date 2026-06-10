import { kv } from '../../lib/kv.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await kv.clearGoogleTokens();
  res.status(200).json({ ok: true });
}
