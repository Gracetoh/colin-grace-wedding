-- ============================================================================
--  COLIN & GRACE — WEDDING PLANNER  ·  DATABASE SCHEMA + SECURITY
--  Run this ONCE in the Supabase SQL Editor (see README, Step 3).
--  Safe to re-run: it drops & recreates policies and tables idempotently.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1.  PROFILES  — one row per logged-in person, holds their ROLE
--     roles:  'owner'  (you / your fiancé — full access)
--             'bridal' (bridal party — day-of tools ONLY, no budget/planning)
-- ---------------------------------------------------------------------------
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  role        text not null default 'bridal' check (role in ('owner','bridal')),
  created_at  timestamptz default now()
);

-- Auto-create a profile row whenever a new user signs up.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    -- First person to ever sign up becomes 'owner'; everyone after is 'bridal'.
    case when (select count(*) from public.profiles) = 0 then 'owner' else 'bridal' end
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Helper: is the current user an owner?  (used by every policy below)
create or replace function is_owner()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'owner');
$$;

create or replace function is_member()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- 2.  CORE TABLES
-- ---------------------------------------------------------------------------

-- Wedding-level settings (key/value): names, dates, venue, etc.
create table if not exists settings (
  key   text primary key,
  value text
);

-- Reception tables (the physical banquet tables).
create table if not exists tables (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,           -- "Table 3", "VIP Bride", ...
  capacity   int  not null default 10,
  sort       int  default 0,
  pos_x      int  default 0,          -- free position on the floor-plan canvas
  pos_y      int  default 0
);

-- Guests — the master list. Used by Guest List + Seating + Red Packet pages.
create table if not exists guests (
  id                uuid primary key default gen_random_uuid(),
  full_name         text,
  age_group         text,             -- Adult / Kid
  guest_of          text,             -- Colin / Grace
  invitation_group  text,             -- "Colin Fam", "Grace Friends", ...
  table_id          uuid references tables(id) on delete set null,
  dietary           text,
  std_sent          boolean default false,   -- save-the-date sent
  inv_sent          boolean default false,   -- invitation sent
  rsvp_rom          text default 'pending',  -- yes / no / pending
  rsvp_banquet      text default 'pending',  -- yes / no / pending
  -- DAY-OF fields (bridal party edits these) -----------------------
  attended_rom      boolean default false,
  attended_banquet  boolean default false,
  gift_received     boolean default false,
  gift_amount       numeric,
  gift_description  text,
  -- ---------------------------------------------------------------
  sort              int default 0,
  created_at        timestamptz default now()
);

-- Budget — OWNERS ONLY.
create table if not exists budget_items (
  id         uuid primary key default gen_random_uuid(),
  category   text,
  name       text,
  details    text,
  planned    numeric,
  actual     numeric,
  paid       numeric,
  due_date   text,
  vendor     text,
  contact    text,
  website    text,
  notes      text,
  sort       int default 0
);

-- To-do list — OWNERS ONLY.
create table if not exists todos (
  id         uuid primary key default gen_random_uuid(),
  phase      text,
  task       text,
  status     text default 'Not Started',  -- Not Started / In-Progress / Done
  priority   text,                          -- P0 / P1 / Optional
  price      text,
  notes      text,
  sort       int default 0
);

-- Vendor contacts — visible to everyone (useful on the day).
create table if not exists vendors (
  id            uuid primary key default gen_random_uuid(),
  category      text,
  company       text,
  contact_person text,
  mobile        text,
  arrival_time  text,
  notes         text,
  sort          int default 0
);

-- Point-of-Contact / Bridal-party duty assignments — visible to everyone.
create table if not exists pocs (
  id           uuid primary key default gen_random_uuid(),
  task         text,            -- what needs doing
  poc_name     text,            -- who is responsible
  poc_phone    text,
  backup_name  text,
  time_needed  text,
  location     text,
  notes        text,
  done         boolean default false,
  sort         int default 0
);

-- Day-of master rundown / timeline — visible to everyone.
create table if not exists rundown (
  id          uuid primary key default gen_random_uuid(),
  time        text,
  activity    text,
  location    text,
  person      text,
  status      text default 'Pending',
  notes       text,
  sort        int default 0
);

-- ---------------------------------------------------------------------------
-- 3.  ROW-LEVEL SECURITY
--     Owners: full access to everything.
--     Bridal party: read everything they're allowed to see + edit day-of
--     fields, but the BUDGET and TODO tables are completely invisible to them.
-- ---------------------------------------------------------------------------
alter table profiles     enable row level security;
alter table settings     enable row level security;
alter table tables       enable row level security;
alter table guests       enable row level security;
alter table budget_items enable row level security;
alter table todos        enable row level security;
alter table vendors      enable row level security;
alter table pocs         enable row level security;
alter table rundown      enable row level security;

-- drop existing policies (so this script is re-runnable)
do $$ declare r record; begin
  for r in (select schemaname, tablename, policyname from pg_policies where schemaname='public')
  loop execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename); end loop;
end $$;

-- PROFILES: everyone can read the team list; you can update your own row;
-- owners can update anyone's role.
create policy profiles_read   on profiles for select using ( is_member() );
create policy profiles_self   on profiles for update using ( id = auth.uid() );
create policy profiles_owner  on profiles for update using ( is_owner() );

-- OWNER-ONLY tables (budget + todos): bridal party gets NOTHING.
create policy budget_owner on budget_items for all using ( is_owner() ) with check ( is_owner() );
create policy todos_owner  on todos        for all using ( is_owner() ) with check ( is_owner() );

-- SHARED tables: any logged-in member can read; edits allowed for all members.
-- (Owners + bridal party both collaborate on guests, seating, POC, rundown.)
create policy settings_read  on settings for select using ( is_member() );
create policy settings_write on settings for all    using ( is_owner() ) with check ( is_owner() );

create policy tables_read  on tables for select using ( is_member() );
create policy tables_write on tables for all    using ( is_member() ) with check ( is_member() );

create policy guests_read  on guests for select using ( is_member() );
create policy guests_write on guests for all    using ( is_member() ) with check ( is_member() );

create policy vendors_read  on vendors for select using ( is_member() );
create policy vendors_write on vendors for all    using ( is_member() ) with check ( is_member() );

create policy pocs_read  on pocs for select using ( is_member() );
create policy pocs_write on pocs for all    using ( is_member() ) with check ( is_member() );

create policy rundown_read  on rundown for select using ( is_member() );
create policy rundown_write on rundown for all    using ( is_member() ) with check ( is_member() );

-- ---------------------------------------------------------------------------
-- 4.  REALTIME — broadcast row changes to all connected clients (live sync)
-- ---------------------------------------------------------------------------
do $$ begin
  alter publication supabase_realtime add table guests;
  alter publication supabase_realtime add table tables;
  alter publication supabase_realtime add table budget_items;
  alter publication supabase_realtime add table todos;
  alter publication supabase_realtime add table vendors;
  alter publication supabase_realtime add table pocs;
  alter publication supabase_realtime add table rundown;
  alter publication supabase_realtime add table settings;
  alter publication supabase_realtime add table profiles;
exception when duplicate_object then null;
end $$;
