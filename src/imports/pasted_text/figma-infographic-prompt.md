# FIGMA MAKE PROMPT
## AMO AI — Infographic Services Page
### Complete Design Brief: Layout · Copy · Sections · Visual System · Graphic Specifications

---

## WHAT THIS PAGE IS

This is NOT a typical service listing page.

**Core concept:** The page IS the portfolio. Every section is a live, graphic-rich infographic sample — rendered at full visual fidelity. Visitors scroll through real examples of each service type and understand the offering by experiencing it, not reading about it.

**Inspired by:** Duck Design's illustration-heavy approach, Lemonly's "design clarity" editorial style, Superside's premium motion previews, Ceros's interactive experience philosophy.

**Design standard:** Every card must feel like it came from a world-class infographic studio — dense with visual information, confident color, bold typography, and purposeful data structures.

---

## BRAND SYSTEM

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Forest green | `#1B3A2D` | Dark sections, nav, primary text on light |
| Lime | `#7AC143` | CTAs, highlights, active states, accents |
| Lime light | `#EAF3D5` | Light tints, tag backgrounds |
| Cream | `#F5F0E2` | Page base, light section bg |
| Sage | `#D6E8D0` | Mid-tone sections, before/after clean panel |
| White | `#FFFFFF` | Cards, elevated surfaces |
| Ink | `#1A1A1A` | Body text on light |
| Muted | `#6B7B6E` | Secondary text, captions |
| Border | `#DDD8CC` | Hairline rules, card borders |
| Teal | `#2E6B7A` | Data viz accent |
| Warm tan | `#C9A97D` | Process card background |
| Blush pink | `#E0CFC8` | Soft card variant |
| Plum | `#3A2850` | Interactive/dark card variant |
| Rust | `#9E3D20` | Report card background |

### Typography
- **Display/Headlines:** DM Serif Display — Italic for emphasis words
- **UI/Body/Labels:** DM Sans — 300 light, 400 regular, 500 medium, 600 semibold
- **Eyebrows:** DM Sans 600, 10px, 3px letter-spacing, ALL CAPS
- **Card titles:** DM Serif Display, 20–28px
- **Body:** DM Sans 300, 13–15px, line-height 1.65

### Spacing
- Section padding: 72px vertical, 40px horizontal (desktop)
- Card gap: 14px
- Card inner padding: 28px 24px
- Border radius: 14px (cards), 3px (buttons, tags)

### Section Rhythm
Hero (dark) → Services grid (cream) → Comparison spotlight (white) → Motion showcase (dark) → Interactive showcase (sage) → Process timeline (cream) → CTA (lime)

---

## PAGE SECTIONS — DESIGN SPECIFICATIONS

---

### SECTION 1: NAVIGATION

**Background:** `#1B3A2D`
**Height:** 56px

- Left: "AMO AI" wordmark in DM Serif Display 18px white
- Center: Home | Services | Industries | Process | Work — DM Sans 12px rgba(255,255,255,.5)
- Right: "Run AI Diagnostic" — lime filled button, 12px semibold, 3px radius

---

### SECTION 2: HERO

**Background:** `#1B3A2D`
**Layout:** 2-column grid (1.1fr / 1fr), 80px top padding, 0px bottom (bleeds into first card)

#### LEFT COLUMN — Copy

**Eyebrow:** `VISUAL INTELLIGENCE STUDIO · AI INFOGRAPHICS`

**H1 (DM Serif Display, 62px, white):**
```
Data that doesn't need
a translator
```
*"translator" in italic lime*

**Subheadline (DM Sans 300, 15px, rgba(255,255,255,.5)):**
```
Static infographics. Animated explainers.
Interactive data stories. AI-generated visual
content that makes your systems, results,
and roadmaps impossible to misunderstand.
```

**CTA Row:**
- Primary: "See Our Services ↓" — lime bg, forest text, 12px 24px padding
- Secondary: "View Sample Work" — ghost, white border

**Service type pills (rounded, small):**
- ACTIVE: Static infographics / Animated motion / Interactive
- INACTIVE: Data visualization / AI-generated / Reports & decks

#### RIGHT COLUMN — Visual

