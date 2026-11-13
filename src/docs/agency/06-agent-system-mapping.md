# 06 — Agent System Mapping

> Version 1.0 | March 12, 2026
> Interactive diagram at `/app/agents/system-map`

---

## Overview

This document maps which AI agents power which product areas across the AMO AI platform. Each product area uses either **single-agent** calls (one specialist with context augmentation), **multi-agent** calls (2-3 agents in parallel with merged output), or **no AI call** (read-only from data).

---

## Agent-to-Product Mapping

| Product Area | Agents Used | Call Type |
|---|---|---|
| **Wizard Step 3** (Recommendations) | Software Architect (primary) + context agents | Single |
| **Wizard Step 4** (Proposal) | Reality Checker + Finance Tracker + Content Creator | Multi (3 parallel) |
| **Wizard Step 4** (Readiness Score) | Reality Checker + Finance Tracker | Single (augmented) |
| **Wizard Step 5** (Roadmap) | Project Shepherd + Sprint Prioritizer | Single (augmented) |
| **Dashboard** (Agent Team Widget) | Analytics Reporter (status only) | None (reads table) |
| **Insights** | Growth Hacker + Reality Checker + Finance Tracker | Multi (2-3 parallel, cached 4hrs) |
| **CRM Pipeline** (Deal Scoring) | Pipeline Analyst + Deal Strategist | Single (cached 1hr) |
| **Workflows** (Agent Nodes) | Any agent (configured per node) | Single per node |
| **Financial** (Projections) | Finance Tracker | Single |
| **Strategy** (Canvas Insights) | Growth Hacker + Trend Researcher | Multi (2 parallel) |

---

## Implementation Status

### Completed
- [x] Agent routes mounted in server (`agent-routes.tsx` -> `index.tsx`)
- [x] `agentCatalogApi` added to `lib/supabase.ts` (run, match, history)
- [x] AgentRunnerPage wired to real `POST /agents/run` with simulated fallback
- [x] RunHistoryTab wired to real `GET /agents/history/:slug` with mock fallback
- [x] Interactive system map diagram at `/app/agents/system-map`
- [x] Sidebar updated: Catalog | System Map | Monitor sub-items

### Pending
- [ ] `POST /agents/match` integration with wizard Steps 3-5
- [ ] Persist agent catalog run results with full task/output (currently uses ai_run_logs generic fields)
- [ ] Build remaining 100+ agents for full catalog
- [ ] Wire dashboard insights to use agent-specific prompts
- [ ] CRM deal scoring agent integration
- [ ] Workflow agent node execution

---

## Output Combination Patterns

### Pattern A: Parallel + Merge (Proposals)
3 agents run in parallel. Merge engine combines structured outputs into final proposal.

### Pattern B: Primary + Augmentation (Recommendations)
Primary agent provides methodology. Secondary adds context rules. Both excerpts go into ONE prompt, ONE AI call.

### Pattern C: Independent + Display (Insights)
Each agent runs independently. Results shown as separate cards. No merging.

---

## Token Budget Per Feature

| Feature | Agents | Calls | Estimated Cost |
|---|---|---|---|
| Wizard Step 3 | 1 (excerpts) | 1 | $0.0002 |
| Wizard Step 4 (proposal) | 3 parallel | 3 | $0.001 |
| Wizard Step 4 (readiness) | 1 (augmented) | 1 | $0.0002 |
| Wizard Step 5 (roadmap) | 1 (augmented) | 1 | $0.0003 |
| Dashboard insights | 2-3 parallel | 3 | $0.0008 |
| CRM deal score | 1 per deal | 1 | $0.0001 |
| Agent Runner | 1 | 1 | $0.0004 |
| **Full wizard session** | | **6** | **~$0.002** |
| **Daily dashboard use** | | **4** | **~$0.001** |

All costs are Gemini Flash pricing. Negligible at any scale.

---

## Files Modified/Created

| File | Action | Purpose |
|---|---|---|
| `/supabase/functions/server/index.tsx` | Modified | Mount agent routes + AI schema middleware |
| `/supabase/functions/server/agent-routes.tsx` | Existing | POST /agents/run, POST /agents/match, GET /agents/history/:slug |
| `/lib/supabase.ts` | Modified | Added `agentCatalogApi` (run, match, history) + types |
| `/components/dashboard/agents/AgentRunnerPage.tsx` | Modified | Wired to real API with simulated fallback |
| `/components/dashboard/agents/AgentDetailPage.tsx` | Modified | RunHistoryTab uses real API with mock fallback |
| `/components/dashboard/agents/AgentSystemMap.tsx` | Created | Interactive SVG system mapping diagram |
| `/components/dashboard/DashboardSidebar.tsx` | Modified | Added System Map sub-item |
| `/routes.tsx` | Modified | Added `/app/agents/system-map` route |
| `/docs/agency/06-agent-system-mapping.md` | Created | This documentation |

---

## Division Color Map (for diagram)

| Division | Color | Hex |
|---|---|---|
| Engineering | Blue | `#3B82F6` |
| Sales | Amber | `#F59E0B` |
| Marketing | Purple | `#8B5CF6` |
| Design | Pink | `#EC4899` |
| PM | Indigo | `#6366F1` |
| Testing | Red | `#EF4444` |
| Support | Emerald | `#10B981` |
