# 08 — System Architecture Diagram (Frontend → API → Database)

> Version 1.0 | March 13, 2026
> Interactive diagram at `/app/agents/architecture-diagram`

---

## Overview

Three-column technical architecture diagram showing the complete data flow through the AMO AI platform. Blueprint/technical drawing aesthetic with dark navy background and white/cyan lines.

- **Left column:** Frontend component tree (31 components as nested boxes)
- **Center column:** API routes (38 edge function endpoints as horizontal bars with method badges)
- **Right column:** Database tables (25 Supabase tables with column counts and group labels)
- **Arrows:** 20 data flow paths connecting components → API routes → database tables

---

## Frontend Components (31)

### Wizard Cluster
| Component | Route | Purpose |
|---|---|---|
| WizardPage | /wizard | 5-step wizard shell |
| StepBusinessContext | /wizard (step 1) | Company info collection |
| StepIndustryDiagnostics | /wizard (step 2) | Industry-specific questions |
| StepSystemRecommendations | /wizard (step 3) | AI system recommendations |
| StepExecutiveSummary | /wizard (step 4) | AI readiness + proposal |
| StepLaunchProject | /wizard (step 5) | Roadmap + onboarding |
| ProcessingPage | /wizard/processing | AI processing overlay |
| ProposalPage | /wizard/proposal | Final proposal view |

### Dashboard Cluster
| Component | Route | Purpose |
|---|---|---|
| DashboardLayout | /app | Sidebar + header shell |
| DashboardHome | /app/dashboard | Metrics + widgets |
| ProjectsList | /app/projects | Project list view |
| RoadmapPage | /app/roadmap | Roadmap timeline |
| SettingsPage | /app/settings | User settings |
| InsightsPage | /app/insights | AI insights feed |

### CRM Cluster
| Component | Route | Purpose |
|---|---|---|
| ClientsListPage | /app/clients | Client directory |
| ClientDetailPage | /app/clients/:id | Client profile |
| CRMPipelinePage | /app/crm/pipelines | Kanban deal board |

### Content Cluster
| Component | Route | Purpose |
|---|---|---|
| DocumentMgmtPage | /app/documents | File management |
| WorkflowAutoPage | /app/workflows | Automation builder |
| FinancialDashPage | /app/financial | Invoice + revenue |
| StrategyEnginePg | /app/strategy | Lean Canvas + AI |

### Agents Cluster
| Component | Route | Purpose |
|---|---|---|
| AgentsPage | /app/agents | Monitor tab (run logs) |
| AgentCatalogPage | /app/agents/catalog | Browse 16 agents |
| AgentDetailPage | /app/agents/catalog/:slug | Agent profile |
| AgentRunnerPage | /app/agents/catalog/:slug/run | Execute agent tasks |
| AgentSystemMap | /app/agents/system-map | Product → agent mapping |
| AgentERDiagram | /app/agents/er-diagram | 5-table ER diagram |
| AgentArchitectureDiagram | /app/agents/architecture-diagram | This diagram |
| AgentSummaryHdr | (shared) | Agent stats header |
| RunHistoryTable | (shared) | Run log table |

### Auth
| Component | Route | Purpose |
|---|---|---|
| AuthPage | /auth | Login/signup split-screen |
| AuthCallbackPage | /auth/callback | OAuth redirect handler |

---

## API Routes (38 edge function endpoints)

### By Server File

| File | Routes | Methods |
|---|---|---|
| wizard-routes.tsx | 4 | POST, GET, PUT |
| ai-routes.tsx | 6 | POST, GET |
| index.tsx (direct) | 3 | POST, GET |
| agent-routes.tsx | 3 | POST, GET |
| crm-routes.tsx | 3 | GET, POST, PUT |
| pipeline-routes.tsx | 3 | GET, POST, PUT |
| document-routes.tsx | 3 | POST, GET, DELETE |
| workflow-routes.tsx | 3 | GET, POST |
| financial-routes.tsx | 3 | GET, POST |
| strategy-routes.tsx | 4 | POST, GET |
| onboarding-routes.tsx | 2 | POST, GET |
| **Total** | **38** | |