A dark-screened dashboard mockup (browser chrome + status dots) showing:
- 3 KPI tiles: 293% ROI / 80% automated / 3× faster
- A bar chart (8 bars, low-to-high, lime accent on peaks)
- An AI insights panel with 3 bullet items

*The screen has no bottom — it bleeds into the cream section below, creating depth.*

---

### SECTION 3: SERVICES BENTO GRID

**Background:** `#F5F0E2` (cream)
**Padding:** 16px 40px 48px

**Header row:**
- Left: "Infographic services we offer" — DM Serif Display 36px, forest
- Right: "9 SERVICE TYPES" — DM Sans 10px, muted, uppercase

**Grid:** 12-column, 14px gap

---

#### CARD 01 — PROCESS FLOW INFOGRAPHIC
**Color:** Warm tan `#C9A97D`
**Span:** 4 columns, 2 rows tall (~560px)
**Tag:** `01 · STATIC INFOGRAPHIC`

**Title:** Process flow infographics

**Description:** Step-by-step visual narratives showing how AI transforms a workflow from trigger to outcome. Designed for decks, reports, and web pages.

**Price line:** From $1,500 · 5–8 day delivery

**VISUAL REQUIREMENT — the main graphic area (bottom 60% of card):**
Build a vertical 5-step process flow infographic:

```
┌─────────────────────┐
│   Traffic arrives   │  — rgba(255,255,255,.15), rounded, subtitle: Social · Organic · Paid
└──────────┬──────────┘
           ↓ (arrow connector, rgba(255,255,255,.4))
┌─────────────────────┐
│  AI qualifies lead  │  — rgba(255,255,255,.22)
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ WhatsApp reply <30s │  — rgba(255,255,255,.30)
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│  CRM auto-updated   │  — rgba(255,255,255,.38)
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Deal closed      │  — SOLID LIME #7AC143, DM Serif Display, "+45% faster"
└─────────────────────┘
```

Each box: 160px wide × 42px tall, 8px radius, progressive opacity fill.

---

#### CARD 02 — ANIMATED MOTION GRAPHICS
**Color:** Forest green `#1B3A2D`
**Span:** 8 columns, 1 row (~280px)
**Tag:** `02 · ANIMATED MOTION GRAPHICS`

**Layout:** 2-column inside card (copy left / animated bar chart right)

**Title:** Motion infographics & explainer videos

**Description:** Lottie animations, After Effects renders, and Remotion-powered programmatic video. Transform static data into 30–90 second animated stories for web, social, and investor decks.

**Tech stack pills:** AFTER EFFECTS · LOTTIE · REMOTION

**VISUAL REQUIREMENT — right column:**
An animated bar chart (8 bars) showing month-by-month revenue growth:
- Bars grow progressively shorter to taller left-to-right
- Colors: dark bars = rgba(122,193,67,.3), peak bars = solid lime
- Values labeled above: +18%, +44%, +72%, +178%
- A play button overlay (circle with triangle) at top-right of chart
- Subtitle: `ANIMATED · ROI OVER TIME`

---

#### CARD 03 — INTERACTIVE INFOGRAPHIC
**Color:** Plum `#3A2850`
**Span:** 6 columns, 1 row (~320px)
**Tag:** `03 · INTERACTIVE INFOGRAPHIC`

**Title:** Click-through & scrollytelling experiences

**Description:** Web-embedded interactive infographics built with React. Users explore data by clicking, hovering, and scrolling. Inspired by Ceros, Lemonly Microsites, and NYT data journalism.

**Price:** From $4,000 · 10–20 day delivery

**VISUAL REQUIREMENT — bottom of card:**
A bubble/scatter chart mockup:
- 3 filter tabs at top: [All] [Real Estate] [Fashion] — "All" in purple accent
- 3 bubble circles of different sizes, labeled: Re / Ec / Fa
- A hover tooltip popup showing "+293% / Average client ROI" in lavender
- A dashed leader line from tooltip to bubble
- Bottom caption: "Click any bubble to explore"

---

#### CARD 04 — DATA VISUALIZATION
**Color:** Teal `#2E6B7A`
**Span:** 6 columns, 1 row (~320px)
**Tag:** `04 · DATA VISUALIZATION`

**Title:** Statistical & data-driven infographics

**Description:** Custom charts, dashboards, KPI summaries, and analytical visuals built from your real AI system data. For reports, investor presentations, and content marketing.

