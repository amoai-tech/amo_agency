# Wizard Screen 4 — Executive Summary / Brief

## Figma Make Prompt

> Design Step 4 of a 5-step premium wizard for "AMO AI." This is the "Executive Summary" screen where all wizard inputs are compiled into a polished, professional strategy brief that the client reviews, can edit, and must approve.
>
> **Layout:** Three-panel layout (1440px desktop). The center panel is document-focused — it should feel like reading a beautifully typeset strategy document, not filling out a form.
>
> **Left Panel (240px, white):**
> - Stepper: Steps 1-3 completed (green checkmarks), Step 4 active, Step 5 inactive
> - Context Card (all prior data, compact):
>   - Company: "Acme Retail Group"
>   - Industry: "E-commerce / Retail"
>   - Size: "Medium"
>   - Goal: "Growth"
> - Signals: compact chip list
> - Selected Systems: list with green checks
> - New section: "Brief Status"
>   - Status badge: "Draft" (amber) / "In Review" (blue) / "Approved" (green)
>   - "Version 1" indicator
>   - "Last edited: just now"
>
> **Center Panel (flexible, white background — NOT beige, to feel like a document):**
>
> - **Document container** styled like a premium report:
>   - Max-width: 720px, centered in the panel
>   - 48px top padding, 32px side padding
>   - Subtle paper-like feel: white background, very faint border on sides
>
> - **Brief Header:**
>   - "STRATEGY BRIEF" — 12px uppercase, letter-spacing 0.1em, lime green
>   - Company name: "Acme Retail Group" — 32px Playfair Display, dark teal
>   - "Prepared by AMO AI" — 14px Lora, medium gray
>   - Date: "March 6, 2026"
>   - Subtle horizontal rule (lime green, 2px, 60px wide)
>
> - **Section 1 — Executive Summary**
>   - Section heading: "Executive Summary" — 24px Playfair Display
>   - AI-generated paragraph (3-4 sentences) summarizing the business, challenges, and proposed approach
>   - Each section has a small "Edit" pencil icon (top right of section) — clicking enables inline editing
>   - Editable text has a subtle highlight/border when in edit mode
>
> - **Section 2 — Company Profile**
>   - Table-style layout:
>     - Company: Acme Retail Group
>     - Industry: E-commerce / Retail
>     - Size: Medium (11-50 employees)
>     - Primary Goal: Growth
>     - Website: www.acmeretail.com
>   - Read-only — sourced from Step 1 (editable via "Go to Step 1" link)
>
> - **Section 3 — Industry Analysis**
>   - Heading: "Industry Analysis: E-commerce & Retail"
>   - Paragraph: AI-generated analysis based on Step 2 diagnostic answers
>   - Key findings as a bulleted list:
>     - "Cart abandonment rate above 50% — significantly above industry average (38%)"
>     - "Customer support is fully manual — high opportunity for AI automation"
>     - "No personalization in place — missing 10-30% uplift in average order value"
>     - "Low repeat customer revenue (<20%) — retention is the primary growth lever"
>   - Each bullet has a small colored dot: red for problems, amber for opportunities, green for strengths
>
> - **Section 4 — Recommended Systems**
>   - For each selected system, a mini-card:
>     - System name (bold) + priority number
>     - "Why" — 1 sentence from Step 3 reasoning
>     - Impact and Effort badges
>   - Systems displayed as a compact list, not full cards
>
> - **Section 5 — Proposed Roadmap (High-Level)**
>   - Simple 3-phase visual:
>     - Phase 1: "Foundation" (Weeks 1-4) — 2-3 bullet outcomes
>     - Phase 2: "Implementation" (Weeks 5-8) — 2-3 bullet outcomes
>     - Phase 3: "Optimization" (Weeks 9-12) — 2-3 bullet outcomes
>   - Each phase as a horizontal card with phase number, title, timeline, and outcomes
>   - Connected by a horizontal line/arrow between them
>
> - **Section 6 — Expected Outcomes**
>   - 3-4 outcome cards in a 2-column grid:
>     - Each card: metric icon, metric name, projected improvement
>     - e.g., "Support Response Time" → "80% faster"
>     - e.g., "Cart Recovery Rate" → "10-15% recovered"
>     - e.g., "Repeat Purchase Rate" → "25-40% increase"
>     - e.g., "Average Order Value" → "10-30% higher"
>   - Subtle, confident — not hyperbolic
>
> - **Section 7 — Next Steps**
>   - "Upon approval of this brief, your project will be created and your dashboard activated."
>   - Checklist of what happens next:
>     - "Project created with selected systems"
>     - "Roadmap phases and milestones set"
>     - "Initial tasks generated for Phase 1"
>     - "Dashboard access enabled"
>
> - **Approval Section (bottom of document):**
>   - Horizontal card with:
>     - "Ready to proceed?" — 18px Playfair Display
>     - "By approving this brief, your project will be created and you'll enter your dashboard."
>     - Two buttons side by side:
>       - "Request Changes" — outlined button (dark teal border, no fill)
>       - "Approve Brief" — filled button (lime green background, dark text, bold)
>     - Below buttons: "You can edit any section above before approving"
>
> **Right Panel (320px, white):**
> - Sticky header: "Brief Guide" — serif, dark teal
> - Table of contents for the brief (clickable, scrolls center panel):
>   - Executive Summary
>   - Company Profile
>   - Industry Analysis
>   - Recommended Systems
>   - Proposed Roadmap
>   - Expected Outcomes
>   - Next Steps
> - Active section highlighted with lime green left border
> - Below TOC: divider
> - "Document Actions" section:
>   - "Export as PDF" button (outline)
>   - "Print" button (outline)
>   - "Share Link" button (outline)
> - Below actions: divider
> - "Version History" section:
>   - "Version 1 — Current Draft"
>   - "Created Mar 6, 2026"
>   - If edits made: "Version 2 — Edited Mar 6, 2026" appears above
>
> **Footer Bar:**
> - Left: "Back" text button
> - Center: "Draft — Not yet approved" in amber, or "Approved" in green
> - Right: "Continue" button — only active after brief is approved
>
> **Design Direction:**
> - The center panel should feel like a premium PDF report rendered in the browser
> - Think: McKinsey engagement letter meets modern SaaS — clean, confident, structured
> - Typography hierarchy is critical: large serif headings, readable body text, clear sections
> - The document should be scannable in 30 seconds but rewarding to read in detail
> - Inline editing should feel seamless — click edit, border appears, type, auto-save
> - The approval action at the bottom should feel weighty but not scary
> - Color is used sparingly — mostly for status indicators and the section rule
>
> **Responsive:**
> - Mobile: document takes full width (no side panels). TOC becomes a sticky top bar with horizontal scroll. Right panel actions move to a floating action button (FAB)
> - Tablet: document centered, right panel as slide-over drawer
> - Desktop: full three-panel

