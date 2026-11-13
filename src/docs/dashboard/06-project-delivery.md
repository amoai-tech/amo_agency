# 06 — PROJECT DELIVERY DASHBOARD
# Milestones, Tasks, Deliverables, Phase Tracking

**Component:** `ProjectDelivery`
**File:** `/components/dashboard/delivery/ProjectDelivery.tsx`
**Route:** `/app/projects/:id`
**Status:** NOT STARTED
**Parent Doc:** `00-dashboard-master.md`
**Depends On:** DashboardLayout, Auth, wizard_answers step 5, projects table, tasks table, milestones table

---

## SCREEN PURPOSE

The operational hub for tracking AI system implementation. This is where the wizard's roadmap from Step 5 becomes an actionable project plan. Three views — Timeline, Board, and List — serve different work modes. Consultants drag tasks between kanban columns during standups. Business owners check the timeline to see phase progress. Milestones and deliverables provide accountability checkpoints.

Real-world: "Acme Retail Phase 1 is 80% complete — consultant drags 'Configure chatbot responses' to Done, milestone auto-completes, Phase 2 becomes Active."

---

## TARGET USERS

- Agency consultants delivering AI system implementations
- Business owners tracking their project progress
- Agency project managers coordinating team workload

---

## ASCII WIREFRAME — Desktop, Board View (1440px)

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  Projects / AI Transformation           🔔    JD ▾          │
│  240px      ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│  ☀ AMO AI   │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ PROJECT HEADER                                       │    │
│  ──────────│  │                                                      │    │
│  ○ Dashboard│  │  AI Transformation — Acme Retail Group    ● Active   │    │
│  ● Projects │  │  12 weeks · 3 systems · Est. $35K-$55K              │    │
│  ○ Clients  │  │  ┌──────────────────────────────────────────────┐   │    │
│  ○ Roadmap  │  │  │ ████████████████████████░░░░░░░░░░░░ 72%    │   │    │
│  ○ Insights │  │  └──────────────────────────────────────────────┘   │    │
│  ○ Documents│  └──────────────────────────────────────────────────────┘    │
│  ○ Settings │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ PHASE TIMELINE (condensed)                           │    │
│             │  │                                                      │    │
│             │  │  ┌──────────┐    ┌──────────┐    ┌──────────┐      │    │
│             │  │  │ Phase 1  │ →  │ Phase 2  │ →  │ Phase 3  │      │    │
│             │  │  │ Found.   │    │ Growth   │    │ Scale    │      │    │
│             │  │  │ Wk 1-4   │    │ Wk 5-8   │    │ Wk 9-12  │      │    │
│             │  │  │ ████░░   │    │ ░░░░░░   │    │ ░░░░░░   │      │    │
│             │  │  │ 80% ●    │    │ 0%       │    │ 0%       │      │    │
│             │  │  └──────────┘    └──────────┘    └──────────┘      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  [Timeline]  [● Board]  [List]                              │
│             │                                                              │
│             │  Phase 1: Foundation · Weeks 1-4                  [+ Task]  │
│             │                                                              │
│             │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│             │  │ TO DO    │  │IN PROGRESS│  │ REVIEW   │  │ DONE     │   │
│             │  │ (2)      │  │ (1)      │  │ (1)      │  │ (5)      │   │
│             │  │          │  │          │  │          │  │          │   │
│             │  │┌────────┐│  │┌────────┐│  │┌────────┐│  │┌────────┐│   │
│             │  ││Config  ││  ││Deploy  ││  ││Train   ││  ││Require-││   │
│             │  ││chatbot ││  ││chatbot ││  ││FAQ     ││  ││ments   ││   │
│             │  ││respond.││  ││widget  ││  ││model   ││  ││gather  ││   │
│             │  ││        ││  ││        ││  ││        ││  ││   ✓    ││   │
│             │  ││P1 [av] ││  ││P0 [av] ││  ││P1 [av] ││  ││        ││   │
│             │  ││Mar 12  ││  ││Mar 10  ││  ││Mar 11  ││  │└────────┘│   │
│             │  │└────────┘│  │└────────┘│  │└────────┘│  │┌────────┐│   │
│             │  │          │  │          │  │          │  ││Data    ││   │
│             │  │┌────────┐│  │          │  │          │  ││audit   ││   │
│             │  ││Set up  ││  │          │  │          │  ││   ✓    ││   │
│             │  ││escalat.││  │          │  │          │  │└────────┘│   │
│             │  ││rules   ││  │          │  │          │  │┌────────┐│   │
│             │  ││        ││  │          │  │          │  ││Integr. ││   │
│             │  ││P2 --   ││  │          │  │          │  ││testing ││   │
│             │  ││Mar 14  ││  │          │  │          │  ││   ✓    ││   │
│             │  │└────────┘│  │          │  │          │  │└────────┘│   │
│             │  │          │  │          │  │          │  │ ...      │   │
│             │  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│             │                                                              │
│             │  ┌──────────────────────────┐  ┌────────────────────────┐   │
│             │  │ MILESTONES               │  │ TEAM                   │   │
│             │  │                          │  │                        │   │
│             │  │ ☐ Support Engine Go-Live │  │ [av] [av] [av] [av]  │   │
│             │  │   Due: Mar 15 (5 days)  │  │ 4 members assigned    │   │
│             │  │   Deliverables: 3/4 ✓   │  │                        │   │
│             │  │   ├ ☑ Deploy script     │  │ Maria C.  — 3 tasks   │   │
│             │  │   ├ ☑ User docs         │  │ James L.  — 2 tasks   │   │
│             │  │   ├ ☑ Training data     │  │ Sarah K.  — 2 tasks   │   │
│             │  │   └ ☐ UAT sign-off     │  │ Alex M.   — 1 task    │   │
│             │  │                          │  │                        │   │
│             │  │ ☐ Phase 1 Review        │  └────────────────────────┘   │
│             │  │   Due: Mar 20           │                                │
│             │  │   Deliverables: 0/2     │                                │
│             │  └──────────────────────────┘                                │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Timeline View (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [● Timeline]  [Board]  [List]                                            │
│                                                                          │
│ AI TRANSFORMATION ROADMAP                                                │
│ 12 weeks · 3 phases · Acme Retail Group                                 │
│                                                                          │
│   Wk1    Wk2    Wk3    Wk4    Wk5    Wk6    Wk7    Wk8    Wk9-12     │
│   ┌──────────────────────────┐                                           │
│   │  PHASE 1: FOUNDATION     │                                           │
│   │  Support Engine           │                                           │
│   │  ██████████████████░░░░  │                                           │
│   │  80% · 6/8 tasks done    │                                           │
│   │  ● CURRENT PHASE         │                                           │
│   │                          │                                           │
│   │  Milestones:             │                                           │
│   │  ✓ Data audit (Wk 1)    │                                           │
│   │  ○ Go-Live (Wk 4)       │                                           │
│   │                          │                                           │
│   │  Deliverables:           │                                           │
│   │  • Requirements doc  ✓  │                                           │
│   │  • Chatbot config    ✓  │                                           │
│   │  • Training data     ✓  │                                           │
│   │  • UAT sign-off     ○  │                                           │
│   └──────────┬───────────────┘                                           │
│              │                                                            │
│              ▼                                                            │
│              ┌──────────────────────────┐                                 │
│              │  PHASE 2: GROWTH         │                                 │
│              │  Cart Recovery Engine     │                                 │
│              │  ░░░░░░░░░░░░░░░░░░░░   │                                 │
│              │  0% · 0/6 tasks          │                                 │
│              │  ○ UPCOMING              │                                 │
│              │  Starts after Phase 1    │                                 │
│              └──────────┬───────────────┘                                 │
│                         │                                                 │
│                         ▼                                                 │
│                         ┌──────────────────────────┐                      │
│                         │  PHASE 3: SCALE          │                      │
│                         │  Recommendation Engine    │                      │
│                         │  ░░░░░░░░░░░░░░░░░░░░   │                      │
│                         │  0% · 0/4 tasks          │                      │
│                         │  ○ FUTURE                 │                      │
│                         └──────────────────────────┘                      │
│                                                                          │
│ ─────────────────────────────────────────────────────────────────────── │
│                                                                          │
│ RISK FACTORS                                                             │
│ ┌──────────────────────────────────────────────────────────────┐         │
│ │ ⚠ Data quality gaps — Mitigation: comprehensive audit Wk 1  │         │
│ │ ⚠ Team capacity — Mitigation: phased rollout, not parallel   │         │
│ └──────────────────────────────────────────────────────────────┘         │
│                                                                          │
│ SUCCESS METRICS                                                          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                      │
│ │ Response Time│ │ Cart Recovery│ │ Order Value  │                      │
│ │    -80%      │ │    +15%      │ │    +20%      │                      │
│ │   by Wk 4    │ │   by Wk 8    │ │   by Wk 12   │                      │
│ └──────────────┘ └──────────────┘ └──────────────┘                      │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — List View (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Timeline]  [Board]  [● List]                                  [+ Task]  │
│                                                                          │
│ PHASE 1: FOUNDATION (6/8 done · 80%)                                    │
│ ┌────────────────────────────────────────────────────────────────────┐   │
│ │ ☑ │ Requirements gathering        │ P1 │ Done       │ Maria │Wk 1│   │
│ │ ☑ │ Data audit and mapping        │ P1 │ Done       │ James │Wk 1│   │
│ │ ☑ │ Configure support engine      │ P0 │ Done       │ Maria │Wk 2│   │
│ │ ☑ │ Integration testing           │ P1 │ Done       │ Alex  │Wk 3│   │
│ │ ☑ │ Staff training                │ P2 │ Done       │ Sarah │Wk 3│   │
│ │ ◉ │ Train FAQ model              │ P1 │ Review     │ James │Wk 3│   │
│ │ ☐ │ Configure chatbot responses  │ P1 │ In Progr.  │ Maria │Wk 4│   │
│ │ ☐ │ Set up escalation rules      │ P2 │ To Do      │ --    │Wk 4│   │
│ └────────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ PHASE 2: GROWTH (0/6 done · 0%)                   ○ Locked              │
│ ┌────────────────────────────────────────────────────────────────────┐   │
│ │ (collapsed — click to preview)                                     │   │
│ └────────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│ PHASE 3: SCALE (0/4 done · 0%)                    ○ Locked              │
│ ┌────────────────────────────────────────────────────────────────────┐   │
│ │ (collapsed — click to preview)                                     │   │
│ └────────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Task Card Detail

```
┌──────────────────────┐
│ TASK CARD   #FFF bg  │
│ border #E8E8E4       │
│ 4px radius           │
│ drag handle left     │
│                      │
│  Configure chatbot   │
│  responses           │
│  14px Inter #1A1A1A  │
│                      │
│  ┌──┐ P1   Mar 12   │
│  │av│ pri   due      │
│  └──┘ badge  muted   │
│  24px                │
│                      │
│  Priority colors:    │
│  P0 = red #DC2626    │
│  P1 = amber #D97706  │
│  P2 = green #00875A  │
│  P3 = gray #9CA39B   │
└──────────────────────┘
```

---

## ASCII WIREFRAME — Task Detail Modal

```
┌──────────────────────────────────────────┐
│ TASK DETAIL                    [X close] │
│ Dialog modal, 560px wide                 │
│                                          │
│  Task Title                              │
│  ┌──────────────────────────────────┐    │
│  │ Configure chatbot responses      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Description                             │
│  ┌──────────────────────────────────┐    │
│  │ Set up predefined responses for  │    │
│  │ the top 20 FAQ categories.       │    │
│  │ Include fallback to human agent. │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Status          Priority    Due Date    │
│  [In Progress ▾] [P1 ▾]     [Mar 12]   │
│                                          │
│  Assignee        Phase                   │
│  [Maria C.  ▾]   Phase 1: Foundation    │
│                                          │
│  ────────────────────────────────────    │
│                                          │
│  Comments                                │
│  ┌──────────────────────────────────┐    │
│  │ Maria: Started configuring the   │    │
│  │ response templates. 2h ago       │    │
│  │                                  │    │
│  │ James: FAQ categories finalized  │    │
│  │ — 24 topics identified. 1d ago   │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [Add comment...]              [Save]    │
│                                          │
└──────────────────────────────────────────┘
```

---

## ASCII WIREFRAME — Mobile (375px)

```
┌───────────────────────────────────┐
│ ☰  AI Transformation      🔔 JD │
├───────────────────────────────────┤
│                                   │
│  ● Active   Acme Retail Group    │
│  12 weeks · 3 systems            │
│  ┌───────────────────────────┐   │
│  │ ██████████████░░░░░ 72%   │   │
│  └───────────────────────────┘   │
│                                   │
│  Phase 1 ██░░ → Phase 2 → Ph 3  │
│                                   │
│  [Timeline] [● Board] [List]     │
│                                   │
│  Phase 1: Foundation             │
│                                   │
│  TO DO (2)                        │
│  ┌───────────────────────────┐   │
│  │ Config chatbot responses  │   │
│  │ P1 · Maria · Mar 12      │   │
│  └───────────────────────────┘   │
│  ┌───────────────────────────┐   │
│  │ Set up escalation rules   │   │
│  │ P2 · -- · Mar 14          │   │
│  └───────────────────────────┘   │
│                                   │
│  IN PROGRESS (1)                  │
│  ┌───────────────────────────┐   │
│  │ Deploy chatbot widget     │   │
│  │ P0 · Maria · Mar 10      │   │
│  └───────────────────────────┘   │
│                                   │
│  REVIEW (1)                       │
│  ┌───────────────────────────┐   │
│  │ Train FAQ model           │   │
│  │ P1 · James · Mar 11      │   │
│  └───────────────────────────┘   │
│                                   │
│  DONE (5) [collapsed]            │
│                                   │
│  ── MILESTONES ──                │
│  ☐ Go-Live  Mar 15 (5d)  3/4   │
│  ☐ Review   Mar 20       0/2   │
│                                   │
└───────────────────────────────────┘
```

Mobile: kanban columns stack vertically as collapsible sections (To Do, In Progress, Review expanded; Done collapsed). No drag-and-drop on mobile — tap task card to open detail modal, change status via dropdown. Phase timeline becomes compact horizontal scroll.

---

## CONTENT DATA TABLE

| Field | Source | Path | Fallback |
|-------|--------|------|----------|
| Project name | step 5 ai_results | roadmap.title | "[companyName] — AI Transformation" |
| Client name | step 1 answers | companyName | "Client" |
| Project status | Derived | Active if has uncompleted phases | "Active" |
| Total weeks | step 5 ai_results | roadmap.totalWeeks | 12 |
| Total investment | step 5 ai_results | roadmap.totalInvestment | "Contact for quote" |
| Overall progress | Derived | All completed tasks / all tasks | 0% |
| Phases | step 5 ai_results | roadmap.phases[] | Static ROADMAP_PHASES |
| Phase title | Each phase | phases[n].title | "Phase N" |
| Phase week range | Each phase | phases[n].weekRange | "Weeks N-M" |
| Phase systems | Each phase | phases[n].systems[] | [] |
| Phase deliverables | Each phase | phases[n].deliverables[] | Become task titles |
| Phase milestones | Each phase | phases[n].milestones[] | Become milestone titles |
| Phase estimated cost | Each phase | phases[n].estimatedCost | "—" |
| Phase team involvement | Each phase | phases[n].teamInvolvement | "—" |
| Quick wins | step 5 ai_results | roadmap.quickWins[] | [] |
| Risk factors | step 5 ai_results | roadmap.riskFactors[] | [] |
| Success metrics | step 5 ai_results | roadmap.successMetrics[] | [] |
| Selected systems | step 3 answers | selectedSystems[] | [] |
| System details | Static | AI_SYSTEMS from wizardData.ts | — |

---

## TASK STATUS MODEL

| Status | Column | Visual | Keyboard |
|--------|--------|--------|----------|
| To Do | Column 1 | Empty checkbox ☐, normal text | Space to advance |
| In Progress | Column 2 | Half indicator ◉, green left border 2px | Space to advance |
| Review | Column 3 | Clock icon, amber left border 2px | Space to advance |
| Done | Column 4 | Filled checkbox ☑, strikethrough text, muted | Space to revert to To Do |

Tasks are draggable between columns via react-dnd. Drag preview shows a shadow card. Drop target highlights the column with a green dashed border.

Task priority levels: P0 (critical, red badge), P1 (high, amber badge), P2 (medium, green badge), P3 (low, gray badge).

---

## MILESTONE MODEL

| Status | Icon | Color |
|--------|------|-------|
| Upcoming | ☐ circle outline | #E8E8E4 |
| At Risk | ⚠ warning | #D97706 |
| Completed | ☑ filled check | #00875A |
| Overdue | ✗ red circle | #DC2626 |

A milestone is "at risk" when: days until due date < 3 AND it has uncompleted deliverables.
A milestone is "overdue" when: current date > due date AND status is not completed.

Milestone completion triggers: green checkmark scale-in animation (200ms), activity log entry, phase progress recalculation, and if all milestones and tasks in the phase are done, auto-phase-advancement.

---

## PHASE PROGRESSION

```
Phase 1: Active (has tasks, some in progress)
    │
    ▼ All tasks Done + all milestones Completed
    │
Phase 1: Completed ← celebration animation, activity logged
    │
    ▼ Auto-advance
    │
Phase 2: Active ← tasks auto-generated from deliverables if not yet created
    │
    ... repeat ...
    │
Phase 3: Completed ← project status → Delivered
```

Phase colors:
- Active: #00875A fill on timeline block, white text
- Completed: #1A1A1A fill, white text, checkmark
- Upcoming: #E8E8E4 fill, #6B6B63 text, lock icon
- Future: #F0F0EC fill, #9CA39B text

---

## INTERACTION PATTERNS

### Board View
- Drag task cards between status columns (react-dnd)
- Drop target column highlights with dashed green border
- Task status updates instantly in UI (optimistic), persists to storage
- Click task card opens TaskDetailModal
- Click "+ Task" button at top of any column opens inline create form
- Phase selector above the board filters to a specific phase's tasks

### Timeline View
- Click a phase block to expand its details inline (deliverables, milestones, team)
- Current phase is always expanded by default
- Future phases show lock icon and muted styling
- Vertical "today" marker line shows current position
- Click a milestone to toggle its expansion showing deliverable checklist

### List View
- Sortable columns: title, priority, status, assignee, due date
- Tasks grouped by phase with collapsible phase headers
- Click task row to open TaskDetailModal
- Current phase expanded, future phases collapsed by default
- Status column shows colored badge (same colors as kanban columns)

### Cross-View
- View toggle persists in URL query param (?view=board)
- Switching views preserves the selected phase filter
- Task status changes in any view reflect immediately in all views
- "+ Task" always available in header area

---

## USER JOURNEYS

### Journey 1: Daily Standup (Board View)

Consultant opens Acme Retail project, Board view. Phase 1 has 8 tasks: 5 Done, 1 Review, 1 In Progress, 1 To Do. She drags "Configure chatbot responses" from To Do to In Progress, assigns herself. Milestone tracker shows "Go-Live" due in 5 days with 3/4 deliverables done. She clicks "Train FAQ model" in Review, adds a comment "Accuracy at 94%, approving", drags it to Done. Phase 1 progress updates from 75% to 87.5%.

### Journey 2: Business Owner Progress Check (Timeline View)

The Acme Retail owner logs in and opens their project. Timeline shows Phase 1 (green, 87.5%), Phase 2 (gray, 0%, starting week 5), Phase 3 (gray, 0%). He clicks Phase 1 to see the task breakdown. He checks the deliverables: deployment script (done), user documentation (done), training data (done), UAT sign-off (pending — his action). He marks UAT sign-off as approved.

### Journey 3: Phase Transition

All Phase 1 tasks are dragged to Done. The last milestone deliverable is checked. System auto-updates Phase 1 to Completed and Phase 2 to Active. The phase timeline animates the transition (Phase 1 turns dark, Phase 2 turns green). Activity logs: "Phase 1 completed. Phase 2: Cart Recovery Engine is now active." If the tasks table exists, the task-generator AI auto-creates Phase 2 tasks from roadmap deliverables.

### Journey 4: At-Risk Milestone Detection

It is March 13. "Support Engine Go-Live" is due March 15 (2 days). Deliverables show 3/4 done, "UAT sign-off" still pending. The milestone automatically shows an amber "At Risk" badge. AI insight on the dashboard: "Go-Live milestone at risk — UAT sign-off still pending with 2 days remaining." The consultant schedules an urgent review call.

---

## AI FEATURES

- Task generation: when a phase activates, AI creates tasks with titles, descriptions, and suggested priorities from the roadmap phase deliverables and system requirements
- Auto-prioritization: tasks are ranked by dependency and milestone deadline proximity
- At-risk prediction: flags milestones where current task completion velocity suggests the deadline will be missed
- Suggested assignments: recommends team members based on skill match and current workload
- Phase completion summary: AI generates a brief report when a phase completes ("Phase 1 delivered Support Engine in 3.5 weeks. 8 tasks completed. Key outcome: automated ticket routing live.")

---

## LOADING, ERROR, EMPTY STATES

### Loading
Project header shows skeleton. Phase timeline shows 3 gray placeholder blocks. Board shows 4 columns with skeleton cards (3 per column).

### Error
If project data fails to load: "Unable to load project data. This may be because the project hasn't been created yet." with [Back to Projects] and [Retry] buttons.

### Empty — New Project (No Tasks Yet)
Board shows 4 empty columns with a centered message: "Generating tasks from your roadmap..." with a loading animation. Below: "Tasks are created from your AI-generated roadmap phases. This happens automatically when a phase activates." If task generation is not available (no tasks table), show: "Your roadmap has [N] phases with [M] deliverables. Tasks will appear here once project delivery begins."

### Empty — Phase With No Tasks
Individual empty phase in Board: "No tasks in this phase yet." with [+ Add Task] button.

---

## ANIMATION SPECS

| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Task card drag | Scale 1.02 + shadow-lg | During drag | Drag start |
| Task card drop | Scale 1 + shadow-none | 150ms | Drop |
| Column drop highlight | Dashed green border pulse | During hover | Card over column |
| Phase transition | Color fill left-to-right | 400ms | Phase completes |
| Milestone complete | Check scale in from 0 | 200ms, spring | Deliverable checked |
| Progress bar update | Width transition | 300ms | Task status change |
| View toggle | Content fade cross-dissolve | 200ms | Tab click |
| Phase expand | Height auto + content fade | 200ms | Phase click |

---

## BACKEND WIRING

### MVP (No Tables)

All project data derived from wizard_answers step 5 ai_results.roadmap. Phases from roadmap.phases. Tasks derived from deliverables arrays within each phase. Task statuses stored in localStorage keyed by sessionId.

Milestone statuses stored in localStorage. Deliverable checkbox states stored in localStorage. Phase progress calculated client-side from task statuses.

No drag-and-drop persistence to server. No activity logging. No AI task generation.

### With Tasks Table

Task CRUD via edge function routes. Drag-and-drop persists via PATCH /tasks/:id with new status. Task creation via POST /tasks with title, phase_id, project_id, priority, assignee_id. Activity logged on every status change.

### With Full Schema

Projects table for project metadata. Roadmap_phases table for phase data. Milestones table for milestone tracking. Deliverables table for checklist items. Team_members for assignments. Activities for audit trail.

### Edge Function Routes (Future)

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /projects/:id | Full project with phases, tasks, milestones |
| POST | /tasks | Create task |
| PATCH | /tasks/:id | Update task status, assignee, priority |
| DELETE | /tasks/:id | Remove task |
| PATCH | /milestones/:id | Update milestone status |
| PATCH | /deliverables/:id | Toggle deliverable completion |
| POST | /projects/:id/generate-tasks | AI task generation for a phase |

### Frontend Hooks

useProject(projectId): returns project data, phases, selected systems, roadmap metadata.

useTasks(projectId, phaseNumber): returns tasks for a phase grouped by status, with toggleTask, createTask, updateTask functions. MVP reads from localStorage.

useMilestones(projectId): returns milestones with deliverables, toggleDeliverable function.

useTeam(orgId): returns team members with task counts for workload display.

---

## ACCESSIBILITY

- Kanban board uses aria-label "Task board for Phase 1: Foundation"
- Each column has role="region" with aria-label "To Do tasks, 2 items"
- Task cards have role="button" with aria-roledescription="draggable task"
- Drag-and-drop has keyboard alternative: select card with Enter, arrow keys to move between columns, Enter to drop
- Screen reader announcement on drop: "Configure chatbot responses moved to In Progress"
- Phase timeline has role="tablist" with each phase as role="tab"
- Milestone checkboxes are proper input elements with labels
- Focus management: after modal close, focus returns to the triggering task card
- Color is never the sole indicator: status text always accompanies color, priority shows P0-P3 label alongside color

---

## ACCEPTANCE CRITERIA

- Project delivery page renders at /app/projects/:id with project header
- Tab bar toggles between Timeline, Board, and List views (URL persisted)
- Timeline shows phases as connected blocks with status colors and progress
- Board renders 4 kanban columns with task cards for the active phase
- Task cards are draggable between columns (react-dnd) with optimistic UI update
- Task card click opens detail modal with description, assignee, priority, due date
- List view shows all tasks in a sortable table grouped by phase
- Milestone tracker shows milestones with due dates, status, and expandable deliverable checklists
- Deliverable checkboxes toggle completion state
- Phase progress auto-calculates from task completion ratio
- "+ Task" inline form creates task in the correct phase
- At-risk milestones highlighted with amber badge when due date is within 3 days
- Overdue milestones highlighted with red badge
- Phase auto-advances when all tasks are Done and all milestones are Completed
- Team avatar row shows members with task count tooltips
- Loading state shows skeleton cards
- Empty state for new project shows "Generating tasks..." message
- Responsive: kanban stacks vertically on mobile with collapsible sections
- Keyboard accessible drag-and-drop alternative available
