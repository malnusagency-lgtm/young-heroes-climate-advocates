-- 002_create_gallery_items.sql
-- Gallery records table storing curated field photography metadata.

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  image_url text not null,
  title text not null,
  caption text,
  alt_text text not null default '',
  category text default 'Community',
  is_published boolean default false,
  sort_order integer default 0,
  event_association text,
  original_filename text,
  file_size_bytes integer,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.gallery_items enable row level security;

-- Public read access: Anyone can view published items
create policy "Public can read published gallery items"
  on public.gallery_items
  for select
  using (is_published = true);

-- Admin read access: Admins can view both published and draft records
create policy "Admins can view all gallery items"
  on public.gallery_items
  for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin insert access
create policy "Admins can insert gallery items"
  on public.gallery_items
  for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin update access
create policy "Admins can update gallery items"
  on public.gallery_items
  for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin delete access
create policy "Admins can delete gallery items"
  on public.gallery_items
  for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Indexes for efficient sorting and filtering
create index if not exists idx_gallery_published_sort on public.gallery_items (is_published, sort_order asc, created_at desc);
create index if not exists idx_gallery_category on public.gallery_items (category);

