# AMO AI — Product Requirements Document

**Version:** 3.0
**Date:** 2026-03-07
**Status:** Active
**Stack:** React 18 + TypeScript + Vite 6 + Supabase + Tailwind CSS v4

---

## 1. Product Vision

AMO AI is a premium, wizard-first AI consulting platform that guides businesses through structured discovery into actionable projects. The product behaves like a digital consultant — observant, structured, transparent, and human-controlled.

**Core flow:** Wizard onboarding (5 screens) -> Executive brief -> Project dashboard -> Ongoing delivery

**Philosophy:** Structure first. Intelligence second. Automation last.

**Core principle:** AI proposes, human decides. Never surprise the user. Never auto-commit changes. Always explain reasoning. Always show previews.

---

## 2. Target Users

### Client (Business User)

**Profile:** Owner, CEO, or operations lead at a service business (50-500 employees).
**Pain:** Know AI matters but don't know where to start. Lack technical expertise. Overwhelmed by options.
**Goal:** Turn an unclear business idea into a structured AI strategy and funded project.
**Journey:** Marketing site -> Signup -> 5-step wizard (~10 min) -> Approve brief -> Track project via dashboard.

### Agency User (Consultant / Owner)

**Profile:** AI consultant or agency owner delivering transformation services to multiple clients.
**Pain:** Need tools to deliver services at scale. Manual client management. No structured discovery process.
**Goal:** Manage client relationships, deliver projects on time, grow revenue.
**Journey:** Morning KPI check -> Pipeline management -> Project delivery -> Task execution -> Analytics review.

### Guest User (Anonymous)

**Profile:** Curious visitor exploring the wizard without commitment.
**Pain:** Doesn't want to create an account just to see the value.
**Goal:** Complete the wizard in guest mode, see results, then decide to sign up.
**Journey:** Landing page -> "Begin Diagnostics" -> Wizard in guest mode (localStorage) -> Sign up to persist.

---

## 3. Tech Stack

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | React 18.3 + TypeScript 5 |
| Build | Vite 6 (SWC plugin) |
| Routing | React Router v7+ (`createBrowserRouter`) |
| Styling | Tailwind CSS v4 (pre-compiled in `src/index.css`) |
| Components | shadcn/ui (48 base components on Radix UI) |
| Variants | CVA (class-variance-authority) |
| Utility | `cn()` — clsx + tailwind-merge (`src/components/ui/utils.ts`) |
| Animation | Motion library |
| Charts | Recharts |
| Forms | React Hook Form |
| Carousels | Embla Carousel, React Slick |
| Deployment | Vercel (SPA rewrite rules) |

### Backend

| Layer | Technology |
|-------|-----------|
| Database | Supabase PostgreSQL (58+ tables, RLS on all) |
| Auth | Supabase Auth (email/password, Google OAuth, LinkedIn OAuth) |
| Edge Functions | Deno runtime (17 functions) |
| Storage | Supabase Storage (documents) |
| Realtime | Supabase Realtime (WebSocket channels) |
| Vector Search | pgvector (RAG, 768/1536 dimensions) |

### AI

| Layer | Technology |
|-------|-----------|
| Primary Model (reasoning) | `gemini-3.1-pro-preview` — 1M tokens, complex reasoning, scoring |
| Primary Model (speed) | `gemini-3-flash-preview` — 1M tokens, fast, multimodal |
| Cost Model | `gemini-3.1-flash-lite-preview` — 1M tokens, high-frequency tasks |
| Image Model | `gemini-3.1-flash-image-preview` — image generation (Nano Banana 2) |
| Image Model (pro) | `gemini-3-pro-image-preview` — professional image generation |
| Embeddings | `gemini-embedding-001` — vector representations |
| Deep Research | `deep-research-pro-preview-12-2025` — multi-step research agent |
| SDK | `@google/genai` >= 1.33.0 |
| API | Interactions API (stateful), generateContent REST (simple calls) |

### Payments

| Layer | Technology |
|-------|-----------|
| Provider | Stripe (Checkout, Subscriptions, Connect, Invoicing) |

---

## 4. Design System

