// L01-SUPABASE — Frontend Supabase client singleton + API helpers
// All backend communication goes through this module

import { createClient } from '@supabase/supabase-js';

// ── Auth failure event — dispatched when API returns 401 after token refresh ──
// AuthContext listens for this to trigger signOut + redirect to /auth
export const AUTH_FAILURE_EVENT = 'amoai:auth-failure';

function emitAuthFailure() {
  window.dispatchEvent(new CustomEvent(AUTH_FAILURE_EVENT));
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const publicAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !publicAnonKey) {
  throw new Error(
    'Missing Supabase env vars: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required.'
  );
}

const BASE_URL = `${SUPABASE_URL}/functions/v1/make-server-283466b6`;

// ── Singleton Supabase client ──
let _client: ReturnType<typeof createClient> | null = null;
export function getSupabaseClient() {
  if (!_client) {
    _client = createClient(SUPABASE_URL, publicAnonKey);
  }
  return _client;
}

// ── Fresh token helper — always gets the latest access token from Supabase ──
// Supabase JS auto-refreshes expired tokens internally, so getSession()
// returns a valid token even if the original one expired.
// If the token is near-expiry (< 60s), we proactively refresh to avoid
// unnecessary 401 → retry round-trips.
async function getFreshAccessToken(): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;

    // Proactively refresh if token expires within 60 seconds
    const expiresAt = session.expires_at; // Unix timestamp (seconds)
    if (expiresAt && expiresAt < Date.now() / 1000 + 60) {
      const { data } = await supabase.auth.refreshSession();
      // If refresh succeeded, use the new token; otherwise return null
      // so the caller falls back to anonKey instead of using the expired JWT.
      return data?.session?.access_token ?? null;
    }

    return session.access_token;
  } catch {
    return null;
  }
}

// ── API helper — calls Edge Functions ──
interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  token?: string; // access_token for authenticated requests
}

