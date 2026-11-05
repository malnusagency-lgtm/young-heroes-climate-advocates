-- SQL script to provision Elizabeth Akinyi Ouma as an administrator in Supabase

-- 1. Ensure profile exists and grant admin role:
insert into public.profiles (id, email, role, created_at, updated_at)
values (
  (select id from auth.users where lower(email) = 'elizabethakinyiouma46@gmail.com'),
  'elizabethakinyiouma46@gmail.com',
  'admin',
  now(),
  now()
)
on conflict (id) do update
set role = 'admin', updated_at = now();

-- 2. If the user was already created in Supabase Auth, ensure their role is admin:
update public.profiles
set role = 'admin', updated_at = now()
where lower(email) = 'elizabethakinyiouma46@gmail.com';