**VISUAL REQUIREMENT:**
3-part data display:
1. **Donut chart** (left): 80% lime slice / 20% white, center label "80% automated"
2. **Legend** (middle): lime square = AI-handled (80%) / white square = Human review (20%)
3. **KPI trio** (right): Three small cards: 293% ROI / 3× Speed / 23s Response — each in teal panel with lime number

---

#### CARD 05 — AI ARCHITECTURE DIAGRAMS
**Color:** Blush pink `#E0CFC8`
**Span:** 4 columns, 1 row (~300px)
**Tag:** `05 · SYSTEM MAP`

**Title:** AI architecture diagrams

**Description:** Node maps, agent taxonomy visuals, and architecture diagrams that explain complex AI systems to boards, clients, and teams.

**VISUAL REQUIREMENT:**
Radial node system map:
- Center ellipse: "AI Core / 48 agents" in rust tones
- 6 satellite rectangles orbiting: Lead Gen / CRM / Support / Analytics / Marketing / Operations
- Dashed connector lines from each satellite to center
- Color: rust/terracotta tones on pink background

---

#### CARD 06 — TIMELINE INFOGRAPHIC
**Color:** Off-white `#EDEAE0`
**Span:** 4 columns, 1 row (~300px)
**Tag:** `06 · TIMELINE`

**Title:** Deployment & roadmap visuals

**Description:** Visual timelines for AI deployment phases, product roadmaps, and company milestones. Clear, scannable, and shareable.

**VISUAL REQUIREMENT:**
Vertical timeline (left-spine format):
- Vertical line in DDD8CC
- 4 circular milestone nodes: 1=forest, 2=teal, 3=mid-green, 4=lime
- Each node: number + phase name + description + time label
- Phase 1: Discover · AI Diagnostic · Day 1
- Phase 2: Design · Architecture · Week 1–2
- Phase 3: Deploy · Build & Launch · Week 2–8
- Phase 4: Scale · Optimise · Ongoing
- Node 4 is lime — the "done" state

---

#### CARD 07 — COMPARISON INFOGRAPHIC
**Color:** Lime `#7AC143`
**Span:** 4 columns, 1 row (~300px)
**Tag:** `07 · COMPARISON`

**Title:** Before vs after visual stories

**Description:** Split-panel contrast infographics that show the operational shift AI creates. Perfect for sales decks, onboarding, and case study content.

**VISUAL REQUIREMENT:**
Side-by-side split panel:

LEFT PANEL (forest dark bg):
- Header: "BEFORE" in red badge
- 5 items with red dots + strikethrough text:
  - Manual 8h/day
  - 6h response time
  - Lost leads
  - No attribution
  - 5 tools, no sync

"vs" divider text

RIGHT PANEL (forest dark bg, lime accent):
- Header: "AFTER" in lime badge
- 5 items with lime dots + white text:
  - AI automated
  - <30s reply
  - 0 leads lost
  - Full ROI view
  - 1 unified system

---

#### CARD 08 — REPORTS & DECKS
**Color:** Rust `#9E3D20`
**Span:** 8 columns, 1 row (~260px)
**Tag:** `08 · ANNUAL REPORTS & DECKS`

**Layout:** 2-column (copy left / report cover mockup right)

**Title:** Data-rich report & presentation design

**Description:** Annual AI performance reports, investor decks, and board presentations with fully custom infographic layouts. Inspired by Lemonly's report design and Superside's editorial standards.

**VISUAL REQUIREMENT — right side:**
A report cover mockup:
- Dark card with "AI Performance Report / AMO AI · Q4 2025" header band
- Two KPI tiles: 293% average ROI / 80% automated
- A horizontal progress bar (lime fill, 65% complete)
- Bottom label: "Fully designed · Brand aligned · Investor ready"

---

#### CARD 09 — PROGRAMMATIC AI VIDEO
**Color:** Sage `#D6E8D0`
**Span:** 12 columns (full width), 1 row (~240px)
**Tag:** `09 · PROGRAMMATIC AI VIDEO · UNIQUE DIFFERENTIATOR`

**Layout:** 2-column (copy left 1fr / 3-step pipeline visual right 2fr)

**Title:** AI-generated personalized diagnostic videos

