---
id: 031-workflow-automation-dashboard
diagram_id: DASH-07
prd_section: Dashboard
title: AI workflow automation dashboard — triggers, logic chains, and automated actions
skill: frontend
phase: MEDIUM
priority: P2
status: Not Started
owner: Frontend
dependencies:
  - 025-dashboard-overview
estimated_effort: L
percent_complete: 0
area: agency-dashboard
wizard_step: null
schema_tables: [activities, projects, tasks, wizard_sessions, ai_run_logs, clients, crm_deals]
figma_prompt: prompts/031-workflow-automation-dashboard.md
---

# 031 — AI Workflow Automation Dashboard

## Summary Table

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **ID**           | 031-workflow-automation-dashboard                                     |
| **Diagram ID**   | DASH-07                                                               |
| **Section**      | Dashboard                                                             |
| **Phase**        | MEDIUM                                                                |
| **Priority**     | P2                                                                    |
| **Effort**       | L (Large)                                                             |
| **Owner**        | Frontend                                                              |
| **Dependencies** | 025-dashboard-overview                                                |
| **Schema**       | activities, projects, tasks, wizard_sessions, ai_run_logs, clients, crm_deals |
| **Wizard Step**  | None (post-wizard operational tooling)                                |

---

## Description

**Situation.** The agency runs dozens of repetitive operational tasks every week — creating projects after wizard completions, moving CRM deals forward, notifying consultants about milestones, generating weekly reports. Every one of these tasks involves the same sequence: an event happens, a condition is checked, and an action is taken. Today each of these is performed manually, creating delay, inconsistency, and forgotten follow-ups.

**Why it matters.** A growing agency cannot scale on manual processes. Every missed notification is a delayed onboarding. Every forgotten milestone email is a client wondering what happened. Workflow automation turns the agency's data (wizard outputs, CRM changes, milestone dates) into a self-running operational engine. The difference between a 5-person agency and a 50-person one is the automation layer.

**What exists.** The database already captures the events that should trigger workflows: `wizard_sessions.completed_at`, `crm_deals` stage changes, `milestones.due_date`, `activities` logs. What is missing is the automation layer that connects these triggers to actions, and a visual interface for building, monitoring, and debugging those connections.

**The build.** A dashboard with three zones: (1) an active workflows list showing all configured automations with their status, last run, and success rate; (2) a workflow builder allowing trigger-condition-action chain construction from pre-built blocks; (3) an execution log showing every run with success/failure details and duration. Pre-built templates cover the most common patterns: post-wizard project setup, deal stage notifications, milestone alerts, and weekly reporting.

**Example.** A client completes the wizard at 3:47 PM. The "Wizard Complete -> Project Setup" workflow fires: it reads the wizard_answers, creates a project record, generates roadmap_phases from the Step 5 AI output, creates initial tasks, inserts a CRM deal, and logs an activity. The consultant gets a Slack notification. The entire sequence takes 4 seconds instead of 25 minutes of manual data entry. The operations team sees the green checkmark in the execution log.

---

## User Stories

- As an **agency owner**, I want to define automated workflows so that repetitive operations happen instantly and consistently without manual intervention.
- As an **operations manager**, I want to see all active workflows and their execution history so I can identify failures and fix them before they impact clients.
- As a **consultant**, I want to receive automated notifications when wizard sessions complete, milestones approach, or deal stages change so I never miss a client touchpoint.
- As an **agency owner**, I want pre-built workflow templates so I can get started quickly without building every automation from scratch.
- As an **operations manager**, I want to test workflows manually before enabling them so I can verify they work correctly.
- As an **agency owner**, I want AI to suggest new workflows based on my usage patterns so I can automate processes I did not think to automate.

---

## Goals & Acceptance Criteria

- [ ] Active workflows list displays all configured automations with name, trigger type, status (enabled/disabled/error), last run timestamp, success rate percentage, and run count
- [ ] Workflow builder allows constructing trigger -> condition -> action chains from a visual block interface with drag-and-drop ordering
- [ ] At least 5 trigger types are available: wizard_completed, deal_stage_changed, milestone_approaching, cron_schedule, manual_trigger
- [ ] At least 6 action types are available: create_project, create_deal, send_notification, log_activity, generate_document, update_record
- [ ] Condition blocks support field comparisons (equals, contains, greater_than, is_not_null) on any schema table field
- [ ] Execution log shows the last 50 runs per workflow with timestamp, duration, success/failure status, and error details for failures
- [ ] Pre-built templates are available: "Wizard Complete -> Project Setup", "Deal Stage Change -> Notify", "Milestone Due -> Alert", "Weekly Report", "Lead Qualification"
- [ ] Templates can be installed with one click and customized after installation
- [ ] Manual trigger button allows test execution of any workflow with a dry-run option
- [ ] Workflow metrics panel shows: runs today, overall success rate, average execution time, and active workflow count
- [ ] Enable/disable toggle per workflow with confirmation dialog
- [ ] Error state workflows display the error message and a "retry" button
- [ ] AI suggestion panel proposes new workflows based on repeated manual actions in the activities table
- [ ] Natural language workflow input parses a sentence like "notify me when any deal is stale for 7 days" into a trigger-condition-action chain
- [ ] All workflow executions are logged to `ai_run_logs` with the workflow ID, input data, output data, and duration
- [ ] Page follows design system: #F1EEEA background, #0A211F text, #84CC16 accents, Playfair Display headings, Lora body, 1200px max-width, card-based layout, no shadows, no gradients

---

## Wiring Plan

