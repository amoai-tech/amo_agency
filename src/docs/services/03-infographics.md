# AMO AI — AI Infographics & Visual Intelligence Page

**Route:** `/services/infographics`
**Component:** `/components/services/InfographicsPage.tsx`
**Status:** Planning
**Version:** 1.0

---

## 1. Overview

A premium editorial-style landing page positioning AMO AI as the company that turns complex AI strategy, automation, systems, and results into clear visual content: infographics, animated explainers, process diagrams, AI system maps, dashboard visuals, ROI storyboards, and motion-based business presentations.

**Design Direction:** Luxury editorial + modern SaaS aesthetic — dark/refined, strategic, premium consulting feel, elegant typography (Playfair Display headlines, system sans-serif body), strong whitespace, subtle motion, sharp diagrams, structured grids. NOT playful, cartoonish, or neon sci-fi.

**Color Palette (BCG Style Guide aligned):**
- Deep forest / near-black backgrounds: `#0F1A15`, `#1A3A32`
- Warm cream / parchment sections: `#FAF8F5`, `#F5F0EB`
- Muted gold / sand accents: `#C9A84C`, `#D4B86A`
- Emerald/green CTA highlights: `#2A9D6F`, `#1A3A32`
- Charcoal text on light: `#1b1b1b`
- White text on dark: `#FFFFFF`, `#E8E0D4`

---

## 2. Section Architecture (10 Sections)

### S1 — Hero
- **BG:** Dark forest `#0F1A15` with gradient overlay
- **Headline:** "Turn Complex AI Into Clear Visual Intelligence" (Playfair Display)
- **Subheadline:** "We design infographics, animated explainers, process maps, and AI system visuals..."
- **CTAs:** Primary "Get a Visual Strategy" (emerald), Secondary "View Example Infographics" (outline)
- **Visual:** Right-side composed diagram area with:
  - Central workflow: Discover → Diagnose → Design → Deploy (connected nodes)
  - Floating stat cards: 50+ AI Services, 8 Industries, 48+ AI Agents, 293% ROI
  - Lines/connectors between elements
  - All built as CSS/SVG — no stock photos

### S2 — Trust / Metrics Bar
- **BG:** Dark `#1A2E26`
- 4 stat cards in horizontal strip with thin dividers
- Below: Tech stack logos row (Supabase, OpenAI, Claude, Stripe, WhatsApp, n8n, LangChain, Vite)
- Animated count-up on scroll with `useInView`

### S3 — What We Create
- **BG:** Cream `#FAF8F5`
- **Headline:** "Visual Systems We Create"
- 3-column responsive grid of 6 deliverable cards
- Each card: icon, title, description, hover arrow reveal
- Cards: AI Strategy Infographics, Animated Process Explainers, AI System Diagrams, Dashboard Storytelling Visuals, ROI & Outcome Visuals, Presentation Graphics

### S4 — Why Infographics Matter for AI
- **Headline:** "AI Is Hard to Sell When It's Hard to See"
- Split layout: left dark panel (problems), right light panel (solutions)
- 6 pain points ↔ 6 solutions with connecting visual cues
- Left: `#1A3A32`, Right: `#FAF8F5`

### S5 — Types of Infographics
- **BG:** White `#FFFFFF`
- **Headline:** "What These Visuals Can Explain"
- 6 infographic type cards in staggered/editorial masonry layout
- Each: title, description, mini icon/preview
- Types: Process Flow, System Architecture Maps, Industry Intelligence, Comparison, Dashboard & KPI, Motion-Ready Storyboards

### S6 — Process Section
- **BG:** Cream `#F5F0EB`
- **Headline:** "From Strategy to Storytelling in 4 Steps"
- Horizontal process flow (desktop) / vertical timeline (mobile)
- Steps: Discover → Structure → Design → Deliver
- Connected line between steps, numbered badges

### S7 — Industry Use Cases
- **BG:** Dark `#0F1A15`
- **Headline:** "Designed for Real Business Use Cases"
- 6 industry cards (2x3 or 3x2 grid)
- Fashion & Luxury, Real Estate, E-commerce, SaaS & Tech, Tourism & Hospitality, Agencies & Consulting
- Each with industry-specific icon and bullet points

### S8 — Diagram Showcase
- **BG:** Near-black `#0A1410` with subtle glow
- **Headline:** "See the System, Not Just the Service"
- Large centerpiece SVG-style system map diagram
- Flow: Business Data → AI Analysis → Recommendations → Automation → Dashboard Insights → Outcomes
- Node clusters for: Lead Gen, CRM, Content, Operations, Support, Analytics

### S9 — Before vs After
- **BG:** `#FAF8F5`
- **Headline:** "Before AI Clarity. After Visual Intelligence."
- Side-by-side split comparison
- Left (fragmented, red-tinted): 5 pain items
- Right (organized, green-tinted): 5 solution items

### S10 — Final CTA
- **BG:** Dark premium `#0F1A15` with network pattern overlay
- **Headline:** "Need to Explain AI Better? Start With the Visual Layer."
- **Subheadline:** "We help businesses turn complex AI strategy..."
- **CTAs:** "Book a Visual Strategy Call" (emerald), "See Sample Work" (outline)
- **Trust line:** "Clear visuals. Stronger presentations. Faster understanding."

---

## 3. Component Structure

```
/components/services/InfographicsPage.tsx        — Main page (default export)
/components/services/infographics/
  InfographicsHero.tsx                            — S1
  InfographicsTrustBar.tsx                        — S2
  InfographicsDeliverables.tsx                    — S3
  InfographicsWhyItMatters.tsx                    — S4
  InfographicsTypes.tsx                           — S5
  InfographicsProcess.tsx                         — S6
  InfographicsIndustries.tsx                      — S7
  InfographicsDiagramShowcase.tsx                 — S8
  InfographicsBeforeAfter.tsx                     — S9
  InfographicsCTA.tsx                             — S10
```

## 4. Tech Stack

- React + TypeScript
- Tailwind CSS v4 (inline classes, BCG tokens from globals.css)
- `motion/react` for scroll animations, hover effects, count-up
- `lucide-react` for icons
- `react-router` for Link/navigation
- `react-responsive-masonry` for S5 gallery layout
- Unsplash via ImageWithFallback only if needed (prefer CSS/SVG diagrams)

## 5. Route Registration

Add to `/routes.tsx`:
```tsx
import InfographicsPage from './components/services/InfographicsPage';
// ...
{ path: 'services/infographics', Component: InfographicsPage },
```

## 6. Responsive Breakpoints

- Desktop: full editorial layouts, horizontal process, 3-col grids
- Tablet (md): 2-col grids, stacked hero
- Mobile: single column, vertical timeline, stacked cards

## 7. Animation Strategy

- Sections fade in on scroll via `useInView` + `motion.div`
- Stat counters animate on visibility
- Cards stagger in with 0.1s delay per item
- Hero diagram nodes pulse subtly
- Hover: cards lift with shadow, reveal arrow

---

*Plan created: March 19, 2026*
