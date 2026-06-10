// Vercel Cron — daily at 08:00 UTC (≈ 4:00 AM Eastern). Sends the morning ritual ping.
// Configured in vercel.json: "0 8 * * *"
import { pushAll } from '../../lib/push.js';
import { readDate, ORISHAS } from '../../lib/identity.js';

export default async function handler(req, res) {
  const date = new Date();
  const reading = readDate(date);

  let title = 'The threshold is open';
  let body = 'Morning Temple — seven stations begin now. The world has not yet named you.';

  if (reading.isSolarReturn) {
    title = '☉ Solar Return — your year begins';
    body = 'February 8. Extended ritual. Declare the architecture of the next twelve months.';
  } else if (reading.isPowerDate) {
    const o = reading.powerOrisha;
    if (o?.name?.includes('Ogún'))   { title = '⚒ 8th — Ogún opens the gate';   body = 'Do the one thing you have been avoiding. The iron is hot.'; }
    if (o?.name?.includes('Shango')) { title = '⚡ 17th — Shango commands';      body = 'High-visibility day. Carry the thunder. Presence before words.'; }
    if (o?.name?.includes('Oshun'))  { title = '✦ 26th — Oshun receives';       body = 'Art-facing day. Wear gold. Magnetism over force.'; }
  } else {
    const note = reading.planetary.current.split(' — ')[1] || reading.planetary.current;
    title = `${reading.planetary.planet} day — ${reading.planetary.orisha}`;
    body = note;
  }

  const result = await pushAll({ title, body, url: '/?ritual=1#ritual', tag: 'morning' });
  res.json({ sent: result.length, reading: reading.iso });
}
