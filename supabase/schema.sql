-- Run this in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  author text default 'Revive Fiber Co Team',
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

create table if not exists public.employment_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  position text,
  resume_url text,
  cover_letter text,
  status text not null default 'applied' check (status in ('applied', 'reviewing', 'interview', 'hired', 'rejected')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  contact_person text,
  email text,
  phone text,
  website text,
  logo_url text,
  description text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists employment_applications_status_idx on public.employment_applications (status);
create index if not exists employment_applications_email_idx on public.employment_applications (email);
create index if not exists clients_company_idx on public.clients (company);
create index if not exists clients_email_idx on public.clients (email);

alter table public.blog_posts enable row level security;
alter table public.work_items enable row level security;
alter table public.employment_applications enable row level security;
alter table public.clients enable row level security;

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

drop policy if exists "Public can read published clients" on public.clients;
create policy "Public can read published clients"
  on public.clients
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

drop policy if exists "Authenticated can read all employment" on public.employment_applications;
create policy "Authenticated can read all employment"
  on public.employment_applications
  for select
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated can read all clients" on public.clients;
create policy "Authenticated can read all clients"
  on public.clients
  for select
  using (auth.role() = 'authenticated');

-- Create storage buckets in Supabase dashboard:
-- 1) blog-media (public)
-- 2) work-media (public)
-- 3) careers-media (public or private based on resume policy)
-- 4) client-media (public)
