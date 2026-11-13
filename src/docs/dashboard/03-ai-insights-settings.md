# 03 — AI INSIGHTS, DOCUMENTS & SETTINGS
# Supporting Dashboard Screens

**Routes:** `/app/insights`, `/app/documents`, `/app/settings`
**Status:** NOT STARTED
**Parent Doc:** `00-dashboard-master.md`

---

## AI INSIGHTS PAGE — `/app/insights`

### Screen Purpose

Full readiness breakdown with radar visualization, dimension deep-dives, historical score tracking, all AI recommendations consolidated, and re-analysis trigger. This is where the readiness score ring on the dashboard "expands into."

### ASCII WIREFRAME — Desktop

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  AI Insights                                 🔔    JD ▾     │
│             ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│             │  AI READINESS ASSESSMENT                                     │
│             │  Last analyzed: Mar 7, 2026                [Re-run →]       │
│             │                                                              │
│             │  ┌──────────────────────────┐ ┌────────────────────────────┐ │
│             │  │                          │ │ SCORE BREAKDOWN            │ │
│             │  │    READINESS SCORE       │ │                            │ │
│             │  │                          │ │ Digital Infrastructure  80 │ │
│             │  │       ╭─────────╮       │ │ ████████████████░░░░      │ │
│             │  │       │         │       │ │                            │ │
│             │  │       │   72    │       │ │ Data & Analytics       65 │ │
│             │  │       │  /100   │       │ │ █████████████░░░░░░░      │ │
│             │  │       ╰─────────╯       │ │                            │ │
│             │  │    Developing Maturity   │ │ Process Automation     70 │ │
│             │  │                          │ │ ██████████████░░░░░░      │ │
│             │  │    +6 since initial      │ │                            │ │
│             │  │                          │ │ Team & Culture         75 │ │
│             │  └──────────────────────────┘ │ ███████████████░░░░░      │ │
│             │                               │                            │ │
│             │                               │ Strategic Alignment    68 │ │
│             │                               │ █████████████░░░░░░░      │ │
│             │                               └────────────────────────────┘ │
│             │                                                              │
│             │  ┌──────────────────────────┐ ┌────────────────────────────┐ │
│             │  │ STRENGTHS                │ │ GAPS TO ADDRESS            │ │
│             │  │                          │ │                            │ │
│             │  │ ✓ Strong digital         │ │ ⚠ HIGH: Data silos        │ │
│             │  │   infrastructure         │ │   across departments      │ │
│             │  │                          │ │                            │ │
│             │  │ ✓ Team receptive to      │ │ ⚠ MED: No ML pipeline    │ │
│             │  │   automation             │ │   for production models   │ │
│             │  │                          │ │                            │ │
│             │  │ ✓ Clear strategic        │ │ ○ LOW: Manual reporting   │ │
│             │  │   goals defined          │ │   processes               │ │
│             │  └──────────────────────────┘ └────────────────────────────┘ │
│             │                                                              │
│             │  ALL RECOMMENDATIONS                                         │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ From Step 2: Industry Diagnostics                    │    │
│             │  │                                                      │    │
│             │  │ • Cart abandonment at 68% — above average           │    │
│             │  │ • Customer support tickets 40hrs/wk manual triage   │    │
│             │  │ • No personalization engine for product discovery    │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ From Step 3: System Recommendations                  │    │
│             │  │                                                      │    │
│             │  │ • Support Engine — fit score 0.95, quick win        │    │
│             │  │ • Cart Recovery — fit score 0.88, Phase 2           │    │
│             │  │ • Recommendation Engine — fit score 0.82, Phase 3   │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │ From Step 4: Readiness Next Steps                    │    │
│             │  │                                                      │    │
│             │  │ • Consolidate customer data into unified platform    │    │
│             │  │ • Pilot AI chatbot on highest-volume support topic   │    │
│             │  │ • Establish KPI baselines before Phase 1 launch     │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

### Content Data

