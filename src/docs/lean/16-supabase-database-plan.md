# Task 16 — Supabase Database Plan: Schema, ERD & Data Flows

**ID:** lean-16-supabase-database-plan
**Phase:** LEAN (Phase 14, Pre-Requisite)
**Priority:** P0
**Effort:** L
**Status:** Not Started
**Dependencies:** None (this plan must execute before any backend code)
**Migration File:** `supabase/migrations/20260308120000_create_strategy_engine_tables.sql`
**Apply Via:** Supabase SQL Editor (manual — project constraint)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Strategy Engine ERD](#2-strategy-engine-erd)
3. [Full Platform ERD (32 Existing + 12 New)](#3-full-platform-erd)
4. [Table Specifications (12 Tables)](#4-table-specifications)
5. [Cross-Domain Relationships](#5-cross-domain-relationships)
6. [Data Flow Diagrams](#6-data-flow-diagrams)
7. [RLS Policies](#7-rls-policies)
8. [Indexes & Performance](#8-indexes--performance)
9. [Database Functions & Triggers](#9-database-functions--triggers)
10. [Migration SQL (Copy-Paste Ready)](#10-migration-sql)
11. [Rollback SQL](#11-rollback-sql)
12. [Post-Migration Verification](#12-post-migration-verification)

---

## 1. Executive Summary

The Strategy Engine adds **12 new tables** to the existing 32-table AMO AI platform database, bringing the total to **44 tables**. The new tables are organized into two tiers:

- **Core (6 tables):** `lean_canvases`, `lean_canvas_versions`, `strategy_insights`, `automation_opportunities`, `strategy_recommendations`, `strategy_actions`
- **Advanced (6 tables):** `strategy_events`, `strategy_event_triggers`, `strategy_agent_memory`, `strategy_signals`, `strategy_roles`, `strategy_budgets`

The strategy tables connect to the existing schema via:
- `lean_canvases.session_id` → `wizard_sessions.id` (canvas seeded from wizard data)
- `lean_canvases.project_id` → `projects.id` (canvas linked to a project)
- `lean_canvases.user_id` → `auth.users.id` (canvas ownership)
- `strategy_roles.user_id` → `auth.users.id` (multi-user access control)
- `strategy_recommendations.approved_by` → `auth.users.id` (approval audit)

All tables use RLS with authenticated CRUD policies. Edge functions use `adminClient()` (service-role key) which bypasses RLS for server-side operations.

---

## 2. Strategy Engine ERD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STRATEGY ENGINE — 12 TABLES                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────┐       ┌──────────────────────────┐            │
│  │     lean_canvases       │       │  lean_canvas_versions    │            │
│  │─────────────────────────│       │──────────────────────────│            │
│  │ PK id           uuid    │──┐    │ PK id           uuid     │            │
│  │    session_id   text    │  │    │ FK canvas_id    uuid     │◄───────┐  │
│  │ FK project_id   uuid    │  │    │    version      integer  │        │  │
│  │ FK user_id      uuid    │  │    │    snapshot     jsonb    │        │  │
│  │    version      integer │  ├───►│    change_summary text   │        │  │
│  │    is_current   boolean │  │    │    changed_by   text     │        │  │
│  │    problem      jsonb   │  │    │    created_at   tstz     │        │  │
│  │    customer_seg jsonb   │  │    │ UQ (canvas_id, version)  │        │  │
│  │    value_prop   jsonb   │  │    └──────────────────────────┘        │  │
│  │    solution     jsonb   │  │                                        │  │
│  │    channels     jsonb   │  │    ┌──────────────────────────┐        │  │
│  │    revenue_str  jsonb   │  │    │  strategy_insights       │        │  │
│  │    cost_struct  jsonb   │  │    │──────────────────────────│        │  │
│  │    key_metrics  jsonb   │  │    │ PK id           uuid     │        │  │
│  │    unfair_adv   jsonb   │  ├───►│ FK canvas_id    uuid     │        │  │
│  │    metadata     jsonb   │  │    │    session_id   text     │        │  │
│  │    created_at   tstz    │  │    │    agent_name   text     │        │  │
│  │    updated_at   tstz    │  │    │    insight_type text     │        │  │
│  └──────┬──────────────────┘  │    │    title        text     │        │  │
│         │                     │    │    description  text     │        │  │
│         │ 1:N                 │    │    priority     text     │        │  │
│         │                     │    │    impact_score numeric  │        │  │
│         ▼                     │    │    confidence   numeric  │        │  │
│  ┌─────────────────────────┐  │    │    data_sources jsonb    │        │  │
│  │  strategy_roles         │  │    │    status       text     │        │  │
│  │─────────────────────────│  │    │    created_at   tstz     │        │  │
│  │ PK id           uuid    │  │    │    expires_at   tstz     │        │  │
│  │ FK user_id      uuid    │  │    └──────────────────────────┘        │  │
│  │ FK canvas_id    uuid    │◄─┤                                        │  │
│  │    role         text    │  │    ┌──────────────────────────┐        │  │
│  │ UQ (user_id, canvas_id) │  │    │ automation_opportunities │        │  │
│  └─────────────────────────┘  │    │──────────────────────────│        │  │
│                               │    │ PK id           uuid     │        │  │
│  ┌─────────────────────────┐  ├───►│ FK canvas_id    uuid     │        │  │
│  │  strategy_budgets       │  │    │    session_id   text     │        │  │
│  │─────────────────────────│  │    │    title        text     │        │  │
│  │ PK id           uuid    │  │    │    process_area text     │        │  │
│  │ FK canvas_id    uuid    │◄─┤    │    impact_score integer  │        │  │
│  │    monthly_limit int    │  │    │    roi_estimate  text    │        │  │
│  │    tokens_used   int    │  │    │    complexity   text     │        │  │
│  │    analyses_today int   │  │    │    status       text     │        │  │
│  │    budget_month  text   │  │    │    created_at   tstz     │        │  │
│  └─────────────────────────┘  │    └──────────────────────────┘        │  │
│                               │                                        │  │
│  ┌─────────────────────────┐  │    ┌──────────────────────────┐        │  │
│  │ strategy_recommendations│  │    │  strategy_actions         │        │  │
│  │─────────────────────────│  │    │──────────────────────────│        │  │
│  │ PK id           uuid    │  │    │ PK id           uuid     │        │  │
│  │ FK canvas_id    uuid    │◄─┤    │ FK canvas_id    uuid     │◄───────┤  │
│  │    session_id   text    │  │    │    session_id   text     │        │  │
│  │    agent_name   text    │  │    │    agent_name   text     │        │  │
│  │    rec_type     text    │  │    │    action_type  text     │        │  │
│  │    title        text    │  │    │    tokens_used  integer  │        │  │
│  │    rationale    text    │  │    │    duration_ms  integer  │        │  │
│  │    proposed     jsonb   │  │    │    success      boolean  │        │  │
│  │    approval_status text │  │    │    error_message text    │        │  │
│  │ FK approved_by  uuid   │  │    │    created_at   tstz     │        │  │
│  │    approved_at  tstz    │  │    └──────────────────────────┘        │  │
│  │    created_at   tstz    │  │                                        │  │
│  └─────────────────────────┘  │                                        │  │
│                               │    ┌──────────────────────────┐        │  │
│  ┌─────────────────────────┐  │    │  strategy_agent_memory   │        │  │
│  │  strategy_events        │  │    │──────────────────────────│        │  │
│  │─────────────────────────│  │    │ PK id           uuid     │        │  │
│  │ PK id           uuid    │  │    │ FK canvas_id    uuid     │◄───────┤  │
│  │ FK canvas_id    uuid    │◄─┤    │    agent_name   text     │        │  │
│  │    event_type   text    │  │    │    memory_type  text     │        │  │
│  │    source_table text    │  │    │    content      jsonb    │        │  │
│  │    payload      jsonb   │  │    │    relevance    numeric  │        │  │
│  │    processed    boolean │  │    │ FK superseded_by uuid    │──┐     │  │
│  │    created_at   tstz    │  │    │    created_at   tstz     │  │self │  │
│  └─────────────────────────┘  │    │    expires_at   tstz     │◄─┘ref  │  │
│                               │    └──────────────────────────┘        │  │
│  ┌─────────────────────────┐  │                                        │  │
│  │ strategy_event_triggers │  │    ┌──────────────────────────┐        │  │
│  │─────────────────────────│  │    │  strategy_signals        │        │  │
│  │ PK id           uuid    │  │    │──────────────────────────│        │  │
│  │    event_type   text    │  │    │ PK id           uuid     │        │  │
│  │    agent_name   text    │  └───►│ FK canvas_id    uuid     │────────┘  │
│  │    enabled      boolean │       │    signal_category text  │            │
│  │    cooldown_min integer │       │    signal_name   text    │            │
│  │ UQ (event_type, agent)  │       │    value        numeric  │            │
│  └─────────────────────────┘       │    trend        text     │            │
│                                    │    collected_at tstz     │            │
│                                    └──────────────────────────┘            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Legend:
  PK = Primary Key    FK = Foreign Key    UQ = Unique Constraint
  tstz = timestamptz  int = integer       1:N = One-to-many
```

### Relationship Summary

| Parent | Child | Cardinality | FK Column | On Delete |
|--------|-------|-------------|-----------|-----------|
| `lean_canvases` | `lean_canvas_versions` | 1:N | `canvas_id` | CASCADE |
| `lean_canvases` | `strategy_insights` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `automation_opportunities` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `strategy_recommendations` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `strategy_actions` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `strategy_events` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `strategy_agent_memory` | 1:N | `canvas_id` | CASCADE |
| `lean_canvases` | `strategy_signals` | 1:N | `canvas_id` | SET NULL |
| `lean_canvases` | `strategy_roles` | 1:N | `canvas_id` | CASCADE |
| `lean_canvases` | `strategy_budgets` | 1:1 | `canvas_id` | CASCADE |
| `strategy_agent_memory` | `strategy_agent_memory` | 1:1 (self) | `superseded_by` | — |
| `auth.users` | `lean_canvases` | 1:N | `user_id` | — |
| `auth.users` | `strategy_roles` | 1:N | `user_id` | — |
| `auth.users` | `strategy_recommendations` | N:1 | `approved_by` | — |

---

## 3. Full Platform ERD (32 Existing + 12 New)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         AMO AI PLATFORM — 44 TABLES                              │
│                                                                                  │
│  ┌─────────────┐     ┌──────────────┐     ┌──────────────┐                      │
│  │ auth.users  │────►│  profiles     │     │organizations │                      │
│  │ (Supabase)  │     │              │     │              │                      │
│  └──────┬──────┘     └──────────────┘     └──────┬───────┘                      │
│         │                                        │                               │
│         │         ┌──────────────────────────────┼──────────────────────┐        │
│         │         │                              │                      │        │
│         │         ▼                              ▼                      ▼        │
│         │  ┌──────────────┐             ┌──────────────┐      ┌────────────┐    │
│         │  │ team_members │             │   clients     │      │  projects  │    │
│         │  └──────────────┘             └──────┬───────┘      └─────┬──────┘    │
│         │                                      │                    │            │
│         │         ┌────────────────────────────┼────────────┐      │            │
│         │         │              │              │            │      │            │
│         │         ▼              ▼              ▼            ▼      ▼            │
│         │  ┌────────────┐ ┌──────────┐ ┌───────────┐ ┌──────────┐ ┌───────┐   │
│         │  │crm_contacts│ │crm_deals │ │crm_inter. │ │crm_stages│ │ tasks │   │
│         │  └────────────┘ └──────────┘ └───────────┘ └──────────┘ └───────┘   │
│         │                                    │              │                    │
│         │                              ┌─────┘              │                    │
│         │                              ▼                    ▼                    │
│         │                       ┌──────────────┐    ┌──────────────┐            │
│         │                       │crm_pipelines │    │ milestones   │            │
│         │                       └──────────────┘    └──────────────┘            │
│         │                                                                        │
│  ═══════╪════════════════════════════════════════════════════════════════════     │
│  WIZARD │& AI LAYER                                                              │
│         │                                                                        │
│         │  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐           │
│         │  │wizard_sessions│───►│wizard_answers │     │  ai_cache    │           │
│         │  └──────┬───────┘     └──────────────┘     └──────────────┘           │
│         │         │                                   ┌──────────────┐           │
│         │         │ session_id                        │ ai_run_logs  │           │
│         │         │                                   └──────────────┘           │
│  ═══════╪═════════╪═════════════════════════════════════════════════════════     │
│  STRATE │GY ENGIN │E (NEW — 12 TABLES)                                          │
│         │         │                                                              │
│         │         ▼                                                              │
│         │  ┌─────────────────────┐                                               │
│         └─►│   lean_canvases     │◄── Central hub of strategy engine             │
│            │ (user_id, session_id│                                               │
│            │  project_id, 9 JSONB│                                               │
│            │  block columns)     │                                               │
│            └──────────┬──────────┘                                               │
│                       │                                                          │
│        ┌──────────────┼──────────────────────────────────────────┐               │
│        │       │      │       │       │      │       │      │   │               │
│        ▼       ▼      ▼       ▼       ▼      ▼       ▼      ▼   ▼               │
│   versions insights  opps   recs   actions events memory signals roles/budgets  │
│                                                                                  │
│  ── Financial & Docs Layer ──────────────────────────────────────────────        │
│                                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐         │
│  │ invoices │ │ payments │ │documents │ │activities│ │ deliverables  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └───────────────┘         │
│                                                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐         │
│  │ services │ │ systems  │ │ roadmaps │ │  briefs  │ │brief_versions │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └───────────────┘         │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Cross-Domain FK Map

```
auth.users ──────────┬──► lean_canvases.user_id
                     ├──► strategy_roles.user_id
                     └──► strategy_recommendations.approved_by

wizard_sessions ─────────► lean_canvases.session_id   (text FK, not enforced)

projects ────────────────► lean_canvases.project_id   (uuid FK, not enforced)
```

**Note:** `session_id` and `project_id` on `lean_canvases` are **soft foreign keys** (no `REFERENCES` constraint). This matches the existing pattern where wizard_sessions and projects may live in different org contexts. The edge function enforces integrity at the application layer.

---

## 4. Table Specifications

### 4.1 lean_canvases (Core Hub — 20 columns)

The central table. One row per Lean Canvas. The 9 JSONB block columns each store an array of `CanvasBlockItem` objects.

| Column | Type | Default | Null | Purpose |
|--------|------|---------|------|---------|
| `id` | uuid | `gen_random_uuid()` | NO | PK |
| `session_id` | text | — | YES | Soft FK → wizard_sessions |
| `project_id` | uuid | — | YES | Soft FK → projects |
| `user_id` | uuid | — | YES | FK → auth.users (owner) |
| `version` | integer | `1` | NO | Current version number |
| `is_current` | boolean | `true` | NO | Only one current canvas per user |
| `problem` | jsonb | `'[]'` | NO | Block: Problem |
| `customer_segments` | jsonb | `'[]'` | NO | Block: Customer Segments |
| `value_proposition` | jsonb | `'[]'` | NO | Block: Unique Value Proposition |
| `solution` | jsonb | `'[]'` | NO | Block: Solution |
| `channels` | jsonb | `'[]'` | NO | Block: Channels |
| `revenue_streams` | jsonb | `'[]'` | NO | Block: Revenue Streams |
| `cost_structure` | jsonb | `'[]'` | NO | Block: Cost Structure |
| `key_metrics` | jsonb | `'[]'` | NO | Block: Key Metrics |
| `unfair_advantage` | jsonb | `'[]'` | NO | Block: Unfair Advantage |
| `metadata` | jsonb | `'{}'` | NO | Wizard phases, readiness score, etc. |
| `created_at` | timestamptz | `now()` | NO | — |
| `updated_at` | timestamptz | `now()` | NO | — |

**JSONB Block Item Schema:**
```json
[
  {
    "id": "uuid-string",
    "text": "Manual customer support across 3 channels",
    "source": "ai",
    "confidence": 0.85,
    "updatedAt": "2026-03-08T14:30:00Z"
  }
]
```

**Metadata Schema:**
```json
{
  "industry": "e-commerce",
  "companySize": "50-200",
  "readinessScore": 72,
  "phases": [
    { "name": "Foundation", "tasks": [...], "duration": "3 weeks", "cost": "$8,200" }
  ]
}
```

### 4.2 lean_canvas_versions (6 columns)

Immutable snapshots created on every canvas edit. Enables version history and revert.

| Column | Type | Default | Null | Purpose |
|--------|------|---------|------|---------|
| `id` | uuid | `gen_random_uuid()` | NO | PK |
| `canvas_id` | uuid | — | NO | FK → lean_canvases (CASCADE) |
| `version` | integer | — | NO | Version number |
| `snapshot` | jsonb | — | NO | Complete canvas state at this version |
| `change_summary` | text | — | YES | Human-readable change description |
| `changed_by` | text | — | YES | "user", agent name, or "system" |
| `created_at` | timestamptz | `now()` | NO | — |

**Unique constraint:** `(canvas_id, version)` — prevents duplicate version numbers.

### 4.3 strategy_insights (13 columns)

AI-generated observations about the business. Auto-approved (no human gate). Dismissable.

| Column | Type | Default | Null | Check | Purpose |
|--------|------|---------|------|-------|---------|
| `id` | uuid | gen_random_uuid() | NO | | PK |
| `canvas_id` | uuid | — | YES | | FK → lean_canvases (SET NULL) |
| `session_id` | text | — | YES | | Wizard session context |
| `agent_name` | text | — | NO | | Which AI agent created this |
| `insight_type` | text | — | NO | | opportunity / risk / recommendation / trend |
| `title` | text | — | NO | | Short title (max 80 chars) |
| `description` | text | — | NO | | Full explanation |
| `priority` | text | `'medium'` | NO | | high / medium / low |
| `impact_score` | numeric | — | YES | | 0-100 impact rating |
| `confidence` | numeric | — | YES | | 0-1 AI confidence |
| `data_sources` | jsonb | `'[]'` | NO | | Array of source references |
| `status` | text | `'draft'` | NO | `IN (draft, approved, dismissed, acted_on)` | Lifecycle state |
| `action_taken` | text | — | YES | | What the user did about it |
| `created_at` | timestamptz | `now()` | NO | | — |
| `expires_at` | timestamptz | — | YES | | Auto-expire stale insights |

### 4.4 automation_opportunities (15 columns)

Detected areas where AI automation could save time/money. Scored with impact/ROI/complexity.

| Column | Type | Default | Null | Check | Purpose |
|--------|------|---------|------|-------|---------|
| `id` | uuid | gen_random_uuid() | NO | | PK |
| `canvas_id` | uuid | — | YES | | FK → lean_canvases |
| `session_id` | text | — | YES | | Wizard session context |
| `title` | text | — | NO | | e.g. "Automate Lead Qualification" |
| `description` | text | — | NO | | Full explanation |
| `process_area` | text | — | YES | | sales / operations / support / marketing |
| `current_state` | text | — | YES | | "Manual review takes 2-3 hours" |
| `proposed_state` | text | — | YES | | "AI scores leads in real-time" |
| `impact_score` | integer | `50` | NO | | 0-100 |
| `roi_estimate` | text | — | YES | | "300-500%" |
| `complexity` | text | `'medium'` | NO | | low / medium / high |
| `estimated_weeks` | integer | — | YES | | Implementation timeline |
| `estimated_cost` | text | — | YES | | "$2,000-$5,000" |
| `recommended_system` | text | — | YES | | e.g. "sales-automation" |
| `status` | text | `'detected'` | NO | `IN (detected, evaluating, approved, in_progress, completed, dismissed)` | Lifecycle |
| `created_at` | timestamptz | `now()` | NO | | — |
| `updated_at` | timestamptz | `now()` | NO | | — |

### 4.5 strategy_recommendations (12 columns)

AI-generated suggestions that **require human approval** before taking effect. The governance layer.

| Column | Type | Default | Null | Check | Purpose |
|--------|------|---------|------|-------|---------|
| `id` | uuid | gen_random_uuid() | NO | | PK |
| `canvas_id` | uuid | — | YES | | FK → lean_canvases |
| `session_id` | text | — | YES | | Wizard session |
| `agent_name` | text | — | NO | | Which agent generated this |
| `recommendation_type` | text | — | NO | | canvas_update / roadmap_change / new_system / task_creation / metric_alert |
| `title` | text | — | NO | | Short action title |
| `rationale` | text | — | NO | | Data-driven justification |
| `proposed_changes` | jsonb | `'{}'` | NO | | Structured change payload |
| `approval_status` | text | `'pending'` | NO | `IN (pending, approved, rejected, auto_approved, archived)` | — |
| `approved_by` | uuid | — | YES | | FK → auth.users |
| `approved_at` | timestamptz | — | YES | | — |
| `created_at` | timestamptz | `now()` | NO | | — |

**proposed_changes Schema (for canvas_update type):**
```json
{
  "target_block": "problem",
  "action": "add",
  "items": [
    { "text": "WhatsApp support volume grew 35%", "confidence": 0.91 }
  ]
}
```

### 4.6 strategy_actions (11 columns)

Audit log for every AI agent action. Tracks tokens, timing, success/failure.

| Column | Type | Default | Purpose |
|--------|------|---------|---------|
| `id` | uuid | gen_random_uuid() | PK |
| `canvas_id` | uuid | — | FK → lean_canvases |
| `session_id` | text | — | Wizard context |
| `agent_name` | text | — | e.g. "strategy-synthesize" |
| `action_type` | text | — | "analyze", "synthesize-block", "approve", etc. |
| `input_summary` | text | — | Truncated input for debugging |
| `output_summary` | text | — | Truncated output summary |
| `tokens_used` | integer | `0` | Gemini tokens consumed |
| `duration_ms` | integer | `0` | Execution time |
| `success` | boolean | `true` | — |
| `error_message` | text | — | Error details if failed |
| `created_at` | timestamptz | `now()` | — |

### 4.7–4.12 Advanced Tables (Phase 2)

See full column specs in §10 Migration SQL. Summary:

| Table | Purpose | Phase 1 Usage |
|-------|---------|---------------|
| `strategy_events` | Event bus for reactive triggers | Log only (no processing) |
| `strategy_event_triggers` | Agent-event subscriptions | All disabled |
| `strategy_agent_memory` | Per-agent context continuity | Active (loaded before each analysis) |
| `strategy_signals` | Business metric tracking | Populated during analysis |
| `strategy_roles` | Multi-user canvas access | Auto-assigned on canvas creation |
| `strategy_budgets` | Token budget + rate limiting | Active (checked before each analysis) |

---

## 5. Cross-Domain Relationships

### 5.1 Wizard → Canvas Seeding Flow

```
wizard_sessions              wizard_answers              lean_canvases
┌──────────────┐            ┌──────────────┐            ┌──────────────────┐
│ id           │───────────►│ session_id   │            │ session_id       │
│ status       │            │ step_number  │            │ (soft FK)        │
│ current_step │            │ answers      │──── AI ──►│ problem[]        │
│              │            │ ai_results   │  (Gemini) │ solution[]       │
│              │            │              │  seeding   │ customer_segs[]  │
│              │            │              │            │ value_prop[]     │
│              │            │              │            │ channels[]       │
│              │            │              │            │ key_metrics[]    │
│              │            │              │            │ cost_structure[] │
│              │            │              │            │ revenue_streams[]│
│              │            │              │            │ unfair_adv[]     │
│              │            │              │            │ metadata.phases  │
└──────────────┘            └──────────────┘            └──────────────────┘
```

**Wizard → Block Mapping:**
```
Step 1 (Business Analysis):
  painPoints           → problem[]
  targetAudience       → customer_segments[]
  opportunities        → value_proposition[]

Step 2 (Industry Diagnostics):
  diagnostics.signals  → key_metrics[] (top 3)
  channelAnalysis      → channels[]

Step 3 (System Recommendations):
  selectedSystems      → solution[]
  recommendations      → cost_structure[] (pricing)

Step 4 (Readiness Score):
  strengths            → unfair_advantage[]
  gaps                 → problem[] (additional)
  overallScore         → metadata.readinessScore

Step 5 (Roadmap):
  phases               → metadata.phases
  totalInvestment      → revenue_streams[]
```

### 5.2 CRM → Strategy Intelligence Flow

```
clients + crm_deals + crm_interactions
         │
         │ (read during "Run Analysis")
         ▼
  ┌──────────────────┐
  │ POST /analyze    │
  │ (edge function)  │
  │                  │
  │ Loads:           │
  │ • canvas data    │
  │ • wizard answers │
  │ • clients list   │──── Data fed to 5 Gemini agents
  │ • recent deals   │
  │ • agent memory   │
  └────────┬─────────┘
           │
           │ Outputs persisted to:
           ├──► strategy_insights (trends, risks)
           ├──► automation_opportunities (scored)
           ├──► strategy_recommendations (need approval)
           ├──► strategy_actions (audit log)
           ├──► strategy_agent_memory (context)
           └──► strategy_signals (metrics)
```

### 5.3 Strategy → Existing AI Infrastructure

```
strategy-routes.tsx
     │
     │ uses callGemini() from gemini.tsx
     ▼
┌───────────────┐       ┌──────────────┐
│  callGemini() │──────►│  ai_cache    │  (cache check + store)
│  (gemini.tsx) │       └──────────────┘
│               │       ┌──────────────┐
│               │──────►│ ai_run_logs  │  (audit every call)
│               │       └──────────────┘
│               │
│  Gemini API   │◄─── GEMINI_API_KEY (env var)
│  (external)   │
└───────────────┘

Strategy-specific caching:
  Agent: strategy-synthesize      → ai_cache TTL: 4 hours
  Agent: opportunity-detect       → ai_cache TTL: 12 hours
  Agent: metrics-interpret        → ai_cache TTL: 2 hours
  Agent: roadmap-suggest          → ai_cache TTL: 24 hours
  Agent: system-recommend-strategy→ ai_cache TTL: 48 hours
```

---

## 6. Data Flow Diagrams

### 6.1 Canvas Creation Flow

```
                     ┌──────────────┐
                     │  User clicks │
                     │"Start Fresh" │
                     │  or "Create  │
                     │ from Wizard" │
                     └──────┬───────┘
                            │
                            ▼
              ┌─────────────────────────┐
              │ Frontend: strategyApi.  │
              │ createCanvas(source,    │
              │   wizardSessionId)      │
              │ Token: 'use-fresh-token'│
              └─────────┬───────────────┘
                        │ POST /strategy/canvas
                        ▼
              ┌─────────────────────────┐
              │ Edge Function:          │
              │ 1. requireAuth()        │
              │ 2. If session_id:       │
              │    - Load wizard_answers│
              │    - seedCanvasFromWiz()│
              │ 3. INSERT lean_canvases │
              │ 4. INSERT version (v1)  │
              │ 5. INSERT strategy_roles│
              │    (user = admin)       │
              │ 6. INSERT strategy_     │
              │    budgets (defaults)   │
              └─────────┬───────────────┘
                        │
                ┌───────┴───────┐
                ▼               ▼
        ┌──────────────┐ ┌──────────────┐
        │lean_canvases │ │lean_canvas_  │
        │ (1 row)      │ │versions (v1) │
        └──────────────┘ └──────────────┘
                ┌───────┴───────┐
                ▼               ▼
        ┌──────────────┐ ┌──────────────┐
        │strategy_roles│ │strategy_     │
        │ (admin)      │ │budgets       │
        └──────────────┘ └──────────────┘
```

### 6.2 Block Edit Flow

```
  User edits canvas block item
         │
         ▼
  ┌─────────────────────┐
  │ strategyApi.         │
  │ updateCanvasBlocks(  │
  │   canvasId,          │
  │   { problem: [...] },│
  │   "Added support vol"│
  │ )                    │
  └─────────┬────────────┘
            │ PUT /strategy/canvas/:id
            ▼
  ┌─────────────────────────────────┐
  │ Edge Function:                  │
  │ 1. requireAuth()               │
  │ 2. SELECT lean_canvases (cur)  │
  │ 3. newVersion = cur.version + 1│
  │ 4. UPDATE lean_canvases        │
  │    SET problem = [...],        │
  │        version = newVersion,   │
  │        updated_at = now()      │
  │ 5. INSERT lean_canvas_versions │
  │    (snapshot of full canvas)   │
  │ 6. Return updated canvas       │
  └─────────┬───────────────────────┘
            │
            ├──► lean_canvases (UPDATED: problem[], version, updated_at)
            └──► lean_canvas_versions (NEW: v(N+1) snapshot)
```

### 6.3 Run Analysis Flow (5-Agent Orchestration)

```
  User clicks "Run Analysis"
         │
         ▼
  ┌──────────────────────────┐
  │ strategyApi.runAnalysis( │
  │   canvasId, sessionId    │
  │ )                        │
  └─────────┬────────────────┘
            │ POST /strategy/analyze
            ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ Edge Function:                                                       │
  │                                                                      │
  │ 1. BUDGET CHECK ─────────────────────────────────────────────────┐  │
  │    SELECT strategy_budgets WHERE canvas_id = X                   │  │
  │    IF analyses_today >= max_analyses_per_day → 429 Rate Limit    │  │
  │    IF tokens_used >= monthly_limit → 429 Budget Exceeded         │  │
  │    IF last_analysis < min_interval → 429 Too Soon                │  │
  │                                                                   │  │
  │ 2. LOAD CONTEXT ─────────────────────────────────────────────────┤  │
  │    SELECT lean_canvases WHERE id = canvasId                      │  │
  │    SELECT wizard_answers WHERE session_id = X                    │  │
  │    SELECT clients (limit 50)                                     │  │
  │    SELECT crm_deals (recent 30)                                  │  │
  │    SELECT strategy_agent_memory WHERE canvas_id AND relevance>0.3│  │
  │                                                                   │  │
  │ 3. PHASE A — 3 agents in parallel ───────────────────────────────┤  │
  │    ┌─────────────────────────────────────────────┐               │  │
  │    │  Promise.all([                              │               │  │
  │    │    callGemini("strategy-synthesize", ...)   │→ block updates│  │
  │    │    callGemini("opportunity-detect", ...)    │→ opportunities│  │
  │    │    callGemini("metrics-interpret", ...)     │→ insights     │  │
  │    │  ])                                         │               │  │
  │    └─────────────────────────────────────────────┘               │  │
  │                         │                                         │  │
  │                         ▼                                         │  │
  │ 4. PHASE B — 2 agents in parallel (depend on A) ────────────────┤  │
  │    ┌─────────────────────────────────────────────┐               │  │
  │    │  Promise.all([                              │               │  │
  │    │    callGemini("roadmap-suggest", ...)       │→ suggestions  │  │
  │    │    callGemini("system-recommend-strat", ...)│→ system recs  │  │
  │    │  ])                                         │               │  │
  │    └─────────────────────────────────────────────┘               │  │
  │                         │                                         │  │
  │                         ▼                                         │  │
  │ 5. CONFLICT RESOLUTION ──────────────────────────────────────────┤  │
  │    Deduplicate overlapping recs, rank by confidence               │  │
  │                                                                   │  │
  │ 6. PERSIST (batch inserts) ──────────────────────────────────────┤  │
  │    INSERT INTO strategy_recommendations (pending)                │  │
  │    INSERT INTO strategy_insights                                 │  │
  │    INSERT INTO automation_opportunities                          │  │
  │    INSERT INTO strategy_actions (5 rows, one per agent)          │  │
  │    INSERT INTO strategy_agent_memory (new memories)              │  │
  │    INSERT INTO strategy_signals (fresh metrics)                  │  │
  │    INSERT INTO strategy_events (analysis_complete)               │  │
  │                                                                   │  │
  │ 7. UPDATE BUDGET ────────────────────────────────────────────────┤  │
  │    UPDATE strategy_budgets                                       │  │
  │    SET analyses_today = analyses_today + 1,                      │  │
  │        tokens_used_this_month += total_tokens,                   │  │
  │        last_analysis_at = now()                                  │  │
  │                                                                   │  │
  │ 8. COMPUTE METRICS ──────────────────────────────────────────────┘  │
  │    healthScore, canvasCompleteness, pendingApprovals, etc.          │
  │                                                                      │
  │ RETURN: { insights, opportunities, recommendations, metrics,         │
  │           agentResults: [{ agent, duration_ms, tokens, summary }] }  │
  └──────────────────────────────────────────────────────────────────────┘
```

### 6.4 Recommendation Approval Flow

```
  User clicks "Approve" on a RecommendationCard
         │
         ▼
  ┌─────────────────────────────────┐
  │ strategyApi.approveRecommendation│
  │   (recId, true, comment)        │
  └────────────┬────────────────────┘
               │ POST /strategy/recommendations/:id/approve
               ▼
  ┌────────────────────────────────────────────────────────────────┐
  │ Edge Function:                                                 │
  │                                                                │
  │ 1. requireAuth() → userId                                     │
  │ 2. SELECT strategy_recommendations WHERE id = recId            │
  │ 3. UPDATE approval_status = 'approved',                        │
  │         approved_by = userId, approved_at = now()              │
  │                                                                │
  │ 4. IF recommendation_type == 'canvas_update':                  │
  │    ┌──────────────────────────────────────────────────────┐    │
  │    │ Extract target_block + items from proposed_changes   │    │
  │    │ Load current canvas block items                      │    │
  │    │ Merge proposed items into block                      │    │
  │    │ UPDATE lean_canvases SET [block] = merged_items,     │    │
  │    │        version = version + 1                         │    │
  │    │ INSERT lean_canvas_versions (new snapshot)           │    │
  │    └──────────────────────────────────────────────────────┘    │
  │                                                                │
  │ 5. INSERT strategy_actions (action_type = 'approve')           │
  │ 6. INSERT strategy_events (rec_approved)                       │
  │                                                                │
  │ RETURN: { recommendation, canvas (if updated), version }       │
  └────────────────────────────────────────────────────────────────┘
```

### 6.5 Per-Block "Ask AI" Flow

```
  User clicks "Ask AI" on Problem block
         │
         ▼
  ┌──────────────────────────────┐
  │ strategyApi.synthesizeBlock( │
  │   canvasId, "problem",       │
  │   context                    │
  │ )                            │
  └──────────┬───────────────────┘
             │ POST /strategy/synthesize-block
             ▼
  ┌──────────────────────────────────────────────────────────────┐
  │ Edge Function:                                               │
  │                                                              │
  │ 1. requireAuth()                                             │
  │ 2. SELECT lean_canvases WHERE id = canvasId                  │
  │ 3. SELECT wizard_answers WHERE session_id = canvas.session_id│
  │ 4. Build prompt:                                             │
  │    - Current block items                                     │
  │    - Adjacent block context (solution, customer_segments)    │
  │    - Wizard analysis data                                    │
  │ 5. callGemini("strategy-synthesize-block", ...)              │
  │    └──► ai_cache (check/store, TTL: 4h)                     │
  │    └──► ai_run_logs (audit)                                  │
  │ 6. Parse: 2-4 suggestions with confidence scores             │
  │ 7. INSERT strategy_actions (synthesize-block, tokens, timing)│
  │                                                              │
  │ RETURN: { suggestions: CanvasBlockItem[], rationale: string }│
  └──────────────────────────────────────────────────────────────┘

  (Suggestions shown in UI — user must Accept/Dismiss each one.
   Accept → triggers Block Edit Flow (6.2) to persist.)
```

---

## 7. RLS Policies

All 12 tables use the same RLS pattern — authenticated users have full CRUD. This matches the existing project pattern where edge functions use `adminClient()` (service-role, bypasses RLS) for all operations, and the frontend never queries Supabase directly.

```sql
-- Applied to each of the 12 tables:
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

CREATE POLICY "{table}_select" ON {table}
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "{table}_insert" ON {table}
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "{table}_update" ON {table}
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "{table}_delete" ON {table}
  FOR DELETE TO authenticated USING (true);
```

### Future Enhancement: Row-Level Scoping

In Phase 2, `strategy_roles` enables per-canvas access control:
```sql
-- Example: scope reads to canvases where user has a role
CREATE POLICY "lean_canvases_scoped" ON lean_canvases
  FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM strategy_roles
      WHERE canvas_id = lean_canvases.id
        AND user_id = auth.uid()
    )
  );
```

---

## 8. Indexes & Performance

### Core Indexes (Created in Migration)

| Table | Index | Columns | Type | Purpose |
|-------|-------|---------|------|---------|
| `lean_canvases` | `idx_canvas_session` | `session_id` | B-tree | Lookup by wizard session |
| `lean_canvases` | `idx_canvas_project` | `project_id` | B-tree | Lookup by project |
| `lean_canvases` | `idx_canvas_current` | `is_current` WHERE `is_current = true` | Partial | Fast "get current canvas" |
| `lean_canvas_versions` | (PK + UQ) | `canvas_id, version` | B-tree | Version lookup |
| `strategy_insights` | `idx_insight_canvas` | `canvas_id` | B-tree | Insights per canvas |
| `strategy_insights` | `idx_insight_status` | `status` | B-tree | Filter by status |
| `automation_opportunities` | `idx_opp_canvas` | `canvas_id` | B-tree | Opps per canvas |
| `strategy_recommendations` | `idx_rec_canvas` | `canvas_id` | B-tree | Recs per canvas |
| `strategy_recommendations` | `idx_rec_status` | `approval_status` | B-tree | Filter pending/approved |
| `strategy_actions` | `idx_action_canvas` | `canvas_id` | B-tree | Audit log per canvas |
| `strategy_events` | `idx_event_unprocessed` | `processed, created_at` WHERE `processed = false` | Partial | Event queue |
| `strategy_agent_memory` | `idx_memory_canvas_agent` | `canvas_id, agent_name` | Composite | Memory lookup per agent |
| `strategy_signals` | `idx_signal_canvas` | `canvas_id` | B-tree | Signals per canvas |

### Estimated Row Counts (Per Canvas, After 6 Months)

| Table | Rows | Growth Rate |
|-------|------|-------------|
| `lean_canvases` | 1 | Static (1 per user) |
| `lean_canvas_versions` | 50-200 | ~1-3 per edit session |
| `strategy_insights` | 20-80 | ~5-15 per analysis run |
| `automation_opportunities` | 10-30 | ~3-5 per analysis run |
| `strategy_recommendations` | 30-100 | ~4-8 per analysis run |
| `strategy_actions` | 100-500 | 5 per analysis + 1 per block synthesis |
| `strategy_agent_memory` | 20-100 | ~5 per analysis run |
| `strategy_signals` | 50-200 | ~10 per analysis run |

### Query Hot Paths

1. **Get current canvas:** `SELECT * FROM lean_canvases WHERE user_id = X AND is_current = true LIMIT 1` — uses `idx_canvas_current` partial index
2. **List pending recommendations:** `SELECT * FROM strategy_recommendations WHERE canvas_id = X AND approval_status = 'pending'` — uses `idx_rec_status`
3. **Load agent memory:** `SELECT * FROM strategy_agent_memory WHERE canvas_id = X AND agent_name = Y AND relevance_score > 0.3` — uses `idx_memory_canvas_agent`

---

## 9. Database Functions & Triggers

### 9.1 Auto-Update `updated_at` Trigger

Applied to tables with `updated_at` columns:

```sql
-- Reuse existing trigger function if it exists
CREATE OR REPLACE FUNCTION update_strategy_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_lean_canvases_updated_at
  BEFORE UPDATE ON lean_canvases
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();

CREATE TRIGGER trg_automation_opportunities_updated_at
  BEFORE UPDATE ON automation_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();

CREATE TRIGGER trg_strategy_budgets_updated_at
  BEFORE UPDATE ON strategy_budgets
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();
```

### 9.2 Budget Month Reset (Future — Cron)

Not implemented in Phase 1. Would run monthly via pg_cron:
```sql
-- Reset monthly counters on 1st of each month
UPDATE strategy_budgets
SET tokens_used_this_month = 0,
    analysis_count_this_month = 0,
    budget_month = to_char(now(), 'YYYY-MM')
WHERE budget_month != to_char(now(), 'YYYY-MM');
```

### 9.3 Event Logging (Phase 2 — Triggers)

Not active in Phase 1. Would auto-log events when data changes:
```sql
-- Example: log when a recommendation is approved
CREATE OR REPLACE FUNCTION log_recommendation_approval()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.approval_status = 'pending' AND NEW.approval_status = 'approved' THEN
    INSERT INTO strategy_events (canvas_id, event_type, source_table, source_id, payload)
    VALUES (NEW.canvas_id, 'recommendation_approved', 'strategy_recommendations',
            NEW.id::text, jsonb_build_object('type', NEW.recommendation_type, 'title', NEW.title));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 10. Migration SQL (Copy-Paste Ready)

Run this SQL in the Supabase SQL Editor. It is fully idempotent — safe to run multiple times.

```sql
-- ============================================================================
-- Migration: 20260308120000_create_strategy_engine_tables.sql
-- Purpose:   Create 12 tables for the Lean Strategy Engine (Phase 14)
-- Ref:       /docs/lean/16-supabase-database-plan.md
-- Safety:    CREATE TABLE IF NOT EXISTS — idempotent. No destructive operations.
--            RLS enabled with authenticated CRUD policies.
-- ============================================================================

-- ═══════════════════════════════════════════════════════════════════════════
-- CORE TABLES (6)
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. lean_canvases — Central hub (9 JSONB block columns)
CREATE TABLE IF NOT EXISTS lean_canvases (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id        text,
  project_id        uuid,
  user_id           uuid,
  version           integer     NOT NULL DEFAULT 1,
  is_current        boolean     NOT NULL DEFAULT true,
  problem           jsonb       NOT NULL DEFAULT '[]'::jsonb,
  customer_segments jsonb       NOT NULL DEFAULT '[]'::jsonb,
  value_proposition jsonb       NOT NULL DEFAULT '[]'::jsonb,
  solution          jsonb       NOT NULL DEFAULT '[]'::jsonb,
  channels          jsonb       NOT NULL DEFAULT '[]'::jsonb,
  revenue_streams   jsonb       NOT NULL DEFAULT '[]'::jsonb,
  cost_structure    jsonb       NOT NULL DEFAULT '[]'::jsonb,
  key_metrics       jsonb       NOT NULL DEFAULT '[]'::jsonb,
  unfair_advantage  jsonb       NOT NULL DEFAULT '[]'::jsonb,
  metadata          jsonb       NOT NULL DEFAULT '{}'::jsonb,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_canvas_session ON lean_canvases(session_id);
CREATE INDEX IF NOT EXISTS idx_canvas_project ON lean_canvases(project_id);
CREATE INDEX IF NOT EXISTS idx_canvas_current ON lean_canvases(is_current) WHERE is_current = true;
CREATE INDEX IF NOT EXISTS idx_canvas_user    ON lean_canvases(user_id);

-- 2. lean_canvas_versions — Immutable snapshots
CREATE TABLE IF NOT EXISTS lean_canvas_versions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id       uuid        NOT NULL REFERENCES lean_canvases(id) ON DELETE CASCADE,
  version         integer     NOT NULL,
  snapshot        jsonb       NOT NULL,
  change_summary  text,
  changed_by      text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE(canvas_id, version)
);

-- 3. strategy_insights — AI-generated observations
CREATE TABLE IF NOT EXISTS strategy_insights (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id       uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  session_id      text,
  agent_name      text        NOT NULL,
  insight_type    text        NOT NULL,
  title           text        NOT NULL,
  description     text        NOT NULL,
  priority        text        NOT NULL DEFAULT 'medium',
  impact_score    numeric,
  confidence      numeric,
  data_sources    jsonb       NOT NULL DEFAULT '[]'::jsonb,
  status          text        NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','approved','dismissed','acted_on')),
  action_taken    text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz
);
CREATE INDEX IF NOT EXISTS idx_insight_canvas ON strategy_insights(canvas_id);
CREATE INDEX IF NOT EXISTS idx_insight_status ON strategy_insights(status);

-- 4. automation_opportunities — Scored automation candidates
CREATE TABLE IF NOT EXISTS automation_opportunities (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id          uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  session_id         text,
  title              text        NOT NULL,
  description        text        NOT NULL,
  process_area       text,
  current_state      text,
  proposed_state     text,
  impact_score       integer     NOT NULL DEFAULT 50,
  roi_estimate       text,
  complexity         text        NOT NULL DEFAULT 'medium',
  estimated_weeks    integer,
  estimated_cost     text,
  recommended_system text,
  status             text        NOT NULL DEFAULT 'detected'
                     CHECK (status IN ('detected','evaluating','approved','in_progress','completed','dismissed')),
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_opp_canvas ON automation_opportunities(canvas_id);
CREATE INDEX IF NOT EXISTS idx_opp_status ON automation_opportunities(status);

-- 5. strategy_recommendations — AI recs requiring human approval
CREATE TABLE IF NOT EXISTS strategy_recommendations (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id           uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  session_id          text,
  agent_name          text        NOT NULL,
  recommendation_type text        NOT NULL,
  title               text        NOT NULL,
  rationale           text        NOT NULL,
  proposed_changes    jsonb       NOT NULL DEFAULT '{}'::jsonb,
  approval_status     text        NOT NULL DEFAULT 'pending'
                      CHECK (approval_status IN ('pending','approved','rejected','auto_approved','archived')),
  approved_by         uuid,
  approved_at         timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_rec_canvas ON strategy_recommendations(canvas_id);
CREATE INDEX IF NOT EXISTS idx_rec_status ON strategy_recommendations(approval_status);

-- 6. strategy_actions — Audit log
CREATE TABLE IF NOT EXISTS strategy_actions (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id       uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  session_id      text,
  agent_name      text        NOT NULL,
  action_type     text        NOT NULL,
  input_summary   text,
  output_summary  text,
  tokens_used     integer     NOT NULL DEFAULT 0,
  duration_ms     integer     NOT NULL DEFAULT 0,
  success         boolean     NOT NULL DEFAULT true,
  error_message   text,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_action_canvas ON strategy_actions(canvas_id);
CREATE INDEX IF NOT EXISTS idx_action_agent  ON strategy_actions(agent_name);

-- ═══════════════════════════════════════════════════════════════════════════
-- ADVANCED TABLES (6) — Phase 2 infrastructure, created now for schema parity
-- ═══════════════════════════════════════════════════════════════════════════

-- 7. strategy_events — Event bus (log only in Phase 1)
CREATE TABLE IF NOT EXISTS strategy_events (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id       uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  event_type      text        NOT NULL,
  source_table    text        NOT NULL,
  source_id       text,
  payload         jsonb       NOT NULL DEFAULT '{}'::jsonb,
  processed       boolean     NOT NULL DEFAULT false,
  processed_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_event_unprocessed
  ON strategy_events(processed, created_at) WHERE processed = false;

-- 8. strategy_event_triggers — Agent subscriptions (all disabled Phase 1)
CREATE TABLE IF NOT EXISTS strategy_event_triggers (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type          text        NOT NULL,
  agent_name          text        NOT NULL,
  enabled             boolean     NOT NULL DEFAULT false,
  cooldown_minutes    integer     NOT NULL DEFAULT 60,
  last_triggered_at   timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  UNIQUE(event_type, agent_name)
);

-- 9. strategy_agent_memory — Per-agent context continuity
CREATE TABLE IF NOT EXISTS strategy_agent_memory (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id       uuid        NOT NULL REFERENCES lean_canvases(id) ON DELETE CASCADE,
  agent_name      text        NOT NULL,
  memory_type     text        NOT NULL,
  content         jsonb       NOT NULL,
  relevance_score numeric     NOT NULL DEFAULT 1.0,
  superseded_by   uuid        REFERENCES strategy_agent_memory(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz
);
CREATE INDEX IF NOT EXISTS idx_memory_canvas_agent
  ON strategy_agent_memory(canvas_id, agent_name);

-- 10. strategy_signals — Business metric tracking
CREATE TABLE IF NOT EXISTS strategy_signals (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id        uuid        REFERENCES lean_canvases(id) ON DELETE SET NULL,
  signal_category  text        NOT NULL,
  signal_name      text        NOT NULL,
  value            numeric     NOT NULL,
  previous_value   numeric,
  unit             text        NOT NULL DEFAULT '',
  trend            text        NOT NULL DEFAULT 'stable',
  source           text,
  collected_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_signal_canvas ON strategy_signals(canvas_id);

-- 11. strategy_roles — Multi-user canvas access
CREATE TABLE IF NOT EXISTS strategy_roles (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL,
  canvas_id       uuid        NOT NULL REFERENCES lean_canvases(id) ON DELETE CASCADE,
  role            text        NOT NULL CHECK (role IN ('admin','strategist','viewer')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, canvas_id)
);

-- 12. strategy_budgets — Token budget + rate limiting
CREATE TABLE IF NOT EXISTS strategy_budgets (
  id                           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  canvas_id                    uuid        NOT NULL REFERENCES lean_canvases(id) ON DELETE CASCADE,
  monthly_token_limit          integer     NOT NULL DEFAULT 500000,
  tokens_used_this_month       integer     NOT NULL DEFAULT 0,
  analysis_count_this_month    integer     NOT NULL DEFAULT 0,
  max_analyses_per_day         integer     NOT NULL DEFAULT 5,
  analyses_today               integer     NOT NULL DEFAULT 0,
  last_analysis_at             timestamptz,
  min_analysis_interval_minutes integer    NOT NULL DEFAULT 30,
  budget_month                 text,
  created_at                   timestamptz NOT NULL DEFAULT now(),
  updated_at                   timestamptz NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- RLS POLICIES — Enable on all 12 tables with authenticated CRUD
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'lean_canvases', 'lean_canvas_versions', 'strategy_insights',
    'automation_opportunities', 'strategy_recommendations', 'strategy_actions',
    'strategy_events', 'strategy_event_triggers', 'strategy_agent_memory',
    'strategy_signals', 'strategy_roles', 'strategy_budgets'
  ]
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', tbl);

    -- Drop existing policies if re-running
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', tbl || '_select', tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', tbl || '_insert', tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', tbl || '_update', tbl);
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', tbl || '_delete', tbl);

    -- Create CRUD policies
    EXECUTE format('CREATE POLICY %I ON %I FOR SELECT TO authenticated USING (true)', tbl || '_select', tbl);
    EXECUTE format('CREATE POLICY %I ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl || '_insert', tbl);
    EXECUTE format('CREATE POLICY %I ON %I FOR UPDATE TO authenticated USING (true)', tbl || '_update', tbl);
    EXECUTE format('CREATE POLICY %I ON %I FOR DELETE TO authenticated USING (true)', tbl || '_delete', tbl);
  END LOOP;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- TRIGGERS — Auto-update updated_at timestamps
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_strategy_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lean_canvases_updated_at ON lean_canvases;
CREATE TRIGGER trg_lean_canvases_updated_at
  BEFORE UPDATE ON lean_canvases
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();

DROP TRIGGER IF EXISTS trg_automation_opportunities_updated_at ON automation_opportunities;
CREATE TRIGGER trg_automation_opportunities_updated_at
  BEFORE UPDATE ON automation_opportunities
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();

DROP TRIGGER IF EXISTS trg_strategy_budgets_updated_at ON strategy_budgets;
CREATE TRIGGER trg_strategy_budgets_updated_at
  BEFORE UPDATE ON strategy_budgets
  FOR EACH ROW EXECUTE FUNCTION update_strategy_updated_at();

-- ═══════════════════════════════════════════════════════════════════════════
-- DONE — Verify with: SELECT tablename FROM pg_tables
--        WHERE schemaname = 'public' AND tablename LIKE 'lean_%'
--           OR tablename LIKE 'strategy_%' OR tablename LIKE 'automation_%';
-- ═══════════════════════════════════════════════════════════════════════════
```

---

## 11. Rollback SQL

If the migration needs to be reverted (destroys all strategy data):

```sql
-- ⚠ DESTRUCTIVE — drops all 12 strategy tables and their data
DROP TABLE IF EXISTS strategy_budgets CASCADE;
DROP TABLE IF EXISTS strategy_roles CASCADE;
DROP TABLE IF EXISTS strategy_signals CASCADE;
DROP TABLE IF EXISTS strategy_agent_memory CASCADE;
DROP TABLE IF EXISTS strategy_event_triggers CASCADE;
DROP TABLE IF EXISTS strategy_events CASCADE;
DROP TABLE IF EXISTS strategy_actions CASCADE;
DROP TABLE IF EXISTS strategy_recommendations CASCADE;
DROP TABLE IF EXISTS automation_opportunities CASCADE;
DROP TABLE IF EXISTS strategy_insights CASCADE;
DROP TABLE IF EXISTS lean_canvas_versions CASCADE;
DROP TABLE IF EXISTS lean_canvases CASCADE;
DROP FUNCTION IF EXISTS update_strategy_updated_at() CASCADE;
```

---

## 12. Post-Migration Verification

Run these queries after executing the migration to confirm everything is correct:

```sql
-- 1. Verify all 12 tables exist
SELECT tablename FROM pg_tables
WHERE schemaname = 'public'
  AND (tablename LIKE 'lean_%' OR tablename LIKE 'strategy_%' OR tablename LIKE 'automation_%')
ORDER BY tablename;
-- Expected: 12 rows

-- 2. Verify RLS is enabled on all tables
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname = 'public'
  AND (tablename LIKE 'lean_%' OR tablename LIKE 'strategy_%' OR tablename LIKE 'automation_%')
ORDER BY tablename;
-- Expected: all rowsecurity = true

-- 3. Verify policies exist (4 per table = 48 total)
SELECT tablename, policyname FROM pg_policies
WHERE schemaname = 'public'
  AND (tablename LIKE 'lean_%' OR tablename LIKE 'strategy_%' OR tablename LIKE 'automation_%')
ORDER BY tablename, policyname;
-- Expected: 48 rows (4 policies x 12 tables)

-- 4. Verify indexes
SELECT indexname, tablename FROM pg_indexes
WHERE schemaname = 'public'
  AND (tablename LIKE 'lean_%' OR tablename LIKE 'strategy_%' OR tablename LIKE 'automation_%')
ORDER BY tablename, indexname;
-- Expected: ~15 indexes

-- 5. Verify triggers
SELECT trigger_name, event_object_table FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name LIKE 'trg_%strategy%' OR trigger_name LIKE 'trg_lean%' OR trigger_name LIKE 'trg_automation%'
ORDER BY event_object_table;
-- Expected: 3 triggers

-- 6. Verify foreign keys
SELECT tc.constraint_name, tc.table_name, kcu.column_name,
       ccu.table_name AS foreign_table_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND (tc.table_name LIKE 'lean_%' OR tc.table_name LIKE 'strategy_%' OR tc.table_name LIKE 'automation_%')
ORDER BY tc.table_name;
-- Expected: ~12 foreign keys

-- 7. Total platform table count
SELECT count(*) FROM pg_tables WHERE schemaname = 'public';
-- Expected: 44 (32 existing + 12 new)
```