**Description:** Using Remotion + Lambda, we auto-generate a unique 60-second animated video for every prospect who completes the AI Diagnostic. Their business name, industry, ROI projections, and roadmap — rendered as a shareable MP4 in seconds. No other agency offers this.

**Tech stack:** REMOTION · AWS LAMBDA · REACT

**Price:** From $5,000 setup · $0.01/render at scale

**VISUAL REQUIREMENT — right side (3-step pipeline):**
Three screen frames connected by arrows:

FRAME 1 (forest dark bg):
- "STEP 1" label
- "Diagnostic complete"
- "Acme Corp · E-commerce"
- Progress bar (lime, 75% filled)

→ arrow

FRAME 2 (teal bg):
- "STEP 2"
- "AI renders video"
- "60s · Personalised · MP4"
- Play button circle

→ arrow

FRAME 3 (lime bg):
- "STEP 3"
- "Prospect shares video"
- "→ Viral loop · More leads"
- Filled progress bar

Bottom caption: "Scales to 1,000+ unique renders/month · $0.01 per video"

---

### SECTION 4: MOTION SHOWCASE

**Background:** `#1B3A2D`
**Layout:** Full-bleed dark section

**Eyebrow:** `MOTION & ANIMATION`
**H2:** "When static isn't enough"
**Subheadline:** Three motion categories we produce — each with a live preview.

**3-column showcase grid:**

**Column 1 — Explainer Videos**
Preview: A dark card with a 16:9 video thumbnail (play button overlay), labeled "60-second AI explainer · Lottie + AE"
Copy: From storyboard to final render in 2 weeks. Scripted, voiced, and motion-designed.

**Column 2 — Data Stories**
Preview: Animated bar chart thumbnail — bars building up left-to-right, values appearing, lime color scheme
Copy: Revenue growth, funnel conversion, and performance data turned into shareable animated charts.

**Column 3 — Diagnostic Result Videos**
Preview: A 3-step pipeline showing "diagnostic → render → MP4" as connected screens
Copy: Remotion-powered personalized video generated automatically for each prospect.

---

### SECTION 5: INTERACTIVE SHOWCASE

**Background:** `#D6E8D0` (sage)
**Layout:** 2-column (text left / interactive mockup right)

**Eyebrow:** `INTERACTIVE · CEROS STYLE`
**H2:** "Infographics people explore, not just read"
**Body copy:** We build web-embedded interactive infographics — scrollytelling, click-to-reveal data stories, filterable charts, and hover-activated tooltips. Every interaction deepens understanding.

**Feature list:**
- Click-to-reveal data points
- Filter by industry or time period
- Hover tooltips with contextual stats
- Scroll-triggered animations
- Embedded in any web page

**Right side — interactive mockup:**
A browser frame showing a filterable bubble chart:
- Industry filter tabs across top
- 6 bubbles of varying size (real estate, fashion, e-commerce, SaaS, travel, healthcare)
- One bubble highlighted/hovered with a tooltip popup
- Axes labeled: "ROI improvement" (y) / "Implementation time" (x)

---

### SECTION 6: PROCESS — HOW WE WORK

**Background:** `#F5F0E2` (cream)

**Eyebrow:** `OUR PROCESS`
**H2:** "Brief to delivered in 5 steps"

**VISUAL: Horizontal timeline with alternating above/below labels**

```
Brief → Concept → Script + Storyboard → Production → Delivery
  ●─────────────────●──────────────────●─────────────────●─────────────────●
```

Step details (alternating above/below the spine):

**Step 1 — Brief** (above): You submit data, goal, and audience. Day 1.
**Step 2 — Concept** (below): Static concept frame + visual direction. Days 2–3.
**Step 3 — Storyboard** (above): Frame-by-frame storyboard + voiceover script. Days 3–5.
**Step 4 — Production** (below): Animation or illustration rendered. Days 5–12.
**Step 5 — Delivery** (above): MP4, GIF, Lottie JSON, SVG, or React component. Days 12–20.

Bottom note: "All tiers include 2 revision rounds. Source files always included."

---

### SECTION 7: PRICING TABLE

**Background:** `#FFFFFF` (white)

**H2:** "Fixed fees. No surprises."
**Subheadline:** Every project scoped upfront. You know the cost before we start.

