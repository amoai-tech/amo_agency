# Wizard Screen 3 — System Recommendations

## Figma Make Prompt

> Design Step 3 of a 5-step premium wizard for "AMO AI." This is the key decision screen titled "System Recommendations" where AI-generated system proposals are presented for the user to review and select.
>
> **Layout:** Three-panel layout (1440px desktop). This screen has the richest right panel.
>
> **Left Panel (240px, white):**
> - Stepper: Steps 1-2 completed (green checkmarks), Step 3 active (lime green), Steps 4-5 inactive
> - Context Card:
>   - Company: "Acme Retail Group"
>   - Industry: "E-commerce / Retail"
>   - Size: "Medium"
>   - Goal: "Growth"
> - Signals from Step 2 (compact list):
>   - "High cart abandonment"
>   - "Manual support"
>   - "No personalization"
>   - "Low repeat revenue"
> - New section: "Your Selections" — starts empty, fills as user selects systems:
>   - Selected system names with small green checkmark
>   - Running count: "2 of 5 selected"
>
> **Center Panel (flexible, beige):**
> - Heading: "Our recommendations for your business" — Playfair Display
> - Subtitle: "Based on your industry, goals, and diagnostic results, we recommend these systems. Select the ones you'd like to pursue." — Lora, gray
> - Sort/filter bar: "Sort by: Recommended priority | Impact | Effort" — small pills, active has underline
>
> - **Recommendation Cards (vertical stack, 32px gap):**
>
>   **Card Design — Each system recommendation:**
>   - White card, 12px radius, 24px padding, full width
>   - Top row:
>     - Left: Priority badge — "#1 RECOMMENDED" in small lime green pill (or "#2", "#3", etc.)
>     - Right: Select toggle — large checkbox/switch. Unselected: gray outline. Selected: lime green with checkmark
>   - System name: 20px Playfair Display, dark teal (e.g., "AI Customer Support Engine")
>   - One-line description: "Automated first-line support with intelligent escalation" — Lora, gray
>   - **Why it fits section:**
>     - Small label "WHY THIS FITS YOUR BUSINESS" (12px, uppercase, lime green)
>     - 2-3 bullet points tied to user's specific answers, each with a small arrow icon:
>       - "Your support is currently manual — this automates 60-80% of inquiries"
>       - "Customers primarily find you via Google — chatbot improves on-site conversion"
>   - **Impact row** (horizontal, 3 metrics in small cards):
>     - "Expected Impact: High" — green badge
>     - "Effort: Medium" — amber badge
>     - "Timeline: 2-4 weeks" — gray badge
>   - **Expand button:** "See details & trade-offs >" — text link, dark teal
>     - Expanded section (accordion):
>       - "What this system does" — 2-3 sentences
>       - "Trade-offs to consider" — bullet list
>       - "Related services" — tags linking to services catalog
>   - **Bottom border** if selected: 2px lime green bottom border. If not selected: 1px light gray
>
>   **Show 4-6 recommendation cards total.** Example systems for E-commerce:
>   1. "AI Customer Support Engine" — #1 priority
>   2. "Cart Recovery & Follow-Up System" — #2
>   3. "Personalized Recommendation Engine" — #3
>   4. "Sales & Marketing Automation Suite" — #4
>   5. "Customer Loyalty & Retention System" — #5
>
>   **Non-recommended section** (below recommendations):
>   - Subtle divider with text: "Other available systems"
>   - Collapsed by default — "Show 3 more systems >"
>   - These are systems not recommended but available to select
>   - Cards have muted styling: no priority badge, lighter border
>
> **Right Panel (320px, white):**
> - Sticky header: "Your Selection Summary" — Playfair Display, dark teal
> - Dynamic content updates as user selects/deselects:
>
>   **When nothing selected:**
>   - Empty state: "Select systems from the recommendations to see your summary here."
>   - Soft illustration or icon: clipboard/checklist outline
>
>   **When systems selected:**
>   - "Selected Systems" header with count badge
>   - List of selected system names (compact, with remove "×" button)
>   - Divider
>   - "Combined Impact" section:
>     - "Estimated time to deploy: 6-10 weeks"
>     - "Total effort: Medium-Large"
>     - "Primary focus area: Customer Experience + Revenue"
>   - Divider
>   - "Investment Tier" indicator:
>     - Tier 1 (1-2 systems): "Focused"
>     - Tier 2 (3-4 systems): "Comprehensive"
>     - Tier 3 (5+ systems): "Full Transformation"
>   - Shown as a horizontal bar with tiers, current tier highlighted
>   - Divider
>   - "Recommendation" note:
>     - "We recommend starting with your top 2-3 priorities and expanding after initial results."
>     - Subtle, advisory tone — not pushy
>
> **Footer Bar:**
> - Left: "Back" text button
> - Center: "All changes saved" with green dot
> - Right: "Continue" button — active only when at least 1 system is selected
> - Micro-text above Continue: "You can change selections later"
>
> **Design Direction:**
> - This is the most visually rich screen — but still calm and structured
> - Cards should feel substantial but not heavy — white with good spacing
> - The priority badges create a natural reading order
> - Selected cards should feel "activated" — lime green border, slightly elevated feel
> - The right panel summary should feel like a live receipt updating in real-time
> - Transitions: when selecting a card, smooth border color change (200ms). When a system appears in the right panel, slide-in animation
> - No overwhelming animations — everything is subtle and professional
> - The "Why this fits" section is the most important — it must feel personalized, not generic
>
> **Responsive:**
> - Mobile: cards stack full width. Right panel becomes a sticky bottom bar showing "X systems selected — View Summary" that opens a bottom sheet
> - Tablet: two columns — cards + right panel as slide-over
> - Desktop: full three-panel layout