| Data need                        | Source table(s)                  | Query / logic                                                                                      |
| -------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Workflow definitions             | New: `workflows` or JSON config  | Load all workflow configs with status, trigger type, last_run, success_count, fail_count            |
| Execution history                | `ai_run_logs`                    | `SELECT * FROM ai_run_logs WHERE context->>'workflow_id' = ? ORDER BY created_at DESC LIMIT 50`    |
| Wizard completion trigger        | `wizard_sessions`                | Subscribe to `completed_at` changes or poll for `completed_at IS NOT NULL AND processed = false`   |
| Deal stage change trigger        | `crm_deals`                      | Subscribe to `stage_id` updates via Supabase realtime or poll for recent changes                   |
| Milestone approaching trigger    | `milestones`                     | `SELECT * FROM milestones WHERE due_date BETWEEN now() AND now() + interval '3 days'`              |
| Project creation action          | `projects`                       | `INSERT INTO projects (name, client_id, status, ...) VALUES (...)`                                 |
| Deal creation action             | `crm_deals`                      | `INSERT INTO crm_deals (title, client_id, value, stage_id, ...) VALUES (...)`                      |
| Activity logging action          | `activities`                     | `INSERT INTO activities (type, description, entity_type, entity_id, ...) VALUES (...)`             |
| Workflow metrics                 | `ai_run_logs`                    | Aggregate by workflow_id: count today, success rate, avg duration                                  |
| AI workflow suggestions          | `activities`                     | Analyze repeated manual action patterns to suggest automatable sequences                           |

---

## Screen Purpose

Visual interface for configuring and monitoring automated workflows that connect wizard outputs to ongoing operations. Workflows like: "When wizard completes -> create project -> create deal -> notify consultant -> schedule onboarding call". Shows active automations, execution logs, and allows building new trigger-to-action chains. This is the operational backbone that transforms a manual agency into an automated one.

---

## Target User

Agency operations team managing day-to-day processes. Agency owner setting up business automations and reviewing execution health. Consultants who benefit from automated notifications and project scaffolding but do not build workflows themselves.

---

## Core Features

1. **Active workflows list** — Table showing all configured workflows with name, trigger type, status toggle (enabled/disabled/error), last run time, success rate, total runs, and quick-action buttons (edit, test, delete).
2. **Workflow builder** — Visual trigger -> condition -> action chain editor. Each block is a card with configuration fields. Drag to reorder. Add branches for conditional logic. Blocks snap together vertically.
3. **Execution log** — Per-workflow log showing last 50 runs with timestamp, duration (ms), status badge (success/fail/skipped), trigger data summary, and expandable error details for failures.
4. **Pre-built templates** — Five starter workflows: "Wizard Complete -> Project Setup" (creates project + roadmap + tasks + deal from wizard data), "Deal Stage Change -> Notify" (sends notification on CRM stage transition), "Milestone Due -> Alert" (emails and logs activity 3 days before due), "Weekly Report" (cron aggregation of activities and AI logs), "Lead Qualification" (scores new wizard sessions and routes to appropriate consultant).
5. **Workflow metrics** — Top-level stats: runs today, overall success rate, average execution time, active workflows count. Displayed in a 4-card metrics row.
6. **Manual trigger and testing** — "Run Now" button per workflow that executes immediately with optional dry-run mode showing what would happen without committing changes.

**Built-in workflow template details:**

- **Wizard Complete -> Project Setup**: Trigger: `wizard_sessions.completed_at IS NOT NULL`. Actions: insert into `projects`, generate `roadmap_phases` from Step 5 AI output, create initial `tasks`, insert `crm_deals` with value from investment tier, log to `activities`.
- **Deal Stage Change -> Notify**: Trigger: `crm_deals.stage_id` update. Condition: new stage differs from old. Actions: send notification to deal owner, log interaction in `crm_interactions`.
- **Milestone Due -> Alert**: Trigger: cron daily 9am. Condition: `milestones.due_date` within 3 days. Actions: email project owner, insert `activities` record.
- **Weekly Report**: Trigger: cron Sunday 9am. Actions: aggregate `activities` count by type, aggregate `ai_run_logs` by agent, count new `wizard_sessions`, sum `payments` received, generate summary, deliver via email/notification.
- **Lead Qualification**: Trigger: new `wizard_sessions` row inserted. Actions: score based on Step 1 answers (company size, revenue), route high-value leads to senior consultant, log to `activities`.

---

## Data Displayed

- **Workflow list**: Name, trigger type icon, status badge, last run (relative time), success rate (%), total runs count, created date
- **Execution log**: Run ID, timestamp, duration (ms), status (success/fail/skipped), trigger event summary, action results summary, error message (if failed)
- **Metrics row**: Runs today (number + trend), success rate (percentage + trend), avg execution time (ms), active workflows (count / total)
- **Template gallery**: Template name, description, trigger type, number of actions, estimated setup time, "Install" button
- **Builder blocks**: Trigger block (event type, source table, field conditions), condition block (field, operator, value), action block (action type, target table, field mappings)

---

## UI Components

| Component               | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `WorkflowList`           | Table of all workflows with inline status toggle and action buttons         |
| `WorkflowBuilder`        | Visual chain editor with draggable trigger/condition/action blocks          |
| `TriggerBlock`           | Configurable trigger card (event type selector, source table, field filter) |
| `ConditionBlock`         | Conditional logic card (field, operator, value dropdowns)                   |
| `ActionBlock`            | Action card (action type, target table, field mapping form)                 |
| `ExecutionLog`           | Scrollable log table with expandable rows for error details                 |
| `WorkflowMetricsRow`     | 4-card horizontal metrics strip                                            |
| `TemplateGallery`        | Grid of template cards with install buttons                                 |
| `ManualTriggerButton`    | "Run Now" button with dry-run checkbox                                      |
| `WorkflowStatusBadge`    | Color-coded badge: green (enabled), gray (disabled), red (error)            |
| `AISuggestionPanel`      | Sidebar panel showing AI-proposed workflows with "Create" action            |
| `NaturalLanguageInput`   | Text input that parses workflow descriptions into builder blocks            |

---

## Layout Structure

