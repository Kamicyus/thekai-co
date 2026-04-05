-- ============================================================================
-- Kai Agents Platform — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================================

-- ─── profiles (extends auth.users) ──────────────────────────────────────────

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  plan text default 'free', -- free, starter, pro, business
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── departments ────────────────────────────────────────────────────────────

create table public.departments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  icon text default '🏢',
  color text default '#D8FB32',
  description text,
  created_at timestamptz default now()
);

alter table public.departments enable row level security;
create policy "Users can CRUD own departments" on public.departments for all using (auth.uid() = user_id);

-- ─── agents ─────────────────────────────────────────────────────────────────

create table public.agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  department_id uuid references public.departments(id) on delete cascade not null,
  name text not null,
  role text not null,
  icon text default '🤖',
  description text,
  status text default 'active', -- active, paused, archived
  capabilities text[], -- array of capability strings
  created_at timestamptz default now()
);

alter table public.agents enable row level security;
create policy "Users can CRUD own agents" on public.agents for all using (auth.uid() = user_id);

-- ─── tasks ──────────────────────────────────────────────────────────────────

create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  agent_id uuid references public.agents(id) on delete set null,
  department_id uuid references public.departments(id) on delete set null,
  title text not null,
  description text,
  status text default 'pending', -- pending, running, completed, failed
  result text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table public.tasks enable row level security;
create policy "Users can CRUD own tasks" on public.tasks for all using (auth.uid() = user_id);
