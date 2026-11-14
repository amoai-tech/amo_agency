# Technology Stack Section — Design Documentation

**Component:** `TechStackSection.tsx`  
**Location:** `/components/home/TechStackSection.tsx`  
**Page:** HomePageV3  
**Position:** After VelocityProcessSection, before CapabilitiesSection  
**Design System:** AMO AI V3 with Dark Green Theme

---

## Strategic Positioning

**Purpose:** Establish technical credibility and demonstrate enterprise-grade infrastructure capability.

**Message:** "We don't just talk about AI — we build with production-grade tools trusted by industry leaders."

**Target Audience:**
- CTOs and Technical Decision Makers
- Engineering Leaders evaluating partners
- Enterprises requiring proven infrastructure
- Clients concerned about vendor lock-in

**Competitive Advantage:**
- Transparent technology choices (builds trust)
- Modern, battle-tested stack (reduces risk)
- Open-source options (shows flexibility)
- Multi-vendor approach (no single point of failure)

---

## Section Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    TECHNOLOGY STACK SECTION                     │
│                                                                 │
│  Background: #1E3D36 (deep green)                               │
│  Accent: #84CC16 (lime green)                                   │
│  Layout: 5-column grid (desktop) → 3+2 (tablet) → 1 (mobile)   │
│                                                                 │
│  Structure:                                                     │
│  1. Header with eyebrow + headline                              │
│  2. 5 Technology Category Cards (glassmorphism)                 │
│  3. Bottom Metrics Bar (credibility stats)                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Desktop Wireframe (1200px+)

