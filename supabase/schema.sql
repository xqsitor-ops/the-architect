create table if not exists public.intentions (
  id uuid primary key default gen_random_uuid(),
  intention text not null,
  date date not null default current_date,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.heka_log (
  id uuid primary key default gen_random_uuid(),
  declaration text not null,
  category text not null default 'daily',
  context text,
  date_declared date not null default current_date,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.pillars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text,
  description text,
  current_focus text,
  sort_order integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  conversation_thread_id text not null,
  role text not null check (role in ('system', 'user', 'assistant')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists intentions_date_idx
  on public.intentions (date desc, created_at desc);

create index if not exists heka_log_date_declared_idx
  on public.heka_log (date_declared desc, created_at desc);

create index if not exists pillars_sort_order_idx
  on public.pillars (sort_order asc, created_at asc);

create index if not exists conversations_thread_created_idx
  on public.conversations (conversation_thread_id, created_at asc);

alter table public.intentions enable row level security;
alter table public.heka_log enable row level security;
alter table public.pillars enable row level security;
alter table public.conversations enable row level security;
