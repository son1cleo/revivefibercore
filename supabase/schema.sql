-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  author text default 'Revive Fiber Core Team',
  category text default 'Insights',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null check (media_type in ('image', 'video')),
  media_url text not null,
  thumbnail_url text,
  category text default 'General',
  display_order integer,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;
alter table public.work_items enable row level security;

-- Public can read only published records.
drop policy if exists "Public can read published blogs" on public.blog_posts;
create policy "Public can read published blogs"
  on public.blog_posts
  for select
  using (published = true);

drop policy if exists "Public can read published work" on public.work_items;
create policy "Public can read published work"
  on public.work_items
  for select
  using (published = true);

-- Authenticated users can read for admin panel data loading.
drop policy if exists "Authenticated can read all blogs" on public.blog_posts;
create policy "Authenticated can read all blogs"
  on public.blog_posts
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated can read all work" on public.work_items;
create policy "Authenticated can read all work"
  on public.work_items
  for select
  using (auth.role() = 'authenticated');

-- Create storage buckets in Supabase dashboard:
-- 1) blog-media (public)
-- 2) work-media (public)