## Content Data — Brief Template

### Executive Summary Template
```
{company_name} is a {company_size} {industry} business focused on {primary_goal}.
Based on our analysis, the primary opportunity areas are {top_signals}.
We recommend {selected_systems_count} AI-powered systems targeting {primary_impact_areas}.
The proposed roadmap spans {total_duration} with an estimated ROI of {roi_projection}.
```

### Industry Analysis — Signal-to-Finding Mapping
| Signal | Finding Text | Severity |
|--------|-------------|----------|
| High cart abandonment | Cart abandonment rate above 50% — significantly above industry average | Red |
| Manual support | Customer support is fully manual — high opportunity for AI automation | Amber |
| No personalization | No personalization in place — missing 10-30% uplift in average order value | Amber |
| Low repeat revenue | Low repeat customer revenue — retention is the primary growth lever | Red |
| No formal support | No structured support process — risk of customer churn and brand damage | Red |
| Manual sales | Sales process is manual — significant time and conversion optimization available | Amber |
| Single channel | Heavy reliance on single acquisition channel — diversification recommended | Amber |

### Roadmap Phase Template
| Phase | Title | Typical Timeline | Focus |
|-------|-------|-----------------|-------|
| 1 | Foundation | Weeks 1-4 | Setup, integration, data preparation |
| 2 | Implementation | Weeks 5-8 | System deployment, testing, training |
| 3 | Optimization | Weeks 9-12 | Performance tuning, scaling, automation |

## Workflow

```
User arrives at /app/wizard/step-4
  → Load all wizard_answers (steps 1-3)
  → Load selected systems from project_systems
  → Check for existing brief in `briefs` table
  → If exists: load and display (pre-filled)
  → If not: trigger Edge Function to generate brief
    - Input: all wizard data + selected systems
    - Output: structured JSONB content for each section
    - Create `briefs` row (status: 'draft', version: 1)
    - Create `brief_versions` snapshot

Display brief
  → Render each section from briefs.content JSONB
  → Enable inline editing on each section

User edits a section
  → Debounce 500ms → update briefs.content
  → Increment briefs.version
  → Create new brief_versions snapshot
  → Update right panel version history

User clicks "Request Changes"
  → briefs.status = 'in_review'
  → Optional: open a notes textarea for what they want changed
  → Alert AMO AI team (future: notification system)

User clicks "Approve Brief"
  → Confirmation dialog: "Approve this brief and create your project?"
  → On confirm:
    - briefs.status = 'approved'
    - Create brief_versions final snapshot
    - Update wizard_sessions.current_step = 5
    - Navigate to step-5
  → "Continue" button becomes active (alternative path)

User clicks "Continue" (after approval)
  → Navigate to step-5
```

## Agent Behavior
- **AI generates the entire brief** via Edge Function on first load
- Generation takes 5-10 seconds — show elegant skeleton loading (sections appear one by one, top to bottom, with subtle fade-in)
- AI content is editable — user can override any AI-generated text
- All edits are versioned — nothing is lost
- AI explanations in the right panel are static (TOC + actions)
- PDF export renders the same layout as the screen (future feature)
