// Vercel Cron — daily at 00:00 UTC. Looks at "tomorrow" for the user and sends:
//   - power-date eve alerts (if tomorrow is 8/17/26)
//   - event-aware insights (if tomorrow has calendar events ON a power date)
//   - solar return countdown (T-7, T-3, T-1 before Feb 8)
import { pushAll } from '../../lib/push.js';
import { readDate } from '../../lib/identity.js';
import { listEventsInRange, compactEvent } from '../../lib/google.js';

export default async function handler(req, res) {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const reading = readDate(tomorrow);

  const sent = [];

  // ── Power date eve ───────────────────────────
  if (reading.isPowerDate) {
    const orisha = reading.powerOrisha?.name || '';
    const dayLabel = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][reading.dow];
    let title = `Tomorrow — the ${reading.day}th`;
    let body = `${orisha} governs. ${dayLabel}. Prepare what you intend to set in motion.`;

    // Event-aware variant
    try {
      const start = new Date(tomorrow); start.setHours(0,0,0,0);
      const end   = new Date(tomorrow); end.setHours(23,59,59,999);
      const items = await listEventsInRange(start.toISOString(), end.toISOString());
      if (items.length) {
        const ev = compactEvent(items[0]);
        body = `${orisha} governs tomorrow. You have "${ev.summary}" at ${ev.time || 'all day'} — that meeting carries the ${orisha} current. Lead from it.`;
      }
    } catch {}

    sent.push(await pushAll({ title, body, url: '/#calendar', tag: 'power-eve' }));
  }

  // ── Solar return countdown ───────────────────
  const sr = new Date(reading.iso); // tomorrow ISO
  const isFeb = sr.getMonth() === 1;
  if (isFeb && [1, 5, 7].includes(sr.getDate())) {
    const days = 8 - sr.getDate();
    sent.push(await pushAll({
      title: `Solar Return — T-${days}`,
      body: `Feb 8 approaches. Draft the year you intend to declare. The summit is coming.`,
      url: '/#calendar', tag: 'solar-countdown',
    }));
  }

  res.json({ tomorrow: reading.iso, batches: sent.length });
}
