import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const server='supabase/functions/make-server-283466b6/';
const mirror='src/supabase/functions/server/';

test('NEXUS: routes, actions, catalog are present',()=>{
  const entry=read(server+'index.tsx');
  assert.match(entry,/app\.route\("\/", nexus\)/);
  assert.match(read(server+'agent-loader.tsx'),/export function getNexusPhase/);
  assert.match(read(server+'nexus-routes.tsx'),/dispatchAction/);
});
test('signup: admin auto-confirm removed; SDK email signup enabled',()=>{
  assert.doesNotMatch(read(server+'auth.tsx'),/auth\.admin\.createUser/);
  assert.match(read(server+'index.tsx'),/verified Supabase Auth signup flow/);
  assert.match(read('src/lib/supabase.ts'),/supabase\.auth\.signUp/);
  assert.match(read('src/components/AuthPage.tsx'),/Check your email/);
});
test('paid AI routes: atomic, verified per-user quotas',()=>{
 const limiter=read(server+'rate-limit.tsx'),entry=read(server+'index.tsx');
 assert.match(limiter,/requireAuth/);
 assert.match(limiter,/\.rpc\("consume_ai_rate_limit"/);
 assert.doesNotMatch(limiter,/\.from\("ai_run_logs"\)/);
 for(const n of ['analyze-business','industry-diagnostics','system-recommendations','readiness-score','generate-roadmap','nexus/dispatch']){
   assert.ok(entry.includes('"'+n+'"'),'Missing limiter for '+n);
 }
});
test('AI logs: RLS, private Realtime, and API scoping',()=>{
 const sql=read('supabase/migrations/20261114094419_harden_ai_logs_and_rate_limits.sql');
 assert.match(sql,/ai_run_logs_select_own/);
 assert.match(sql,/user_id = \(select auth\.uid\(\)\)/);
 assert.match(sql,/drop policy if exists ai_runs_read on realtime\.messages/);
 assert.match(sql,/ai-runs:' \|\| new\.user_id/);
 assert.match(sql,/grant execute on function public\.consume_ai_rate_limit/);
 assert.match(read('src/lib/hooks/useRealtimeAIRuns.ts'),/ai-runs:\$\{user\?\.id/);
 assert.match(read(server+'ai-routes.tsx'),/\.eq\("user_id", userId\)/);
 assert.match(read(server+'agent-routes.tsx'),/\.eq\("user_id", userId\)/);
});
test('server and Figma source mirror: no divergent deployed code',()=>{
 for(const name of ['index.tsx','ai-routes.tsx','auth.tsx','agent-loader.tsx','onboarding-routes.tsx','agent-routes.tsx','rate-limit.tsx','nexus-routes.tsx','action-dispatcher.tsx']){
  assert.equal(read(server+name),read(mirror+name),'Backend mirror drift: '+name);
 }
});


test('wizard service-role routes enforce per-user ownership',()=>{
 const src=read(server+'wizard-routes.tsx');
 assert.match(src,/\.eq\("user_id", callerId\)/);
 assert.match(src,/\.eq\("user_id", userId\)/);
 assert.match(src,/existing\?\.user_id && existing.user_id !== callerKey/);
 assert.match(src,/Wizard session ownership changed/);
 assert.doesNotMatch(src,/falling back to unfiltered/);
});
test('CRM owned data cannot be fetched or mutated by another user',()=>{
 const src=read(server+'pipeline-routes.tsx');
 const client=read(server+'crm-routes.tsx');
 assert.ok((src.match(/\.eq\("user_id", userId\)/g)||[]).length>=10);
 assert.match(src,/Deal not found/);
 assert.match(src,/Stage does not belong to deal.s pipeline/);
 assert.match(client,/const \{ data: owningClient \}/);
});
test('database schema types and new RPC shipped inside Edge Function bundle',()=>{
 const db=read(server+'db.tsx');
 const typed=read('supabase/functions/_shared/database.types.ts');
 assert.match(db,/SupabaseClient<Database>/);
 assert.match(typed,/consume_ai_rate_limit/);
 assert.match(typed,/user_id: string \| null/);
});
