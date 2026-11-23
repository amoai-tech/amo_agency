# Wizard Screen 5 — Launch Project & Dashboard Entry

## Figma Make Prompt

> Design Step 5 of a 5-step premium wizard for "AMO AI." This is the final screen — "Launch Project" — a celebration and transition moment where the wizard results become a live project with a dashboard. This is NOT a form screen. It's a confirmation and launch screen.
>
> **Layout:** This screen breaks from the three-panel layout. Use a focused, centered single-column layout with a full-width background. The three-panel served its purpose — now we're transitioning to the dashboard world.
>
> **Full-width layout (1440px max, centered):**
>
> - **Top Section — Completion Header (full-width, subtle gradient from beige to white):**
>   - Horizontal step indicator showing all 5 steps completed (all green checkmarks)
>   - Large heading: "Your project is ready" — 40px Playfair Display, dark teal, centered
>   - Subtitle: "Everything from your discovery session has been turned into an actionable project." — 18px Lora, medium gray, centered
>   - Subtle decorative element: a thin horizontal lime green line (80px wide, centered) below the subtitle
>
> - **Middle Section — Project Summary Card (centered, max-width 800px):**
>   - Large white card, 16px radius, generous padding (40px)
>   - Card has a very subtle lime green left border (4px)
>
>   - **Project header row:**
>     - Left: "PROJECT" label (12px, uppercase, lime green) above the project name
>     - Project name: "Acme Retail Group — AI Transformation" — 24px Playfair Display
>     - Right: Status badge "Active" in lime green pill
>
>   - **Project details grid (2 columns, 4 rows):**
>     - Client: Acme Retail Group
>     - Industry: E-commerce / Retail
>     - Phase: Phase 1 — Foundation
>     - Timeline: 12 weeks
>     - Systems: 3 selected (with small system icons)
>     - Tasks: 12 initial tasks generated
>     - Brief: Approved ✓
>     - Dashboard: Ready ✓
>
>   - **Divider**
>
>   - **Roadmap Preview (compact, horizontal):**
>     - Three connected phase cards in a horizontal row:
>       - Phase 1: "Foundation" — Weeks 1-4 — "Current" badge (lime green)
>       - Phase 2: "Implementation" — Weeks 5-8
>       - Phase 3: "Optimization" — Weeks 9-12
>     - Cards connected by a thin horizontal line with arrow
>     - Phase 1 has a subtle glow/highlight to show it's the starting point
>
>   - **Divider**
>
>   - **What's been created (checklist):**
>     - ✓ Project created with all wizard data — green check
>     - ✓ Roadmap with 3 phases set — green check
>     - ✓ 12 initial tasks generated — green check
>     - ✓ Strategy brief attached — green check
>     - ✓ Dashboard ready for you — green check
>     - Each item: green checkmark icon + text, subtle left padding
>     - Animation: checks appear one by one with staggered fade-in (100ms delay each) when screen loads
>
> - **Bottom Section — Call to Action (centered):**
>   - Primary CTA button: "Enter Your Dashboard →"
>     - Large button: min-width 280px, 52px height
>     - Dark teal background, white text, 8px radius
>     - On hover: lime green background, dark teal text
>     - Subtle shadow on hover (only place shadows are used)
>   - Below button: "You can return to this wizard anytime from your dashboard settings"
>   - 14px Lora, medium gray
>
> - **Quick Tour Preview (optional section below CTA, max-width 1000px):**
>   - Heading: "What you'll find in your dashboard" — 20px Playfair Display, centered
>   - 4 preview cards in a horizontal row:
>     - **Roadmap** — icon: timeline/gantt — "Track phases, milestones, and deliverables"
>     - **Tasks** — icon: checklist — "Manage your action items by phase and priority"
>     - **Strategy Brief** — icon: document — "Reference your approved brief anytime"
>     - **Documents** — icon: folder — "Upload and manage all project files"
>   - Each card: white background, 12px radius, icon at top (40px, lime green), title (16px bold), description (14px gray)
>   - Cards have hover: slight y-translate up (2px) with transition
>
> **Design Direction:**
> - This screen should feel like a moment of accomplishment — calm, confident, satisfying
> - The staggered checklist animation creates a sense of "things being built for you"
> - The project summary card should feel substantial — like a signed contract or a finalized plan
> - The CTA button should be the obvious focal point — no competing elements
> - No left or right panels — this is a focused, centered experience
> - The transition from wizard (three-panel) to this screen (centered) should feel like stepping into a new chapter
> - Motion is used intentionally here: checklist stagger, button hover, preview card hover
> - But never flashy — everything is subtle, professional, premium
> - This is the "handshake moment" — the wizard has done its job, now it's time to work
>
> **Responsive:**
> - Mobile (375px): everything stacks vertically. Project details become single column. Roadmap phases stack vertically with connecting vertical line. Preview cards become 2x2 grid, then 1-column on very small screens
> - Tablet (768px): same layout, slightly tighter padding. Preview cards 2x2 grid
> - Desktop (1440px): full layout as described
>
> **Background:**
> - Very subtle pattern or texture on the beige background (optional) — like a fine linen texture at 2% opacity
> - Or: clean flat beige (#F1EEEA) — either works, keep it minimal

## Content Data

### Project Summary Fields
| Field | Source | Value (Example) |
|-------|--------|-----------------|
| Project name | Auto-generated | "{client_name} — AI Transformation" |
| Client | clients.name | "Acme Retail Group" |
| Industry | wizard_answers step-1 | "E-commerce / Retail" |
| Phase | projects.current_phase | "Phase 1 — Foundation" |
| Timeline | roadmaps.total_duration | "12 weeks" |
| Systems | project_systems count | "3 selected" |
| Tasks | tasks count | "12 initial tasks generated" |
| Brief | briefs.status | "Approved" |
| Dashboard | projects.dashboard_activated_at | "Ready" |

### Roadmap Phases (from Step 4)
| Phase | Title | Timeline | Status |
|-------|-------|----------|--------|
| Phase 1 | Foundation | Weeks 1-4 | Current |
| Phase 2 | Implementation | Weeks 5-8 | Upcoming |
| Phase 3 | Optimization | Weeks 9-12 | Upcoming |

### Dashboard Preview Cards
| Card | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | Timeline | Roadmap | Track phases, milestones, and deliverables |
| 2 | Checklist | Tasks | Manage your action items by phase and priority |
| 3 | Document | Strategy Brief | Reference your approved brief anytime |
| 4 | Folder | Documents | Upload and manage all project files |

### Checklist Items (staggered animation)
| # | Item | Delay |
|---|------|-------|
| 1 | Project created with all wizard data | 0ms |
| 2 | Roadmap with 3 phases set | 100ms |
| 3 | 12 initial tasks generated | 200ms |
| 4 | Strategy brief attached | 300ms |
| 5 | Dashboard ready for you | 400ms |

## Workflow

```
User arrives at /app/wizard/step-5
  → Verify brief is approved (briefs.status = 'approved')
  → If not approved: redirect back to step-4 with message

  → Trigger project creation (if not already created):
    1. Create `projects` row:
       - name: "{client_name} — AI Transformation"
       - status: 'Active'
       - client_id: from wizard context
       - current_phase: 'phase_1'
       - progress: 0
       - dashboard_activated_at: now()

    2. Create `context_snapshots` row:
       - project_id: new project
       - summary: from brief executive summary
       - metrics: compiled from wizard answers
       - is_active: true

    3. Create `roadmaps` row:
       - snapshot_id: new snapshot
       - total_duration: "12 weeks" (from AI analysis)
       - roi_projection: from brief outcomes

    4. Create `roadmap_phases` rows (3 phases):
       - Phase 1: Foundation (order_index: 1)
       - Phase 2: Implementation (order_index: 2)
       - Phase 3: Optimization (order_index: 3)

    5. Create initial `tasks` rows:
       - AI-generated tasks per phase (3-5 per phase)
       - owner: mix of 'Client', 'AMO AI', 'Automated'
       - status: 'todo'
       - ai_generated: true

    6. Create `project_services` rows:
       - For each selected system → map to services
       - status: 'planned'

    7. Update wizard_sessions:
       - current_step: 5
       - wizard_completed_at: now()

  → Display confirmation screen with project data
  → Animate checklist items (staggered)

User clicks "Enter Your Dashboard"
  → Navigate to /app/dashboard/{project_id}
  → First-time visit: show subtle onboarding tooltips on key areas
```

## Agent Behavior
- **AI generates initial tasks** during project creation
  - 3-5 tasks per phase, contextually relevant to selected systems
  - Tasks include ai_suggestion field with guidance
  - Logged in ai_run_logs
- **No interactive AI on this screen** — it's purely confirmational
- All heavy processing happens in the background Edge Function
- If Edge Function fails: show error state with "Retry" button, never leave user stuck
- Project creation is idempotent — if user refreshes, don't create duplicates (check if project exists for this wizard_session)
