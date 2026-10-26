-- Beth Loubavitch Bastille : contenu du site géré depuis la page Admin
create table if not exists public.contenu (
  cle text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.contenu enable row level security;
drop policy if exists "lecture publique" on public.contenu;
create policy "lecture publique" on public.contenu for select to anon, authenticated using (true);
drop policy if exists "ecriture admin" on public.contenu;
create policy "ecriture admin" on public.contenu for all to authenticated using (true) with check (true);
grant select on public.contenu to anon;
grant select, insert, update, delete on public.contenu to authenticated;
