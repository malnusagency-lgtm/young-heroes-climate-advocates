-- 004_create_site_events.sql
-- Operational and analytics activity audit log.

create table if not exists public.site_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  event_category text default 'operational' check (event_category in ('analytics', 'operational', 'admin')),
  metadata jsonb default '{}'::jsonb,
  route text,
  actor_id uuid references public.profiles(id) on delete set null,
  session_id text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.site_events enable row level security;

-- Append policy: Applications can record operational events
create policy "Allow event recording"
  on public.site_events
  for insert
  with check (true);

-- Read policy: Only administrators can query the audit trail
create policy "Admins can view site events"
  on public.site_events
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Immutability: Prevent modification or deletion of audit events
-- (No UPDATE or DELETE policies are granted)

create index if not exists idx_site_events_category_date on public.site_events (event_category, created_at desc);
create index if not exists idx_site_events_type on public.site_events (event_type);