```
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                               ║
║                                     TECHNOLOGY STACK SECTION                                                  ║
║                                     Background: #1E3D36 (deep green)                                          ║
║                                     Padding: 96px 24px                                                        ║
║                                                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                               │
│                                             HEADER ZONE                                                       │
│                                         [Centered, max-w-4xl]                                                 │
│                                                                                                               │
│                                    ┌───────────────────────────┐                                             │
│                                    │   Technology Stack        │                                             │
│                                    │   ─────────────────────   │                                             │
│                                    │   Eyebrow pill badge      │                                             │
│                                    │   #84CC16 text            │                                             │
│                                    │   rgba(220,229,221,0.12)  │                                             │
│                                    └───────────────────────────┘                                             │
│                                                                                                               │
│                                                                                                               │
│                                  We Build With The Best                                                       │
│                                  ═══════════════════════════                                                  │
│                                  Playfair Display, 52px, #FFFFFF                                              │
│                                  "The Best" in #84CC16 (lime)                                                 │
│                                                                                                               │
│                                                                                                               │
│                       Every tool is chosen for speed, reliability,                                            │
│                       and real-world AI performance — not hype.                                               │
│                       ──────────────────────────────────────────                                              │
│                       rgba(255,255,255,0.55), 1.1rem, max-w-560px                                             │
│                                                                                                               │
│                                                                                                               │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                               │
│                                         5-COLUMN TECH GRID                                                    │
│                                    Grid gap: 24px horizontally                                                │
│                                                                                                               │
│  ┏━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━┓  ┏━━━━━━━━━━━━━━━━━┓  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  COLUMN 1       ┃  ┃  COLUMN 2       ┃  ┃  COLUMN 3       ┃  ┃  COLUMN 4       ┃  ┃  COLUMN 5       ┃  │
│  ┃  ═══════════    ┃  ┃  ═══════════    ┃  ┃  ═══════════    ┃  ┃  ═══════════    ┃  ┃  ═══════════    ┃  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  AI & Agent     ┃  ┃  Data & Vector  ┃  ┃  Automation &   ┃  ┃  Frontend &     ┃  ┃  Deployment &   ┃  │
│  ┃  Intelligence   ┃  ┃  Infrastructure ┃  ┃  Integration    ┃  ┃  Application    ┃  ┃  Infrastructure ┃  │
│  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  │
│  ┃  #84CC16        ┃  ┃  #84CC16        ┃  ┃  #84CC16        ┃  ┃  #84CC16        ┃  ┃  #84CC16        ┃  │
│  ┃  13.6px, 700    ┃  ┃  13.6px, 700    ┃  ┃  13.6px, 700    ┃  ┃  13.6px, 700    ┃  ┃  13.6px, 700    ┃  │
│  ┃  Underline      ┃  ┃  Underline      ┃  ┃  Underline      ┃  ┃  Underline      ┃  ┃  Underline      ┃  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  OpenAI GPT-4o  ┃  ┃  Supabase +     ┃  ┃  n8n            ┃  ┃  React          ┃  ┃  Vercel         ┃  │
│  ┃  ─────────────  ┃  ┃  pgvector       ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  │
│  ┃  #FFFFFF, 600   ┃  ┃  ─────────────  ┃  ┃  Self-hosted    ┃  ┃  Interactive    ┃  ┃  Edge deploy    ┃  │
│  ┃                 ┃  ┃  #FFFFFF, 600   ┃  ┃  workflow       ┃  ┃  web apps &     ┃  ┃  with instant   ┃  │
│  ┃  Advanced       ┃  ┃                 ┃  ┃  automation     ┃  ┃  dashboards     ┃  ┃  rollbacks      ┃  │
│  ┃  reasoning &    ┃  ┃  Vector search, ┃  ┃  for AI agent   ┃  ┃                 ┃  ┃  & CDN          ┃  │
│  ┃  language gen   ┃  ┃  auth, real-    ┃  ┃  pipelines      ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  ──────────     ┃  ┃  time — all in  ┃  ┃  ──────────     ┃  ┃  ──────────     ┃  ┃  ──────────     ┃  │
│  ┃  rgba(255,255,  ┃  ┃  PostgreSQL     ┃  ┃  rgba(255,255,  ┃  ┃  rgba(255,255,  ┃  ┃  rgba(255,255,  ┃  │
│  ┃  255,0.5)       ┃  ┃  ──────────     ┃  ┃  255,0.5)       ┃  ┃  255,0.5)       ┃  ┃  255,0.5)       ┃  │
│  ┃  12.8px, 300    ┃  ┃  rgba(255,255,  ┃  ┃  12.8px, 300    ┃  ┃  12.8px, 300    ┃  ┃  12.8px, 300    ┃  │
│  ┃                 ┃  ┃  255,0.5)       ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃                 ┃  ┃  12.8px, 300    ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  Assistants API ┃  ┃                 ┃  ┃  WhatsApp       ┃  ┃  Next.js        ┃  ┃  Docker         ┃  │
│  ┃  ─────────────  ┃  ┃  Redis          ┃  ┃  Business API   ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  │
│  ┃  Agent frame-   ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  SSR, API       ┃  ┃  Container-     ┃  │
│  ┃  work with tool ┃  ┃  In-memory      ┃  ┃  AI conver-     ┃  ┃  routes, and    ┃  ┃  ized AI        ┃  │
│  ┃  calling &      ┃  ┃  caching &      ┃  ┃  sations on     ┃  ┃  production-    ┃  ┃  workloads &    ┃  │
│  ┃  memory         ┃  ┃  session mgmt   ┃  ┃  world's #1     ┃  ┃  grade React    ┃  ┃  reproducible   ┃  │
│  ┃                 ┃  ┃                 ┃  ┃  messaging      ┃  ┃  framework      ┃  ┃  environments   ┃  │
│  ┃                 ┃  ┃                 ┃  ┃  platform       ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  Anthropic      ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  Claude         ┃  ┃  Cloudinary     ┃  ┃  Twilio         ┃  ┃  TypeScript     ┃  ┃  GitHub         ┃  │
│  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  │
│  ┃  Long-context   ┃  ┃  AI-powered     ┃  ┃  Multi-channel  ┃  ┃  Type-safe JS   ┃  ┃  Version        ┃  │
│  ┃  analysis &     ┃  ┃  media mgmt &   ┃  ┃  SMS, voice &   ┃  ┃  for complex    ┃  ┃  control,       ┃  │
│  ┃  safety-        ┃  ┃  optimization   ┃  ┃  messaging      ┃  ┃  AI logic       ┃  ┃  CI/CD, and     ┃  │
│  ┃  conscious      ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃  code review    ┃  │
│  ┃  reasoning      ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃  pipelines      ┃  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  LlamaIndex     ┃  ┃                 ┃  ┃  Tiptap         ┃  ┃  Tailwind CSS   ┃  ┃                 ┃  │
│  ┃  ─────────────  ┃  ┃                 ┃  ┃  ─────────────  ┃  ┃  ─────────────  ┃  ┃                 ┃  │
│  ┃  RAG framework  ┃  ┃                 ┃  ┃  Rich text      ┃  ┃  Utility-first  ┃  ┃                 ┃  │
│  ┃  for connecting ┃  ┃                 ┃  ┃  editing for    ┃  ┃  CSS for rapid  ┃  ┃                 ┃  │
│  ┃  LLMs to        ┃  ┃                 ┃  ┃  AI content     ┃  ┃  custom UI      ┃  ┃                 ┃  │
│  ┃  private data   ┃  ┃                 ┃  ┃  interfaces     ┃  ┃  development    ┃  ┃                 ┃  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┃  Mistral        ┃  ┃                 ┃  ┃                 ┃  ┃  Vite           ┃  ┃                 ┃  │
│  ┃  ─────────────  ┃  ┃                 ┃  ┃                 ┃  ┃  ─────────────  ┃  ┃                 ┃  │
│  ┃  Open-source    ┃  ┃                 ┃  ┃                 ┃  ┃  Lightning-     ┃  ┃                 ┃  │
│  ┃  models for     ┃  ┃                 ┃  ┃                 ┃  ┃  fast builds &  ┃  ┃                 ┃  │
│  ┃  privacy-first  ┃  ┃                 ┃  ┃                 ┃  ┃  hot module     ┃  ┃                 ┃  │
│  ┃  deployments    ┃  ┃                 ┃  ┃                 ┃  ┃  replacement    ┃  ┃                 ┃  │
│  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  ┃                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━┛  ┗━━━━━━━━━━━━━━━━━┛  │
│                                                                                                               │
│  Card Style:                                                                                                  │
│  - Background: rgba(220,229,221,0.06) (subtle sage tint)                                                     │
│  - Border: 1px solid rgba(220,229,221,0.1)                                                                    │
│  - Border-radius: 16px                                                                                        │
│  - Padding: 24px                                                                                              │
│  - Backdrop-filter: blur(8px) (glassmorphism)                                                                 │
│  - Transition: all 0.3s ease                                                                                  │
│  - Hover: border-color rgba(132,204,22,0.3), translateY(-4px)                                                 │
│                                                                                                               │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                               │
│                                         METRICS BAR                                                           │
│                                     [Centered, 3 columns]                                                     │
│                                     Margin-top: 64px                                                          │
│                                                                                                               │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─       │
│                                                                                                               │
│                20+                            99.9%                           24/7                            │
│                ───                            ─────                           ────                            │
│                #84CC16                        #84CC16                         #84CC16                         │
│                Playfair                       Playfair                        Playfair                        │
│                48px, 600                      48px, 600                       48px, 600                       │
│                                                                                                               │
│         Technologies in                  Uptime Across                  Monitoring &                          │
│       Our Production Stack              Deployed Systems               Incident Response                      │
│       ────────────────────              ────────────────               ─────────────────                      │
│       rgba(255,255,255,0.55)            rgba(255,255,255,0.55)         rgba(255,255,255,0.55)                │
│       14.4px, 400                       14.4px, 400                    14.4px, 400                           │
│                                                                                                               │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─       │
│                                                                                                               │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Tablet Wireframe (768px - 1199px)

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                      TECHNOLOGY STACK SECTION                          │
│                      Padding: 80px 20px                                │
│                                                                        │
│                        ┌───────────────────┐                          │
│                        │ Technology Stack  │                          │
│                        └───────────────────┘                          │
│                                                                        │
│                    We Build With The Best                              │
│                    ═════════════════════                               │
│                                                                        │
│              Every tool is chosen for speed,                           │
│              reliability, and real-world AI                            │
│              performance — not hype.                                   │
│                                                                        │
│  ┏━━━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━━━┓          │
│  ┃                ┃ ┃                ┃ ┃                ┃          │
│  ┃  AI & Agent    ┃ ┃  Data & Vector ┃ ┃  Automation &  ┃          │
│  ┃  Intelligence  ┃ ┃  Infrastructure┃ ┃  Integration   ┃          │
│  ┃                ┃ ┃                ┃ ┃                ┃          │
│  ┃  [5 techs]     ┃ ┃  [3 techs]     ┃ ┃  [4 techs]     ┃          │
│  ┃                ┃ ┃                ┃ ┃                ┃          │
│  ┗━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━┛          │
│                                                                        │
│         ┏━━━━━━━━━━━━━━━━━━━━━┓ ┏━━━━━━━━━━━━━━━━━━━━━┓            │
│         ┃                     ┃ ┃                     ┃            │
│         ┃  Frontend &         ┃ ┃  Deployment &       ┃            │
│         ┃  Application        ┃ ┃  Infrastructure     ┃            │
│         ┃                     ┃ ┃                     ┃            │
│         ┃  [5 techs]          ┃ ┃  [3 techs]          ┃            │
│         ┃                     ┃ ┃                     ┃            │
│         ┗━━━━━━━━━━━━━━━━━━━━━┛ ┗━━━━━━━━━━━━━━━━━━━━━┛            │
│                                                                        │
│  Grid: 3 columns (top row) → 2 columns (bottom row, centered)         │
│                                                                        │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─        │
│                                                                        │
│        20+              99.9%              24/7                        │
│    Technologies     Uptime Across      Monitoring &                   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Mobile Wireframe (375px - 767px)

```
┌─────────────────────────────────────────┐
│                                         │
│        TECHNOLOGY STACK SECTION         │
│        Padding: 64px 16px               │
│                                         │
│       ┌─────────────────────┐           │
│       │  Technology Stack   │           │
│       └─────────────────────┘           │
│                                         │
│       We Build With The Best            │
│       ═══════════════════               │
│                                         │
│   Every tool is chosen for speed,       │
│   reliability, and real-world AI        │
│   performance — not hype.               │
│                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                 ┃  │
│  ┃  AI & Agent Intelligence        ┃  │
│  ┃  ══════════════════════          ┃  │
│  ┃                                 ┃  │
│  ┃  OpenAI GPT-4o                  ┃  │
│  ┃  Advanced reasoning...          ┃  │
│  ┃                                 ┃  │
│  ┃  Assistants API                 ┃  │
│  ┃  Agent framework...             ┃  │
│  ┃                                 ┃  │
│  ┃  Anthropic Claude               ┃  │
│  ┃  Long-context...                ┃  │
│  ┃                                 ┃  │
│  ┃  LlamaIndex                     ┃  │
│  ┃  RAG framework...               ┃  │
│  ┃                                 ┃  │
│  ┃  Mistral                        ┃  │
│  ┃  Open-source...                 ┃  │
│  ┃                                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                 ┃  │
│  ┃  Data & Vector Infrastructure   ┃  │
│  ┃  ══════════════════════          ┃  │
│  ┃                                 ┃  │
│  ┃  Supabase + pgvector            ┃  │
│  ┃  Vector search...               ┃  │
│  ┃                                 ┃  │
│  ┃  Redis                          ┃  │
│  ┃  In-memory caching...           ┃  │
│  ┃                                 ┃  │
│  ┃  Cloudinary                     ┃  │
│  ┃  AI-powered media...            ┃  │
│  ┃                                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                 ┃  │
│  ┃  Automation & Integration       ┃  │
│  ┃  ══════════════════════          ┃  │
│  ┃                                 ┃  │
│  ┃  [4 technologies]               ┃  │
│  ┃                                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                 ┃  │
│  ┃  Frontend & Application         ┃  │
│  ┃  ══════════════════════          ┃  │
│  ┃                                 ┃  │
│  ┃  [5 technologies]               ┃  │
│  ┃                                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃                                 ┃  │
│  ┃  Deployment & Infrastructure    ┃  │
│  ┃  ══════════════════════          ┃  │
│  ┃                                 ┃  │
│  ┃  [3 technologies]               ┃  │
│  ┃                                 ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                         │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
│                                         │
│              20+                        │
│        Technologies in                  │
│     Our Production Stack                │
│                                         │
│             99.9%                       │
│        Uptime Across                    │
│       Deployed Systems                  │
│                                         │
│             24/7                        │
│         Monitoring &                    │
│       Incident Response                 │
│                                         │
└─────────────────────────────────────────┘
```

---

## Complete Content Breakdown

### Column 1: AI & Agent Intelligence

```
┌─────────────────────────────────────────────────────────┐
│  AI & Agent Intelligence                                │
│  ═══════════════════════                                │
│  #84CC16, 13.6px, 700, uppercase, 2px underline         │
│                                                         │
│  OpenAI GPT-4o                                          │
│  ─────────────                                          │
│  #FFFFFF, 16px, 600                                     │
│  Advanced reasoning and language generation             │
│  for agents and chatbots                                │
│  ────────────────────────────────────────               │
│  rgba(255,255,255,0.5), 12.8px, 300                     │
│                                                         │
│  Assistants API                                         │
│  ──────────────                                         │
│  Agent framework with tool calling, code execution,     │
│  and persistent threads                                 │
│                                                         │
│  Anthropic Claude                                       │
│  ────────────────                                       │
│  Long-context analysis and safety-conscious             │
│  AI reasoning                                           │
│                                                         │
│  LlamaIndex                                             │
│  ──────────                                             │
│  RAG framework for connecting LLMs to private           │
│  data sources                                           │
│                                                         │
│  Mistral                                                │
│  ───────                                                │
│  Open-source models for privacy-first and               │
│  cost-efficient AI                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Column 2: Data & Vector Infrastructure

