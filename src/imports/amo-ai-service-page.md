Here is the complete design prompt for building an AMO AI service page with the Superside layout pattern:

---

# Design Prompt — AMO AI Service Page (Superside Layout System)

## Reference
Modeled on Superside's service page layout: full-bleed sections, editorial typography, dark/light alternating bands, large metrics, image-left/text-right compositions, and a consistent forest green + off-white + charcoal palette.

---

## GLOBAL DESIGN SYSTEM

**Fonts:**
- Display/Hero: `Cormorant Garamond` — 300/400 weight, italic for emphasis words
- Body/UI: `Jost` — 300/400/500/600 weight
- No Inter. No system fonts.

**Color Palette:**
- `#0F1612` — Deep forest black (dark sections background)
- `#1A5C3E` — Emerald green (primary accent, CTAs, hover states)
- `#2FA06A` — Bright emerald (highlights, italic emphasis)
- `#F8F6F2` — Warm parchment (light section background)
- `#FFFFFF` — Card surfaces
- `#18170F` — Primary text (on light)
- `rgba(255,255,255,0.85)` — Primary text (on dark)
- `#726F66` — Muted/supporting text
- `#E4E1DA` — Hairline rules, card borders

**Spacing system:** 80px/120px section padding. 48px column gaps. 1200px max-width container.

**Border radius:** Cards `12px`. Buttons `6px`. Image frames `16px`.

**Animations:** Staggered fade-up on scroll (Intersection Observer). 0.6s ease. Particles or gradient glows on dark hero sections.

---

## PAGE SECTIONS — IN ORDER

---

### SECTION 1 — HERO (Dark background, full-bleed)

**Layout:** Two-column. Left: text stack. Right: product screenshot / interface mockup image (slightly tilted or floating).

**Background:** `#0F1612` with subtle dot-grid texture `rgba(255,255,255,0.025)` at 32px. Radial emerald glow top-center.

**Content structure:**
```
[Eyebrow label — small caps, emerald]
[H1 — Cormorant 56px, light weight]
  "AI Chatbots That Run
   Your Business — *Not Just Talk*"
  (italic = emerald colored)

[Body — Jost 16px, 300 weight, rgba white 0.55]
  One sentence: the core value proposition.

[Two CTAs side by side]
  Primary: filled emerald button — "Build My Chatbot System"
  Secondary: ghost/text button — "See Real Use Cases →"

[Floating service-type pills below CTA]
  "Website Chat" | "WhatsApp" | "Email" | "CRM Sync" | "24/7"
  — small tags, dark border, semi-transparent background
```

**Right column:** Floating UI mockup card (chatbot conversation interface). Shadow `0 24px 64px rgba(0,0,0,0.4)`. Slight 3° tilt. Animate in from right.

---

### SECTION 2 — SOCIAL PROOF TICKER (Light background)

**Layout:** Full-width horizontal scrolling ticker, single line.

**Background:** `#F8F6F2` with 1px top/bottom borders `#E4E1DA`.

**Content:** Client logo strip — auto-scrolling, no pause. Logos in charcoal `opacity: 0.4`. On hover: `opacity: 0.9`.

```
[Eyebrow above strip — centered]
"Trusted by teams across fashion, real estate, SaaS, and e-commerce"

[Logo marquee — continuous scroll]
Shopify · HubSpot · Salesforce · Typeform · Intercom · [placeholder logos]
```

---

### SECTION 3 — PROBLEM/SOLUTION SPLIT (Light background)

**Layout:** Two columns with a vertical divider rule. Equal width. Large editorial headline above.

**Headline (centered above):**
```
[Cormorant 48px centered]
"Most chatbots just *answer*.
 Ours *execute*."
```

**Left column — "Why most chatbots fail":**
- Section label: `COMMON PROBLEM` in small caps, muted
- 4–5 bullet points with ✗ icons (muted red/gray)
- Each bullet: 14px Jost 400

**Right column — "What AMO AI chatbots do instead":**
- Section label: `AMO AI APPROACH` in small caps, emerald
- 5 rows, each row: icon (small, emerald line icon) + bold outcome + supporting micro-text
- Each row separated by a 1px hairline rule

**Closing callout (full-width, centered, below both columns):**
```
Italic Cormorant 24px — "The difference isn't features. It's whether
the conversation ends in a real business outcome."
```

---

### SECTION 4 — METRICS BAND (Dark background)

**Layout:** 3 large stats in equal columns, separated by 1px vertical rules.

**Background:** `#0F1612`. Subtle radial glow center. Dot texture.

```
[Eyebrow — centered, small caps, emerald]
"The impact of deploying smarter"

[Three stats — Cormorant Garamond 72px, 300 weight]
  60–80%          3×             24/7
  Conversations   Faster speed   Always
  automated       to first reply  available

[Below each number — Jost 13px, muted white]
  Supporting one-liner explanation
```

---

### SECTION 5 — CORE CAPABILITIES (Light background)

**Layout:** Left: sticky text block. Right: scrolling feature rows (each feature = one horizontal row with icon, title, bold description).

**Left sticky block:**
```
[Eyebrow — small caps, emerald]
"Complete Platform"

[H2 — Cormorant 42px]
"Built for day-one
 value and long-term scale"

[Body — Jost 15px, muted]
2 sentences on what "complete" means.

[CTA text link]
"View all capabilities →"
```

**Right scrolling rows (10 features):**
Each row:
```
[Number + Icon] [Feature name — Jost 600 14px] [Description — Jost 300 13px, 2 lines max]
─────────────────────────────────────────── [hairline rule below]
```
First 5 rows: labeled "DAY ONE" — emerald tag
Last 5 rows: labeled "GROWTH" — blue/teal tag

