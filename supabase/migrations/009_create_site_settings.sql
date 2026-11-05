create table if not exists public.site_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings
  for select
  using (key in ('google_drive_archive_url', 'google_photos_album_url'));

create policy "Admins can insert site settings"
  on public.site_settings
  for insert
  with check (
    key in ('google_drive_archive_url', 'google_photos_album_url')
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update site settings"
  on public.site_settings
  for update
  using (
    key in ('google_drive_archive_url', 'google_photos_album_url')
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  )
  with check (
    key in ('google_drive_archive_url', 'google_photos_album_url')
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

insert into public.site_settings (key, value)
values
  ('google_drive_archive_url', 'https://drive.google.com/drive/folders/1mMI2p1uUds9mVDhOWG8ptW2g4HHDHnAn?usp=sharing'),
  ('google_photos_album_url', 'https://photos.app.goo.gl/ycha-field-archive')
on conflict (key) do nothing;
