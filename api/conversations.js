// GET /api/conversations?threadId=xxx — fetch conversation history
import { supabaseAdmin } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  
  const { threadId } = req.query;
  if (!threadId) return res.status(400).json({ error: 'threadId required' });

  try {
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('conversation_thread_id', threadId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    res.json({ messages: data || [] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
