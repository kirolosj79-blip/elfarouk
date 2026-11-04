-- ============================================================
--  شركة الفاروق — Al Farouk | Supabase schema
--  شغّل السكربت ده مرة واحدة في:  Supabase → SQL Editor → New query → Run
--  Run this once in your Supabase project (SQL Editor).
-- ============================================================

-- 1) BRANCHES ------------------------------------------------
create table if not exists public.branches (
  id          text primary key,
  name        text not null,
  created_at  timestamptz default now()
);

-- 2) USERS (username + password, super admin manages) --------
create table if not exists public.app_users (
  id          uuid primary key default gen_random_uuid(),
  username    text unique not null,
  password    text not null,            -- prototype: plain; move to hashing/Supabase Auth before production
  role        text not null default 'branch',   -- 'super' | 'branch' (manager) | 'entry'
  branch_id   text references public.branches(id) on delete set null,
  name        text,
  pages       jsonb,                             -- allowed nav keys, null = all
  created_at  timestamptz default now()
);
alter table public.app_users add column if not exists pages jsonb;

-- 3) PER-BRANCH SETTINGS (prices + commission) ---------------
create table if not exists public.settings (
  branch_id    text primary key references public.branches(id) on delete cascade,
  prices       jsonb not null default '{"p92":22.25,"p95":24,"solar":20.5}',
  commission   jsonb not null default '{"benzeneRate":0.5143,"solarRate":0.358}',
  egpc         jsonb not null default '{"p92":0.5503,"p95":0.671,"solar":0.3811,"percent":0.30,"tax":0.02}',
  partners     jsonb not null default '[]',
  partner_txns jsonb not null default '[]',
  updated_at   timestamptz default now()
);
-- (if settings already existed, add the new columns)
alter table public.settings add column if not exists egpc          jsonb not null default '{"p92":0.5503,"p95":0.671,"solar":0.3811,"percent":0.30,"tax":0.02}';
alter table public.settings add column if not exists opening_stock jsonb not null default '{"p92":"","p95":"","solar":""}';
alter table public.settings add column if not exists partners      jsonb not null default '[]';
alter table public.settings add column if not exists partner_txns  jsonb not null default '[]';
alter table public.settings add column if not exists channel_opening jsonb not null default '{}';
alter table public.settings add column if not exists channel_manual  jsonb not null default '[]';
alter table public.settings add column if not exists supplier_entries jsonb not null default '[]';
alter table public.settings add column if not exists digital_entries  jsonb not null default '[]';
alter table public.settings add column if not exists ledger_manual    jsonb not null default '[]';
alter table public.settings add column if not exists supplier_name  text default 'أولى إنرجي';
alter table public.settings add column if not exists supplier_opening numeric default 0;

-- 4) DAILY SHIFTS --------------------------------------------
create table if not exists public.shifts (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  shift_date  date,
  data        jsonb not null,
  created_at  timestamptz default now()
);
create index if not exists shifts_branch_idx on public.shifts(branch_id);

-- 5) MONTHLY ENTRIES (manual) --------------------------------
create table if not exists public.monthly_entries (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  data        jsonb not null,
  created_at  timestamptz default now()
);
create index if not exists monthly_branch_idx on public.monthly_entries(branch_id);

-- 6) BRANCH PHOTOS -------------------------------------------
create table if not exists public.images (
  id          uuid primary key default gen_random_uuid(),
  branch_id   text not null references public.branches(id) on delete cascade,
  name        text,
  data        text not null,            -- base64 data URL
  created_at  timestamptz default now()
);
create index if not exists images_branch_idx on public.images(branch_id);

-- 7) SEED: 13 branches + super admin --------------------------
insert into public.branches (id, name) values
 ('b1','صقر (الرئيسي)'),('b2','السلام'),('b3','ادكو'),
 ('b4','مرغم اسكندريه'),('b5','مهندسين'),('b6','الساحل')
on conflict (id) do nothing;

insert into public.app_users (username, password, role, name)
 values ('barmas','allah ma7ba','super','برماس')
on conflict (username) do nothing;

insert into public.settings (branch_id)
 select id from public.branches on conflict (branch_id) do nothing;

-- ============================================================
-- 8) ROW LEVEL SECURITY
--    Passwords are hidden (no direct read of app_users).
--    Login & user management go through SECURITY DEFINER RPCs.
--    Data tables are open to the anon key so the app works;
--    branch isolation is enforced in the app. For production
--    multi-tenant security, move to Supabase Auth + per-row policies.
-- ============================================================
alter table public.app_users       enable row level security;  -- locked (no policies = no anon access)
alter table public.branches        enable row level security;
alter table public.settings        enable row level security;
alter table public.shifts          enable row level security;
alter table public.monthly_entries enable row level security;
alter table public.images          enable row level security;

-- open policies for data tables (functional prototype)
drop policy if exists p_branches on public.branches;
create policy p_branches on public.branches for all using (true) with check (true);
drop policy if exists p_settings on public.settings;
create policy p_settings on public.settings for all using (true) with check (true);
drop policy if exists p_shifts on public.shifts;
create policy p_shifts on public.shifts for all using (true) with check (true);
drop policy if exists p_monthly on public.monthly_entries;
create policy p_monthly on public.monthly_entries for all using (true) with check (true);
drop policy if exists p_images on public.images;
create policy p_images on public.images for all using (true) with check (true);
-- NOTE: app_users has RLS enabled and NO policy → the anon key cannot read it.

-- ============================================================
-- 9) RPCs (run as owner, bypass RLS safely)
-- ============================================================
create or replace function public.app_login(p_username text, p_password text)
returns table(id uuid, username text, role text, branch_id text, name text, pages jsonb)
language sql security definer set search_path = public as $$
  select id, username, role, branch_id, name, pages
  from public.app_users
  where username = p_username and password = p_password
  limit 1;
$$;

create or replace function public.app_list_users()
returns table(id uuid, username text, password text, role text, branch_id text, name text, pages jsonb)
language sql security definer set search_path = public as $$
  select id, username, password, role, branch_id, name, pages from public.app_users order by created_at;
$$;

create or replace function public.app_add_user(p_username text, p_password text, p_role text, p_branch text, p_name text, p_pages jsonb default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  insert into public.app_users(username,password,role,branch_id,name,pages)
  values (p_username,p_password,p_role,nullif(p_branch,''),p_name,p_pages) returning id into new_id;
  return new_id;
end; $$;

create or replace function public.app_update_user(p_id uuid, p_username text, p_password text, p_role text, p_branch text, p_name text, p_pages jsonb default null)
returns void language sql security definer set search_path = public as $$
  update public.app_users set username=p_username, password=p_password, role=p_role,
    branch_id=nullif(p_branch,''), name=p_name, pages=p_pages where id=p_id;
$$;

create or replace function public.app_delete_user(p_id uuid)
returns void language sql security definer set search_path = public as $$
  delete from public.app_users where id=p_id;
$$;

-- allow the anon key to call these RPCs
grant execute on function public.app_login(text,text)                              to anon;
grant execute on function public.app_list_users()                                  to anon;
grant execute on function public.app_add_user(text,text,text,text,text,jsonb)       to anon;
grant execute on function public.app_update_user(uuid,text,text,text,text,text,jsonb) to anon;
grant execute on function public.app_delete_user(uuid)                             to anon;

-- done ✓