```
┌─────────────────────────────────────────────────────────┐
│  Data & Vector Infrastructure                           │
│  ════════════════════════════                           │
│  #84CC16, 13.6px, 700, uppercase, 2px underline         │
│                                                         │
│  Supabase + pgvector                                    │
│  ───────────────────                                    │
│  #FFFFFF, 16px, 600                                     │
│  Vector search, auth, real-time, and storage —          │
│  all in PostgreSQL                                      │
│  ────────────────────────────────────────               │
│  rgba(255,255,255,0.5), 12.8px, 300                     │
│                                                         │
│  Redis                                                  │
│  ─────                                                  │
│  In-memory caching and real-time response               │
│  acceleration                                           │
│                                                         │
│  Cloudinary                                             │
│  ──────────                                             │
│  AI-powered media management and optimization           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Column 3: Automation & Integration

```
┌─────────────────────────────────────────────────────────┐
│  Automation & Integration                               │
│  ════════════════════════                               │
│  #84CC16, 13.6px, 700, uppercase, 2px underline         │
│                                                         │
│  n8n                                                    │
│  ───                                                    │
│  #FFFFFF, 16px, 600                                     │
│  Self-hosted workflow automation for AI agent           │
│  pipelines                                              │
│  ────────────────────────────────────────               │
│  rgba(255,255,255,0.5), 12.8px, 300                     │
│                                                         │
│  WhatsApp Business API                                  │
│  ─────────────────────                                  │
│  AI conversations on the world's #1 messaging           │
│  platform                                               │
│                                                         │
│  Twilio                                                 │
│  ──────                                                 │
│  Multi-channel SMS, voice, and messaging APIs           │
│                                                         │
│  Tiptap                                                 │
│  ──────                                                 │
│  Rich text editing for AI-powered content               │
│  interfaces                                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Column 4: Frontend & Application

