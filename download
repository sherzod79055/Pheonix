-- Bag'dod tumani ixtisoslashtirilgan maktabi -- ma'lumotlar bazasi sxemasi
-- Ushbu faylni Supabase loyihangizda SQL Editor orqali to'liq nusxalab ishga tushiring.

create extension if not exists "pgcrypto";

-- 1) Maktab haqida umumiy ma'lumot (bitta qatorli jadval)
create table if not exists school_info (
  id uuid primary key default gen_random_uuid(),
  school_name text not null default 'Bag''dod tumani ixtisoslashtirilgan maktabi',
  tagline text,
  mission text,
  history text,
  address text,
  phone text,
  email text,
  map_url text,
  social_links jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- 2) O'qituvchilar
create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  subject text,
  position text,
  experience_years int,
  bio text,
  phone text,
  social_links jsonb default '{}'::jsonb,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3) Yutuqlar (o'quvchi yoki o'qituvchi bo'lishi mumkin)
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text, -- masalan: olimpiada, sertifikat, sport, attestatsiya
  person_name text,
  person_type text check (person_type in ('teacher','student','school')),
  teacher_id uuid references teachers(id) on delete set null,
  achieved_at date,
  photo_url text,
  created_at timestamptz default now()
);

-- 4) Yangiliklar
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  photo_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 5) Tadbirlar
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  photo_url text,
  created_at timestamptz default now()
);

-- 6) Galereya
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  media_type text default 'photo' check (media_type in ('photo','video')),
  caption text,
  category text,
  created_at timestamptz default now()
);

-- Row Level Security: hammaga o'qish ochiq, faqat tizimga kirgan (admin) foydalanuvchi yoza oladi
alter table school_info enable row level security;
alter table teachers enable row level security;
alter table achievements enable row level security;
alter table news enable row level security;
alter table events enable row level security;
alter table gallery enable row level security;

create policy "public_read_school_info" on school_info for select using (true);
create policy "public_read_teachers" on teachers for select using (true);
create policy "public_read_achievements" on achievements for select using (true);
create policy "public_read_news" on news for select using (true);
create policy "public_read_events" on events for select using (true);
create policy "public_read_gallery" on gallery for select using (true);

create policy "admin_write_school_info" on school_info for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_write_teachers" on teachers for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_write_achievements" on achievements for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_write_news" on news for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_write_events" on events for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_write_gallery" on gallery for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Boshlang'ich maktab ma'lumoti (bitta marta)
insert into school_info (school_name, tagline)
values ('Bag''dod tuman ixtisoslashtirilgan maktabi', 'Kelajak bugundan boshlanadi')
on conflict do nothing;

-- MUHIM: Supabase Dashboard > Storage bo'limida "media" nomli PUBLIC bucket yarating
-- (rasm/fayl yuklash uchun). Kod shu bucket nomini ishlatadi.