| Element | Specification |
|---------|--------------|
| Primary dark | `#0A211F` (dark teal) |
| Primary accent | `#84CC16` (lime green) |
| Background warm | `#F1EEEA` (beige) |
| Background white | `#FFFFFF` |
| Border | `#D4CFC8` |
| Heading font | Playfair Display (serif) — Google Fonts |
| Body font | Lora (serif) — Google Fonts |
| Max content width | 1200px (site), 640px (wizard center panel) |
| Card radius | 4px or 8px max |
| Input height | 48px |
| Spacing unit | 8px |
| Shadows | None (use borders) |
| Gradients | None |
| Section pattern | `max-w-[1200px] mx-auto px-6` |
| Navigation | Pill-shaped container, sticky positioning |

---

## 5. Layouts

### Three-Panel Layout (Wizard Steps 1-4)

| Panel | Width | Role | Content |
|-------|-------|------|---------|
| Left | 240px fixed | Context (read-only) | Progress stepper, context signals, saved selections |
| Center | flex-1, max 640px | Work (human-first) | Forms, questions, selections, decisions |
| Right | 320px fixed | Intelligence (read-only) | AI reasoning, explanations, trade-offs, previews |

**Responsive:** Mobile = single-column (center only, panels collapse). Tablet = two-panel (center + right). Desktop = three-panel.

### Step 5 Exception

Centered single-column layout, max-width 800px. No three-panel. Project summary card.

### Dashboard Layout (Post-Wizard)

Standard sidebar + main content area. No three-panel. Dashboards should feel familiar, not novel.

---

## 6. Screens & Routes

### 6.1 Public Marketing Site (Done)

| Route | Screen |
|-------|--------|
| `/` | Landing page (HomePageV3) |
| `/solutions` | Solutions overview |
| `/industries/*` | Industry vertical pages |
| `/about` | Company info |
| `/process` | Process overview |
| `/projects` | Case studies |
| `/agents` | AI agents showcase |
| `/chatbots` | Chatbot services |
| `/booking` | Consultation scheduling |

23 routes total. Multi-page SPA. All complete.

### 6.2 Auth & Entry

**`/auth` — Login / Signup**

Split-screen layout (desktop 1440px):
- Left half (50%, `#0A211F`): Logo, value proposition, minimal pattern
- Right half (50%, white): Centered form container (max 380px)

Components:
- Tab toggle: "Sign In" | "Create Account"
- Sign In: Email, password (show/hide), forgot password link, Sign In button, Google OAuth, GitHub OAuth
- Create Account: Full name, email, password (strength indicator), company name, Create button, terms link
- Responsive: Mobile stacks left as 120px header; tablet 40/60; desktop 50/50

**`/app` — Post-Auth Routing**

Brief transition (1-2 seconds), then route:
1. No organization -> create org
2. Incomplete wizard_session -> resume at current_step
3. Completed project -> go to `/app/dashboard`
4. Default -> start wizard at `/app/wizard/step-1`

**`/app/welcome` — First-Time Welcome**

Centered, max-width 680px. 3 expectation cards explaining the wizard process. "Begin Your AI Strategy" CTA.

### 6.3 Wizard (5 Steps)

#### Step 1 — Business Context (`/app/wizard/step-1`)

**Purpose:** Collect company information and trigger AI analysis of their business.

**Center panel — 7 fields:**

| Field | Type | Validation |
|-------|------|-----------|
| Company Name | Text input | Required, 2-100 chars |
| Website URL | URL input | Optional, valid URL format |
| Industry | Dropdown (8 options) | Required |
| Company Size | Dropdown (5 ranges) | Required |
| Primary Goals | Multi-select chips (6 options) | Required, 1-3 selections |
| Timeline | Dropdown (4 options) | Required |
| Budget Range | Dropdown (5 ranges) | Required |

**AI behavior — triggered on URL blur:**
- `analyze-business` Edge Function fires with URL Context + Google Search
- URL Context reads full website content (HTML, PDF, images up to 34MB)
- Google Search discovers market context, competitors, industry trends
- Results cached in `ai_cache` table
- Right panel updates: static guidance -> "Analyzing..." skeleton -> Company Analysis card (industry, services, market position, competitors)

**Fallback chain:** URL Context fails -> Google Search only -> static guidance