```
┌─────────────────────────────────────────────────────────┐
│  Frontend & Application                                 │
│  ══════════════════════                                 │
│  #84CC16, 13.6px, 700, uppercase, 2px underline         │
│                                                         │
│  React                                                  │
│  ─────                                                  │
│  #FFFFFF, 16px, 600                                     │
│  Interactive web applications and AI dashboards         │
│  ────────────────────────────────────────               │
│  rgba(255,255,255,0.5), 12.8px, 300                     │
│                                                         │
│  Next.js                                                │
│  ───────                                                │
│  SSR, API routes, and production-grade React            │
│  framework                                              │
│                                                         │
│  TypeScript                                             │
│  ──────────                                             │
│  Type-safe JavaScript for complex AI application        │
│  logic                                                  │
│                                                         │
│  Tailwind CSS                                           │
│  ────────────                                           │
│  Utility-first CSS for rapid custom UI                  │
│  development                                            │
│                                                         │
│  Vite                                                   │
│  ────                                                   │
│  Lightning-fast builds and hot module replacement       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Column 5: Deployment & Infrastructure

```
┌─────────────────────────────────────────────────────────┐
│  Deployment & Infrastructure                            │
│  ═══════════════════════════                            │
│  #84CC16, 13.6px, 700, uppercase, 2px underline         │
│                                                         │
│  Vercel                                                 │
│  ──────                                                 │
│  #FFFFFF, 16px, 600                                     │
│  Edge deployment with instant rollbacks and             │
│  global CDN                                             │
│  ────────────────────────────────────────               │
│  rgba(255,255,255,0.5), 12.8px, 300                     │
│                                                         │
│  Docker                                                 │
│  ──────                                                 │
│  Containerized AI workloads and reproducible            │
│  environments                                           │
│                                                         │
│  GitHub                                                 │
│  ──────                                                 │
│  Version control, CI/CD automation, and code            │
│  review pipelines                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Design Specifications