| Field | Source | Path |
|-------|--------|------|
| Overall score | step 4 ai_results | readiness.overallScore |
| Score breakdown (5 dims) | step 4 ai_results | readiness.scoreBreakdown |
| Maturity level | step 4 ai_results | readiness.maturityLevel |
| Strengths | step 4 ai_results | readiness.strengths |
| Gaps | step 4 ai_results | readiness.gaps |
| Next steps | step 4 ai_results | readiness.nextSteps |
| Diagnostics pain points | step 2 ai_results | diagnostics.painPoints |
| Diagnostics opportunities | step 2 ai_results | diagnostics.opportunities |
| System recommendations | step 3 ai_results | recommendations.rankedSystems |
| Business analysis | step 1 ai_results | analysis (full object) |

### Interaction Patterns

- Click "Re-run Analysis" to trigger the readiness-score endpoint with current data, then refresh the display
- Each dimension in the score breakdown is clickable to show a detail tooltip with what that dimension measures and how to improve it
- The strengths and gaps sections are static cards derived from ai_results
- The recommendations section is organized by wizard step source (Step 2 diagnostics, Step 3 systems, Step 4 next steps) as collapsible sections
- Historical score tracking shows initial score vs current (if re-analysis was run), displayed as a simple "72 → 78 (+6)" indicator

---

## DOCUMENTS PAGE — `/app/documents`

### Screen Purpose

Central place for all documents generated during and after the wizard: the strategy brief from Step 4, exported PDFs, uploaded files from Step 1, and any generated status reports.

### ASCII WIREFRAME — Desktop

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  Documents                                   🔔    JD ▾     │
│             ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│             │  DOCUMENTS                                                   │
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │  📄 Strategy Brief                    ✓ Approved     │    │
│             │  │     Prepared Mar 7, 2026 · Version 3                │    │
│             │  │     [View] [Export PDF] [Share]                       │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │  📊 AI Readiness Report                              │    │
│             │  │     Score: 72/100 · Generated Mar 7, 2026           │    │
│             │  │     [View] [Export PDF]                               │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │  🗺  Implementation Roadmap                          │    │
│             │  │     12 weeks · 3 phases · Generated Mar 7, 2026     │    │
│             │  │     [View] [Export PDF]                               │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  UPLOADED FILES                                              │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │  (Files uploaded in wizard Step 1, if any)           │    │
│             │  │  pitch-deck.pdf · 2.4 MB · Uploaded Mar 6           │    │
│             │  │  [Download] [Remove]                                  │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  GENERATE REPORT                                             │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │  Generate a project status report summarizing        │    │
│             │  │  current phase, completed milestones, and metrics.   │    │
│             │  │                                                      │    │
│             │  │  [Generate Status Report →]                          │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

### Document Types

| Document | Source | Action |
|----------|--------|--------|
| Strategy Brief | Step 4 briefEdits + ai_results | View inline (rendered from state), export as formatted HTML-to-PDF |
| AI Readiness Report | Step 4 ai_results readiness | View inline (score, dimensions, gaps, strengths), export |
| Implementation Roadmap | Step 5 ai_results roadmap | View inline (phases, deliverables, metrics), export |
| Uploaded Files | Supabase Storage (if implemented per 03-prompt-supabase-storage.md) | Download via signed URL, remove |
| Status Report | Generated client-side from current project state | On-demand generation, export |

### Export Strategy

Documents are generated client-side as formatted HTML, then converted to PDF using the browser's print-to-PDF flow (window.print with a print-specific stylesheet). No server-side PDF generation needed for MVP.

The print stylesheet: hides sidebar, header, and navigation. Sets white background. Uses Georgia serif for headings, Inter for body. Includes AMO AI logo and "Confidential" watermark. Page breaks between major sections.

---

## SETTINGS PAGE — `/app/settings`

### Screen Purpose

Account management, organization profile, and preferences. For MVP: display user info, allow name/email update, show org details derived from wizard data, and provide sign-out.

### ASCII WIREFRAME — Desktop

