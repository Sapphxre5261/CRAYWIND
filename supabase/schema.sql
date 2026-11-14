-- รันใน Supabase SQL Editor ครั้งเดียวก่อนสลับ driver เป็น "supabase"
create table if not exists members (
  id bigint generated always as identity primary key,
  name text not null,
  rank text not null check (rank in ('founder', 'leader', 'lastname', 'member')),
  facebook text not null default '',
  pos integer not null default 0,
  created_at timestamptz not null default now()
);

-- เก็บ admin password (hash) + flags เช่น seed_done
create table if not exists settings (
  key text primary key,
  value text not null default ''
);

-- service_role ข้าม RLS อยู่แล้ว แต่ปิด anon access ไว้ให้ชัวร์
alter table members enable row level security;
alter table settings enable row level security;
