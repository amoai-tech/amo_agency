// useRealtimeAIRuns — Live subscription to ai_run_logs table via broadcast
//
// MIGRATED from postgres_changes to broadcast (v0.24.4)
// Uses `broadcast` + database trigger (`realtime.broadcast_changes`)
// per supabase-realtime-guide.md — scalable, multi-threaded, supports
// private channels and conditional triggers.
//
// Prerequisites:
//   1. Database trigger `ai_run_logs_broadcast_trigger` on `ai_run_logs`
//      (see /imports/ai-runs-broadcast-trigger.sql)
//   2. RLS policy on `realtime.messages` for `ai-runs:*` topics
//   3. (Optional) Enable "Private-only channels" in Realtime Settings
//
// Graceful degradation:
//   - If trigger/Realtime not configured, status = 'error'
//   - AgentsPage keeps manual Refresh as fallback

import { useCallback, useRef } from 'react';
import { useAuth } from '../../components/AuthContext';
import {
  useSupabaseBroadcast,
  type BroadcastStatus,
  type BroadcastChangePayload,
} from './useSupabaseBroadcast';

export interface UseRealtimeAIRunsOptions {
  /** Callback fired when a new AI run is inserted — typically triggers data refetch */
  onNewRun: () => void;
  /** Whether the subscription is active (default: true) */
  enabled?: boolean;
  /** Throttle interval in ms to avoid rapid-fire refreshes (default: 3000) */
  throttleMs?: number;
}

export interface UseRealtimeAIRunsReturn {
  /** Connection status */
  status: BroadcastStatus;
  /** Number of live events received since page load */
  liveEventCount: number;
  /** Whether we're receiving live updates */
  isLive: boolean;
  /** Manually reconnect */
  reconnect: () => void;
}

export function useRealtimeAIRuns(options: UseRealtimeAIRunsOptions): UseRealtimeAIRunsReturn {
  const { onNewRun, enabled = true, throttleMs = 3000 } = options;
  const { user } = useAuth();

  // Throttle: don't fire onNewRun more than once per throttleMs
  const lastRefreshRef = useRef(0);
  const onNewRunRef = useRef(onNewRun);
  onNewRunRef.current = onNewRun;

  const handleEvent = useCallback(
    (_eventName: string, payload: BroadcastChangePayload) => {
      const now = Date.now();
      if (now - lastRefreshRef.current < throttleMs) {
        return; // Skip — too soon after last refresh
      }
      lastRefreshRef.current = now;

      const record = payload.record as Record<string, unknown> | null;
      console.log(
        `[Realtime] New AI run detected: ${record?.prompt_type || 'unknown'}`
      );

      onNewRunRef.current();
    },
    [throttleMs]
  );

  // Each account receives only its own AI run events (tenant-scoped RLS).
  const { status, eventCount, reconnect } = useSupabaseBroadcast({
    topic: `ai-runs:${user?.id || 'unauthenticated'}`,
    events: ['INSERT'],
    onEvent: handleEvent,
    enabled: enabled && !!user?.id,
    isPrivate: true,
    selfBroadcast: false,
  });

  return {
    status,
    liveEventCount: eventCount,
    isLive: status === 'connected',
    reconnect,
  };
}