```
+---------------------------------------------------------------+
| Sidebar (240px)  |  Main Content                              |
|                  |  +----------------------------------------+ |
|  [Navigation]    |  | Metrics Row (4 cards)                  | |
|                  |  | Runs Today | Success % | Avg Time | Active |
|                  |  +----------------------------------------+ |
|                  |  +----------------------------------------+ |
|                  |  | Tabs: [Active Workflows] [Templates]   | |
|                  |  |       [Execution Log] [AI Suggestions] | |
|                  |  +----------------------------------------+ |
|                  |  +----------------------------------------+ |
|                  |  | Active Workflows Tab:                  | |
|                  |  | +------------------------------------+ | |
|                  |  | | Workflow Row: Name | Trigger | Status| |
|                  |  | |   Last Run | Success Rate | Actions| | |
|                  |  | +------------------------------------+ | |
|                  |  | | Workflow Row ...                    | | |
|                  |  | +------------------------------------+ | |
|                  |  +----------------------------------------+ |
|                  |  | [+ New Workflow] button                 | |
|                  |  +----------------------------------------+ |
+---------------------------------------------------------------+
```

- **Sidebar**: 240px, standard dashboard navigation
- **Main content**: Fills remaining width, max-width 1200px, centered
- **Metrics row**: 4 equal-width cards at top
- **Tab bar**: Switches between Active Workflows, Templates, Execution Log, AI Suggestions
- **Workflow builder**: Opens as a full-width panel below the tab bar when creating/editing
- **Background**: #F1EEEA, cards #FFFFFF, borders #D4CFC8

---

## Interaction Patterns

- **Toggle workflow**: Click enable/disable switch -> confirmation dialog -> status updates in real time
- **Edit workflow**: Click edit button -> workflow builder opens below with existing blocks loaded
- **Install template**: Click "Install" on template card -> pre-populated builder opens for review -> "Save & Enable" to activate
- **Manual test**: Click "Run Now" -> optional dry-run checkbox -> execution runs -> result toast notification
- **View execution details**: Click log row -> expands to show full trigger data, each action's result, and error stack trace if failed
- **Natural language input**: Type sentence -> AI parses into blocks -> blocks appear in builder for review -> user adjusts and saves
- **AI suggestion**: Panel shows suggested workflow -> click "Create" -> builder opens with suggested blocks pre-loaded

---

## Example User Workflows

**Workflow 1: Setting up post-wizard automation**
1. Agency owner opens Workflow Automation dashboard
2. Clicks "Templates" tab
3. Finds "Wizard Complete -> Project Setup" template
4. Clicks "Install" -> builder opens with pre-configured blocks
5. Reviews trigger (wizard completed), actions (create project, create roadmap phases, create deal)
6. Adjusts the deal value mapping to use investment_tier from Step 3
7. Clicks "Save & Enable"
8. Tests with "Run Now" using a completed wizard session
9. Sees green success in execution log

**Workflow 2: Debugging a failed workflow**
1. Operations manager sees red error badge on "Milestone Due -> Alert" workflow
2. Clicks "Execution Log" tab, filters to that workflow
3. Sees last 3 runs failed
4. Expands failed row -> error: "Email service timeout"
5. Checks the action configuration, updates email provider settings
6. Clicks "Retry" on the failed run -> success
7. Re-enables the workflow

**Workflow 3: AI-suggested workflow**
1. Owner opens "AI Suggestions" tab
2. AI has detected that every time a deal moves to "Proposal Sent", the owner manually creates a document
3. Suggestion: "Auto-generate proposal document when deal reaches Proposal Sent stage"
4. Owner clicks "Create" -> builder opens with trigger (deal stage = Proposal Sent) and action (generate document from wizard data)
5. Owner saves and enables

---

## AI Features

1. **Workflow suggestions** — Analyzes the `activities` table for repeated manual action sequences and proposes automations that would replace them. Surfaces in the AI Suggestions tab with confidence scores.
2. **Natural language creation** — Text input accepts plain English like "notify me when any deal is stale for 7 days" and parses it into a trigger (cron daily), condition (deal last_updated > 7 days ago), action (send notification) chain.
3. **Auto-fix failed workflows** — When a workflow fails, AI analyzes the error and suggests a fix (e.g., "The email action timed out. Consider adding a retry with 30s delay.").
4. **Execution optimization** — AI identifies workflows that could be batched or reordered for efficiency.

---

## Data Sources

| Source Table       | Data Used                                                        |
| ------------------ | ---------------------------------------------------------------- |
| `activities`       | All platform events, used for AI pattern detection and logging   |
| `projects`         | Created by workflows, used as action targets                     |
| `tasks`            | Created as part of project setup workflows                       |
| `wizard_sessions`  | Trigger source for wizard completion events                      |
| `ai_run_logs`      | Execution history for all workflow runs                          |
| `clients`          | Referenced in workflow actions (project/deal creation)           |
| `crm_deals`        | Trigger source for stage changes, action target for deal creation|
| `milestones`       | Trigger source for approaching due dates                         |
| `roadmap_phases`   | Created by post-wizard workflows from Step 5 AI output           |

---

## Automation Opportunities

- **Self-healing workflows**: When a workflow fails due to a transient error (timeout, rate limit), automatically retry with exponential backoff before marking as failed.
- **Workflow chaining**: Output of one workflow triggers another (e.g., "Project Created" from workflow A triggers "Assign Consultant" workflow B).
- **Scheduled digest**: Instead of individual notifications, batch workflow results into a daily digest email for the operations team.
- **Version control**: Track workflow definition changes over time so configurations can be rolled back.
- **Usage-based archival**: Auto-disable workflows that have not run in 30 days with a notification to the owner.

---

## Visual Hierarchy

