# Agent System Mapping — Which Agents, Where, Why

> Figma Make: Create a system mapping diagram showing product areas as rounded rectangles on the left (Wizard, Dashboard, CRM, Workflows, Insights, Financial) connected by lines to agent circles on the right. Use color-coded agent circles matching their division (blue for engineering, green for sales, purple for marketing). Add a legend for single-agent vs multi-agent calls. Clean information architecture diagram style.

---

## Agent-to-Product Mapping

```
PRODUCT AREA                        AGENTS USED
============                        ===========

Wizard Step 3                       Software Architect (primary)
(Recommendations)  ------>          + Rapid Prototyper (if goal=MVP)
                                    + Growth Hacker (if goal=marketing)
                                    + Pipeline Analyst (if goal=sales)
                                    SINGLE AGENT (with context-based selection)

Wizard Step 4                       Proposal Strategist (narrative)
(Proposal)         ------>          + Domain agent (varies by industry)
                                    + Finance Tracker (cost projections)
                                    MULTI-AGENT (3 parallel, outputs combined)

Wizard Step 4                       Reality Checker (gap detection)
(Readiness Score)  ------>          + Finance Tracker (budget realism)
                                    SINGLE AGENT (augmented with 2nd excerpt)

Wizard Step 5                       Project Shepherd (roadmap methodology)
(Roadmap)          ------>          + Sprint Prioritizer (phasing logic)
                                    SINGLE AGENT (augmented with 2nd excerpt)

Dashboard Home                      Analytics Reporter (status summary)
(Agent Team Widget)------>          All assigned agents (status display)
                                    NO AI CALL (reads from agent_assignments table)

Dashboard Insights                  Growth Hacker (growth opportunities)
                   ------>          Reality Checker (risk identification)
                                    Finance Tracker (financial projections)
                                    MULTI-AGENT (2-3 parallel, cached 4hrs)

CRM Pipeline                        Pipeline Analyst (deal scoring)
(Deal Scoring)     ------>          Deal Strategist (next-step suggestions)
                                    SINGLE AGENT (runs on deal update, cached 1hr)

Workflows                           Any agent (as workflow node)
(Agent Nodes)      ------>          SINGLE AGENT per node (configured by user)
                                    No orchestration — sequential execution

Financial                            Finance Tracker (projections)
(Projections)      ------>          SINGLE AGENT (runs on manual refresh)

Strategy                             Growth Hacker (opportunity analysis)
(Canvas Insights)  ------>          Trend Researcher (market context)
                                    MULTI-AGENT (2 parallel)
```

---

## Single-Agent vs Multi-Agent Decision

| Use Multi-Agent When | Use Single-Agent When |
|---|---|
| High-value output (proposals, insights) | Routine operations (deal scoring, status) |
| Multiple perspectives add real value | One specialist is clearly sufficient |
| Client will see the output directly | Output is internal/automated |
| Output quality justifies token cost | Speed matters more than depth |

---

## Agent Outputs and Human Review

| Product Area | Agent Output | Human Review Needed? | Why |
|---|---|---|---|
| Wizard recommendations | Ranked system list with reasoning | No — user selects which to approve | User acts as reviewer by choosing |
| Proposal narrative | Multi-paragraph proposal | Yes — user can edit before approving | High-stakes client-facing content |
| Readiness score | 0-100 with breakdown | No — score is advisory | Low risk, informational |
| Roadmap | Phased timeline with deliverables | Yes — user approves before launch | Commits resources and timeline |
| Dashboard insights | Insight cards with recommendations | No — cards are suggestions, not actions | User decides whether to "Take Action" |
| CRM deal scores | Health score + risk flag | No — score is advisory | Agent adds context, human makes decisions |
| Workflow agent output | Varies by task | Depends on workflow config | User can add "approval" step after agent node |
| Agent Runner output | Free-form specialist response | No — user explicitly requested it | User initiated the run, reviews output naturally |

---

## Output Combination Patterns

### Pattern A: Parallel + Merge (Proposals)

```
                    +-------------------+
User data -------> | Proposal          | -----+
                    | Strategist        |      |
                    +-------------------+      |
                                               |     +-----------+
                    +-------------------+      +---> | Merge     |
User data -------> | Domain Agent      | -----+     | Engine    | ---> Final
                    | (varies)          |      |     | (AMO AI)  |     Proposal
                    +-------------------+      |     +-----------+
                                               |
                    +-------------------+      |
User data -------> | Finance           | -----+
                    | Tracker           |
                    +-------------------+

All 3 run in parallel. Merge engine combines into structured proposal.
```

### Pattern B: Primary + Augmentation (Recommendations)

```
                    +-------------------+
User data -------> | Software          | -----+
                    | Architect         |      |     +-----------+
                    | (full excerpt)    |      +---> | Single    | ---> System
                    +-------------------+      |     | Call      |     Ranking
                                               |     +-----------+
                    +-------------------+      |
Context only ----> | Growth Hacker     | -----+
                    | (rules excerpt    |
                    |  only, ~200 tok)  |
                    +-------------------+

Primary agent provides methodology. Secondary adds context rules.
Both excerpts go into ONE prompt, ONE AI call.
```

### Pattern C: Independent + Display (Insights)

```
                    +-------------------+
Project data ----> | Growth Hacker     | ---> Insight Card 1
                    +-------------------+

                    +-------------------+
Project data ----> | Reality Checker   | ---> Insight Card 2
                    +-------------------+

                    +-------------------+
Financial data --> | Finance Tracker   | ---> Insight Card 3
                    +-------------------+

Each agent runs independently. Results shown as separate cards.
No merging. Each card attributed to its source agent.
```

---

## Token Budget Per Feature

| Feature | Agents | Input Tokens | Output Tokens | Calls | Total Cost |
|---|---|---|---|---|---|
| Wizard Step 3 | 1 (excerpts) | ~1,500 | ~1,000 | 1 | $0.0002 |
| Wizard Step 4 (proposal) | 3 parallel | ~5,000 | ~3,000 | 3 | $0.001 |
| Wizard Step 4 (readiness) | 1 (augmented) | ~1,500 | ~800 | 1 | $0.0002 |
| Wizard Step 5 (roadmap) | 1 (augmented) | ~1,500 | ~1,500 | 1 | $0.0003 |
| Dashboard insights | 2-3 parallel | ~4,000 | ~2,000 | 3 | $0.0008 |
| CRM deal score | 1 per deal | ~800 | ~400 | 1 | $0.0001 |
| Agent Runner | 1 | ~2,000 | ~2,000 | 1 | $0.0004 |
| **Full wizard session** | | | | **6** | **~$0.002** |
| **Daily dashboard use** | | | | **4** | **~$0.001** |

All costs are Gemini Flash pricing. Negligible at any scale.