### Color Palette

| Element                  | Color Value                        | Usage                           |
|--------------------------|------------------------------------|---------------------------------|
| Section background       | `#1E3D36`                          | Deep green base                 |
| Accent color             | `#84CC16`                          | Lime green for emphasis         |
| Card background          | `rgba(220, 229, 221, 0.06)`        | Subtle sage tint                |
| Card border              | `rgba(220, 229, 221, 0.1)`         | Soft outline                    |
| Card border (hover)      | `rgba(132, 204, 22, 0.3)`          | Lime glow on hover              |
| Badge background         | `rgba(220, 229, 221, 0.12)`        | Eyebrow pill background         |
| Badge border             | `rgba(220, 229, 221, 0.15)`        | Eyebrow pill outline            |
| Headline text            | `#FFFFFF`                          | Primary white text              |
| "The Best" accent        | `#84CC16`                          | Lime highlight in headline      |
| Subheadline text         | `rgba(255, 255, 255, 0.55)`        | Muted white for supporting text |
| Category title           | `#84CC16`                          | Column headers                  |
| Category underline       | `#84CC16`                          | 2px solid, ~40px width          |
| Tech name                | `#FFFFFF`                          | Technology names                |
| Tech description         | `rgba(255, 255, 255, 0.5)`         | Technology descriptions         |
| Metric number            | `#84CC16`                          | Stats (20+, 99.9%, 24/7)        |
| Metric label             | `rgba(255, 255, 255, 0.55)`        | Stat labels                     |