### By HTTP Method

| Method | Count | Color |
|---|---|---|
| GET | 14 | Green |
| POST | 20 | Blue |
| PUT | 3 | Yellow |
| DELETE | 1 | Red |

---

## Database Tables (25)

### By Group

| Group | Tables | Status |
|---|---|---|
| Core | kv_store_283466b6, wizard_sessions, wizard_answers | Active |
| AI / Gemini | ai_run_logs, ai_cache | Active |
| CRM | clients, crm_pipelines, crm_stages, crm_deals, crm_interactions | Active |
| Strategy Engine | lean_canvases, lean_canvas_versions, strategy_insights, strategy_recommendations, automation_opportunities, strategy_actions | Active |
| Onboarding | projects, roadmaps, roadmap_phases, activities | Active |
| Agent System | agent_catalog, agent_assignments, agent_runs, agent_outputs, insight_cards | Planned |

---

## Data Flow Paths (20 mapped connections)

| # | Frontend | API Route | Database | Purpose |
|---|---|---|---|---|
| 1 | StepBusinessContext | POST /wizard/session | wizard_sessions | Create session |
| 2 | StepBusinessContext | POST /wizard/answers | wizard_answers | Save step answers |
| 3 | StepSystemRecs | POST /system-recommendations | ai_run_logs | AI recommendations |
| 4 | StepExecSummary | POST /readiness-score | ai_run_logs | Readiness analysis |
| 5 | StepLaunchProject | POST /generate-roadmap | ai_run_logs | Roadmap generation |
| 6 | StepIndustryDiag | POST /industry-diagnostics | ai_run_logs | Industry questions |
| 7 | StepLaunchProject | POST /onboarding/complete | projects | Project creation |
| 8 | InsightsPage | POST /dashboard-insights | ai_run_logs | Dashboard AI |
| 9 | AgentRunnerPage | POST /agents/run | ai_run_logs | Agent execution |
| 10 | AgentCatalogPage | POST /agents/match | ai_run_logs | Agent matching |
| 11 | AgentDetailPage | GET /agents/history/:slug | ai_run_logs | Run history |
| 12 | ClientsListPage | GET /crm/clients | clients | Client list |
| 13 | CRMPipelinePage | GET /crm/pipelines | crm_pipelines | Pipeline data |
| 14 | CRMPipelinePage | POST /crm/deals | crm_deals | Create deals |
| 15 | DocumentMgmtPage | POST /documents/upload | kv_store | File upload |
| 16 | WorkflowAutoPage | GET /workflows | kv_store | Workflow list |
| 17 | FinancialDashPage | GET /financial/invoices | kv_store | Invoice data |
| 18 | StrategyEnginePg | POST /strategy/canvas | lean_canvases | Canvas CRUD |
| 19 | StrategyEnginePg | POST /strategy/analyze | strategy_insights | AI analysis |
| 20 | AuthPage | POST /signup | kv_store | User signup |

---

## Interactive Features

- **Hover any element** (component, route, or table) to highlight its complete data path across all 3 columns
- **Non-connected elements dim** to 20% opacity for visual focus
- **Click an API route** to open a detail panel showing source file, group, and connected frontend/database
- **Zoom controls** for the full diagram (40%–150%)
- **Stats footer** in the SVG showing system totals
- **Stats cards** below the diagram with color-coded counts

---

## Files

| File | Purpose |
|---|---|
| `/components/dashboard/agents/AgentArchitectureDiagram.tsx` | Interactive SVG architecture diagram |
| `/routes.tsx` | Route at `agents/architecture-diagram` |
| `/components/dashboard/DashboardSidebar.tsx` | "Architecture" sub-item under AI Agents |
| `/docs/agency/08-architecture-diagram.md` | This documentation |