**4-column pricing grid:**

| MOTION STARTER | DATA STORY ← MOST POPULAR | PROCESS EXPLAINER | DIAGNOSTIC VIDEO SYSTEM |
|---|---|---|---|
| From $1,500 | From $2,500 | From $4,000 | Custom |
| 1 animated infographic (30s) | Data visualization video (60s) | Scripted explainer (60–90s) | Programmatic video generation |
| Static concept + 1 revision | Storyboard + script + 2 revisions | Voiceover + motion + 2 revisions | Scales to 1,000+ renders/month |
| MP4 + GIF | MP4 + source files | MP4, GIF, Lottie | Ongoing optimization |
| 5–8 days | 8–12 days | 10–15 days | Strategy call required |

Most Popular card: 2px lime border accent, "Most popular" badge in lime-light background.

---

### SECTION 8: CTA

**Background:** `#1B3A2D`
**Layout:** Centered, 72px vertical padding

**Eyebrow:** START TODAY

**H2 (DM Serif Display, 48px, white):**
```
Your AI data has a story.
Let's animate it.
```
*"animate it" in italic lime*

**Subheadline:** Submit a brief. Get a concept in 48 hours. Source files always included.

**CTA Row:**
- Primary: "Submit a Motion Brief" — lime, forest text, 14px, 14px/28px padding
- Secondary: "Book a Strategy Call" — ghost, white border, white text

**Trust line:** 5–20 day delivery · 2 revision rounds · Source files included · No retainer required

---

## FIGMA MAKE TECHNICAL SPECS

### Fonts to import
```
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Serif+Display:ital@0;1&display=swap');
```

### Grid system
- Max-width container: 1100px centered
- Bento grid: CSS grid, 12 columns, 14px gap
- Card spans: defined per card above

### Card anatomy standard
```
[Card background color]
  ├── Tag pill (top-left, 9px DM Sans 700, uppercase, 2px letter-spacing)
  ├── Title (DM Serif Display, 20–26px)
  ├── Description (DM Sans 300, 12–13px, max 3 lines)
  ├── Price line (10px, 55% opacity)
  ├── Learn more → (11px DM Sans 600)
  └── INFOGRAPHIC VISUAL (fills bottom 50–65% of card)
```

### Responsive breakpoints
- 1280px: Full 12-col, all side-by-side
- 1024px: 8-col, some stacking
- 768px: 2-col grid
- 375px: 1-col, full-width cards

### Animation notes (for Figma Prototype / developer handoff)
- Card hover: translateY(-2px), box-shadow deepen, 200ms ease
- CTA button hover: scale(1.02), 150ms
- Bar chart bars: animate height from 0 on scroll enter (JS/Lottie)
- Step timeline nodes: sequential fade-in + scale from 0.8 to 1

### Figma file structure
```
📁 AMO AI — Infographic Services Page
  📄 Cover
  📄 Style Guide Reference
  📄 Mobile 375px
  📄 Tablet 768px  
  📄 Desktop 1280px
    └── 01_Navigation
    └── 02_Hero
    └── 03_Services_Bento_Grid
    └── 04_Motion_Showcase
    └── 05_Interactive_Showcase
    └── 06_Process_Timeline
    └── 07_Pricing_Table
    └── 08_CTA
  📁 Components
    └── Cards (9 variants)
    └── Buttons (Primary / Secondary / Ghost)
    └── Tags / Eyebrows
    └── Infographic_Samples (9 SVG components)
    └── Navigation
  📁 Assets
    └── Infographic SVGs (exported)
    └── Animation storyboards
```

---

## COPY SUMMARY — ALL HEADLINES & CTAs

| Section | Headline | CTA |
|---------|----------|-----|
| Hero | Data that doesn't need a translator | See Our Services ↓ |
| Services | Infographic services we offer | — |
| Motion | When static isn't enough | — |
| Interactive | Infographics people explore, not just read | — |
| Process | Brief to delivered in 5 steps | — |
| Pricing | Fixed fees. No surprises. | — |
| CTA | Your AI data has a story. Let's animate it. | Submit a Motion Brief |

---

*End of Figma Make Prompt — AMO AI Infographic Services Page*
*Version 2.0 · March 2026 · Ready for Figma Make implementation*