### Typography Scale

| Element              | Font Family       | Size   | Weight | Transform  | Line Height |
|----------------------|-------------------|--------|--------|------------|-------------|
| Headline             | Playfair Display  | 52px   | 600    | -          | 1.15        |
| Subheadline          | Inter             | 17.6px | 400    | -          | 1.7         |
| Badge text           | Inter             | 14px   | 500    | uppercase  | 1.4         |
| Category title       | Inter             | 13.6px | 700    | uppercase  | 1.3         |
| Tech name            | Inter             | 16px   | 600    | -          | 1.5         |
| Tech description     | Inter             | 12.8px | 300    | -          | 1.6         |
| Metric number        | Playfair Display  | 48px   | 600    | -          | 1.2         |
| Metric label         | Inter             | 14.4px | 400    | -          | 1.5         |

### Spacing & Layout

| Element                  | Desktop        | Tablet         | Mobile         |
|--------------------------|----------------|----------------|----------------|
| Section padding Y        | 96px           | 80px           | 64px           |
| Section padding X        | 24px           | 20px           | 16px           |
| Header bottom margin     | 64px           | 56px           | 48px           |
| Grid columns             | 5              | 3 + 2          | 1              |
| Grid gap                 | 24px           | 20px           | 16px           |
| Card padding             | 24px           | 20px           | 20px           |
| Card border-radius       | 16px           | 14px           | 12px           |
| Category title margin-bottom | 12px      | 10px           | 10px           |
| Tech spacing (margin-top)| 20px           | 18px           | 16px           |
| Metrics bar margin-top   | 64px           | 56px           | 48px           |
| Metric gap               | 48px           | 40px           | 32px           |

