// GET /api/calendar/events?start=ISO&end=ISO → { byDate: { 'YYYY-MM-DD': [event,...] } }
import { listEventsInRange, compactEvent } from '../../lib/google.js';

export default async function handler(req, res) {
  const { start, end } = req.query || {};
  if (!start || !end) return res.status(400).json({ error: 'start,end required' });
  try {
    const items = await listEventsInRange(start, end);
    const byDate = {};
    for (const it of items) {
      const c = compactEvent(it);
      if (!c.date) continue;
      (byDate[c.date] ||= []).push(c);
    }
    res.json({ byDate });
  } catch (e) {
    res.status(500).json({ error: e.message, byDate: {} });
  }
}
