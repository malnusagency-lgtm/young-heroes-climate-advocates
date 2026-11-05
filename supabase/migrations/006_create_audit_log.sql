-- 006_create_audit_log.sql
-- Administrative action audit log.

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_type text,
  target_id uuid,
  details jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.admin_audit_log enable row level security;

-- Only admins can insert and read audit logs
create policy "Admins can insert audit entries"
  on public.admin_audit_log
  for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can view audit logs"
  on public.admin_audit_log
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists idx_admin_audit_date on public.admin_audit_log (created_at desc);