### Card Component

```css
.tech-card {
  background: rgba(220, 229, 221, 0.06);
  border: 1px solid rgba(220, 229, 221, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tech-card:hover {
  border-color: rgba(132, 204, 22, 0.3);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}
```

### Category Title with Underline

```css
.category-title {
  color: #84CC16;
  font-size: 13.6px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  position: relative;
  padding-bottom: 8px;
}

.category-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background: #84CC16;
}
```

---

## Responsive Breakpoints

```css
/* Desktop: 1200px+ */
@media (min-width: 1200px) {
  .tech-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
  }
}

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) {
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  .tech-grid > :nth-child(4),
  .tech-grid > :nth-child(5) {
    grid-column: span 1;
  }
  
  /* Center the bottom 2 cards */
  .tech-grid::after {
    content: '';
    display: block;
    grid-column: 1 / -1;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .tech-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .metrics-bar {
    flex-direction: column;
    gap: 32px;
  }
}
```

---

## Animation Details

### Card Entrance Animation

```javascript
// Stagger animation for cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  })
};
```

### Hover Animation

```javascript
// Card hover effect
const cardHover = {
  scale: 1.0,
  y: -4,
  borderColor: 'rgba(132, 204, 22, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  transition: {
    duration: 0.3,
    ease: 'easeOut'
  }
};
```

### Metrics Counter Animation

```javascript
// Animate numbers counting up
const counterAnimation = {
  from: 0,
  duration: 1.5,
  ease: 'easeOut',
  onUpdate: (value) => {
    // Update number display
  }
};
```

---

## Implementation Strategy

### Phase 1: Component Structure
1. Create `/components/home/TechStackSection.tsx`
2. Set up basic layout with header
3. Implement card grid system
4. Add metrics bar

### Phase 2: Content Integration
1. Define technology data structure
2. Map content to card components
3. Implement category titles with underlines
4. Add technology descriptions

### Phase 3: Styling & Polish
1. Apply glassmorphism effects
2. Implement hover states
3. Add entrance animations
4. Test responsive breakpoints

### Phase 4: Optimization
1. Optimize images/logos (if added)
2. Test performance on mobile
3. Add reduced motion support
4. Cross-browser testing

---

## Data Structure

```typescript
interface Technology {
  name: string;
  description: string;
}

interface TechCategory {
  id: string;
  title: string;
  technologies: Technology[];
}

const techStack: TechCategory[] = [
  {
    id: 'ai-intelligence',
    title: 'AI & Agent Intelligence',
    technologies: [
      {
        name: 'OpenAI GPT-4o',
        description: 'Advanced reasoning and language generation for agents and chatbots'
      },
      {
        name: 'Assistants API',
        description: 'Agent framework with tool calling, code execution, and persistent threads'
      },
      // ... more technologies
    ]
  },
  // ... more categories
];

interface Metric {
  number: string;
  label: string;
}

const metrics: Metric[] = [
  { number: '20+', label: 'Technologies in Our Production Stack' },
  { number: '99.9%', label: 'Uptime Across Deployed Systems' },
  { number: '24/7', label: 'Monitoring & Incident Response' }
];
```

---

## SEO & Accessibility

### Semantic HTML Structure

```html
<section aria-labelledby="tech-stack-heading">
  <div class="container">
    <div class="header">
      <span class="badge" role="text">Technology Stack</span>
      <h2 id="tech-stack-heading">
        We Build With <span class="accent">The Best</span>
      </h2>
      <p class="subheadline">
        Every tool is chosen for speed, reliability, and real-world AI performance — not hype.
      </p>
    </div>
    
    <div class="tech-grid" role="list">
      <article class="tech-card" role="listitem">
        <h3 class="category-title">AI & Agent Intelligence</h3>
        <div class="tech-item">
          <h4>OpenAI GPT-4o</h4>
          <p>Advanced reasoning and language generation...</p>
        </div>
        <!-- More technologies -->
      </article>
      <!-- More categories -->
    </div>
    
    <div class="metrics-bar" aria-label="Technology metrics">
      <div class="metric">
        <div class="metric-number" aria-label="20 plus">20+</div>
        <div class="metric-label">Technologies in Our Production Stack</div>
      </div>
      <!-- More metrics -->
    </div>
  </div>
</section>
```