## Content Data — System Catalog

### Systems Available (from `systems` table)
| System ID | Name | Description | Icon |
|-----------|------|-------------|------|
| growth-engine | Growth Engine | AI-powered marketing, lead gen, and conversion optimization | Rocket |
| support-engine | AI Customer Support Engine | Automated first-line support with intelligent escalation | Headset |
| cart-recovery | Cart Recovery System | Automated abandoned cart follow-up and win-back sequences | Shopping cart + arrow |
| recommendation-engine | Personalized Recommendation Engine | AI-driven product suggestions based on behavior and preferences | Sparkle + grid |
| sales-automation | Sales & Marketing Automation | End-to-end sales funnel automation with AI-driven outreach | Target |
| loyalty-system | Customer Loyalty & Retention | AI-powered churn prediction and retention workflows | Heart + shield |
| operations-autopilot | Operations Autopilot | Workflow automation, scheduling, and resource optimization | Gear + brain |
| data-intelligence | Data Intelligence Platform | Analytics, dashboards, and AI-driven business insights | Chart + lightbulb |
| booking-engine | Smart Booking Engine | AI-optimized scheduling, availability, and booking management | Calendar + check |
| compliance-automation | Compliance Automation | Document processing, regulatory checks, and audit trail | Shield + document |
| content-engine | Content Generation Engine | AI-powered content creation for marketing and communications | Pen + AI |
| onboarding-system | Digital Onboarding System | Streamlined client/patient onboarding with smart forms | User + arrow |

### Impact Scoring Matrix
| Impact Level | Badge Color | Description |
|-------------|-------------|-------------|
| High | Green (#84CC16) | Significant measurable improvement |
| Medium | Amber (#F59E0B) | Moderate improvement, good ROI |
| Low | Gray (#9CA3AF) | Incremental improvement |

### Effort Scoring
| Effort | Badge | Timeline |
|--------|-------|----------|
| S (Small) | Green | 1-2 weeks |
| M (Medium) | Amber | 2-4 weeks |
| L (Large) | Orange | 4-8 weeks |
| XL (Extra Large) | Red | 8+ weeks |

## Workflow

```
User arrives at /app/wizard/step-3
  → Check ai_cache for pre-computed recommendations (from Step 2 trigger)
  → If cached: load and display immediately
  → If not cached: run recommendation Edge Function synchronously (show skeleton)
  → Load systems catalog from `systems` + `system_services` tables
  → Load any saved step-3 selections from `project_systems`

Display recommendations
  → Ranked by AI priority score
  → Each card populated with personalized "why it fits" from AI
  → Non-recommended systems collapsed below

User selects/deselects systems
  → Toggle: save to project_systems (is_selected = true/false)
  → Right panel summary updates immediately
  → Left panel "Your Selections" updates
  → Debounce save to wizard_answers.data

User reorders (optional drag-and-drop)
  → Update priority order in project_systems or wizard_answers

User clicks "Continue"
  → Validate: at least 1 system selected
  → Final save of all selections
  → Update wizard_sessions.current_step = 4
  → Navigate to step-4
```

## Agent Behavior
- **AI is visible on this screen** — recommendations are AI-generated
- "Why it fits" bullets reference specific user answers from Steps 1-2
- Impact/effort scores come from AI analysis cross-referenced with system metadata
- AI explains but never decides — user must explicitly select
- If user selects 5+ systems, right panel shows advisory note: "Consider starting with 2-3 priorities"
- All AI reasoning stored in `project_systems.recommendation_metadata`
