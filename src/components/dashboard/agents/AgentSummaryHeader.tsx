// C102-AGENT-SUMMARY — Top summary card for AI Agent Management page
// Shows model, total runs, success rate, avg latency, cache entries.
// Mobile-first: stacked → row on sm+, 44px touch targets.

import type { AggregateStats } from '../../../lib/supabase';
import { Bot, Zap, CheckCircle, Clock, Database } from 'lucide-react';

interface AgentSummaryHeaderProps {
  stats: AggregateStats | null;
  loading: boolean;
}

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="bg-white rounded border border-[#E8E8E4] p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className={`w-4 h-4 ${color || 'text-[#9CA39B]'}`} />
        <span className="text-xs text-[#6B6B63]">{label}</span>
      </div>
      <p className="text-lg sm:text-xl font-semibold font-mono text-[#1A1A1A]">{value}</p>
      {sub && <p className="text-[10px] text-[#9CA39B] mt-0.5">{sub}</p>}
    </div>
  );
}

export default function AgentSummaryHeader({ stats, loading }: AgentSummaryHeaderProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-20 sm:h-24 bg-white rounded border border-[#E8E8E4] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
      <StatCard icon={Bot} label="Total Runs" value={stats.totalRuns ?? 0} sub={`Model: ${stats.model || 'N/A'}`} color="text-[#00875A]" />
      <StatCard icon={CheckCircle} label="Success Rate" value={`${stats.successRate ?? 0}%`} sub={`${stats.successRuns ?? 0} ok / ${stats.failedRuns ?? 0} failed`} color="text-[#00875A]" />
      <StatCard icon={Zap} label="Total Tokens" value={(stats.totalTokens ?? 0).toLocaleString()} sub="Prompt + response" />
      <StatCard icon={Clock} label="Avg Latency" value={`${((stats.avgDuration ?? 0) / 1000).toFixed(1)}s`} sub={`${stats.avgDuration ?? 0}ms avg`} />
      <StatCard icon={Database} label="Cache Entries" value={stats.cacheMetricsAvailable === false ? "—" : stats.activeCacheEntries ?? 0} sub={stats.cacheMetricsAvailable === false ? "Account-scoped metrics unavailable" : "Active (non-expired)"} color="text-[#D97706]" />
    </div>
  );
}