# 10 — WORKFLOW AUTOMATION DASHBOARD
# Triggers, Logic Chains, Automated Actions, Execution Monitoring

**Component:** `WorkflowAutomationPage`
**File:** `/components/dashboard/workflows/WorkflowAutomationPage.tsx`
**Route:** `/app/workflows`
**ID:** 031-workflow-automation-dashboard
**Diagram ID:** DASH-07
**Status:** NOT STARTED
**Priority:** P2
**Effort:** L (Large)
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** DashboardLayout (025), Auth, activities, projects, tasks, wizard_sessions, ai_run_logs, clients, crm_deals

---

## SCREEN PURPOSE

Visual interface for configuring and monitoring automated workflows that connect wizard outputs to ongoing operations. Workflows like: "When wizard completes -> create project -> create deal -> notify consultant -> schedule onboarding call." Shows active automations, execution logs, and allows building new trigger-to-action chains. This is the operational backbone that transforms a manual agency into an automated one.

Real-world: "A client completes the wizard at 3:47 PM. The 'Wizard Complete -> Project Setup' workflow fires: reads wizard_answers, creates a project, generates roadmap phases from Step 5 AI output, creates tasks, inserts a CRM deal, and logs an activity. The consultant gets a notification. The entire sequence takes 4 seconds instead of 25 minutes of manual data entry."

---

## TARGET USERS

- Agency owner setting up business automations and reviewing execution health
- Operations manager managing day-to-day processes and debugging failures
- Consultants who benefit from automated notifications and project scaffolding

---

## CORE FEATURES

1. **Active workflows list** — Table with name, trigger type, status toggle (enabled/disabled/error), last run time, success rate, total runs, quick-action buttons (edit, test, delete)
2. **Workflow builder** — Visual trigger -> condition -> action chain editor with draggable blocks, snap-together vertical layout
3. **Execution log** — Per-workflow log: last 50 runs with timestamp, duration, status badge (success/fail/skipped), trigger data, expandable error details
4. **Pre-built templates** — 5 starters: "Wizard Complete -> Project Setup", "Deal Stage Change -> Notify", "Milestone Due -> Alert", "Weekly Report", "Lead Qualification"
5. **Workflow metrics** — 4-card row: runs today, success rate, avg execution time, active workflows count
6. **Manual trigger and testing** — "Run Now" per workflow with optional dry-run mode
7. **AI suggestions** — Analyzes activities table for repeated manual patterns, proposes automations
8. **Natural language input** — Text input parses "notify me when any deal is stale for 7 days" into trigger-condition-action blocks

---

## BUILT-IN TEMPLATES

| Template | Trigger | Actions | Setup Time |
|----------|---------|---------|------------|
| Wizard Complete -> Project Setup | wizard_sessions.completed_at | Insert project, generate roadmap phases, create tasks, insert CRM deal, log activity | ~5 min |
| Deal Stage Change -> Notify | crm_deals.stage_id update | Send notification to deal owner, log interaction | ~2 min |
| Milestone Due -> Alert | Cron daily 9am | Email project owner for milestones due within 3 days, insert activity | ~2 min |
| Weekly Report | Cron Sunday 9am | Aggregate activities, AI logs, wizard sessions, payments; generate summary | ~5 min |
| Lead Qualification | New wizard_sessions row | Score based on Step 1 answers, route high-value leads to senior consultant | ~3 min |

---

## ASCII WIREFRAME — Desktop (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  Workflow Automation                                         │
│  240px      ├──────────────────────────────────────────────────────────────┤
│             │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────────┐ │
│  ☀ AMO AI   │  │ Runs Today │ │ Success %  │ │ Avg Time   │ │ Active   │ │
│             │  │     23     │ │   96.5%    │ │   4.2s     │ │  5 / 7   │ │
│  ──────────│  │   ▲ +8     │ │   ▲ +2.1%  │ │   ▼ +0.3s  │ │          │ │
│  ○ Dashboard│  └────────────┘ └────────────┘ └────────────┘ └──────────┘ │
│  ○ Projects │                                                              │
│  ○ CRM      │  [Active Workflows] [Templates] [Exec Log] [AI Suggestions] │
│  ○ Insights │  ═══════════════════                                        │
│  ○ Documents│                                                              │
│  ● Workflows│  ┌──────────────────────────────────────────────────────┐    │
│  ○ Financial│  │ Name             │ Trigger       │Status│Last Run│ % │    │
│  ○ Agents   │  ├──────────────────┼───────────────┼──────┼────────┼──┤    │
│  ○ Settings │  │ Wizard → Project │ wiz_done      │ ●ON  │ 2m ago │98│    │
│             │  │ Deal → Notify    │ stage_chg     │ ●ON  │ 1h ago │95│    │
│             │  │ Milestone Alert  │ cron_daily    │ ●ON  │ 9am    │100   │
│             │  │ Weekly Report    │ cron_weekly   │ ●ON  │ Sun 9am│100   │
│             │  │ Lead Qualifier   │ wiz_new       │ ○OFF │ —      │ — │    │
│             │  │ Actions: [Edit] [Run Now] [Delete]                  │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │  [+ New Workflow]                                            │
│             │                                                              │
│             │  ── WORKFLOW BUILDER (opens on create/edit) ──────────────  │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ Name: [Wizard Complete → Project Setup          ]    │    │
│             │  │                                                      │    │
│             │  │ ┌ TRIGGER ─────────────────────────────────────┐     │    │
│             │  │ │ Event: [wizard_completed ▾]                  │     │    │
│             │  │ │ Source: wizard_sessions                      │     │    │
│             │  │ │ Field:  completed_at IS NOT NULL             │     │    │
│             │  │ └─────────────────────────────────────────────┘     │    │
│             │  │         │                                           │    │
│             │  │         ▼                                           │    │
│             │  │ ┌ CONDITION (optional) ──────────────────────┐      │    │
│             │  │ │ Field: [status] Op: [equals] Val: [complete]     │    │
│             │  │ └───────────────────────────────────────────┘      │    │
│             │  │         │                                           │    │
│             │  │         ▼                                           │    │
│             │  │ ┌ ACTION 1 ─────────────────────────────────┐      │    │
│             │  │ │ Type: [create_project ▾]                   │      │    │
│             │  │ │ Target: projects                           │      │    │
│             │  │ │ name ← wizard_answers.ai_results.company   │      │    │
│             │  │ └───────────────────────────────────────────┘      │    │
│             │  │         │                                           │    │
│             │  │         ▼                                           │    │
│             │  │ ┌ ACTION 2 ─────────────────────────────────┐      │    │
│             │  │ │ Type: [create_deal ▾]                      │      │    │
│             │  │ │ Target: crm_deals                          │      │    │
│             │  │ │ value ← investment_tier                    │      │    │
│             │  │ └───────────────────────────────────────────┘      │    │
│             │  │         │                                           │    │
│             │  │ [+ Add Action]                                      │    │
│             │  │                                                      │    │
│             │  │ [Save & Enable] [☐ Dry Run ▶] [Cancel]              │    │
│             │  └──────────────────────────────────────────────────────┘    │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## TYPESCRIPT INTERFACES

