# Dashboard Enhancements — Wireframes

> Figma Make: Design a SaaS dashboard with a left sidebar navigation (icons + labels), top header with user avatar and breadcrumbs. Main content area has a 3-column grid of metric cards at top, then a 2-column layout with "Your AI Team" widget on the left and "Latest Insights" feed on the right. Below that, a roadmap timeline. Use white cards on light gray background, subtle shadows, blue accent colors. Premium business tool aesthetic.

---

## Dashboard Home — /app/dashboard

**New widget: "Your AI Team" card**

```
+----------------------------------------------------------------------+
|  [=] AMO AI    Dashboard  Projects  Agents  CRM  ...    (Avatar) SK  |
+----------------------------------------------------------------------+
|       |                                                              |
| DASH  |  Good morning, Dr. Patel                                    |
| BOARD |                                                              |
|       |  +------------------+  +------------------+  +------------+  |
| Proj  |  | READINESS SCORE  |  | ACTIVE AGENTS    |  | PHASE      |  |
| ects  |  |                  |  |                  |  |            |  |
| Road  |  |    68 / 100      |  |    5 of 5        |  |  1 of 3   |  |
| map   |  |  [======>    ]   |  |  All active      |  | Foundation |  |
| Sett  |  +------------------+  +------------------+  +------------+  |
| ings  |                                                              |
| Insig |  +-------------------------------+  +-----------------------+|
| hts   |  | YOUR AI TEAM                  |  | LATEST INSIGHTS       ||
| Clien |  |                               |  |                       ||
| ts    |  | (o) Rapid Prototyper          |  | ! HIGH PRIORITY       ||
| CRM   |  |     Status: Building bot      |  | "Your competitors     ||
| Docs   |  |     Last output: Bot spec v2  |  |  average 4.5 stars   ||
| Work  |  |                               |  |  on Google. You have  ||
| flows |  | (o) Support Responder         |  |  3.8. Quick win:      ||
| Finan |  |     Status: Mapping FAQ       |  |  send review requests ||
| cial  |  |     Last output: FAQ draft    |  |  after appointments." ||
| Strat |  |                               |  |  -- Growth Hacker     ||
| egy   |  | (o) Finance Tracker           |  |                       ||
| Agent |  |     Status: Baseline report   |  | MEDIUM PRIORITY       ||
| s     |  |     Last output: Cost model   |  | "Your website loads   ||
|       |  |                               |  |  in 4.2s on mobile.  ||
|       |  | (o) Project Shepherd          |  |  Target: under 3s.   ||
|       |  |     Status: Sprint planning   |  |  This affects 60% of ||
|       |  |                               |  |  your patients."     ||
|       |  | (o) Reality Checker           |  |  -- Reality Checker   ||
|       |  |     Status: Reviewing spec    |  |                       ||
|       |  |                               |  | [ View all insights ] ||
|       |  | [ View full team --> ]        |  +-----------------------+|
|       |  +-------------------------------+                           |
|       |                                                              |
|       |  +----------------------------------------------------------+|
|       |  | ROADMAP                                                   ||
|       |  |                                                           ||
|       |  |  Phase 1            Phase 2            Phase 3            ||
|       |  |  Week 1-3           Week 4-6           Week 7+            ||
|       |  |  [####====]         [         ]        [         ]        ||
|       |  |  Booking bot        Reminders +        Analytics          ||
|       |  |  40% complete       review reqs        dashboard          ||
|       |  |                                                           ||
|       |  +----------------------------------------------------------+|
+----------------------------------------------------------------------+
```

---

## Insights Page — /app/insights

**Enhancement: Agent-attributed insight cards with source agent badge**