**Left panel:** Context card showing saved field values (company name, industry, size)
**Right panel:** Before analysis = static guidance ("What to expect"). After analysis = Company Analysis card.

**Auto-save:** 500ms debounce -> UPSERT to `wizard_answers.data` (JSONB). Save indicator: "Saving..." then "Saved".
**Continue:** Enabled when all required fields valid.

#### Step 2 — Industry Diagnostics (`/app/wizard/step-2`)

**Purpose:** Ask industry-specific diagnostic questions and detect business signals.

**Center panel:** 8 questions loaded from industry pack based on Step 1 industry selection. Question types: single-select, multi-select, slider, text area. Each question has an "explain why" tooltip.

**AI behavior:**
- `generate-diagnostics` Edge Function generates questions from industry pack
- `extractor` agent identifies pain points and opportunity signals from answers
- Signal detection runs in real-time as user answers

**Left panel:** Detected signals badge list (e.g., "Manual CRM", "No automation", "Growth bottleneck")
**Right panel:** Per-question context explaining WHY each question matters for their industry. Updates as user navigates questions.

**On Step 2 completion:** Background `analyze-diagnostics` Edge Function fires (async), caches results in `ai_cache` for Step 3. User proceeds immediately — no blocking.

**Auto-save:** Same 500ms debounce pattern. All answers persisted.
**Continue:** Enabled when all 8 questions answered.

#### Step 3 — System Recommendations (`/app/wizard/step-3`)

**Purpose:** Present AI-ranked system recommendations. User selects 1-5 systems.

**Center panel:** Recommendation cards (3-5 cards), each showing:
- System name and icon
- Priority rank (1-5)
- "Why it fits" — 3 personalized bullets based on diagnostic answers
- Estimated impact (High / Medium / Low)
- Investment tier indicator
- Selection toggle (checkbox or card highlight)
- Optional notes field per system

**AI behavior:**
- `recommend-systems` Edge Function (Pro model, Thinking Mode high)
- Loads from `ai_cache` (populated by Step 2 completion) or runs synchronously if cache miss
- `optimizer` agent refines cost/effort scoring

**Left panel:** Selection count, total estimated investment, selected system names
**Right panel:** Live summary updating as user selects/deselects — shows selection count, combined impact assessment, investment tier summary, complementarity analysis

**Auto-save:** Selections saved as they change.
**Continue:** Enabled when 1-5 systems selected.

#### Step 4 — Executive Brief (`/app/wizard/step-4`)

**Purpose:** AI generates a comprehensive executive brief. User reviews, edits, and approves.

**Center panel:** Document-style view with sections:
- Executive Summary
- Business Analysis (from Step 1 data + AI research)
- Diagnostic Findings (from Step 2 signals)
- Recommended Systems (from Step 3 selections)
- Implementation Roadmap (3-phase, 12-18 month plan)
- Expected Outcomes & ROI projections
- Readiness Score (0-100, with breakdown)

Each section is inline-editable. Version history tracked in `brief_versions` table.

**AI behavior — 3 agents generate the brief:**

| Agent | Model | Output |
|-------|-------|--------|
| `scorer` | Pro (Thinking high) | Readiness score (0-100) with dimension breakdown |
| `summary` | Pro (Thinking high) | Executive narrative across all sections |
| `generate-roadmap` | Pro (Thinking high) | 3-phase roadmap with milestones, tasks, KPIs |

**Brief approval flow:**
1. AI generates brief (status: `draft`, version: 1)
2. User reviews each section
3. User can inline-edit any section -> creates new version snapshot
4. User clicks "Request Changes" -> status: `in_review`
5. User clicks "Approve Brief" -> status: `approved`, Continue enabled
6. On continue -> project creation begins at Step 5

**Left panel:** Brief status indicator, version number, section completion checkmarks
**Right panel:** AI reasoning for each section — why this score, why this recommendation, data sources used

**Continue:** Enabled only when brief status = `approved`.

#### Step 5 — Launch Project (`/app/wizard/step-5`)

**Purpose:** Create the project from approved brief and transition to dashboard.

**Layout:** Centered single-column (no three-panel), max-width 800px.

