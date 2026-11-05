-- 008_add_featured_to_gallery.sql
-- Adds an is_featured column to gallery_items to curate the Home Page Showcase.

alter table public.gallery_items
add column if not exists is_featured boolean default false;

create index if not exists idx_gallery_featured on public.gallery_items (is_featured, sort_order asc, created_at desc);

