// Unified push endpoint — keeps us under Vercel Hobby's 12-function limit.
//   GET    /api/push          → { key: VAPID_PUBLIC_KEY }
//   POST   /api/push          → save subscription (body = PushSubscription JSON)
//   DELETE /api/push          → remove subscription (body = { endpoint })
import { kv } from '../lib/kv.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const key = process.env.VAPID_PUBLIC_KEY || '';
    if (!key) return res.status(500).json({ error: 'VAPID_PUBLIC_KEY not configured' });
    return res.json({ key });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }

  if (req.method === 'POST') {
    if (!body?.endpoint) return res.status(400).json({ error: 'invalid subscription' });
    await kv.addPushSub(body);
    return res.json({ ok: true });
  }

  if (req.method === 'DELETE') {
    if (body?.endpoint) await kv.removePushSub(body.endpoint);
    return res.json({ ok: true });
  }

  res.status(405).end();
}