1. **Primary focus**: Metrics row at top — immediate operational health at a glance (runs today, success rate)
2. **Secondary focus**: Active workflows list — the main working area where users manage their automations
3. **Tertiary focus**: Execution log — drill-down detail for debugging and verification
4. **Supporting elements**: Template gallery and AI suggestions — discovery and expansion of automation coverage
5. **Typography**: Playfair Display for "Workflow Automation" page heading and section titles, Lora for all body text, descriptions, and log entries
6. **Color coding**: #84CC16 for success states and enabled toggles, #0A211F for primary text, red (#DC2626) for error states, #D4CFC8 for borders and dividers
7. **Density**: Medium density — workflows need enough detail to be useful at a glance but not so much that the list becomes overwhelming

---

## Frontend Wiring

### Component Tree

```
<WorkflowAutomationPage>                       ← route: /app/workflows
  <WorkflowMetricsRow>
    <MetricCard label="Runs Today" />
    <MetricCard label="Success Rate" />
    <MetricCard label="Avg Execution" />
    <MetricCard label="Active Workflows" />
  </WorkflowMetricsRow>
  <Tabs defaultValue="active">
    <TabsList>
      <TabsTrigger value="active" />           ← Active Workflows
      <TabsTrigger value="templates" />        ← Templates
      <TabsTrigger value="log" />              ← Execution Log
      <TabsTrigger value="suggestions" />      ← AI Suggestions
    </TabsList>
    <TabsContent value="active">
      <WorkflowList>
        <WorkflowRow />                        ← one per workflow, inline toggle
        <WorkflowRow />
      </WorkflowList>
      <Button>[+ New Workflow]</Button>
    </TabsContent>
    <TabsContent value="templates">
      <TemplateGallery>
        <TemplateCard />                       ← one per template (5 built-in)
      </TemplateGallery>
    </TabsContent>
    <TabsContent value="log">
      <ExecutionLog>
        <ExecutionRow />                       ← expandable for error details
      </ExecutionLog>
    </TabsContent>
    <TabsContent value="suggestions">
      <AISuggestionPanel>
        <SuggestionCard />                     ← AI-proposed workflow
      </AISuggestionPanel>
      <NaturalLanguageInput />                 ← text input for NL workflow creation
    </TabsContent>
  </Tabs>
  <WorkflowBuilder />                          ← full-width panel, opens on create/edit
    <TriggerBlock />
    <ConditionBlock />                         ← optional, repeatable
    <ActionBlock />                            ← repeatable
    <ManualTriggerButton />                    ← "Run Now" with dry-run option
  </WorkflowBuilder>
</WorkflowAutomationPage>
```

### TypeScript Interfaces

```ts
// src/lib/types/workflow.ts

type TriggerType = 'wizard_completed' | 'deal_stage_changed' | 'milestone_approaching' | 'cron_schedule' | 'manual_trigger';
type ActionType = 'create_project' | 'create_deal' | 'send_notification' | 'log_activity' | 'generate_document' | 'update_record';
type ConditionOperator = 'equals' | 'contains' | 'greater_than' | 'is_not_null';
type WorkflowStatus = 'enabled' | 'disabled' | 'error';

interface WorkflowTrigger {
  type: TriggerType;
  source_table: string;
  field: string;
  config: Record<string, unknown>;             // e.g., { cron: "0 9 * * 0" } for weekly
}

interface WorkflowCondition {
  field: string;
  operator: ConditionOperator;
  value: string | number | boolean;
}

interface WorkflowAction {
  type: ActionType;
  target_table: string;
  field_mappings: Record<string, string>;      // { target_col: "source_expression" }
  config: Record<string, unknown>;
}

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
  created_by: string;
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

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  estimated_setup_minutes: number;
  action_count: number;
}

interface WorkflowMetrics {
  runs_today: number;
  runs_today_trend: number;                    // % change vs yesterday
  success_rate: number;
  success_rate_trend: number;
  avg_execution_ms: number;
  active_count: number;
  total_count: number;
}

interface AISuggestion {
  id: string;
  description: string;
  confidence: number;                          // 0-100
  trigger: WorkflowTrigger;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  pattern_source: string;                      // e.g., "Detected 14 manual 'create_project' activities in last 30 days"
}
```

### Custom Hooks

```ts
// src/lib/hooks/useWorkflows.ts
function useWorkflows(): {
  workflows: Workflow[];
  loading: boolean;
  error: string | null;
  toggle: (id: string, enabled: boolean) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

// src/lib/hooks/useWorkflowBuilder.ts
function useWorkflowBuilder(workflowId?: string): {
  workflow: Partial<Workflow>;
  setTrigger: (trigger: WorkflowTrigger) => void;
  addCondition: (condition: WorkflowCondition) => void;
  removeCondition: (index: number) => void;
  addAction: (action: WorkflowAction) => void;
  removeAction: (index: number) => void;
  reorderActions: (fromIndex: number, toIndex: number) => void;
  save: () => Promise<{ id: string }>;
  isDirty: boolean;
  validation: { valid: boolean; errors: string[] };
}

// src/lib/hooks/useWorkflowExecutions.ts
function useWorkflowExecutions(workflowId?: string): {
  executions: WorkflowExecution[];
  loading: boolean;
  error: string | null;
  runNow: (workflowId: string, dryRun: boolean) => Promise<WorkflowExecution>;
  retry: (executionId: string) => Promise<void>;
}

// src/lib/hooks/useWorkflowMetrics.ts
function useWorkflowMetrics(): {
  metrics: WorkflowMetrics | null;
  loading: boolean;
}

// src/lib/hooks/useAISuggestions.ts
function useAISuggestions(): {
  suggestions: AISuggestion[];
  loading: boolean;
  parseNaturalLanguage: (input: string) => Promise<Partial<Workflow>>;
}
```

### State Management

