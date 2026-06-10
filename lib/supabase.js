import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing SUPABASE_URL');
}

if (!supabaseAnonKey) {
  throw new Error('Missing SUPABASE_ANON_KEY');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export async function logIntention(intention, metadata = {}) {
  const { data, error } = await supabaseAdmin
    .from('intentions')
    .insert({ intention, metadata })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function logHeka(declaration, category = 'daily', metadata = {}) {
  const { data, error } = await supabaseAdmin
    .from('heka_log')
    .insert({ declaration, category, metadata })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTodayIntention() {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabaseAdmin
    .from('intentions')
    .select('*')
    .eq('date', today)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveMessage(role, content, threadId, metadata = {}) {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .insert({
      role,
      content,
      conversation_thread_id: threadId,
      metadata,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getConversationHistory(threadId) {
  const { data, error } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('conversation_thread_id', threadId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}
