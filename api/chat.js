// POST /api/chat — converse with Claude, save to Supabase
import { systemPrompt, readDate } from '../lib/identity.js';
import { ask } from '../lib/claude.js';
import { listEventsInRange, compactEvent } from '../lib/google.js';
import { supabaseAdmin } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch {} }
  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const threadId = body?.threadId || crypto.randomUUID();
  
  if (!messages.length) return res.status(400).json({ error: 'messages required' });

  const localDate = body?.localDate ? new Date(body.localDate) : new Date();
  const reading = readDate(localDate);

  // Try to pull today's events (graceful if not connected)
  let todayEvents = [];
  try {
    const start = new Date(localDate); start.setHours(0,0,0,0);
    const end = new Date(localDate);   end.setHours(23,59,59,999);
    const items = await listEventsInRange(start.toISOString(), end.toISOString());
    todayEvents = items.map(compactEvent);
  } catch {}

  const todayBlock = `
# TODAY'S DATE — for grounding
ISO: ${reading.iso}
Day of week: ${['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][reading.dow]}
Planetary current: ${reading.planetary.planet} (${reading.planetary.orisha})
Planetary note: ${reading.planetary.current}
Power date: ${reading.isPowerDate ? `YES — the ${reading.day}th, governed by ${reading.powerOrisha?.name || ''}` : 'no'}
Solar return: ${reading.isSolarReturn ? 'YES — February 8' : 'no'}
August power month: ${reading.isAugust ? 'YES' : 'no'}
${todayEvents.length ? `Today's calendar events:\n${todayEvents.map(e => `  - ${e.time || 'All day'} — ${e.summary}`).join('\n')}` : "Today's calendar: (not connected or empty)"}`;

  const sys = systemPrompt() + '\n\n' + todayBlock;

  try {
    const reply = await ask({
      system: sys,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      maxTokens: 1200,
    });
    
    // Save the user message and assistant reply to Supabase
    const userMsg = messages[messages.length - 1];
    await supabaseAdmin.from('conversations').insert([
      { role: 'user', content: userMsg.content, conversation_thread_id: threadId },
      { role: 'assistant', content: reply, conversation_thread_id: threadId }
    ]);

    res.status(200).json({ reply, threadId });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Claude error' });
  }
}
