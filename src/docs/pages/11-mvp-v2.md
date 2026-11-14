# MVP Builder V2 Page Documentation

## Overview
The MVP Builder V2 page (`/mvp-v2`) is a complete redesign of the MVP Builder service page, using the exact copy provided in the MVP Brief and following the `/docs/pages/10-template.md` structure.

---

## Page Component Reference

| # | Section Name | Component Name | File Location |
|---|--------------|----------------|---------------|
| 01 | Hero Section | `MVPv2Hero` | `/components/mvpv2/MVPv2Hero.tsx` |
| 02 | Why MVP First | `WhyMVPFirst` | `/components/mvpv2/WhyMVPFirst.tsx` |
| 03 | Deliverables | `MVPv2Deliverables` | `/components/mvpv2/MVPv2Deliverables.tsx` |
| 04 | Framework | `MVPv2Framework` | `/components/mvpv2/MVPv2Framework.tsx` |
| 05 | Who This Is For | `MVPv2WhoThisIsFor` | `/components/mvpv2/MVPv2WhoThisIsFor.tsx` |
| 06 | CTA Section | `MVPv2CTA` | `/components/mvpv2/MVPv2CTA.tsx` |

**Page Component:** `/pages/MVPv2Page.tsx`  
**Route:** `/mvp-v2`

---

## Component Details

### 01 - Hero Section (`MVPv2Hero`)