| State | Location | Reason |
|-------|----------|--------|
| Active tab | `WorkflowAutomationPage` useState (synced to URL hash) | Persists tab on refresh |
| Workflow list | `useWorkflows` hook (useState) | Fetched on mount, refetched after save/toggle |
| Builder open/closed | `WorkflowAutomationPage` useState | Controls builder panel visibility |
| Builder workflow state | `useWorkflowBuilder` hook (useReducer) | Complex nested state with trigger/conditions/actions |
| Selected workflow for editing | `WorkflowAutomationPage` useState (id or null) | Passed to builder hook |
| Execution log filter (by workflow) | `ExecutionLog` local useState | Filter execution list |
| Dry-run checkbox | `ManualTriggerButton` local useState | Toggle for test mode |
| NL input text | `NaturalLanguageInput` local useState | Controlled input |
| Drag state for builder blocks | `WorkflowBuilder` local useState (drag source/target) | Reorder actions |

### Data Fetching Pattern

```
WorkflowAutomationPage mounts
  → useWorkflows()
      → api<Workflow[]>('/dashboard/workflows', { method: 'GET' })

  → useWorkflowMetrics()
      → api<WorkflowMetrics>('/dashboard/workflows/metrics', { method: 'GET' })

  Tab: "log" active
    → useWorkflowExecutions(workflowId?)
        → api<WorkflowExecution[]>('/dashboard/workflows/executions', { method: 'POST', body: { workflow_id } })

  Tab: "suggestions" active
    → useAISuggestions()
        → api<AISuggestion[]>('/dashboard/workflows/suggestions', { method: 'GET' })

  Toggle workflow enabled/disabled
    → api('/dashboard/workflows/toggle', { method: 'POST', body: { id, enabled } })
    → refetch workflows

  Save workflow (new or edit)
    → api('/dashboard/workflows', { method: 'POST', body: workflow })
    → refetch workflows

  "Run Now" button
    → api<WorkflowExecution>('/dashboard/workflows/run', { method: 'POST', body: { workflow_id, dry_run } })

  NL input submit
    → api<Partial<Workflow>>('/dashboard/workflows/parse-nl', { method: 'POST', body: { input } })
    → populate builder with parsed blocks
```

### Component Communication

- **Props down**: `WorkflowAutomationPage` passes `workflows` to `WorkflowList`, `metrics` to `WorkflowMetricsRow`, `templates` (hardcoded constant) to `TemplateGallery`
- **Callbacks up**: `WorkflowRow` fires `onToggle(id, enabled)` and `onEdit(id)` and `onDelete(id)`; `TemplateCard` fires `onInstall(template)` which opens builder with pre-populated data; `SuggestionCard` fires `onCreate(suggestion)` which opens builder
- **Builder panel**: `WorkflowAutomationPage` holds `builderOpen` and `editingWorkflowId` state; when builder saves, it fires `onSave` which calls `refetch()` and closes builder
- **Execution log filtering**: `ExecutionLog` receives optional `workflowId` prop; when user clicks "View Logs" on a workflow row, the parent switches to log tab with that workflow pre-filtered
- **NL input to builder**: `NaturalLanguageInput` fires `onParsed(partialWorkflow)` which loads the parsed trigger/conditions/actions into the builder via `useWorkflowBuilder`

---

## Backend Wiring

### New Edge Function Routes

| Method | Route | Handler | Request Body | Response Shape |
|--------|-------|---------|-------------|----------------|
| GET | `/dashboard/workflows` | List all workflow definitions | — | `Workflow[]` |
| POST | `/dashboard/workflows` | Create or update a workflow | `Partial<Workflow>` (full definition) | `{ id: string, created: boolean }` |
| DELETE | `/dashboard/workflows/:id` | Delete a workflow | — | `{ success: boolean }` |
| POST | `/dashboard/workflows/toggle` | Enable or disable a workflow | `{ id: string, enabled: boolean }` | `{ success: boolean }` |
| GET | `/dashboard/workflows/metrics` | Aggregate workflow execution metrics | — | `WorkflowMetrics` |
| POST | `/dashboard/workflows/executions` | List executions, optionally filtered | `{ workflow_id?: string, limit?: number }` | `WorkflowExecution[]` |
| POST | `/dashboard/workflows/run` | Execute a workflow immediately | `{ workflow_id: string, dry_run: boolean }` | `WorkflowExecution` |
| POST | `/dashboard/workflows/retry` | Retry a failed execution | `{ execution_id: string }` | `WorkflowExecution` |
| GET | `/dashboard/workflows/suggestions` | AI-generated workflow suggestions | — | `AISuggestion[]` |
| POST | `/dashboard/workflows/parse-nl` | Parse natural language into blocks | `{ input: string }` | `Partial<Workflow>` |

### Supabase Client Queries

```ts
// Load all workflow definitions (from a workflows table or JSON config)
// If using a new `workflows` table:
const { data: workflows } = await db
  .from('workflows')
  .select('*')
  .order('created_at', { ascending: false });

// Load execution history from ai_run_logs (workflow executions tagged via context)
const { data: executions } = await db
  .from('ai_run_logs')
  .select('*')
  .not('context->workflow_id', 'is', null)
  .order('created_at', { ascending: false })
  .limit(50);

// If filtering by specific workflow:
const { data: executions } = await db
  .from('ai_run_logs')
  .select('*')
  .eq('context->>workflow_id', workflowId)
  .order('created_at', { ascending: false })
  .limit(50);

// Workflow metrics: aggregate today's runs
const todayStart = new Date(); todayStart.setHours(0,0,0,0);
const { data: todayRuns } = await db
  .from('ai_run_logs')
  .select('success, duration_ms')
  .not('context->workflow_id', 'is', null)
  .gte('created_at', todayStart.toISOString());

// Wizard completion trigger check (polling or realtime)
const { data: completedSessions } = await db
  .from('wizard_sessions')
  .select('id, org_id, completed_at')
  .not('completed_at', 'is', null)
  .eq('processed', false)
  .order('completed_at', { ascending: true });

// Deal stage change trigger (recent changes)
const { data: recentDealChanges } = await db
  .from('crm_deals')
  .select('id, title, stage_id, updated_at, client_id')
  .gte('updated_at', sinceTimestamp)
  .order('updated_at', { ascending: false });

// Milestone approaching trigger
const { data: upcomingMilestones } = await db
  .from('milestones')
  .select('id, name, due_date, project_id')
  .gte('due_date', new Date().toISOString())
  .lte('due_date', threeDaysFromNow.toISOString());

// Execute action: create project
await db.from('projects').insert({
  name: projectName,
  client_id: clientId,
  status: 'active',
  created_at: new Date().toISOString(),
});

// Execute action: log activity
await db.from('activities').insert({
  type: 'workflow_execution',
  description: `Workflow "${workflowName}" executed successfully`,
  entity_type: 'workflow',
  entity_id: workflowId,
  created_at: new Date().toISOString(),
});

// AI suggestions: find repeated manual patterns
const { data: recentActivities } = await db
  .from('activities')
  .select('type, description, entity_type, created_at')
  .gte('created_at', thirtyDaysAgo)
  .order('created_at', { ascending: false })
  .limit(500);
```