**Center panel:** Project summary card showing:
- Company name and industry
- Selected systems (from Step 3)
- Readiness score (from Step 4)
- Roadmap overview (3 phases with names and durations)
- Staggered checklist animation showing creation progress:
  - Creating project...
  - Saving context snapshot...
  - Building roadmap...
  - Generating tasks...
  - Setting up services...
- "Enter Your Dashboard" CTA (enabled after all items complete)

**AI behavior:**
- `task-generator` Edge Function creates 12 initial tasks (3-5 per phase)
- Tasks are contextually relevant to selected systems and industry

**Data created on Step 5:**
- `projects` row (status, phase, progress)
- `context_snapshots` row (versioned wizard data)
- `roadmaps` row (duration, ROI projection)
- `roadmap_phases` rows (3 phases)
- `tasks` rows (12 AI-generated tasks)
- `project_systems` rows (selected systems)
- `project_services` rows (system-to-service mappings)

### 6.4 Client Dashboard

| Route | Screen | Description |
|-------|--------|-------------|
| `/app/dashboard` | Overview | Project status, phase progress, task completion %, milestones, AI insights |
| `/app/dashboard/brief` | Brief | Full brief document viewer, inline editing, version history, PDF export |
| `/app/dashboard/roadmap` | Roadmap | 3-phase timeline, milestone markers, deliverable tracking, progress bars |
| `/app/dashboard/tasks` | Tasks | Kanban board + list toggle, filter by phase/status/owner, task detail slide-over |
| `/app/dashboard/documents` | Documents | File upload to Supabase Storage, document list with metadata |
| `/app/dashboard/billing` | Billing | Invoice list, payment status, subscription management (Stripe) |

Layout: Standard sidebar + main content. No three-panel.

### 6.5 Agency Dashboard

| Route | Screen | Description |
|-------|--------|-------------|
| `/admin` | Overview | Executive KPIs (10-second health check): clients, projects, revenue, pipeline, velocity |
| `/admin/clients` | Clients | Client list with health scores (0-100), detail view, activity timeline |
| `/admin/pipeline` | Pipeline | Deal kanban (Lead -> MQL -> Discovery -> Negotiating -> Won/Lost), CRM intelligence |
| `/admin/projects` | Projects | Project list by phase, delivery tracking, team task board |
| `/admin/tasks` | Tasks | Daily execution board for team, workload view |
| `/admin/wizards` | Wizards | Wizard session management, review client discovery data |
| `/admin/analytics` | Analytics | Revenue trends, conversion funnel, AI token usage, completion rates |
| `/admin/settings` | Settings | Org profile, team members, roles, service catalog, integrations |

Additional admin routes (lower priority): `/admin/roadmaps`, `/admin/documents`, `/admin/systems`, `/admin/ai-logs`, `/admin/invoices`, `/admin/team`.

Layout: Admin sidebar + main content. Role-based guards (Owner, Consultant only).

---

## 7. AI Agents

### 7.1 Agent Architecture

All AI calls go through Supabase Edge Functions. No client-side Gemini calls. Each agent has:
- A dedicated Edge Function
- A system instruction prompt
- Model selection (Pro for reasoning, Flash for speed)
- Thinking level configuration (minimal / low / medium / high)
- Structured output schema (JSON)
- Error handling and retry logic

### 7.2 Wizard Agents (Steps 1-5)

| Agent | Model | Thinking | Tools | Screen | Trigger |
|-------|-------|----------|-------|--------|---------|
| analyze-business | Flash | low | URL Context, Google Search | Step 1 | On URL blur (debounced) |
| analyst | Flash | low | Google Search | Step 1 | With analyze-business |
| generate-diagnostics | Flash | low | — | Step 2 | On step load |
| extractor | Flash | low | — | Step 2 | Real-time on answer change |
| recommend-systems | Pro | high | — | Step 3 | On step load (from cache or sync) |
| optimizer | Pro | high | — | Step 3 | With recommend-systems |
| scorer | Pro | high | — | Step 4 | On step load |
| summary | Pro | high | — | Step 4 | On step load |
| generate-roadmap | Pro | high | — | Step 4 | On step load |
| task-generator | Flash | medium | — | Step 5 | On project creation |

### 7.3 Dashboard Agents

