// GET /api/insights?date=ISO — short, personalized reading for the Today card.
import { systemPrompt, readDate } from '../lib/identity.js';
import { ask } from '../lib/claude.js';
import { listEventsInRange, compactEvent } from '../lib/google.js';

export default async function handler(req, res) {
  const dateStr = req.query?.date;
  const date = dateStr ? new Date(dateStr) : new Date();
  const reading = readDate(date);

  let events = [];
  try {
    const start = new Date(date); start.setHours(0,0,0,0);
    const end = new Date(date);   end.setHours(23,59,59,999);
    const items = await listEventsInRange(start.toISOString(), end.toISOString());
    events = items.map(compactEvent);
  } catch {}

  const eventBlock = events.length
    ? events.map(e => `- ${e.time || 'All day'}: ${e.summary}`).join('\n')
    : '(none)';

  const userMsg = `Generate today's reading for the Architect.
Date: ${reading.iso}
Planetary current: ${reading.planetary.planet} (${reading.planetary.orisha})
Power date: ${reading.isPowerDate ? `${reading.day}th — ${reading.powerOrisha?.name || ''}` : 'no'}
Solar return today: ${reading.isSolarReturn ? 'YES' : 'no'}
August (power month): ${reading.isAugust ? 'YES' : 'no'}
Today's calendar:
${eventBlock}

Output JSON with exactly these fields:
{
  "eyebrow": "<5-word phrase like 'Tuesday — Ogún current' or '17th — Shango commands'>",
  "title":   "<8-word title for today's reading>",
  "body":    "<3-5 sentences. Tie planetary current + power date + their calendar to one actionable Architect-grade reading. Reference Xqsitor strategy when relevant. Use **bold** sparingly for emphasis. Do not include JSON markers in the body.>"
}
Return ONLY the JSON, no preamble.`;

  try {
    const raw = await ask({
      system: systemPrompt(),
      messages: [{ role: 'user', content: userMsg }],
      maxTokens: 600,
    });
    let parsed;
    try {
      const jsonStart = raw.indexOf('{');
      const jsonEnd   = raw.lastIndexOf('}');
      parsed = JSON.parse(raw.slice(jsonStart, jsonEnd + 1));
    } catch {
      parsed = { eyebrow: "Today's reading", title: 'The current is open', body: raw };
    }
    res.status(200).json({ ...parsed, events });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Insight error', events });
  }
}