### RLS Policies Needed

| Table | Policy | Rule |
|-------|--------|------|
| `workflows` (new table) | SELECT/INSERT/UPDATE/DELETE for agency admins | `auth.uid() IN (SELECT user_id FROM org_members WHERE role IN ('admin', 'owner'))` |
| `ai_run_logs` | SELECT for agency members (workflow execution history) | `auth.uid() IN (SELECT user_id FROM org_members WHERE org_id = ai_run_logs.org_id)` |
| `activities` | INSERT for workflow engine (via adminClient) | Workflows insert via `adminClient()` which bypasses RLS |
| `projects` | INSERT for workflow engine (via adminClient) | Workflows create via `adminClient()` |
| `crm_deals` | SELECT for trigger detection, INSERT for deal creation | Agency members can read; `adminClient()` for inserts from workflows |
| `wizard_sessions` | SELECT for trigger detection | Agency members can read sessions for their org |
| `milestones` | SELECT for trigger detection | Agency members can read milestones for their projects |

### API Response Interfaces

```ts
// GET /dashboard/workflows response
type WorkflowListResponse = Workflow[];

// POST /dashboard/workflows response
interface WorkflowSaveResponse {
  id: string;
  created: boolean;                            // true if new, false if updated
}

// GET /dashboard/workflows/metrics response
interface WorkflowMetricsResponse {
  runs_today: number;
  runs_today_trend: number;
  success_rate: number;
  success_rate_trend: number;
  avg_execution_ms: number;
  active_count: number;
  total_count: number;
}

// POST /dashboard/workflows/executions response
type WorkflowExecutionsResponse = WorkflowExecution[];

// POST /dashboard/workflows/run response (also retry)
type WorkflowRunResponse = WorkflowExecution;

// GET /dashboard/workflows/suggestions response
type WorkflowSuggestionsResponse = AISuggestion[];

// POST /dashboard/workflows/parse-nl response
interface NLParseResponse {
  trigger: WorkflowTrigger | null;
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  confidence: number;
  raw_interpretation: string;                  // human-readable parse explanation
}
```

### Edge Cases

| Scenario | Handling |
|----------|----------|
| No workflows configured | Empty state: "No workflows yet. Start with a template or create your own." with link to templates tab |
| Workflow trigger fires but condition fails | Execution logged as "skipped" with reason: "Condition not met: {field} {operator} {value}" |
| Workflow action fails mid-chain (e.g., 3 actions, 2nd fails) | First action committed, second logged as failed, third skipped; execution status = "failed" with partial results |
| Dry-run execution | All actions simulated — returns what would happen without committing to DB; execution response includes `dry_run: true` flag |
| Cron workflow: no matching data at scheduled time | Execution logged as "skipped" with reason: "No matching records found" |
| NL input cannot be parsed | Response returns `confidence: 0` with `raw_interpretation: "Could not parse input. Try: 'when [event] then [action]'"` |
| Circular workflow trigger (workflow A triggers B triggers A) | Max depth of 3 chained executions enforced; 4th attempt returns error "Maximum workflow chain depth exceeded" |
| Unauthorized user | RLS blocks access; frontend shows "You need admin access to manage workflows" |
| Template already installed | "Install" button changes to "Installed" (disabled); user can still create a new copy via "Duplicate" |

---

## Detailed ASCII Wireframes