| Agent | Model | Thinking | Purpose |
|-------|-------|----------|---------|
| assistant | Flash | low | Client concierge chat (RAG-powered) |
| intelligence-stream | Flash | low | Real-time streaming updates to all dashboards |
| task-generator | Flash | medium | Creates actionable tasks from project context |

### 7.4 Agency Agents

| Agent | Model | Thinking | Purpose |
|-------|-------|----------|---------|
| crm-intelligence | Flash | low | Lead health scoring, deal probability, risk alerts |
| planner | Pro | high | Strategic agency oversight, resource allocation |
| orchestrator | Flash | medium | Agent coordination via Function Calling |
| analytics | Pro | high | Financial BI, revenue forecasting |
| monitor | Pro | high | Predictive velocity tracking, deadline alerts |

### 7.5 Gemini Tools Used

| Tool | Declaration | Used By |
|------|------------|---------|
| Google Search | `{ googleSearch: {} }` | analyze-business, analyst |
| URL Context | `{ urlContext: {} }` | analyze-business |
| Structured Output | `responseMimeType: 'application/json'` + `responseJsonSchema` | All agents |
| Thinking Mode | `thinkingConfig: { thinkingLevel: 'high' }` | Pro agents |
| Function Calling | `functionDeclarations: [...]` | orchestrator |
| Streaming (SSE) | Interactions API with `stream: true` | intelligence-stream |

### 7.6 Not Yet Used (Planned)

| Tool | Priority | Opportunity |
|------|----------|-------------|
| Context Caching | P2 | Cache system prompts across 17 agents for cost reduction |
| Code Execution | P3 | Financial model validation in executive brief |
| Document Processing | P2 | PDF upload in wizard Step 1 |
| Thought Signatures | P1 | Required for multi-turn function calling (orchestrator) |
| File Search | P3 | Alternative to custom RAG pipeline |
| Remote MCP | P3 | Connect external tools to agents |
| Interactions API (stateful) | P2 | Server-side state for assistant chat, streaming |

---

## 8. Data Model

### 8.1 Core Tables (58+)

**Authentication & Organization:**
- `organizations` — root tenant (all data scoped by `org_id`)
- `profiles` — user profiles (linked to `auth.users`)
- `team_members` — org membership with roles (Owner, Consultant, Client)

**Wizard Data:**
- `wizard_sessions` — session tracking (current_step, timestamps)
- `wizard_answers` — JSONB data per step (auto-saved, 500ms debounce)
- `documents` — uploaded files (wizard + project)

**Projects & Delivery:**
- `projects` — client projects (status, phase, progress)
- `context_snapshots` — versioned project context from wizard
- `roadmaps` — project roadmaps (duration, ROI projection)
- `roadmap_phases` — phased deliverables (3 phases typical)
- `tasks` — project tasks (status, owner, priority, ai_generated flag)
- `project_systems` — selected systems per project
- `project_services` — system-to-service mappings

**Briefs:**
- `briefs` — executive summaries (content JSONB, status, version)
- `brief_versions` — version snapshots for audit trail

**AI & Intelligence:**
- `ai_cache` — cached AI outputs (keyed by operation + context hash)
- `ai_run_logs` — audit trail (agent, model, tokens, latency, result)
- `agent_configs` — agent configuration and prompt management

**Systems & Services:**
- `systems` — available AI systems catalog
- `services` — 98 granular services across 15 families
- `system_services` — system-to-service junction

**CRM (Agency):**
- `contacts` — client contacts
- `deals` — sales pipeline deals (stages: Lead, MQL, Discovery, Negotiating, Won, Lost)
- `communications` — interaction history
- `leads` — prospect records

**Knowledge (RAG):**
- `knowledge_documents` — uploaded documents for RAG
- `knowledge_chunks` — embedded chunks with pgvector

**Industry:**
- `industry_playbooks` — domain knowledge per vertical
- `prompt_packs` — reusable prompt templates

**Chat:**
- `chat_sessions` — conversational history
- `chat_messages` — individual messages

**Billing:**
- `subscriptions` — Stripe subscription records
- `invoices` — invoice records

### 8.2 Key Design Principles

- Multi-tenant isolation: `org_id` on all tables, enforced by RLS
- Row Level Security enabled on every table
- JSONB for flexible data (wizard_answers, brief content, agent configs)
- Integer cents for monetary precision
- Version tracking for briefs and snapshots
- All Edge Functions verify JWT (Authorization header)

