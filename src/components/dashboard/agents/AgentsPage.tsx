// C107-AGENTS-PAGE — AI Agent Management page at /app/agents
// Orchestrates: summary header, performance chart, token usage,
// cache stats, and paginated run history table.
// Reads from ai_run_logs + ai_cache Supabase tables via Edge Functions.
// Realtime: subscribes to ai_run_logs INSERT for live auto-refresh.
// Mobile-first: single column → two columns on lg+.

import { useAuth } from '../../AuthContext';
import { agentApi } from '../../../lib/supabase';
import type { AggregateStats, CacheStats, RunLogEntry } from '../../../lib/supabase';
import { useRealtimeAIRuns } from '../../../lib/hooks/useRealtimeAIRuns';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

import AgentSummaryHeader from './AgentSummaryHeader';
import PerformanceChart from './PerformanceChart';
import TokenUsagePanel from './TokenUsagePanel';
import CacheStatsPanel from './CacheStatsPanel';
import RunHistoryTable from './RunHistoryTable';

const PAGE_SIZE = 20;

export default function AgentsPage() {
  const { accessToken } = useAuth();
  // Always send a real user token. A public key must never authorize log access.
  const authToken = accessToken ? 'use-fresh-token' : undefined;

  const [stats, setStats] = useState<AggregateStats | null>(null);
  const [cacheStats, setCacheStats] = useState<CacheStats | null>(null);
  const [logs, setLogs] = useState<RunLogEntry[]>([]);
  const [logTotal, setLogTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);

  const [statsLoading, setStatsLoading] = useState(true);
  const [cacheLoading, setCacheLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Realtime: auto-refresh on new AI runs ──
  const { status: realtimeStatus, liveEventCount, isLive, reconnect: reconnectRealtime } =
    useRealtimeAIRuns({
      onNewRun: () => {
        // Auto-refresh all panels when a new AI run is inserted
        fetchStats();
        fetchCacheStats();
        fetchLogs();
      },
      enabled: true,
      throttleMs: 3000,
    });

  // Fetch aggregate stats
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await agentApi.getAggregateStats(authToken);
      if (res.data) { setStats(res.data); setError(null); }
      if (res.error) {
        console.error('[AgentsPage] Stats error:', res.error);
        setError(res.error);
      }
    } catch (err) {
      console.error('[AgentsPage] Stats fetch failed:', err);
      setError(String(err));
    } finally {
      setStatsLoading(false);
    }
  }, [authToken]);

  // Fetch cache stats
  const fetchCacheStats = useCallback(async () => {
    setCacheLoading(true);
    try {
      const res = await agentApi.getCacheStats(authToken);
      if (res.data) setCacheStats(res.data);
      if (res.error) console.error('[AgentsPage] Cache error:', res.error);
    } catch (err) {
      console.error('[AgentsPage] Cache fetch failed:', err);
    } finally {
      setCacheLoading(false);
    }
  }, [authToken]);

  // Fetch run logs (paginated + filtered)
  const fetchLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const res = await agentApi.getRunLogs(
        { limit: PAGE_SIZE, offset: page * PAGE_SIZE, promptType: filter || undefined },
        authToken,
      );
      if (res.data) {
        setLogs(res.data.logs || []);
        setLogTotal(res.data.total || 0);
      }
      if (res.error) console.error('[AgentsPage] Logs error:', res.error);
    } catch (err) {
      console.error('[AgentsPage] Logs fetch failed:', err);
    } finally {
      setLogsLoading(false);
    }
  }, [authToken, page, filter]);

  useEffect(() => { fetchStats(); fetchCacheStats(); }, [fetchStats, fetchCacheStats]);
  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const handleRefresh = () => {
    fetchStats();
    fetchCacheStats();
    fetchLogs();
  };

  const handleFilterChange = (promptType: string | null) => {
    setFilter(promptType);
    setPage(0);
  };

  if (error && !stats && !cacheStats) {
    // Detect "column does not exist" as a schema mismatch that requires migration
    const isSchemaError = error.includes('does not exist') || error.includes('column');
    return (
      <div className="bg-white rounded border border-[#E8E8E4] p-6 sm:p-8 text-center">
        <p className="text-[#DC2626] text-sm mb-3">Unable to load agent data</p>
        <p className="text-[#6B6B63] text-xs mb-4 max-w-md mx-auto break-words">{error}</p>
        {isSchemaError && (
          <p className="text-[#D97706] text-xs mb-4 max-w-md mx-auto">
            The <code className="font-mono bg-[#F5F5F0] px-1 rounded">ai_run_logs</code> and <code className="font-mono bg-[#F5F5F0] px-1 rounded">ai_cache</code> tables may need to be updated.
            Run the migration <code className="font-mono bg-[#F5F5F0] px-1 rounded">20260307120100_create_ai_tables.sql</code> in the Supabase SQL Editor.
          </p>
        )}
        <button
          onClick={handleRefresh}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#F5F5F0] text-sm rounded hover:bg-[#333] transition-colors min-h-[44px]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page header with refresh */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#9CA39B]">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00875A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00875A]" />
                </span>
                <span>Live — {liveEventCount > 0 ? `${liveEventCount} event${liveEventCount !== 1 ? 's' : ''} received` : 'listening for new AI runs'}</span>
              </span>
            ) : realtimeStatus === 'error' ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                </span>
                <span>Polling mode — <button onClick={reconnectRealtime} className="underline hover:text-[#1A1A1A] transition-colors">retry live</button></span>
              </span>
            ) : (
              <span>
                Connecting to <span className="font-mono">ai_run_logs</span> realtime...
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/app/agents/catalog"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded text-white transition-colors min-h-[36px]"
            style={{ backgroundColor: '#00875A', borderRadius: '4px' }}
          >
            Browse Catalog
          </Link>
          <button
            onClick={handleRefresh}
            disabled={statsLoading}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-[#E8E8E4] text-[#1A1A1A] hover:bg-[#F5F5F0] transition-colors min-h-[36px] disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${statsLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AgentSummaryHeader stats={stats} loading={statsLoading} />
      </motion.div>

      {/* Two-column: Performance chart + Token usage */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PerformanceChart stats={stats} loading={statsLoading} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <TokenUsagePanel stats={stats} loading={statsLoading} />
        </motion.div>
      </div>

      {/* Cache stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <CacheStatsPanel cacheStats={cacheStats} loading={cacheLoading} />
      </motion.div>

      {/* Run history table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <RunHistoryTable
          logs={logs}
          total={logTotal}
          loading={logsLoading}
          page={page}
          pageSize={PAGE_SIZE}
          filter={filter}
          onPageChange={setPage}
          onFilterChange={handleFilterChange}
        />
      </motion.div>

      {/* Back link */}
      <div className="pt-2">
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[#00875A] hover:underline min-h-[44px]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}