```ts
type TriggerType = 'wizard_completed' | 'deal_stage_changed' | 'milestone_approaching' | 'cron_schedule' | 'manual_trigger';
type ActionType = 'create_project' | 'create_deal' | 'send_notification' | 'log_activity' | 'generate_document' | 'update_record';
type ConditionOperator = 'equals' | 'contains' | 'greater_than' | 'is_not_null';
type WorkflowStatus = 'enabled' | 'disabled' | 'error';

interface Workflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  status: WorkflowStatus;
  last_run_at: string | null;
  success_count: number;
  fail_count: number;
  created_at: string;
}

interface WorkflowExecution {
  id: string;
  workflow_id: string;
  workflow_name: string;
  status: 'success' | 'failed' | 'skipped';
  duration_ms: number;
  trigger_data: Record<string, unknown>;
  action_results: { action_type: string; success: boolean; detail: string }[];
  error_message: string | null;
  created_at: string;
}

interface WorkflowMetrics {
  runs_today: number;
  runs_today_trend: number;
  success_rate: number;
  success_rate_trend: number;
  avg_execution_ms: number;
  active_count: number;
  total_count: number;
}

interface AISuggestion {
  id: string;
  description: string;
  confidence: number;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  pattern_source: string;
}
```

---

## HOOKS

useWorkflows(): workflows[], toggle(), remove(), refetch()
useWorkflowBuilder(workflowId?): workflow state, setTrigger(), addCondition(), addAction(), reorderActions(), save(), validation
useWorkflowExecutions(workflowId?): executions[], runNow(id, dryRun), retry(executionId)
useWorkflowMetrics(): metrics, loading
useAISuggestions(): suggestions[], parseNaturalLanguage(input)

---

## BACKEND WIRING

### Edge Function Routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /dashboard/workflows | List all workflow definitions |
| POST | /dashboard/workflows | Create or update a workflow |
| DELETE | /dashboard/workflows/:id | Delete a workflow |
| POST | /dashboard/workflows/toggle | Enable/disable |
| GET | /dashboard/workflows/metrics | Aggregate execution metrics |
| POST | /dashboard/workflows/executions | List executions, optionally filtered |
| POST | /dashboard/workflows/run | Execute immediately (with dry-run option) |
| POST | /dashboard/workflows/retry | Retry failed execution |
| GET | /dashboard/workflows/suggestions | AI-generated suggestions |
| POST | /dashboard/workflows/parse-nl | Parse natural language into blocks |

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No workflows configured | Empty state with link to templates tab |
| Condition fails | Execution logged as "skipped" with reason |
| Action fails mid-chain | Committed actions kept, failed logged, remaining skipped |
| Dry-run | Simulated — returns what would happen without DB commits |
| Cron with no matching data | Logged as "skipped: no matching records" |
| NL input cannot parse | `confidence: 0`, helpful error message |
| Circular workflow trigger | Max depth of 3 enforced |
| Non-admin access | "You need admin access to manage workflows" |

---

## ACCEPTANCE CRITERIA

- Active workflows list with name, trigger, status toggle, last run, success rate
- Workflow builder with visual trigger -> condition -> action chains
- 5 trigger types: wizard_completed, deal_stage_changed, milestone_approaching, cron_schedule, manual_trigger
- 6 action types: create_project, create_deal, send_notification, log_activity, generate_document, update_record
- Condition blocks support equals, contains, greater_than, is_not_null
- Execution log: last 50 runs per workflow with status and error details
- 5 pre-built templates installable with one click
- Manual trigger with dry-run option
- Metrics row: runs today, success rate, avg time, active count
- AI suggestion panel with natural language input
- All executions logged to ai_run_logs
- Design system: #F5F5F0 bg, #1A1A1A text, #00875A accents, Georgia headings, 1200px max-width