```
┌─────────────┬──────────────────────────────────────────────────────────────┐
│  SIDEBAR    │  Settings                                    🔔    JD ▾     │
│             ├──────────────────────────────────────────────────────────────┤
│             │                                                              │
│             │  ACCOUNT                                                     │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │                                                      │    │
│             │  │  Name        Jane Doe                    [Edit]     │    │
│             │  │  Email       jane@acmeretail.com                    │    │
│             │  │  Joined      March 6, 2026                          │    │
│             │  │  Sessions    1 wizard session completed              │    │
│             │  │                                                      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  ORGANIZATION                                                │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │                                                      │    │
│             │  │  Company     Acme Retail Group                       │    │
│             │  │  Industry    E-commerce / Retail                     │    │
│             │  │  Size        Medium (11-50 employees)                │    │
│             │  │  Goal        Revenue growth                          │    │
│             │  │                                                      │    │
│             │  │  (Derived from wizard Step 1 — editable later)      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  PREFERENCES                                                 │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │                                                      │    │
│             │  │  Email notifications    [toggle: on]                 │    │
│             │  │  Activity digest        [dropdown: weekly]           │    │
│             │  │                                                      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
│             │  DANGER ZONE                                                 │
│             │  ┌──────────────────────────────────────────────────────┐    │
│             │  │                                                      │    │
│             │  │  [Sign Out]              [Delete Account]            │    │
│             │  │                                                      │    │
│             │  └──────────────────────────────────────────────────────┘    │
│             │                                                              │
└─────────────┴──────────────────────────────────────────────────────────────┘
```

### Settings Data Sources

| Field | Source |
|-------|--------|
| User name | Supabase Auth user_metadata.name |
| User email | Supabase Auth email |
| Join date | Supabase Auth created_at |
| Session count | wizardApi.list(userId).sessions.length |
| Company name | wizard_answers step 1 answers.companyName |
| Industry | wizard_answers step 1 answers.industry |
| Company size | wizard_answers step 1 answers.companySize |
| Goal | wizard_answers step 1 answers.goal |

### Interactions

- Edit name: inline edit field, saves via Supabase Auth updateUser
- Sign out: calls authApi.signOut, redirects to /login
- Delete account: confirmation modal, then calls edge function to delete user data
- Preferences are stored in localStorage for MVP (no preferences table yet)

---

## LAYOUT SIDEBAR — `/components/dashboard/DashboardSidebar.tsx`

### ASCII Detail

```
┌─────────────────────┐
│                     │
│  ☀ AMO AI    │  ← Logo, 16px from top, Georgia serif
│                     │
│  ─────────────────  │  ← Divider #333
│                     │
│  ● Dashboard        │  ← Active: white text, green left bar, #F5F5F0 bg
│  ○ Projects         │  ← Inactive: #9CA39B text, no bg
│  ○ Roadmap          │
│  ○ AI Insights      │
│  ○ Documents        │
│  ○ Settings         │
│                     │
│  ─────────────────  │
│                     │
│  ↻ Re-run Wizard    │  ← Green text #00875A, links to /wizard
│                     │
│  ─────────────────  │
│                     │
│                     │
│                     │  ← Spacer (flex-1)
│                     │
│  ─────────────────  │
│  v0.11.0            │  ← Version, 11px, #6B6B63
│  Acme Retail Group  │  ← Org name, 12px, #9CA39B
│                     │
└─────────────────────┘
```