**Background:** Dark Teal (#0F3D3E) with dot pattern  
**Layout:** Two-column grid (text left, 6-week timeline right)

**Copy:**
- **Eyebrow:** "MVP BUILDER"
- **Headline:** "Your AI Product, *Live* in 6 Weeks"
- **Subhead:** "We turn product ideas into working MVPs—scoped, architected, and shipped for real users. Skip the 6-month cycle. Launch the version that proves demand."
- **Primary CTA:** "Start Your MVP Brief" → `/booking`
- **Secondary CTA:** "View MVPs We've Shipped" → `/projects`
- **Proof Line:** "8 MVPs launched in the last 12 months. 3 went on to raise funding."

**Micro-trust Bullets:**
- Weekly deployments (not "big reveal" demos)
- Production-grade foundations (no rebuild trap)
- Clear scope + fixed timeline

**6-Week Timeline Visual:**
- Week 1: Scope (#84CC16)
- Week 2: Architecture (#9DD679)
- Week 3: Build (#0A9396)
- Week 4: Build (#0A9396)
- Week 5: AI + Polish (#84CC16)
- Week 6: Launch (#1E3D36)

---

### 02 - Why MVP First (`WhyMVPFirst`)

**Background:** Beige (#F4F3EE)

**Copy:**
- **Eyebrow:** "THE CASE FOR MVP"
- **Headline:** "Build the Proof Before You Build the Company"
- **Body (2 paragraphs):**
  - "Investors don't fund ideas—they fund evidence. Users don't buy roadmaps—they buy products. The fastest path to revenue (and funding) is a working product in real hands generating real usage data."
  - "Traditional builds delay learning until the end. Our approach flips it: ship the core value first, measure what happens, then expand based on proof—not opinions."

**What You Gain (3 Bullets):**
- You learn what users actually do (not what they say)
- You de-risk the build before you scale the team
- You get a credible story: "Here's the product. Here's the data."

**Comparison Table:**
- **Traditional Approach:** Build everything before showing anyone, 6-12 month cycle, high risk
- **Our MVP Approach:** Ship core value in 6 weeks, real users from week 7, low risk

---

### 03 - Deliverables (`MVPv2Deliverables`)

**Background:** White

**Copy:**
- **Eyebrow:** "DELIVERABLES"
- **Headline:** "From Concept to Deployed Product"
- **Body:** "You get a complete MVP engagement: scope, architecture, design, build, AI integration, deployment, and launch support. This is not a clickable prototype. It's a real product you can onboard users into."

**6 Phase Cards:**
1. **Week 1 — Scope Workshop:** Define v1 with ruthless focus. We prioritize features around one measurable hypothesis.
2. **Week 1–2 — Architecture & Data Design:** Database schema, AI capability map, APIs, integrations, deployment plan.
3. **Week 2–4 — Core Build (2 Sprints):** Daily visibility, staging environment, weekly releases, tight feedback loop.
4. **Week 4–5 — AI Integration + Product Polish:** AI features wired in (search, recommendations, automation), UI refinement, performance pass.
5. **Week 5–6 — Launch & Onboarding:** Production deploy, monitoring, analytics, admin training, handoff docs.
6. **Post-Launch — 30 Days Support:** Bug fixes + weekly review of usage data → v2 priorities.

**Real-World MVP Examples:**
- **AI Support Inbox:** Web chat + helpdesk triage + "suggested replies" trained on your docs
- **Internal Ops Copilot:** One dashboard that answers team questions + automates routine workflows
- **Lead-to-Call Funnel:** Landing page + qualification + booking + CRM capture + follow-up automation

---

### 04 - Framework (`MVPv2Framework`)

**Background:** Beige (#F4F3EE)

**Copy:**
- **Eyebrow:** "FRAMEWORK"
- **Headline:** "Scoped for Validation. *Built* for Scale."
- **Body:** "Most MVPs fail because they're built like demos. We build MVPs like foundations: clean architecture, tested flows, and deployment discipline—so if it works, you can scale without rebuilding from scratch."

**2x2 Principles Grid:**
1. **Production-Grade Architecture:** Same engineering standards as full-scale builds. The difference is scope—not quality.
2. **Scoped for Validation:** Every v1 feature proves something: demand, willingness to pay, workflow lift, retention.
3. **AI-Native from Day One:** AI is designed into the system early (not bolted on at the end).
4. **Built for Handoff:** Documentation, CI/CD, clear structure—so your future team can continue immediately.

**Anti-bullshit Line:** "No vague timelines. No 'phase 2 will fix it.' v1 ships with real capabilities."

---

### 05 - Who This Is For (`MVPv2WhoThisIsFor`)

**Background:** Dark Teal (#0F3D3E) with dot pattern

**Copy:**
- **Eyebrow:** "BEST FIT"
- **Headline:** "Founders With Ideas That Need to Ship"
- **Body:** "You've done enough thinking. You need a partner who can translate your concept into a working product—fast, without compromise, and without the overhead of hiring a full team."

**3 Profile Cards:**
1. **Solo Founders & Small Teams:** You have vision + domain expertise. We handle execution so you can focus on users, sales, and feedback.
2. **Funded Startups Launching a New Line:** Your team is busy on the core roadmap. We ship a focused MVP without stealing bandwidth.
3. **Companies Building Internal AI Tools:** Off-the-shelf tools don't fit. We build the internal system that saves hours every week.

**Best For:** Pre-seed → Series A, or SMB teams with a clear workflow problem to automate.

---

### 06 - CTA Section (`MVPv2CTA`)

**Background:** Dark Teal (#0F3D3E) with dot pattern  
**Animation:** Top divider line scales horizontally

**Copy:**
- **Headline:** "Stop Planning. Start Building."
- **Body:** "Book a 30-minute MVP strategy session. We'll pressure-test the concept, define the v1 scope, estimate timeline + investment, and tell you plainly if we're the right fit. If yes, we can start the scope workshop the same week."
- **CTA Button:** "Start Your MVP Brief" → `/booking`
- **Subtext:** "Free 30-minute session. No obligations. No pitch deck required."

---

## Design System Compliance

### Typography ✅
- Playfair Display for all headlines
- Lora for body text, labels, and UI elements
- Italic emphasis in headlines for key phrases

### Colors ✅
- Dark Teal (#0F3D3E) for hero/CTA backgrounds
- Lime Green (#84CC16) for CTAs and accents
- Beige (#F4F3EE) for light section backgrounds
- White for content sections
- Varied card colors from approved palette

### Rounded Corners ✅
- Cards: rounded-3xl
- Buttons: rounded-full
- Timeline bars: rounded-lg / rounded-xl
- Icon containers: rounded-2xl

### Shadows ✅
- Cards: shadow-lg
- Hover states: shadow-xl
- CTA buttons: hover:shadow-lg hover:shadow-[#84CC16]/30

### Animation ✅
- Duration: 0.6-0.8s for entrances
- Stagger delays: index * 0.1
- Scroll-triggered with useInView hook
- Hover transitions: 300ms
- Initial state: opacity: 0, y: 40
- Animate state: opacity: 1, y: 0

---

## Content Strategy

### Tone & Voice
- **Premium but practical:** No fluff, outcome-driven
- **Confident without hype:** Evidence over promises
- **Direct and honest:** "Anti-bullshit" approach

### Copy Principles
- Headlines under 8 words
- Subheads under 28 words
- Body paragraphs: 70-110 words
- Focus on outcomes, not features
- Proof points and credibility markers

### CTAs
- Primary: Action-oriented ("Start Your MVP Brief")
- Secondary: Exploration ("View MVPs We've Shipped")
- Reassurance: "Free 30-minute session. No obligations."

---

## Technical Implementation

### File Structure
```
/pages/
  MVPv2Page.tsx              # Main page component

/components/mvpv2/
  MVPv2Hero.tsx              # 01 - Hero with 6-week timeline
  WhyMVPFirst.tsx            # 02 - Comparison section
  MVPv2Deliverables.tsx      # 03 - Phase cards + examples
  MVPv2Framework.tsx         # 04 - 2x2 principles grid
  MVPv2WhoThisIsFor.tsx      # 05 - 3 profile cards
  MVPv2CTA.tsx               # 06 - Bottom CTA
```

### Dependencies
- `motion/react` - Scroll animations and transitions
- `lucide-react` - Icons (CheckCircle2, Zap, Lock, User, Rocket, Building2, Shield, Target, Sparkles, Handshake)
- `react-router` - Navigation and routing

### Performance
- All animations use useInView hook
- Scroll-triggered animations (once: true)
- Margin: '-100px' for early triggering
- No layout shift (fixed heights on cards)

---

## Comparison: MVP V1 vs MVP V2

| Aspect | MVP V1 | MVP V2 |
|--------|---------|---------|
| Hero Visual | Gantt chart graphic | 6-week timeline card |
| Sections | 6 sections | 6 sections |
| Copy | Technical, detailed | Premium, outcome-driven |
| Tone | Professional | Confident, anti-fluff |
| Comparison | Timeline bars | Side-by-side cards |
| Examples | Not prominent | Dedicated section |
| Framework | Not included | 2x2 principles grid |
| CTA | Standard | Scarcity option (commented) |

---

## Navigation

**Main Route:** `/mvp-v2`  
**Footer Link:** "MVP Builder V2" in Services column  
**Related Pages:**
- `/mvp-builder` - Original MVP Builder page
- `/booking` - Contact/booking page
- `/projects` - Project portfolio

---

## Future Enhancements

### Optional Additions
1. **Gantt Chart Visualization:** Could add the GanttChart component from `/components/style-guide/GanttChart.tsx` to the Deliverables section
2. **Scarcity Line:** Uncomment the "Limited build slots" line in CTA if true
3. **Case Studies:** Add specific MVP case study links
4. **Pricing Section:** Optional pricing/investment transparency
5. **FAQ Section:** Common questions about MVP process

### A/B Testing Opportunities
- Hero timeline visual vs. Gantt chart
- Comparison table vs. timeline bars
- CTA copy variations
- Scarcity line effectiveness

---

## Revision History

- **v1.0** - 2025-02-27 - Initial implementation based on MVP Brief copy
- **v1.1** - TBD - Add performance metrics
- **v1.2** - TBD - Integrate case studies

---

**Maintained by:** AMO AI Design Team
**Last updated:** February 27, 2025  
**Template source:** `/docs/pages/10-template.md`  
**Copy source:** MVP Builder Final Copy Brief