export async function api<T = unknown>(
  route: string,
  options: ApiOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  const { method = 'GET', body, token } = options;

  try {
    // If a token was provided (authenticated request), always get a fresh one
    // from the Supabase session to avoid stale JWT errors. The Supabase JS
    // client handles auto-refresh internally.
    // If no fresh token is available (session expired), fall back to anonKey
    // so the request still reaches the edge function (which only checks header presence).
    let activeToken = token;
    if (token && token !== publicAnonKey) {
      const fresh = await getFreshAccessToken();
      activeToken = fresh || publicAnonKey;
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${activeToken || publicAnonKey}`,
    };

    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const url = `${BASE_URL}${route.startsWith('/') ? route : `/${route}`}`;
    let response = await fetch(url, fetchOptions);

    // If 401 after using a fresh token, try one explicit refresh cycle
    if (response.status === 401 && activeToken && activeToken !== publicAnonKey) {
      try {
        const supabase = getSupabaseClient();
        const { data: refreshData } = await supabase.auth.refreshSession();
        if (refreshData?.session?.access_token) {
          const refreshedHeaders = { ...headers, Authorization: `Bearer ${refreshData.session.access_token}` };
          const refreshedResponse = await fetch(url, { ...fetchOptions, headers: refreshedHeaders });
          if (refreshedResponse.ok) {
            const refreshedData = await refreshedResponse.json();
            return { data: refreshedData as T, error: null };
          }
        }
      } catch {
        // Refresh failed — session is dead
      }

      // Token refresh failed or retried request still 401 — session is invalid.
      // Signal auth failure so AuthContext can redirect to /auth.
      console.warn(`[API] ${method} ${route}: 401 after token refresh — signing out`);
      emitAuthFailure();
      return { data: null, error: 'Session expired. Please sign in again.' };
    }

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data?.error || `API error: ${response.status} ${response.statusText}`;
      console.error(`[API] ${method} ${route} failed:`, errorMsg);
      // If a 401 slipped through (e.g., anon-key request to protected endpoint), signal auth failure
      if (response.status === 401 && activeToken && activeToken !== publicAnonKey) {
        emitAuthFailure();
      }
      return { data: null, error: errorMsg };
    }

    return { data: data as T, error: null };
  } catch (err) {
    const errorMsg = `Network error calling ${route}: ${err}`;
    console.error(`[API]`, errorMsg);
    return { data: null, error: errorMsg };
  }
}

// ── Typed API methods ──

export interface WizardSaveResponse {
  success: boolean;
  sessionId: string;
  updatedAt: string;
}

export interface WizardLoadResponse {
  session: {
    id: string;
    org_id?: string | null;
    user_id?: string | null;
    current_step: number;
    status?: string;
    context_snapshot?: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
  };
  answers: {
    step_number: number;
    answers: Record<string, unknown>;
    ai_results: Record<string, unknown> | null;
    updated_at: string;
  }[];
  progress: { currentStep: number; completedSteps: number[] };
}

export interface AnalysisResponse {
  success: boolean;
  analysis: {
    companySummary: string;
    detectedIndustry: string;
    productsServices: string[];
    teamSizeEstimate: string;
    technologySignals: string[];
    aiOpportunities: string[];
    competitivePosition?: string;
    readinessIndicators?: {
      digital_maturity: string;
      automation_level: string;
      data_readiness: string;
    };
  };
  timestamp: string;
}

export interface RoadmapResponse {
  success: boolean;
  roadmap: {
    title: string;
    totalWeeks: number;
    totalInvestment: string;
    phases: {
      phaseNumber: number;
      title: string;
      weekRange: string;
      systems: string[];
      deliverables: string[];
      milestones: string[];
      estimatedCost: string;
    }[];
    quickWins: string[];
    riskFactors: { risk: string; mitigation: string }[];
    successMetrics: { metric: string; target: string; timeframe: string }[];
  };
  timestamp: string;
}

// ── Wizard API ──
export const wizardApi = {
  save: (sessionId: string, fullState: Record<string, unknown>, token?: string) =>
    api<WizardSaveResponse>('/wizard/save', {
      method: 'POST',
      body: { sessionId, fullState },
      token,
    }),

  saveStep: (sessionId: string, step: number, data: unknown, token?: string) =>
    api<WizardSaveResponse>('/wizard/save', {
      method: 'POST',
      body: { sessionId, step, data },
      token,
    }),

  load: (sessionId: string, token?: string) =>
    api<WizardLoadResponse>(`/wizard/${sessionId}`, { token }),

  list: (userId: string, token?: string) =>
    api<{ sessions: { id: string; current_step: number; status: string; created_at: string; updated_at: string }[] }>(
      `/wizard/list/${userId}`, { token }
    ),
};

// ── AI API ──
export const aiApi = {
  analyzeBusiness: (params: {
    url?: string;
    description?: string;
    industry?: string;
    sessionId?: string;
  }) =>
    api<AnalysisResponse>('/analyze-business', {
      method: 'POST',
      body: params as Record<string, unknown>,
    }),

  industryDiagnostics: (params: {
    industryId: string;
    companyProfile?: Record<string, unknown>;
    sessionId?: string;
  }) =>
    api('/industry-diagnostics', {
      method: 'POST',
      body: params as Record<string, unknown>,
    }),

  systemRecommendations: (params: {
    sessionId?: string;
    wizardAnswers?: Record<string, unknown>;
    industry?: string;
    signals?: unknown[];
  }) =>
    api('/system-recommendations', {
      method: 'POST',
      body: params as Record<string, unknown>,
    }),

  readinessScore: (sessionId: string) =>
    api('/readiness-score', {
      method: 'POST',
      body: { sessionId },
    }),

  generateRoadmap: (params: {
    sessionId?: string;
    selectedSystems: string[];
    industry?: string;
    companySize?: string;
  }) =>
    api<RoadmapResponse>('/generate-roadmap', {
      method: 'POST',
      body: params as Record<string, unknown>,
    }),

  dashboardInsights: (params: {
    sessionId: string;
    orgData: Record<string, unknown>;
    readinessScore: number;
    projectState: Record<string, unknown>;
    recentActivities: unknown[];
  }, token?: string) =>
    api<{
      success: boolean;
      insights: {
        insights: Array<{
          id: string;
          title: string;
          description: string;
          priority: 'high' | 'medium' | 'low';
          actionLabel?: string;
          actionRoute?: string;
        }>;
        greeting?: string;
        summary?: string;
      };
    }>('/dashboard-insights', {
      method: 'POST',
      body: params as Record<string, unknown>,
      token,
    }),
};

// ── Auth API ──
export const authApi = {
  signup: async (email: string, password: string, name?: string) => {
    const supabase = getSupabaseClient();
    const callback = new URL('/auth/callback', window.location.origin);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name: name || '' }, emailRedirectTo: callback.toString() },
    });
    if (error) return { data: null, error: error.message };
    // Fail closed if hosted Supabase has email confirmation disabled. The
    // deployment must enable "Confirm email" in Supabase Auth settings.
    if (data.session) {
      await supabase.auth.signOut();
      return { data: null, error: 'Email confirmation must be enabled before signup can proceed. Please contact support.' };
    }
    return { data: { user: data.user, confirmationRequired: true }, error: null };
  },

  signIn: async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { data: null, error: error.message };
    return { data: { session: data.session, user: data.user }, error: null };
  },

  signInWithGoogle: async (returnPath?: string) => {
    const supabase = getSupabaseClient();
    const callbackUrl = new URL('/auth/callback', window.location.origin);
    if (returnPath) {
      callbackUrl.searchParams.set('return', returnPath);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });
    if (error) {
      console.error('[Auth] Google OAuth error:', error.message);
      return { error: error.message };
    }
    // Browser will redirect — no return value needed
    return { error: null };
  },

  signInWithLinkedIn: async (returnPath?: string) => {
    const supabase = getSupabaseClient();
    const callbackUrl = new URL('/auth/callback', window.location.origin);
    if (returnPath) {
      callbackUrl.searchParams.set('return', returnPath);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });
    if (error) {
      console.error('[Auth] LinkedIn OIDC OAuth error:', error.message);
      return { error: error.message };
    }
    // Browser will redirect — no return value needed
    return { error: null };
  },

  signOut: async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  },

  getSession: async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) return { data: null, error: error.message };
    return { data: data.session, error: null };
  },
};

// ── Health check ──
export const healthCheck = () => api('/health');

// ── Agent Management API (reads from ai_run_logs + ai_cache tables) ──
export interface RunLogEntry {
  id: string;
  session_id: string | null;
  org_id: string | null;
  prompt_type: string;
  model: string;
  tokens_used: number;
  duration_ms: number;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

export interface AggregateStats {
  totalRuns: number;
  successRuns: number;
  failedRuns: number;
  successRate: number;
  totalTokens: number;
  avgDuration: number;
  activeCacheEntries: number;
  cacheMetricsAvailable?: boolean;
  byType: Record<string, { count: number; tokens: number; avgMs: number; successRate: number }>;
  model: string;
}

export interface CacheStats {
  totalEntries: number;
  activeEntries: number;
  expiredEntries: number;
  totalTokensCached: number;
  entries: Array<{ input_hash: string; model: string; tokens_used: number; expires_at: string; created_at: string }>;
}

export const agentApi = {
  getRunLogs: (params?: { limit?: number; offset?: number; promptType?: string }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', String(params.limit));
    if (params?.offset) qs.set('offset', String(params.offset));
    if (params?.promptType) qs.set('prompt_type', params.promptType);
    const query = qs.toString();
    return api<{ logs: RunLogEntry[]; total: number }>(`/ai/run-logs${query ? `?${query}` : ''}`, { token });
  },

  getAggregateStats: (token?: string) =>
    api<AggregateStats>('/ai/aggregate-stats', { token }),

  getCacheStats: (token?: string) =>
    api<CacheStats>('/ai/cache-stats', { token }),
};

// ── CRM API (reads from clients + crm_contacts Supabase tables) ──
export interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'prospect' | 'churned' | 'onboarding';
  health_score: number;
  contact_email: string;
  contact_name: string;
  revenue: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CRMContact {
  id: string;
  client_id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  is_primary: boolean;
  created_at: string;
}

export const crmApi = {
  listClients: (token?: string) =>
    api<{ clients: Client[] }>('/crm/clients', { token }),

  getClient: (id: string, token?: string) =>
    api<{ client: Client; contacts: CRMContact[] }>(`/crm/clients/${id}`, { token }),

  createClient: (data: Partial<Client>, token?: string) =>
    api<{ client: Client }>('/crm/clients', { method: 'POST', body: data as Record<string, unknown>, token }),

  updateClient: (id: string, data: Partial<Client>, token?: string) =>
    api<{ client: Client }>(`/crm/clients/${id}`, { method: 'PUT', body: data as Record<string, unknown>, token }),

  deleteClient: (id: string, token?: string) =>
    api<{ success: boolean }>(`/crm/clients/${id}`, { method: 'DELETE', token }),

  createContact: (clientId: string, data: Partial<CRMContact>, token?: string) =>
    api<{ contact: CRMContact }>(`/crm/clients/${clientId}/contacts`, { method: 'POST', body: data as Record<string, unknown>, token }),
};

// ── Pipeline API (Phase 7 — CRM Pipeline Kanban) ──
import type {
  Pipeline, PipelineData, Deal, DealDetail, DealCreateInput,
  Interaction, InteractionCreateInput,
} from './types/crm-pipeline';

export type { Pipeline, PipelineData, Deal, DealDetail, DealCreateInput, Interaction, InteractionCreateInput };

export const pipelineApi = {
  listPipelines: (token?: string) =>
    api<{ pipelines: Pipeline[] }>('/crm/pipelines', { token }),

  getPipeline: (id: string, token?: string) =>
    api<PipelineData>(`/crm/pipelines/${id}`, { token }),

  createDeal: (data: DealCreateInput, token?: string) =>
    api<{ deal: Deal }>('/crm/deals', { method: 'POST', body: data as Record<string, unknown>, token }),

  getDeal: (id: string, token?: string) =>
    api<{ deal: DealDetail; contact: any; interactions: Interaction[] }>(`/crm/deals/${id}`, { token }),

  updateDeal: (id: string, updates: Partial<Deal>, token?: string) =>
    api<{ deal: Deal }>(`/crm/deals/${id}`, { method: 'PUT', body: updates as Record<string, unknown>, token }),

  deleteDeal: (id: string, token?: string) =>
    api<{ success: boolean }>(`/crm/deals/${id}`, { method: 'DELETE', token }),

  logInteraction: (data: InteractionCreateInput, token?: string) =>
    api<{ interaction: Interaction }>('/crm/interactions', { method: 'POST', body: data as Record<string, unknown>, token }),

  getInteractions: (dealId: string, token?: string) =>
    api<{ interactions: Interaction[] }>(`/crm/deals/${dealId}/interactions`, { token }),

  listContacts: (token?: string) =>
    api<{ contacts: { id: string; name: string; email: string; client_id: string; role: string }[] }>('/crm/contacts', { token }),
};

// ── Documents API (Phase 8 — Supabase Storage + KV metadata) ──
import type { DocumentMeta, DocumentCategory, ShareLink } from './types/documents';
export type { DocumentMeta, DocumentCategory, ShareLink };

export const documentApi = {
  list: (params?: { category?: string; search?: string }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== 'all') qs.set('category', params.category);
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString();
    return api<{ documents: DocumentMeta[] }>(`/documents${query ? `?${query}` : ''}`, { token });
  },

  get: (id: string, token?: string) =>
    api<{ document: DocumentMeta & { signed_url: string | null } }>(`/documents/${id}`, { token }),

  upload: async (file: File, meta: { name?: string; category?: string; project_id?: string; project_name?: string }, token?: string) => {
    // For file upload, we need to use FormData and handle auth manually
    let activeToken = token;
    if (token && token !== publicAnonKey) {
      const fresh = await getFreshAccessToken();
      activeToken = fresh || publicAnonKey;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (meta.name) formData.append('name', meta.name);
    if (meta.category) formData.append('category', meta.category);
    if (meta.project_id) formData.append('project_id', meta.project_id);
    if (meta.project_name) formData.append('project_name', meta.project_name);

    try {
      const url = `${BASE_URL}/documents/upload`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${activeToken || publicAnonKey}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        return { data: null, error: data?.error || `Upload error: ${response.status}` };
      }
      return { data: data as { document: DocumentMeta }, error: null };
    } catch (err) {
      return { data: null, error: `Upload network error: ${err}` };
    }
  },

  update: (id: string, updates: Partial<DocumentMeta>, token?: string) =>
    api<{ document: DocumentMeta }>(`/documents/${id}`, { method: 'PUT', body: updates as Record<string, unknown>, token }),

  delete: (id: string, token?: string) =>
    api<{ success: boolean }>(`/documents/${id}`, { method: 'DELETE', token }),

  share: (id: string, expiresIn?: number, token?: string) =>
    api<{ share: ShareLink }>(`/documents/${id}/share`, {
      method: 'POST',
      body: expiresIn ? { expires_in: expiresIn } : {},
      token,
    }),

  getStats: (token?: string) =>
    api<{ stats: { total: number; totalSize: number; byCategory: Record<string, number>; byType: Record<string, number>; recentCount: number } }>('/documents/stats', { token }),
};

// ── Workflow API (Phase 11 — Workflow Automation) ──
import type {
  Workflow, WorkflowExecution, WorkflowMetrics, WorkflowCreateInput,
} from './types/workflows';
export type { Workflow, WorkflowExecution, WorkflowMetrics, WorkflowCreateInput };

export const workflowApi = {
  list: (token?: string) =>
    api<{ workflows: Workflow[] }>('/dashboard/workflows', { token }),

  create: (data: WorkflowCreateInput, token?: string) =>
    api<{ workflow: Workflow }>('/dashboard/workflows', { method: 'POST', body: data as Record<string, unknown>, token }),

  update: (id: string, data: Partial<Workflow>, token?: string) =>
    api<{ workflow: Workflow }>('/dashboard/workflows', { method: 'POST', body: { id, ...data } as Record<string, unknown>, token }),

  delete: (id: string, token?: string) =>
    api<{ success: boolean }>(`/dashboard/workflows/${id}`, { method: 'DELETE', token }),

  toggle: (id: string, status: 'enabled' | 'disabled', token?: string) =>
    api<{ workflow: Workflow }>('/dashboard/workflows/toggle', { method: 'POST', body: { id, status }, token }),

  getMetrics: (token?: string) =>
    api<WorkflowMetrics>('/dashboard/workflows/metrics', { token }),

  getExecutions: (workflowId?: string, token?: string) => {
    const qs = workflowId ? `?workflow_id=${workflowId}` : '';
    return api<{ executions: WorkflowExecution[] }>(`/dashboard/workflows/executions${qs}`, { token });
  },

  run: (workflowId: string, dryRun?: boolean, token?: string) =>
    api<{ execution: WorkflowExecution; workflow: Workflow }>('/dashboard/workflows/run', {
      method: 'POST',
      body: { workflow_id: workflowId, dry_run: dryRun || false },
      token,
    }),

  installTemplate: (template: WorkflowCreateInput, token?: string) =>
    api<{ workflow: Workflow }>('/dashboard/workflows/install-template', {
      method: 'POST',
      body: template as Record<string, unknown>,
      token,
    }),
};

// ── Financial API (Phase 13 — Financial Dashboard) ──
import type {
  Invoice, Payment, RevenueMetrics, ProjectProfitability,
  RevenueTrendPoint, RevenueByClient, RevenueByService,
  InvoiceCreateInput, PaymentRecordInput,
} from './types/financial';
export type {
  Invoice, Payment, RevenueMetrics, ProjectProfitability,
  RevenueTrendPoint, RevenueByClient, RevenueByService,
  InvoiceCreateInput, PaymentRecordInput,
};

export const financialApi = {
  getMetrics: (token?: string) =>
    api<RevenueMetrics>('/dashboard/financial/metrics', { token }),

  listInvoices: (params?: { status?: string; search?: string }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.status && params.status !== 'all') qs.set('status', params.status);
    if (params?.search) qs.set('search', params.search);
    const query = qs.toString();
    return api<{ invoices: Invoice[]; total: number }>(`/dashboard/financial/invoices${query ? `?${query}` : ''}`, { token });
  },

  createInvoice: (data: InvoiceCreateInput, token?: string) =>
    api<{ invoice: Invoice }>('/dashboard/financial/invoices', { method: 'POST', body: data as Record<string, unknown>, token }),

  updateInvoice: (id: string, updates: Partial<Invoice>, token?: string) =>
    api<{ invoice: Invoice }>(`/dashboard/financial/invoices/${id}`, { method: 'PUT', body: updates as Record<string, unknown>, token }),

  deleteInvoice: (id: string, token?: string) =>
    api<{ success: boolean }>(`/dashboard/financial/invoices/${id}`, { method: 'DELETE', token }),

  sendReminder: (id: string, token?: string) =>
    api<{ success: boolean; message: string }>(`/dashboard/financial/invoices/${id}/reminder`, { method: 'POST', body: {}, token }),

  recordPayment: (data: PaymentRecordInput, token?: string) =>
    api<{ payment: Payment; invoice: Invoice }>('/dashboard/financial/payments/record', { method: 'POST', body: data as Record<string, unknown>, token }),

  listPayments: (invoiceId?: string, token?: string) => {
    const qs = invoiceId ? `?invoice_id=${invoiceId}` : '';
    return api<{ payments: Payment[] }>(`/dashboard/financial/payments${qs}`, { token });
  },

  getCharts: (token?: string) =>
    api<{ byClient: RevenueByClient[]; byService: RevenueByService[]; trend: RevenueTrendPoint[] }>('/dashboard/financial/charts', { token }),

  getProfitability: (token?: string) =>
    api<{ profitability: ProjectProfitability[] }>('/dashboard/financial/profitability', { token }),
};

// ── Strategy API (Phase 14 — Lean Strategy Engine) ──
import type {
  LeanCanvas, CanvasVersion, StrategyInsight, AutomationOpportunity,
  StrategyRecommendation, StrategyAction, StrategyMetrics,
  StrategyAnalysisResponse, BlockSynthesisResponse, CanvasBlockKey,
  CanvasBlockItem,
} from './types/strategy';
export type {
  LeanCanvas, CanvasVersion, StrategyInsight, AutomationOpportunity,
  StrategyRecommendation, StrategyAction, StrategyMetrics,
  StrategyAnalysisResponse, BlockSynthesisResponse,
};

export const strategyApi = {
  // Canvas CRUD
  getCanvas: (params?: { session_id?: string; project_id?: string }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.session_id) qs.set('session_id', params.session_id);
    if (params?.project_id) qs.set('project_id', params.project_id);
    const query = qs.toString();
    return api<{ canvas: LeanCanvas | null }>(`/strategy/canvas${query ? `?${query}` : ''}`, { token });
  },

  createCanvas: (data: { session_id?: string; project_id?: string }, token?: string) =>
    api<{ canvas: LeanCanvas }>('/strategy/canvas', { method: 'POST', body: data, token }),

  updateCanvasBlocks: (
    id: string,
    blocks: Partial<Record<CanvasBlockKey, CanvasBlockItem[]>>,
    changeSummary?: string,
    token?: string
  ) => api<{ canvas: LeanCanvas; version: CanvasVersion }>(
    `/strategy/canvas/${id}`,
    { method: 'PUT', body: { blocks, change_summary: changeSummary } as Record<string, unknown>, token }
  ),

  getCanvasVersions: (canvasId: string, token?: string) =>
    api<{ versions: CanvasVersion[] }>(`/strategy/canvas/${canvasId}/versions`, { token }),

  // Insights
  listInsights: (params?: { status?: string; type?: string; limit?: number }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set('status', params.status);
    if (params?.type) qs.set('type', params.type);
    if (params?.limit) qs.set('limit', String(params.limit));
    const query = qs.toString();
    return api<{ insights: StrategyInsight[] }>(`/strategy/insights${query ? `?${query}` : ''}`, { token });
  },

  updateInsight: (id: string, updates: { status?: string; action_taken?: string }, token?: string) =>
    api<{ insight: StrategyInsight }>(`/strategy/insights/${id}`, { method: 'PUT', body: updates, token }),

  // Opportunities
  listOpportunities: (token?: string) =>
    api<{ opportunities: AutomationOpportunity[] }>('/strategy/opportunities', { token }),

  updateOpportunity: (id: string, updates: Partial<AutomationOpportunity>, token?: string) =>
    api<{ opportunity: AutomationOpportunity }>(
      `/strategy/opportunities/${id}`,
      { method: 'PUT', body: updates as Record<string, unknown>, token }
    ),

  // Recommendations
  listRecommendations: (params?: { status?: string }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString();
    return api<{ recommendations: StrategyRecommendation[] }>(
      `/strategy/recommendations${query ? `?${query}` : ''}`, { token }
    );
  },

  approveRecommendation: (id: string, approved: boolean, comment?: string, token?: string) =>
    api<{ recommendation: StrategyRecommendation; canvas?: LeanCanvas; version?: CanvasVersion }>(
      `/strategy/recommendations/${id}/approve`,
      { method: 'POST', body: { approved, comment }, token }
    ),

  // Actions (audit log)
  getActions: (params?: { limit?: number }, token?: string) => {
    const qs = new URLSearchParams();
    if (params?.limit) qs.set('limit', String(params.limit));
    const query = qs.toString();
    return api<{ actions: StrategyAction[] }>(`/strategy/actions${query ? `?${query}` : ''}`, { token });
  },

  // Metrics
  getMetrics: (token?: string) =>
    api<StrategyMetrics>('/strategy/metrics', { token }),

  // AI endpoints
  runAnalysis: (canvasId: string, sessionId?: string, token?: string) =>
    api<StrategyAnalysisResponse>('/strategy/analyze', {
      method: 'POST',
      body: { canvas_id: canvasId, session_id: sessionId },
      token,
    }),

  synthesizeBlock: (canvasId: string, block: CanvasBlockKey, context?: string, token?: string) =>
    api<BlockSynthesisResponse>('/strategy/synthesize-block', {
      method: 'POST',
      body: { canvas_id: canvasId, block, context },
      token,
    }),
};

// ── Onboarding API (Task 064 — Onboarding Agent) ──
export interface OnboardingCompleteResponse {
  success: boolean;
  idempotent: boolean;
  client: { id: string };
  project: { id: string; name?: string };
  roadmap: { id: string } | null;
  phases: { id: string }[];
  activity: { id: string } | null;
  summary?: {
    companyName: string;
    industry: string;
    selectedSystems: string[];
    totalWeeks: number;
    totalInvestment: string;
    phaseCount: number;
  };
  durationMs: number;
  message?: string;
}

export interface OnboardingStatusResponse {
  onboarded: boolean;
  project: {
    id: string;
    name: string;
    status: string;
    current_phase: number;
    total_weeks: number;
    created_at: string;
  } | null;
  message?: string;
}

export const onboardingApi = {
  /** Complete onboarding — creates client, project, roadmap, phases, activity */
  complete: (sessionId: string, token?: string) =>
    api<OnboardingCompleteResponse>('/onboarding/complete', {
      method: 'POST',
      body: { sessionId },
      token,
    }),

  /** Check if a wizard session has already been onboarded */
  status: (sessionId: string, token?: string) =>
    api<OnboardingStatusResponse>(`/onboarding/status/${sessionId}`, { token }),
};

// ── Agent Catalog API (Agency Agents feature) ──
export interface AgentRunResponse {
  success: boolean;
  output: string;
  tokens: number;
  durationMs: number;
  model: string;
  cached: boolean;
}

export interface AgentMatchResponse {
  success: boolean;
  matches: {
    slug: string;
    name: string;
    emoji: string;
    division: string;
    role: string;
    fitScore: number;
    reason: string;
    firstTask: string;
  }[];
}

export interface AgentRunHistoryEntry {
  id: string;
  prompt_type: string;
  model: string;
  tokens_used: number;
  duration_ms: number;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

export const agentCatalogApi = {
  /** Execute an agent on a task via Gemini */
  run: (params: {
    slug: string;
    agentName: string;
    task: string;
    context?: string;
    format?: 'structured' | 'freeform' | 'json';
  }, token?: string) =>
    api<AgentRunResponse>('/agents/run', {
      method: 'POST',
      body: params as Record<string, unknown>,
      token,
    }),

  /** Match agents to a client profile */
  match: (params: {
    industry: string;
    goals?: string[];
    companySize?: string;
    systemIds?: string[];
  }, token?: string) =>
    api<AgentMatchResponse>('/agents/match', {
      method: 'POST',
      body: params as Record<string, unknown>,
      token,
    }),

  /** Fetch run history for a specific agent */
  history: (slug: string, limit?: number, token?: string) =>
    api<{ runs: AgentRunHistoryEntry[] }>(
      `/agents/history/${slug}${limit ? `?limit=${limit}` : ''}`,
      { token }
    ),
};