### 8.3 Auto-Save Pattern

All wizard steps use the same persistence pattern:
1. User changes a field
2. 500ms debounce timer resets
3. After debounce: UPSERT to `wizard_answers.data` (JSONB)
4. Left panel context card updates in real-time
5. Save indicator: "Saving..." then "Saved"
6. On return visit: all fields pre-filled from saved data

---

## 9. Industry Packs

8 industry verticals, each with a 7-layer structure:

| Layer | Content |
|-------|---------|
| 1. Core Identity | Industry name, description, key characteristics |
| 2. Diagnostics | 8 industry-specific questions for wizard Step 2 |
| 3. System Mappings | Which AI systems are most relevant for this industry |
| 4. Agent Briefs | Industry context injected into agent system prompts |
| 5. Enhanced Metadata | Market size, trends, competitive landscape |
| 6. Terminology | Industry-specific terms and definitions |
| 7. Maturity Levels | What AI maturity looks like at each stage (1-5) |

**Verticals:**
1. Fashion & Retail
2. Real Estate
3. SaaS Companies
4. Events & Hospitality
5. E-commerce
6. Agencies (Marketing, Creative)
7. Professional Services (Legal, Consulting, Accounting)
8. Generic (fallback for unmatched industries)

**Status:** 6 of 8 complete. Layers 1-3 done for all. Layers 4-7 in progress.

---

## 10. Services Catalog

98 services across 15 families:

| Family | Example Services |
|--------|-----------------|
| Strategy | AI readiness assessment, digital transformation roadmap |
| CRM | Lead scoring, pipeline automation, contact enrichment |
| WhatsApp | Chatbot setup, broadcast campaigns, order notifications |
| Social Media | Content scheduling, engagement automation, analytics |
| Content | Blog generation, product descriptions, email copy |
| Onboarding | Welcome sequences, user activation, tutorial generation |
| Operations | Workflow automation, document processing, reporting |
| Compliance | Data privacy audit, policy generation, risk monitoring |
| Booking | Calendar integration, appointment automation, reminders |
| Data | Analytics dashboards, data pipeline, business intelligence |
| Loyalty | Reward programs, churn prediction, retention campaigns |
| Sales | Proposal generation, follow-up automation, forecasting |
| Support | Ticket triage, knowledge base, chatbot training |
| Recommendations | Product recommendations, content personalization |
| Growth | A/B testing, conversion optimization, referral programs |

Each service maps to systems (via `system_services`) and industries (relevance scoring).

---

## 11. Workflows

### 11.1 Prospect to Client (Wizard Flow)

1. User visits `/auth` — signs up or logs in
2. Post-auth routing checks org, wizard sessions, projects — routes accordingly
3. Step 1 — provides business context (7 fields). URL analysis fires on URL blur.
4. Step 2 — answers 8 industry-specific diagnostic questions. Signals detected in real-time.
5. On Step 2 completion — background Edge Function analyzes diagnostics, caches in `ai_cache`
6. Step 3 — AI-ranked system recommendations displayed. User selects 1-5 systems.
7. Step 4 — AI generates executive brief. User reviews, edits inline, approves.
8. Step 5 — project created (project, snapshot, roadmap, phases, tasks, services). User enters dashboard.

### 11.2 Brief Approval Flow

1. AI generates brief (status: `draft`, version: 1)
2. User reviews each section
3. Inline edit -> new version snapshot in `brief_versions`
4. "Request Changes" -> status: `in_review`
5. "Approve Brief" -> status: `approved`, Continue button enabled
6. Continue -> project creation at Step 5

### 11.3 AI Processing Pipeline

| Step | Agent | Trigger | Output |
|------|-------|---------|--------|
| Step 1 | analyze-business | URL blur | Company analysis -> `ai_cache` -> right panel |
| Step 2 | analyze-diagnostics | Step 2 completion | Diagnostic analysis -> `ai_cache` |
| Step 3 | recommend-systems | Step 3 load | System cards (from cache or sync) |
| Step 4 | scorer + summary + generate-roadmap | Step 4 load | Brief document |
| Step 5 | task-generator | Project creation | 12 tasks across 3 phases |

