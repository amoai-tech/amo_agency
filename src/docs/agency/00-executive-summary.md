# Executive Summary — Agency Agents Integration

**Document:** 00 of Agency Agents series
**Version:** 1.0
**Created:** 2026-03-12
**Status:** Planning

---

## What We Are Building

AMO AI gets an AI agent layer. Instead of one generic AI generating recommendations, each client gets a curated team of specialist AI agents matched to their industry, goals, and company size.

The integration touches 3 areas:

```
WIZARD (enhance)          DASHBOARD (enhance)         NEW SCREENS (build)
  Step 3: smarter recs      Agent Team widget           Agent Catalog
  Step 4: agent proposal    Agent-powered insights      Agent Detail
  Step 5: team reveal       CRM deal scoring            Agent Runner
                            Workflow agent nodes
```

---

## What Changes For Users

**Before:** Generic AI recommendations, one-size-fits-all proposals
**After:** "Your AI Team" — named specialists with roles, expertise, and personalized outputs

---

## Hero Stat

> **120+ AI Agents** across 12 divisions, covering every stage from discovery to delivery.

---

## Phase Summary

| Phase | Timeline | What Ships | Impact |
|---|---|---|---|
| **Phase 1** | Week 1-2 | Smarter wizard prompts (Steps 3-5) | Better recommendations, no UI changes |
| **Phase 2** | Week 3-5 | Agent Team widget, Agent Catalog page, CRM scoring | Visible product upgrade |
| **Phase 3** | Week 6-8 | Agent Runner, multi-agent proposals, workflow nodes | Full agent platform |

---

## Screens Affected

| Screen | Action | Priority |
|---|---|---|
| Wizard Step 3 (Recommendations) | Enhance prompts | P1 |
| Wizard Step 4 (Proposal) | Add "Your AI Team" section | P1 |
| Wizard Step 5 (Launch) | Show agent team assignment | P1 |
| Dashboard Home | Add Agent Team widget | P2 |
| Dashboard Insights | Agent-powered insight cards | P2 |
| CRM Pipeline | Agent deal scoring badges | P2 |
| Agent Catalog (NEW) | Browse agents by division | P2 |
| Agent Detail (NEW) | View agent profile and capabilities | P2 |
| Agent Runner (NEW) | Run agent on a task | P3 |
| Workflows | Agent-as-workflow-node | P3 |

---

## Benefits Grid

| Benefit | Description | Metric |
|---|---|---|
| **Personalized Strategy** | Every client gets agents matched to their industry and goals | 12 industry verticals covered |
| **Faster Time-to-Value** | Specialist agents generate tailored outputs in minutes, not days | 80% faster proposal generation |
| **Scalable Expertise** | 120+ agents across sales, support, ops, finance, and more | Zero additional headcount |
| **Transparent Process** | Clients see which agents work on their project and why | Full audit trail per agent run |
| **Continuous Learning** | Agents improve from every engagement, compounding quality | Run history feeds future runs |
| **Workflow Integration** | Agents plug into existing automation workflows as nodes | Reusable across all projects |

---

## Key Design Decisions

1. **No new wizard steps** — Steps 3, 4, and 5 are enhanced with agent content; the user flow stays the same
2. **Auto-assignment** — The wizard selects agents for the client; no manual team-building UI
3. **Agents are visible but not configurable** — Clients see their team but don't pick individual agents (avoids decision fatigue)
4. **Agent Runner is agency-side** — Only agency users run agents directly; clients see outputs
5. **Existing pages first** — Enhance dashboard, insights, CRM before building new catalog/detail pages

---

## Technical Integration Points

| System | Integration |
|---|---|
| **Wizard Context** | `step3.agentRecommendations`, `step4.assignedTeam`, `step5.teamReveal` — new fields on existing WizardState |
| **Edge Functions** | New routes: `POST /agents/match`, `POST /agents/run`, `GET /agents/catalog`, `GET /agents/:slug` |
| **KV Store** | Agent definitions stored as `agent:{division}:{slug}` keys |
| **Gemini API** | Agent-specific system prompts injected per agent role |
| **Dashboard API** | `GET /dashboard/agent-team` returns assigned agents for a project |
| **CRM API** | `GET /crm/deals/:id/score` returns agent-generated deal health score |

---

## Dependencies

- Existing wizard infrastructure (WizardContext, Steps 1-5)
- Existing dashboard shell and sidebar navigation
- Existing edge function server with Hono routing
- Existing CRM pipeline and deal model
- Existing workflow automation framework
- Gemini API key (already configured as `GEMINI_API_KEY`)

---

## Success Criteria

| Metric | Target |
|---|---|
| Wizard completion rate | +15% improvement (agents make proposals more compelling) |
| Time from wizard start to project launch | < 10 minutes end-to-end |
| Agent catalog coverage | 120+ agents across 12 divisions |
| Dashboard engagement | 2x more return visits (agent team widget drives engagement) |
| CRM deal scoring adoption | 80% of active deals have agent-generated scores |

---

## Document Index

| # | Document | Status |
|---|---|---|
| 00 | Executive Summary (this doc) | Done |
| 01 | Screen Inventory | Done |
| 02 | Wizard Wireframes | Done |
| 03 | Agent Data Model | Done |
| 04 | Dashboard Wireframes | Done |
| 05 | Agent Catalog Screens (impl plan) | Done |
| 06 | Screen Design Specification | Done |
| 07 | Agent Matching Algorithm | Planned |