Sidebar specs:
- Width: 240px fixed on desktop
- Background: #1A1A1A
- Logo area: Sun icon (#00875A) + "AMO AI" in Georgia serif, #F5F5F0
- Nav items: 14px Inter, 40px row height, 16px left padding
- Active item: #F5F5F0 text, 2px #00875A left border, rgba(245,245,240,0.05) background
- Inactive item: #9CA39B text, transparent background, hover rgba(245,245,240,0.05)
- Icons: lucide-react, 18px, matching text color
- Dividers: 1px solid #333

Nav items and their icons:
- Dashboard — LayoutDashboard
- Projects — FolderOpen
- Roadmap — Map
- AI Insights — Brain
- Documents — FileText
- Settings — Settings (gear)
- Re-run Wizard — RefreshCw (below divider, green)

---

## DASHBOARD HEADER — `/components/dashboard/DashboardHeader.tsx`

```
┌──────────────────────────────────────────────────────────────┐
│  Dashboard / Projects / Acme Retail         🔔 (2)    JD ▾  │
└──────────────────────────────────────────────────────────────┘
```

Header specs:
- Height: 56px (h-14)
- Background: #FFFFFF
- Border bottom: 1px solid #E8E8E4
- Left: Breadcrumb showing current page path in 14px, #6B6B63 for intermediate, #1A1A1A for current
- Right: Notification bell (Bell icon, 20px, #6B6B63, with red dot badge for unread count), User avatar (32px circle with initial letter, #E6F4ED bg, #00875A text), chevron-down for dropdown
- User dropdown: same as the Header.tsx user menu pattern (name, email, sign out)
- Mobile: hamburger replaces breadcrumb, opens sidebar overlay

---

## BACKEND WIRING — New Edge Function

### POST /dashboard-insights (new route in ai-routes.tsx)

Purpose: generate contextual AI recommendations for the dashboard insights panel.

Input: sessionId (to load all wizard data), projectState (optional, current phase progress, overdue items).

Behavior: load wizard_answers for all 5 steps, assemble a summary of the org's current state, call Gemini with a system prompt focused on actionable project management recommendations, return 2-4 structured insights each with title, description, priority, and suggested action.

Gemini system prompt focus: "You are a project management advisor at AMO AI. Based on the client's readiness score, selected systems, roadmap progress, and diagnostic findings, recommend 2-4 specific next actions. Prioritize actions that unblock progress or address high-severity gaps. Each recommendation should be actionable within 1 week."

Response structure: array of insights, each with id, priority (high, medium, suggestion), title (short, action-oriented), description (2-3 sentences with specific data points), actionLabel (button text like "View Roadmap" or "Schedule Call"), actionRoute (relative route within the dashboard).

Cache TTL: 4 hours (insights should refresh periodically as project state changes).

### GET /activities/list/:sessionId (new route in wizard-routes.tsx or new file)

Purpose: return activities for the activity feed. For MVP, derive from wizard_answers timestamps. When the activities table exists, query it directly.

Derived activity generation: query wizard_answers for the session ordered by updated_at desc, for each answer row create an activity entry (step 1 = "Business analyzed", step 2 = "Industry diagnostics run", step 3 = "Systems recommended", step 4 = "Readiness scored", step 5 = "Roadmap generated"), add a "Wizard completed" entry from wizard_sessions updated_at where status = completed.

Response: array of activities each with id, action (text), entityType (wizard, project, milestone), timestamp, and optional metadata.

---

## ACCEPTANCE CRITERIA — All Screens

### AI Insights Page
- Readiness score ring displayed at large size with all 5 dimension breakdowns as progress bars
- Strengths and gaps displayed as separate cards
- All recommendations consolidated from steps 2, 3, and 4 ai_results
- Re-run analysis button triggers readiness-score endpoint and refreshes display
- Score delta shown if re-analysis has been run

### Documents Page
- Strategy brief viewable inline (rendered from step 4 state)
- Readiness report viewable inline (rendered from step 4 ai_results)
- Roadmap viewable inline (rendered from step 5 ai_results)
- Export triggers browser print-to-PDF with print stylesheet
- Uploaded files listed with download links (if storage implemented)

### Settings Page
- User name and email displayed from Supabase Auth
- Org details derived from wizard step 1 answers
- Sign out button works and redirects to /login
- Inline name edit saves to Supabase Auth

### Sidebar
- All nav items link to correct routes
- Active route highlighted with green left border and light text
- Re-run Wizard links to /wizard
- Org name and version shown at bottom
- Collapses to hamburger on mobile

### Header
- Breadcrumb shows current page context
- User avatar dropdown with sign-out option
- Notification bell (static for MVP, no notification system yet)