---

### SECTION 6 — REAL-WORLD WORKFLOWS (Dark background, scroll-driven)

**Layout:** Three large cards, full-width horizontal scroll on mobile, stacked vertically on desktop with alternating image/text sides.

**Background:** `#0F1612`.

**Section header:**
```
[Eyebrow] "Not theoretical — deployed in production"
[H2 — Cormorant 48px] "Real workflows. Real outcomes."
```

**Each workflow card:**
```
[Card background: rgba(255,255,255,0.04), border: 1px rgba(white,0.08), radius: 16px]

[Left: Step-by-step flow diagram]
  — Numbered steps 1–4 with connecting arrows
  — Each step: small icon + one-line action
  — Final step highlighted in emerald

[Right: Text block]
  [Industry tag — small pill]
  [Workflow name — Jost 600 20px]
  [Scenario quote in italics — what the user said]
  [Outcome statement — Cormorant italic 28px]
  [Metric pill — large number + label]
```

---

### SECTION 7 — INDUSTRY USE CASES (Light background)

**Layout:** 2×2 or 2×3 card grid. Each card = illustrated scenario card.

**Section header:**
```
[Eyebrow] "Industry solutions"
[H2 — Cormorant 44px]
"Tailored for your business model.
 Not just *any* business."
```

**Each card:**
```
[Card: white background, 12px radius, shadow-md]
[Top: colored icon area — industry-specific emerald/teal/blue]
[Industry name — Jost 600 16px]
[4 bullet points — specific use cases, not generic]
[Outcome line — italic Cormorant 18px, emerald]
[Metric badge — number + label, bottom right]
```

---

### SECTION 8 — AGENT ARCHITECTURE (Dark background)

**Layout:** Centered header, then a radial/hub diagram with Orchestrator in center and 6 agents around it. Below: explanation text.

**Background:** `#0F1612` with emerald mesh gradient.

```
[H2 — Cormorant 48px, centered, white]
"One conversation. Six specialists.
 *Working in parallel.*"

[Agent diagram]
  Center node: Orchestrator (largest, emerald)
  6 surrounding nodes: Analyst, Retriever, Ops, Scorer, Controller, Content
  Connecting lines: animated, pulsing emerald
  Each node: icon + name + one-word role

[Below diagram: "Approval Gate" bar]
  Full-width dark bar: "Human-in-the-Loop — Controller Agent"
  Explains: nothing executes without your approval

[3-column explainer below:]
  "Accurate" | "Safe" | "Auditable"
  Each: icon + 2 sentence description
```

---

### SECTION 9 — BUSINESS BENEFITS (Light background)

**Layout:** Left: large editorial headline. Right: 5 benefit rows (like Superside's "infrastructure" section).

```
[Left sticky]
[Eyebrow] "Executive View"
[H2 — Cormorant 48px]
"Real, measurable impact
 on your bottom line"

[Right: 5 rows, each separated by hairline rule]
  [Metric number — Cormorant 36px emerald] + [Benefit title — Jost 600]
  [One-line supporting description — Jost 300 muted]
```

---

### SECTION 10 — TEAM/TRUST (Light background)

**Layout:** 3 person cards, image + name + role. Mirrors Superside's "experts" section.

**Content for AMO AI:**
Replace with client logos + testimonial quotes, or AMO AI team headshots if available. Alternatively: 3 case study outcome cards.

---

### SECTION 11 — FAQ (Light background)

**Layout:** Accordion. Left: "Frequently asked *questions*" headline. Right: accordion list.

**Style:**
- Question: Jost 600 16px charcoal
- Answer: Jost 300 14px muted
- Toggle: + / − in emerald
- Each row: 1px hairline rule below, generous padding

---

### SECTION 12 — CLOSING CTA (Dark background, full-bleed)

**Layout:** Centered. Large editorial headline. Single primary CTA.

**Background:** `#0F1612` with emerald radial glow. Full viewport height or 400px minimum.

```
[Eyebrow — small caps, emerald]
"Ready to build"

[H2 — Cormorant 64px, white, italic emphasis]
"Your business runs 24/7.
 *Your AI should too.*"

[Body — Jost 300, rgba white 0.5, max-width 480px]
One sentence on what they get from booking a call.

[CTA button — emerald, large, 52px height]
"Design My Chatbot System →"

[Below button — text link]
"See use cases by industry"
```

---

## KEY SUPERSIDE LAYOUT PATTERNS TO REPLICATE

1. **Alternating dark/light sections** — never two dark or two light in a row
2. **Sticky left column + scrolling right** — used for features and benefits
3. **Italic colored words in headlines** — "built to *grow*", "move *fast*"
4. **Full-bleed image blocks** that break out of the grid
5. **Horizontal service pill navigation** below the hero (scrollable on mobile)
6. **Editorial metrics band** — large numbers on dark background, always 3 stats
7. **Card grids with consistent padding** — never cramped, always 28–32px internal padding
8. **Hairline rules everywhere** — separating rows, sections, columns
9. **Subtle hover behaviors** — cards lift 2–3px, accent bars appear, icons change color
10. **Closing CTA always dark** with the brand's most memorable line

---

This prompt is ready to paste directly into Google AI Studio, Lovable, Cursor, or any AI-assisted frontend builder. It specifies every section, every layout pattern, every typographic decision, and every interaction — tuned to AMO AI's brand, not Superside's.