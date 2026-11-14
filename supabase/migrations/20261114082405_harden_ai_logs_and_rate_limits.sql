-- Follow-up migration: per-user AI logs, private Realtime topics, atomic rate limiting.
-- Never modify 20260618000001-04: they are already applied in production.
--
-- Scope all AI logs to the verified account. Old log rows without a valid wizard
-- session remain service-role-only rather than being assigned to the wrong user.
alter table public.ai_run_logs
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists idx_ai_run_logs_user_created
  on public.ai_run_logs (user_id, created_at desc) where user_id is not null;

update public.ai_run_logs as l
set user_id = s.user_id
from public.wizard_sessions as s
where l.user_id is null
  and l.session_id = s.id::text
  and s.user_id is not null;

create or replace function public.assign_ai_run_log_owner()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.user_id is null and new.session_id is not null then
    select s.user_id into new.user_id
    from public.wizard_sessions as s
    where s.id::text = new.session_id;
  end if;
  return new;
end;
$$;
revoke all on function public.assign_ai_run_log_owner() from public, anon, authenticated;

drop trigger if exists ai_run_logs_assign_owner on public.ai_run_logs;
create trigger ai_run_logs_assign_owner
  before insert on public.ai_run_logs
  for each row execute function public.assign_ai_run_log_owner();

drop policy if exists ai_run_logs_select_authenticated on public.ai_run_logs;
drop policy if exists ai_run_logs_select_own on public.ai_run_logs;
create policy ai_run_logs_select_own on public.ai_run_logs
  for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.ai_run_logs from anon;
revoke insert, update, delete on public.ai_run_logs from authenticated;
grant select on public.ai_run_logs to authenticated;

-- The old global broadcast topic allowed every authenticated user to see
-- every customer's AI run events. Broadcast only to that run's owner.
create or replace function public.ai_run_logs_broadcast_trigger()
returns trigger
language plpgsql
security definer
set search_path = public, realtime
as $$
begin
  if new.user_id is not null then
    perform realtime.broadcast_changes(
      'ai-runs:' || new.user_id::text,
      tg_op, tg_op, tg_table_name, tg_table_schema, new, old
    );
  end if;
  return new;
end;
$$;
revoke all on function public.ai_run_logs_broadcast_trigger() from public, anon, authenticated;

drop policy if exists ai_runs_read on realtime.messages;
drop policy if exists ai_runs_read_own on realtime.messages;
create policy ai_runs_read_own on realtime.messages
  for select to authenticated
  using (topic = 'ai-runs:' || (select auth.uid())::text);

-- Atomic fixed-window quota. Only the service-role backend may call this RPC.
-- A count-then-insert implementation is not safe under concurrent requests.
create table if not exists public.ai_rate_limit_windows (
  user_id uuid not null references auth.users(id) on delete cascade,
  window_start timestamptz not null,
  requests integer not null default 0 check (requests >= 0),
  primary key (user_id, window_start)
);
alter table public.ai_rate_limit_windows enable row level security;
revoke all on public.ai_rate_limit_windows from anon, authenticated;
grant select, insert, update, delete on public.ai_rate_limit_windows to service_role;

create or replace function public.consume_ai_rate_limit(
  p_user_id uuid,
  p_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, remaining integer, retry_after integer)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_start timestamptz;
  v_used integer;
  v_retry integer;
begin
  if p_user_id is null or p_limit not between 1 and 1000
     or p_window_seconds not between 1 and 3600 then
    raise exception 'Invalid rate limit input';
  end if;

  v_start := to_timestamp(
    floor(extract(epoch from v_now) / p_window_seconds) * p_window_seconds
  );
  v_retry := greatest(
    1,
    ceil(extract(epoch from v_start + make_interval(secs => p_window_seconds) - v_now))::integer
  );

  insert into public.ai_rate_limit_windows as quota(user_id, window_start, requests)
  values(p_user_id, v_start, 1)
  on conflict (user_id, window_start)
  do update set requests = quota.requests + 1
    where quota.requests < p_limit
  returning requests into v_used;

  if v_used is null then
    return query select false, 0, v_retry;
  else
    return query select true, greatest(0, p_limit - v_used), v_retry;
  end if;
end;
$$;
revoke all on function public.consume_ai_rate_limit(uuid, integer, integer)
  from public, anon, authenticated;
grant execute on function public.consume_ai_rate_limit(uuid, integer, integer)
  to service_role;

-- Operations: purge old ai_rate_limit_windows rows periodically (e.g. > 2 days).
