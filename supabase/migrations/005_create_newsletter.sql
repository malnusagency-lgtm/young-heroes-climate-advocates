-- 005_create_newsletter.sql
-- Newsletter subscriptions table.

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  is_active boolean default true,
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);

-- Enable Row Level Security
alter table public.newsletter_subscriptions enable row level security;

-- Public signup policy
create policy "Allow public newsletter subscription"
  on public.newsletter_subscriptions
  for insert
  with check (true);

-- Admin read policy: Only admins can view subscriber lists
create policy "Admins can view newsletter subscribers"
  on public.newsletter_subscriptions
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists idx_newsletter_email on public.newsletter_subscriptions (email);