```
+----------------------------------------------------------------------+
|  INSIGHTS                                    [ All ] [ High ] [ New ]|
+----------------------------------------------------------------------+
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | ! HIGH    Growth Hacker                             2 hrs ago  |  |
|  |                                                                |  |
|  | "Your Google reviews are 3.8 stars. Your top 3 competitors     |  |
|  |  average 4.5. Patients check reviews before booking.           |  |
|  |  Quick win: Send an automated review request SMS 2 hours       |  |
|  |  after each appointment. Expected lift: 0.5 stars in 60 days." |  |
|  |                                                                |  |
|  | Impact: +35% new patient bookings    [ Take Action ] [ Dismiss]|  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | * MEDIUM  Reality Checker                           1 day ago  |  |
|  |                                                                |  |
|  | "Your website loads in 4.2 seconds on mobile. Google penalizes |  |
|  |  anything over 3 seconds. 60% of your patients are on mobile.  |  |
|  |  This is likely costing you 15-20% of potential bookings."     |  |
|  |                                                                |  |
|  | Impact: -20% bounce rate             [ Take Action ] [ Dismiss]|  |
|  +----------------------------------------------------------------+  |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | i LOW     Finance Tracker                           3 days ago |  |
|  |                                                                |  |
|  | "Your front desk labor cost for phone bookings is              |  |
|  |  approximately $2,400/month. With 60% automation, you'd        |  |
|  |  save $1,440/month. The booking bot costs $200/month.          |  |
|  |  Net savings: $1,240/month = $14,880/year."                    |  |
|  |                                                                |  |
|  | Impact: $14.9K/year savings           [ Take Action ] [ Dismiss]|  |
|  +----------------------------------------------------------------+  |
|                                                                      |
+----------------------------------------------------------------------+
```

**Sample insights for other clients:**

