-- 003_create_submissions.sql
-- Form submissions tables for join requests and community contact inquiries.

create table if not exists public.join_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  age_group text,
  interests text[],
  message text,
  status text default 'new' check (status in ('new', 'in_review', 'completed', 'archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'new' check (status in ('new', 'in_review', 'completed', 'archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.join_submissions enable row level security;
alter table public.contact_submissions enable row level security;

-- Public submission policy: Anonymous visitors can insert applications/inquiries
create policy "Public can submit join applications"
  on public.join_submissions
  for insert
  with check (true);

create policy "Public can submit contact messages"
  on public.contact_submissions
  for insert
  with check (true);

-- Private read policy: Only authorized administrators can view submissions
create policy "Admins can view join submissions"
  on public.join_submissions
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can view contact submissions"
  on public.contact_submissions
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin status update policy
create policy "Admins can update join status"
  on public.join_submissions
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update contact status"
  on public.contact_submissions
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Indexes for status filtration and chronological sorting
create index if not exists idx_join_status_date on public.join_submissions (status, created_at desc);
create index if not exists idx_contact_status_date on public.contact_submissions (status, created_at desc);