### 11.4 Client Dashboard (Post-Wizard)

1. View project overview with KPIs
2. Review approved strategy brief
3. Track roadmap phases and milestones
4. Manage tasks (view status, mark complete)
5. Upload and manage project documents
6. Monitor billing and invoices

### 11.5 Agency Operations

1. Overview: 10-second business health check (KPIs)
2. Pipeline: track deals through stages (kanban)
3. Projects: monitor active deliveries by phase
4. Tasks: daily execution board for team
5. Wizards: review client discovery data
6. Analytics: revenue, conversion, AI usage metrics

---

## 12. Authentication & Security

### 12.1 Auth Methods

- Email / password with Supabase Auth
- Google OAuth
- LinkedIn OAuth
- Password reset (email link)
- Email verification
- Session persistence and refresh token handling

### 12.2 Access Control

| Role | Access |
|------|--------|
| Owner | Full agency dashboard + all client data |
| Consultant | Agency dashboard (assigned clients only) |
| Client | Own project dashboard only |
| Guest | Wizard only (localStorage, no persistence) |

### 12.3 Security

- Multi-tenant isolation: RLS policies enforce `org_id` scoping on all tables
- JWT verification on all Edge Functions (Authorization header)
- API keys in Edge Functions only (never in client code)
- All connections encrypted (HTTPS/TLS)
- Sensitive data masked in logs
- Rate limiting on auth endpoints

---

## 13. Revenue Model

### 13.1 Pricing Tiers

| Tier | Target | Price Range |
|------|--------|-------------|
| Starter | Small businesses (1-50 employees) | $99-$299/month |
| Professional | Mid-market (51-200 employees) | $299-$999/month |
| Enterprise | Large businesses (200+ employees) | Custom pricing |

### 13.2 Revenue Streams

| Stream | Model | Range |
|--------|-------|-------|
| Consultations | One-time | $500-$2,000 |
| Implementations | Project-based | $5,000-$100,000+ |
| SaaS Subscriptions | Recurring monthly | $99-$999/month |
| WhatsApp Automation | Usage-based | $0.002-$0.005/message |
| Premium Support | Tiered SLA | $299-$2,499/month |

### 13.3 Stripe Integration

- Checkout Sessions for one-time payments
- Subscriptions for recurring billing
- Connect for marketplace payments
- Invoicing for enterprise clients
- Webhooks for payment event processing

---

## 14. Performance Requirements

### 14.1 Response Times

| Operation | Target |
|-----------|--------|
| Wizard step load | < 2 seconds |
| Flash agent response | < 3 seconds |
| Pro agent response (Thinking) | < 15 seconds |
| Dashboard load | < 2 seconds |
| Edge Function (95th percentile) | < 3 seconds |
| Database query (95th percentile) | < 500ms |
| Auto-save round-trip | < 1 second |

### 14.2 Scalability Targets

| Metric | Target |
|--------|--------|
| Concurrent users | 1,000+ |
| Wizard sessions / month | 10,000+ |
| AI requests / month | 100,000+ |
| Organizations | 100+ |
| Uptime | 99.9% |

---

## 15. Implementation Status

### 15.1 Completed

| Feature | Notes |
|---------|-------|
| Marketing website | 23 routes, multi-page SPA |
| Design system | Brand, typography, colors, components |
| Wizard screen specs (all 5) | Figma Make prompts, content data, workflows |
| Wizard mermaid diagrams | 10 diagram files |
| Auth & entry screen spec | Login/signup, post-auth routing |
| Database schema | 58+ tables, RLS policies, 43+ migrations |
| Edge Functions (deployed) | 17+ functions on Supabase |
| Gemini AI skills | Updated to current models |
| Task index | 51 tasks across 13 areas |

### 15.2 In Progress

| Feature | Status |
|---------|--------|
| Wizard frontend (Steps 1-2) | ~90-95% UI |
| Wizard frontend (Steps 3-5) | ~40-60% UI |
| AI agent connections | ~25% (Edge Functions exist, frontend calls incomplete) |
| Client dashboard | ~20% (basic layout) |
| Industry packs | ~75% (6/8 complete) |

### 15.3 Not Started