E-commerce (Bella's Boutique):
- Growth Hacker: "Your Instagram has 2K followers but 0% click to website. Add link-in-bio with shoppable grid."
- SEO Specialist: "You rank for 0 keywords. Target 'custom birthstone necklace' — 8K searches, low competition."
- Brand Guardian: "Your product photos use 4 different backgrounds. Consistency increases perceived value 23%."

Real Estate (Skyline Realty):
- Pipeline Analyst: "42 leads in pipeline, 3% close rate. Industry average is 8%. Problem: no follow-up after day 3."
- Outbound Strategist: "Your cold email open rate is 12%. Rewrite subject lines with property-specific hooks."
- Deal Strategist: "Your average days-to-close is 89. Top performers do 52. Bottleneck: appraisal stage."

---

## CRM Pipeline — /app/crm/pipelines

**Enhancement: Agent-powered deal health scores on each deal card**

```
+----------------------------------------------------------------------+
|  CRM PIPELINE                                                        |
+----------------------------------------------------------------------+
|                                                                      |
|  PROSPECTING        QUALIFIED          PROPOSAL          CLOSED      |
|  (12 deals)         (8 deals)          (4 deals)         (2 deals)  |
|                                                                      |
|  +--------------+   +--------------+   +--------------+              |
|  | Acme Corp    |   | TechStart    |   | GreenCo      |              |
|  | $45,000      |   | $28,000      |   | $72,000      |              |
|  |              |   |              |   |              |              |
|  | Health: LOW  |   | Health: HIGH |   | Health: MED  |              |
|  | [##         ]|   | [#########] |   | [######    ] |              |
|  |              |   |              |   |              |              |
|  | ! No exec   |   | Champion:    |   | Stalled 2wk  |              |
|  |   sponsor   |   | VP Eng       |   | Need pricing  |              |
|  |   identified|   | Next: demo   |   | approval      |              |
|  |              |   |              |   |              |              |
|  | Agent:       |   | Agent:       |   | Agent:       |              |
|  | Pipeline     |   | Deal         |   | Pipeline     |              |
|  | Analyst      |   | Strategist   |   | Analyst      |              |
|  +--------------+   +--------------+   +--------------+              |
|                                                                      |
|  +--------------+   +--------------+                                 |
|  | Bloom Inc    |   | DataViz      |                                 |
|  | $15,000      |   | $55,000      |                                 |
|  |              |   |              |                                 |
|  | Health: MED  |   | Health: LOW  |                                 |
|  | [######    ] |   | [##         ]|                                 |
|  |              |   |              |                                 |
|  | Good fit,    |   | ! 3 weeks    |                                 |
|  | needs demo   |   |   no contact |                                 |
|  +--------------+   +--------------+                                 |
|                                                                      |
+----------------------------------------------------------------------+
```

Deal health scoring logic:
- Pipeline Analyst agent scores each deal on: engagement recency, champion identified, budget confirmed, timeline set, decision-makers mapped
- Score displayed as progress bar + key risk/strength callout
- Agent badge shows which agent analyzed the deal

---

## Financial Page — /app/financial

**Enhancement: Finance Tracker agent projections widget**

```
+----------------------------------------------------------------------+
|  FINANCIAL                                                            |
+----------------------------------------------------------------------+
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  | MONTHLY REVENUE  |  | AI COST SAVINGS  |  | ROI PROJECTION   |    |
|  |    $4,200        |  |    $1,240/mo     |  |    312%          |    |
|  |    +12% vs last  |  |    from booking  |  |    Year 1        |    |
|  |                  |  |    automation    |  |                  |    |
|  +------------------+  +------------------+  +------------------+    |
|                                                                      |
|  +----------------------------------------------------------------+  |
|  | AGENT PROJECTION — Finance Tracker                              |  |
|  |                                                                  |  |
|  | "Based on your current trajectory and the booking               |  |
|  |  automation going live in week 3:                               |  |
|  |                                                                  |  |
|  |  Month 1:  $1,240 savings (bot handles 60% of bookings)        |  |
|  |  Month 3:  $1,800 savings (bot handles 80% + reminders)        |  |
|  |  Month 6:  $2,100 savings + $800 new revenue from              |  |
|  |            after-hours bookings                                 |  |
|  |                                                                  |  |
|  |  Breakeven on setup costs: Week 6                               |  |
|  |  12-month net benefit: $28,200"                                 |  |
|  |                                                                  |  |
|  |  Last updated: 2 hours ago     [ Refresh Projection ]           |  |
|  +----------------------------------------------------------------+  |
|                                                                      |
+----------------------------------------------------------------------+
```

---

## Workflows Page — /app/workflows

**Enhancement: Agent as a workflow node type**

```
+----------------------------------------------------------------------+
|  WORKFLOW: New Patient Onboarding                        [ Edit ]     |
+----------------------------------------------------------------------+
|                                                                      |
|  TRIGGER                                                             |
|  [New booking via WhatsApp bot]                                      |
|       |                                                              |
|       v                                                              |
|  STEP 1: Send confirmation                                          |
|  [WhatsApp message: "Booking confirmed for {date} at {time}"]       |
|       |                                                              |
|       v                                                              |
|  STEP 2: AGENT NODE -- Support Responder                            |
|  [Generate personalized pre-visit checklist based on appointment     |
|   type (cleaning, consultation, emergency)]                          |
|       |                                                              |
|       v                                                              |
|  STEP 3: Send checklist                                              |
|  [WhatsApp message: "{checklist}"]                                   |
|       |                                                              |
|       v                                                              |
|  STEP 4: Wait 24 hours before appointment                           |
|       |                                                              |
|       v                                                              |
|  STEP 5: Send reminder                                               |
|  [WhatsApp: "Reminder: Your appointment is tomorrow at {time}"]      |
|       |                                                              |
|       v                                                              |
|  STEP 6: Wait 2 hours after appointment                              |
|       |                                                              |
|       v                                                              |
|  STEP 7: AGENT NODE -- Growth Hacker                                |
|  [Generate personalized review request message based on              |
|   appointment type and patient history]                              |
|       |                                                              |
|       v                                                              |
|  STEP 8: Send review request                                         |
|  [SMS: "{review_message}" with Google review link]                   |
|                                                                      |
+----------------------------------------------------------------------+
```

Agent nodes in workflows:
- Shown with a different color/icon than regular action nodes
- Configure: select agent, write task description, define expected output format
- Output feeds into the next step as a variable

---

## Mobile Dashboard

```
+-------------------------+
| [=]  AMO AI     (o) SK  |
+-------------------------+
|                         |
| Good morning, Dr. Patel |
|                         |
| +---------------------+ |
| | READINESS   68/100  | |
| | AGENTS      5 active| |
| | PHASE       1 of 3  | |
| +---------------------+ |
|                         |
| YOUR AI TEAM            |
| +---------------------+ |
| | (o) Rapid Prototyper| |
| |     Building bot    | |
| +---------------------+ |
| | (o) Support Respond.| |
| |     Mapping FAQ     | |
| +---------------------+ |
| | (o) Finance Tracker | |
| |     Cost report     | |
| +---------------------+ |
| [ View full team ]      |
|                         |
| LATEST INSIGHT          |
| +---------------------+ |
| | ! HIGH              | |
| | Growth Hacker       | |
| | "Your Google reviews| |
| |  are 3.8 stars..."  | |
| | [ Take Action ]     | |
| +---------------------+ |
|                         |
+-------------------------+
| Dash | Agents | CRM | + |
+-------------------------+
```