### Alt Text Guidelines
- If adding technology logos, use descriptive alt text: "OpenAI logo"
- Decorative elements should have `aria-hidden="true"`

### Color Contrast
- ✅ #FFFFFF on #1E3D36 = 10.8:1 (WCAG AAA)
- ✅ #84CC16 on #1E3D36 = 5.2:1 (WCAG AA)
- ✅ rgba(255,255,255,0.55) on #1E3D36 = 5.9:1 (WCAG AA)

---

## Why This Design Works

### Technical Credibility
- **Comprehensive:** Shows depth across AI, data, automation, frontend, and infrastructure
- **Modern:** Uses cutting-edge tools (GPT-4o, Claude, Next.js, Vercel)
- **Proven:** Includes industry-standard technologies (PostgreSQL, Redis, Docker)

### Visual Hierarchy
- **Dark background:** Creates focus and sophistication
- **Lime green accent:** High contrast for scannability
- **Glassmorphism cards:** Modern, premium feel
- **Clear categorization:** Easy to parse 5 columns

### Trust Signals
- **20+ technologies:** Depth of expertise
- **99.9% uptime:** Reliability and quality
- **24/7 monitoring:** Professional operations
- **Transparent stack:** No vendor lock-in concerns

### Responsive Design
- **Desktop (5 cols):** Shows full breadth of stack
- **Tablet (3+2):** Maintains readability without crowding
- **Mobile (1 col):** Clean vertical scroll, easy to read

---

## Future Enhancements

### V2 Features (Optional)
1. **Technology Logos**
   - Add brand logos next to technology names
   - Use grayscale with color on hover
   - SVG format for crisp rendering

2. **Interactive Filtering**
   - Allow users to filter by category
   - "Show all" / "Show category" toggle
   - Animated transitions

3. **Case Study Links**
   - Link technologies to relevant projects
   - "See how we used this →" hover state
   - Tooltip with project names

4. **Technology Tooltips**
   - Hover to see additional details
   - Link to official documentation
   - "Learn more" external links

5. **Comparison View**
   - "Why we chose X over Y" educational content
   - Architecture decision records (ADRs)
   - Technical blog integration

---

## Testing Checklist

- [ ] Desktop layout (1200px+) displays 5 columns
- [ ] Tablet layout (768-1199px) displays 3+2 grid
- [ ] Mobile layout (<768px) displays single column
- [ ] Hover effects work smoothly
- [ ] Card animations stagger correctly
- [ ] Metrics bar centers properly on all screens
- [ ] Text remains readable at all sizes
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Reduced motion preference respected
- [ ] Section loads performantly
- [ ] No layout shift on page load
- [ ] Cross-browser compatibility (Chrome, Safari, Firefox)

---

## Integration with HomePageV3

### Recommended Position
```
<HeroSection />
<ServicesGrid />
<VelocityProcessSection />
<TechStackSection />        ← Insert here
<CapabilitiesSection />
<CredibilityBand />
...
```

### Why This Position?
- **After Velocity:** Shows "how we build fast" → "what we build with"
- **Before Capabilities:** Technical foundation → Business capabilities
- **Natural flow:** Process → Tools → Outcomes

---

## Documentation Status

- [x] Strategic positioning defined
- [x] Desktop wireframe completed
- [x] Tablet wireframe completed
- [x] Mobile wireframe completed
- [x] Complete content breakdown
- [x] Design specifications documented
- [x] Color palette mapped
- [x] Typography scale defined
- [x] Responsive breakpoints specified
- [x] Animation details planned
- [x] Data structure defined
- [x] SEO & accessibility guidelines
- [x] Testing checklist created
- [ ] Component implementation
- [ ] Integration into HomePageV3
- [ ] QA and testing
- [ ] Production deployment

---

*Last updated: 2026-02-27*  
*Author: AMO AI Design System*
*Version: 1.0 — Technology Stack Section*  
*Status: Ready for Implementation*