| Feature | Priority |
|---------|----------|
| Auth screens (login, signup, OAuth) | P0 |
| Agency dashboard | P1 |
| Chatbot system (widget + Cmd+K) | P2 |
| Revenue/billing (Stripe) | P2 |
| RAG/knowledge base | P3 |
| Mobile optimization | P3 |
| Testing infrastructure | P3 |

### 15.4 Build Order (Critical Path)

```
Infrastructure (001-004) -> Auth (005-007) -> Wizard Shell (008)
    -> Steps 1-5 (009-014) -> Client Dashboard (017-023)
        -> Agency Dashboard (024-028)
```

Parallel tracks:
- Industry Packs (015-016) — needs DB only
- Services Catalog (037-040) — needs DB only
- Chatbot (034-036) — needs Edge Functions only
- Revenue (041-043) — needs Stripe setup

Full task index: `tasks/index-progress.md` (51 tasks)

---

## 16. Success Metrics

### 16.1 Product

| Metric | Target |
|--------|--------|
| Wizard completion rate | 90%+ |
| Average wizard time | < 15 minutes |
| Recommendation relevance | 80%+ users find relevant |
| User satisfaction | 4.5+ / 5 |
| Daily active users (of monthly) | 60%+ |

### 16.2 AI Quality

| Metric | Target |
|--------|--------|
| Structured output accuracy | 95%+ |
| Token efficiency per wizard session | < 50K tokens |
| Cost per wizard session | < $0.50 |
| Flash response time | < 3 seconds |
| Pro + Thinking response time | < 15 seconds |

### 16.3 Technical

| Metric | Target |
|--------|--------|
| Page load time | < 2 seconds |
| Error rate | < 1% |
| Uptime | 99.9% |
| Bug rate | < 1 per 1000 sessions |
| Security incidents | Zero |

---

## 17. Risks

### Technical

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Gemini API rate limits or downtime | Medium | Caching (`ai_cache`), retry with exponential backoff, fallback responses |
| Edge Function cold starts | Low | Keep-alive, function warming, caching |
| Database performance at scale | Medium | Index optimization, read replicas, query tuning |
| Model deprecation | High | Pin to current models, monitor notices, skill files track model IDs |

### Product

| Risk | Impact | Mitigation |
|------|--------|-----------|
| AI recommendations not relevant | High | Industry packs, user feedback loops, A/B testing prompts |
| Wizard too complex | Medium | 5-step limit, progress indicators, auto-save, guest mode |
| Low conversion wizard to paid | High | Clear value in Step 3-4 (personalized recommendations + brief) |

### Business

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Low adoption | High | Content marketing, referral program, free wizard trial |
| High customer acquisition cost | Medium | SEO, partnerships, word-of-mouth from wizard value |
| Competition | Medium | Industry specialization, superior wizard UX, end-to-end workflow |

---

## 18. File References

| Path | Contents |
|------|----------|
| `tasks/wizard/prompts/` | 7 wizard screen spec files (with frontmatter) |
| `tasks/wizard/mermaid-wizard/` | 10 mermaid diagram files |
| `tasks/index-progress.md` | Master task index (51 tasks, build order) |
| `tasks/summary.md` | Project summary with all features and workflows |
| `tasks/tasks-template.md` | Task template for creating new task files |
| `plan/prd.md` | Previous PRD draft (v2.0) |
| `plan/plan/` | Detailed planning docs (auth, agents, data, revenue, etc.) |
| `plan/prompts/` | Draft prompts (wizard, dashboards, agents, chatbots) |
| `.claude/skills/gemini-api-dev/SKILL.md` | Gemini API skill (current models) |
| `.claude/skills/gemini-interactions-api/SKILL.md` | Interactions API skill |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 3.0 | 2026-03-07 | Complete rewrite from current project state. Corrected: models (3.1-pro, 3-flash), table count (58+ not 30), wizard steps (5 with correct names), design system (teal/lime/beige not navy/gold), agent count (17 not 48+), services (98 not 50). Added: URL Context + Google Search, auto-save pattern, brief approval flow, Interactions API, three-panel layout specs, implementation status. |
| 2.0 | 2025-01-27 | Previous draft based on early planning docs |
| 1.0 | 2025-01-01 | Initial PRD |
