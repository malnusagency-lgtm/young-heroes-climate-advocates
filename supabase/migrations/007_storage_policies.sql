-- 007_storage_policies.sql
-- Storage bucket policies for the 'gallery' public-read bucket.

-- Note: Ensure the bucket exists by executing in Supabase SQL editor or dashboard:
-- insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
-- on conflict (id) do nothing;

-- 1. Public read access to all objects in the 'gallery' bucket
create policy "Public can view gallery photos"
  on storage.objects for select
  using (bucket_id = 'gallery');

-- 2. Only authenticated administrators can upload photos
create policy "Admins can upload gallery photos"
  on storage.objects for insert
  with check (
    bucket_id = 'gallery'
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 3. Only authenticated administrators can update photos
create policy "Admins can update gallery photos"
  on storage.objects for update
  using (
    bucket_id = 'gallery'
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 4. Only authenticated administrators can delete photos
create policy "Admins can delete gallery photos"
  on storage.objects for delete
  using (
    bucket_id = 'gallery'
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