### Desktop Layout (1200px content width)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (240px)  │  MAIN CONTENT (max-w-[1200px], mx-auto, px-6)          │
│                  │                                                         │
│ ┌──────────────┐ │ ┌─────────────────────────────────────────────────────┐ │
│ │ AMO AI       │ │ │ Workflow Automation                                 │ │
│ │              │ │ └─────────────────────────────────────────────────────┘ │
│ │ Dashboard    │ │                                                         │
│ │ Projects     │ │ ┌────────────┬────────────┬────────────┬────────────┐  │
│ │ CRM          │ │ │ Runs Today │ Success %  │ Avg Time   │ Active     │  │
│ │ AI Insights  │ │ │            │            │            │            │  │
│ │ Documents    │ │ │     23     │   96.5%    │   4.2s     │  5 / 7     │  │
│ │ Financial    │ │ │   ▲ +8     │   ▲ +2.1%  │   ▼ +0.3s  │            │  │
│ │ Settings     │ │ └────────────┴────────────┴────────────┴────────────┘  │
│ │ ▸ Workflows  │ │                                                         │
│ └──────────────┘ │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ [Active Workflows] [Templates] [Exec Log] [AI Sugg] │ │
│                  │ │  ═════════════════                                   │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ ── ACTIVE WORKFLOWS TAB ─────────────────────────────── │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Name             │ Trigger       │Status│Last Run│ %│ │
│                  │ ├──────────────────┼───────────────┼──────┼────────┼──┤ │
│                  │ │ Wizard → Project │ 🔮 wiz_done   │ ●ON  │ 2m ago │98│ │
│                  │ │ Deal → Notify    │ 💼 stage_chg  │ ●ON  │ 1h ago │95│ │
│                  │ │ Milestone Alert  │ ⏰ cron_daily  │ ●ON  │ 9am    │100│
│                  │ │ Weekly Report    │ 📅 cron_weekly │ ●ON  │ Sun 9am│100│
│                  │ │ Lead Qualifier   │ 🔮 wiz_new    │ ○OFF │ —      │ — │ │
│                  │ ├──────────────────┴───────────────┴──────┴────────┴──┤ │
│                  │ │  Actions per row: [Edit] [Run Now] [Delete]         │ │
│                  │ └─────────────────────────────────────────────────────┘ │
│                  │                                                         │
│                  │ [+ New Workflow]                                        │
│                  │                                                         │
│                  │ ── TEMPLATES TAB (when selected) ────────────────────── │
│                  │ ┌──────────────────┐ ┌──────────────────┐ ┌────────────┐│
│                  │ │ Wizard Complete  │ │ Deal Stage       │ │ Milestone  ││
│                  │ │ → Project Setup  │ │ → Notify         │ │ → Alert    ││
│                  │ │                  │ │                  │ │            ││
│                  │ │ Trigger: wizard  │ │ Trigger: deal    │ │ Trigger:   ││
│                  │ │ Actions: 5       │ │ Actions: 2       │ │ cron daily ││
│                  │ │ Setup: ~5 min    │ │ Setup: ~2 min    │ │ Actions: 2 ││
│                  │ │                  │ │                  │ │ Setup: ~2m ││
│                  │ │ [Install]        │ │ [Install]        │ │ [Install]  ││
│                  │ └──────────────────┘ └──────────────────┘ └────────────┘│
│                  │ ┌──────────────────┐ ┌──────────────────┐              │
│                  │ │ Weekly Report    │ │ Lead             │              │
│                  │ │                  │ │ Qualification    │              │
│                  │ │ Trigger: cron    │ │ Trigger: wizard  │              │
│                  │ │ weekly           │ │ new session      │              │
│                  │ │ Actions: 5       │ │ Actions: 3       │              │
│                  │ │ Setup: ~5 min    │ │ Setup: ~3 min    │              │
│                  │ │ [Install]        │ │ [Install]        │              │
│                  │ └──────────────────┘ └──────────────────┘              │
│                  │                                                         │
│                  │ ── EXECUTION LOG TAB (when selected) ───────────────── │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Filter: [All Workflows ▾]                           │ │
│                  │ ├──────┬──────────────────┬──────┬──────┬─────────────┤ │
│                  │ │ Time │ Workflow         │ ms   │Status│ Summary     │ │
│                  │ ├──────┼──────────────────┼──────┼──────┼─────────────┤ │
│                  │ │ 2m   │ Wizard → Project │ 3800 │  ✓   │ Created     │ │
│                  │ │      │                  │      │      │ project #47 │ │
│                  │ │ 1h   │ Deal → Notify    │ 1200 │  ✓   │ Notified    │ │
│                  │ │      │                  │      │      │ @maria      │ │
│                  │ │ 3h   │ Milestone Alert  │ 800  │  ⊘   │ Skipped: no │ │
│                  │ │      │                  │      │      │ milestones  │ │
│                  │ │ 1d   │ Weekly Report    │ 5200 │  ✗   │ Email svc   │ │
│                  │ │      │                  │      │      │ timeout     │ │
│                  │ │      │ └─ Error: SMTP connection timed out after 10s│ │
│                  │ │      │   [Retry]                                    │ │
│                  │ └──────┴──────────────────┴──────┴──────┴─────────────┘ │
│                  │                                                         │
│                  │ ── WORKFLOW BUILDER (opens on create/edit) ──────────── │
│                  │ ┌─────────────────────────────────────────────────────┐ │
│                  │ │ Workflow Name: [Wizard Complete → Project Setup    ]│ │
│                  │ │                                                     │ │
│                  │ │ ┌ TRIGGER ─────────────────────────────────────────┐│ │
│                  │ │ │ Event: [wizard_completed ▾]                      ││ │
│                  │ │ │ Source: wizard_sessions                          ││ │
│                  │ │ │ Field:  completed_at IS NOT NULL                 ││ │
│                  │ │ └─────────────────────────────────────────────────┘│ │
│                  │ │         │                                           │ │
│                  │ │         ▼                                           │ │
│                  │ │ ┌ CONDITION (optional) ────────────────────────────┐│ │
│                  │ │ │ Field: [status ▾] Op: [equals ▾] Val: [complete]││ │
│                  │ │ │                                      [× Remove] ││ │
│                  │ │ └─────────────────────────────────────────────────┘│ │
│                  │ │         │                                           │ │
│                  │ │         ▼                                           │ │
│                  │ │ ┌ ACTION 1 ───────────────────────────────────────┐│ │
│                  │ │ │ Type: [create_project ▾]                        ││ │
│                  │ │ │ Target: projects                                ││ │
│                  │ │ │ name ← wizard_answers.ai_results.company_name   ││ │
│                  │ │ │ client_id ← wizard_sessions.client_id           ││ │
│                  │ │ └─────────────────────────────────────────────────┘│ │
│                  │ │         │                                           │ │
│                  │ │         ▼                                           │ │
│                  │ │ ┌ ACTION 2 ───────────────────────────────────────┐│ │
│                  │ │ │ Type: [create_deal ▾]                           ││ │
│                  │ │ │ Target: crm_deals                               ││ │
│                  │ │ │ title ← "AI Project: " + company_name           ││ │
│                  │ │ │ value ← investment_tier                         ││ │
│                  │ │ └─────────────────────────────────────────────────┘│ │
│                  │ │         │                                           │ │
│                  │ │         ▼                                           │ │
│                  │ │ [+ Add Action]                                      │ │
│                  │ │                                                     │ │
│                  │ │ ┌─────────────┐ ┌───────────────┐ ┌──────────────┐ │ │
│                  │ │ │ Save & Enable│ │☐ Dry Run  [▶]│ │   Cancel     │ │ │
│                  │ │ └─────────────┘ └───────────────┘ └──────────────┘ │ │
│                  │ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px)

