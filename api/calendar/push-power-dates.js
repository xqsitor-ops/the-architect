// POST /api/calendar/push-power-dates — write 12 months of 8/17/26 + Feb 8 into Google.
import { insertEvent } from '../../lib/google.js';
import { NUMEROLOGY, ORISHAS } from '../../lib/identity.js';

const COLOR = { ogun: '6', shango: '11', oshun: '5', solar: '9' }; // Google calendar colorIds

function fmt(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function powerEvent(year, month, day) {
  let title, desc, color;
  if (day === 8) {
    title = '⚒ 8th — Ogún opens the gate (Life Path)';
    desc = 'Ogún governs. Do the one thing you have been avoiding. The iron is hot.';
    color = COLOR.ogun;
  } else if (day === 17) {
    title = '⚡ 17th — Shango commands the room (1+7=8)';
    desc = 'High-visibility activity. Pitches, presentations, public communication.';
    color = COLOR.shango;
  } else if (day === 26) {
    title = '✦ 26th — Oshun receives the harvest (2+6=8)';
    desc = 'Art-facing day. Studio visits, collector outreach, aesthetic decisions.';
    color = COLOR.oshun;
  }
  if (!title) return null;
  return {
    summary: title,
    description: desc,
    start: { date: fmt(year, month, day) },
    end:   { date: fmt(year, month, day) },
    colorId: color,
    transparency: 'transparent',
    reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 12 * 60 }] },
  };
}

function solarReturnEvent(year) {
  return {
    summary: '☉ Solar Return — Annual Architectural Summit',
    description: 'The most powerful day of the year. Extended ritual at 4:44 AM. Declare the year you intend to build.',
    start: { date: fmt(year, 1, 8) },
    end:   { date: fmt(year, 1, 8) },
    colorId: COLOR.solar,
    transparency: 'transparent',
    reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 24 * 60 }] },
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const today = new Date();
    let created = 0;
    const errors = [];
    // 12 months forward
    for (let i = 0; i < 12; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const year = d.getFullYear();
      const month = d.getMonth();
      for (const day of NUMEROLOGY.monthlyPowerDays) {
        const date = new Date(year, month, day);
        if (date < today) continue;
        const event = powerEvent(year, month, day);
        if (!event) continue;
        try { await insertEvent(event); created++; } catch (e) { errors.push(e.message); }
      }
    }
    // Next solar return (this year or next)
    const sr = new Date(today.getFullYear(), 1, 8);
    const srYear = sr < today ? today.getFullYear() + 1 : today.getFullYear();
    try { await insertEvent(solarReturnEvent(srYear)); created++; } catch (e) { errors.push(e.message); }

    res.json({ created, errors });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
