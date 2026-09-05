create table if not exists public.journals (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.journals enable row level security;

drop policy if exists "Users read own journal" on public.journals;
create policy "Users read own journal"
on public.journals for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users create own journal" on public.journals;
create policy "Users create own journal"
on public.journals for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users update own journal" on public.journals;
create policy "Users update own journal"
on public.journals for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