```
┌───────────────────────────────────────────────────┐
│ ☰  Workflow Automation                            │
│                                                   │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Runs Today: 23   │ │ Success: 96.5%   │         │
│ └──────────────────┘ └──────────────────┘         │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Avg Time: 4.2s   │ │ Active: 5 / 7    │         │
│ └──────────────────┘ └──────────────────┘         │
│  Metrics: 2x2 grid                               │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ ◄ Active│Templates│Exec Log│AI Suggest ►      │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ ┌───────────────────────────────────────────────┐ │
│ │ Wizard → Project     │ ●ON │ 2m ago │ 98%    │ │
│ ├───────────────────────────────────────────────┤ │
│ │ Deal → Notify        │ ●ON │ 1h ago │ 95%    │ │
│ ├───────────────────────────────────────────────┤ │
│ │ Milestone Alert      │ ●ON │ 9am    │ 100%   │ │
│ └───────────────────────────────────────────────┘ │
│ [+ New Workflow]                                  │
│                                                   │
│ Templates: 2-column grid                          │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Wizard → Project │ │ Deal → Notify    │         │
│ │ 5 actions        │ │ 2 actions        │         │
│ │ [Install]        │ │ [Install]        │         │
│ └──────────────────┘ └──────────────────┘         │
│                                                   │
│ Builder: full width, same layout but narrower     │
│ blocks stack vertically with full width            │
└───────────────────────────────────────────────────┘
```

### Mobile Layout (375px)

```
┌─────────────────────────────┐
│ ☰  Workflows                │ 56px header
├─────────────────────────────┤
│ ┌─────────────┐┌───────────┐│
│ │ Today: 23   ││ Succ: 97% ││
│ └─────────────┘└───────────┘│
│ ┌─────────────┐┌───────────┐│
│ │ Avg: 4.2s   ││ Active: 5 ││
│ └─────────────┘└───────────┘│
├─────────────────────────────┤
│ ◄ Active│Tmpl│Log│AI ►     │
├─────────────────────────────┤
│                             │
│ ┌─────────────────────────┐ │
│ │ Wizard → Project   ●ON  │ │
│ │ Last run: 2m ago        │ │
│ │ Success: 98%            │ │
│ │ [Edit] [Run] [Delete]   │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Deal → Notify      ●ON  │ │
│ │ Last run: 1h ago        │ │
│ │ Success: 95%            │ │
│ │ [Edit] [Run] [Delete]   │ │
│ └─────────────────────────┘ │
│ ... single column cards     │
│                             │
│ [+ New Workflow]            │
│                             │
│ Builder: full screen modal  │
│ ┌─────────────────────────┐ │
│ │ Name: [................]│ │
│ │ ┌ TRIGGER ────────────┐ │ │
│ │ │ [wizard_completed ▾]│ │ │
│ │ └─────────────────────┘ │ │
│ │        ▼                │ │
│ │ ┌ ACTION 1 ───────────┐│ │
│ │ │ [create_project ▾]  ││ │
│ │ │ Field mappings...    ││ │
│ │ └─────────────────────┘│ │
│ │ [+ Add Action]         │ │
│ │ [Save] [Dry Run ▶]    │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

### Key Component Detail: WorkflowRow

```
┌──────────────────────────────────────────────────────────────────────┐
│ Wizard Complete → Project Setup   🔮 wizard_completed   [●] ON      │
│──────────────────────────────────────────────────────────────────────│
│ Last run: 2 minutes ago │ Success rate: 98% (142/145) │ 5 actions   │
│                                                                      │
│ [Edit]  [Run Now ▶]  [View Logs]  [Delete]                          │
└──────────────────────────────────────────────────────────────────────┘
  Card: #FFFFFF bg, #D4CFC8 border, 8px radius
  Status toggle: #84CC16 when ON, #D4CFC8 when OFF, #DC2626 when ERROR
  Trigger icon: color-coded by trigger type
  Hover: subtle #84CC16 left border accent
```

### Key Component Detail: TriggerBlock (in Builder)

```
┌─ TRIGGER ─────────────────────────────────────────┐
│                                                   │
│  Event Type: ┌────────────────────────────────┐   │
│              │ wizard_completed            ▾  │   │
│              └────────────────────────────────┘   │
│                                                   │
│  Source Table: wizard_sessions                    │
│                                                   │
│  Condition:  ┌──────────────┐ ┌──────┐           │
│              │ completed_at │ │IS NOT│ NULL       │
│              └──────────────┘ └──────┘           │
│                                                   │
│  #F1EEEA background, #0A211F dashed top border   │
│  Drag handle: ⠿ on left side                     │
└───────────────────────────────────────────────────┘
```

---

## Outcomes

| Outcome                                  | Metric                                          | Target         |
| ---------------------------------------- | ----------------------------------------------- | -------------- |
| Manual operational tasks eliminated      | Hours saved per week on repetitive tasks         | 10+ hours/week |
| Workflow reliability                     | Overall success rate across all workflows        | > 95%          |
| Post-wizard setup time                   | Time from wizard completion to project creation  | < 30 seconds   |
| Notification timeliness                  | Milestone alerts delivered before due date        | 100%           |
| Template adoption                        | Percentage of agencies using 3+ templates         | > 70%          |
| AI suggestion acceptance                 | Rate of AI-suggested workflows that get enabled   | > 30%          |
