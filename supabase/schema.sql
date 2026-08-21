-- Run this once in your Supabase project's SQL Editor (Supabase dashboard →
-- SQL Editor → New query → paste this → Run).

create extension if not exists "pgcrypto";

create table if not exists public.sarees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text,
  fabric text,
  price numeric not null check (price > 0),
  original_price numeric check (original_price is null or original_price > 0),
  is_featured boolean not null default false,
  is_sold boolean not null default false,
  image_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists sarees_created_at_idx on public.sarees (created_at desc);
create index if not exists sarees_category_idx on public.sarees (category);

-- Row Level Security stays ON (Supabase's default). The website never uses
-- the public/anon key, only the private service role key on the server, so
-- it does not need any RLS policies to work — RLS simply blocks every
-- request that isn't using that private key, which is exactly what we want.
alter table public.sarees enable row level security;

-- Public bucket for saree photos, so product images can be shown on the
-- website without extra configuration.
insert into storage.buckets (id, name, public)
values ('saree-photos', 'saree-photos', true)
on conflict (id) do nothing;
