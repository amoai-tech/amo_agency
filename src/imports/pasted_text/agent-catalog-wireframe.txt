# New Screens — Wireframes

> Figma Make: Design 3 new pages for an AI agent platform. Page 1: Agent Catalog — a grid of agent cards organized by division tabs, each card has an emoji avatar, agent name, one-line description, and division badge. Page 2: Agent Detail — a profile page with agent identity section, capabilities list, use cases, and a "Run This Agent" button. Page 3: Agent Runner — a split-pane layout with task input on the left and agent output on the right. Use consistent sidebar navigation, white cards on light gray, blue accents. Professional SaaS feel, not playful.

---

## Screen 1: Agent Catalog — /app/agents/catalog

**Purpose:** Browse all available AI agents organized by division. Search, filter, and discover agents relevant to your project.

```
+----------------------------------------------------------------------+
|  [=] AMO AI    Dashboard > Agents > Catalog              (Avatar) SK  |
+----------------------------------------------------------------------+
|       |                                                              |
| DASH  |  AGENT CATALOG                              [ Search... ]   |
| BOARD |                                                              |
|       |  [ All ] [ Engineering ] [ Sales ] [ Marketing ] [ Design ] |
| Proj  |  [ Product ] [ PM ] [ Testing ] [ Support ] [ Specialized ] |
| ects  |                                                              |
| ...   |  Showing 15 curated agents  (120+ available in full catalog)  |
| Agent |                                                              |
| s     |  +---------------------+  +---------------------+           |
|  Cata |  |  (o) Software       |  |  (o) Rapid          |           |
|  log  |  |      Architect      |  |      Prototyper     |           |
|  Moni |  |                     |  |                     |           |
|  tor  |  |  Designs system     |  |  Ultra-fast MVP     |           |
|       |  |  architecture and   |  |  development and    |           |
|       |  |  technical strategy |  |  proof-of-concept   |           |
|       |  |                     |  |  validation         |           |
|       |  |  ENGINEERING        |  |  ENGINEERING        |           |
|       |  |                     |  |                     |           |
|       |  |  Assigned to:       |  |  Assigned to:       |           |
|       |  |  3 projects         |  |  Dr. Patel's Clinic |           |
|       |  |                     |  |                     |           |
|       |  |  [ View ] [ Run ]   |  |  [ View ] [ Run ]   |           |
|       |  +---------------------+  +---------------------+           |
|       |                                                              |
|       |  +---------------------+  +---------------------+           |
|       |  |  (o) Frontend       |  |  (o) Backend        |           |
|       |  |      Developer      |  |      Architect      |           |
|       |  |                     |  |                     |           |
|       |  |  Responsive, a11y   |  |  API design, data   |           |
|       |  |  web apps with      |  |  modeling, system   |           |
|       |  |  pixel-perfect UI   |  |  scalability        |           |
|       |  |                     |  |                     |           |
|       |  |  ENGINEERING        |  |  ENGINEERING        |           |
|       |  |                     |  |                     |           |
|       |  |  [ View ] [ Run ]   |  |  [ View ] [ Run ]   |           |
|       |  +---------------------+  +---------------------+           |
|       |                                                              |
|       |  +---------------------+  +---------------------+           |
|       |  |  (o) AI Engineer    |  |  (o) DevOps         |           |
|       |  |                     |  |      Automator      |           |
|       |  |  ML model dev and   |  |  CI/CD pipelines    |           |
|       |  |  production AI      |  |  and infrastructure |           |
|       |  |  integration        |  |  automation         |           |
|       |  |                     |  |                     |           |
|       |  |  ENGINEERING        |  |  ENGINEERING        |           |
|       |  |  [ View ] [ Run ]   |  |  [ View ] [ Run ]   |           |
|       |  +---------------------+  +---------------------+           |
|       |                                                              |
|       |               [ Load more agents... ]                        |
+----------------------------------------------------------------------+
```

**Components:**
- Division tab bar (horizontal, scrollable on mobile)
- Search input with instant filter
- Agent card grid (2 columns desktop, 1 column mobile)
- Each card: emoji avatar, name, description, division badge, assignment count, View/Run buttons
- "Load more" pagination (20 per page)

**Default view: 15-20 curated agents recommended for AMO AI clients.**
Full catalog (120+) available behind "Show all agents" toggle. Prevents overload.

**Division counts in full view:**
- Engineering (22), Sales (8), Marketing (26), Design (8), Product (4), PM (6), Testing (8), Paid Media (7), Support (6), Specialized (22)

---

## Screen 2: Agent Detail — /app/agents/:slug

**Purpose:** View a single agent's full profile, capabilities, use cases, and run history.

```
+----------------------------------------------------------------------+
|  [=] AMO AI    Agents > Catalog > Rapid Prototyper       (Avatar) SK  |
+----------------------------------------------------------------------+
|       |                                                              |
| SIDE  |  +----------------------------------------------------------+|
| BAR   |  |                                                          ||
|       |  |  (o)  RAPID PROTOTYPER                                   ||
|       |  |       Engineering Division                               ||
|       |  |                                                          ||
|       |  |  "Turns an idea into a working prototype                 ||
|       |  |   before the meeting's over."                            ||
|       |  |                                                          ||
|       |  |  [ Run This Agent ]    [ Assign to Project ]             ||
|       |  |                                                          ||
|       |  +----------------------------------------------------------+|
|       |                                                              |
|       |  [ About ]  [ Capabilities ]  [ Use Cases ]  [ Run History ]|
|       |                                                              |
|       |  ABOUT                                                       |
|       |  +----------------------------------------------------------+|
|       |  |                                                          ||
|       |  |  Specialist in ultra-fast proof-of-concept development   ||
|       |  |  and MVP creation. Excels at quickly validating ideas,   ||
|       |  |  building functional prototypes, and creating minimal    ||
|       |  |  viable products using the most efficient tools.         ||
|       |  |                                                          ||
|       |  |  Core Mission:                                           ||
|       |  |  - Build functional prototypes in under 3 days           ||
|       |  |  - Validate ideas through working software               ||
|       |  |  - Optimize for learning and iteration                   ||
|       |  |                                                          ||
|       |  |  Critical Rules:                                         ||
|       |  |  - Choose tools that minimize setup time                 ||
|       |  |  - Use pre-built components whenever possible            ||
|       |  |  - Core functionality first, polish later                ||
|       |  |                                                          ||
|       |  |  Success Metrics:                                        ||
|       |  |  - Prototypes delivered in under 3 days                  ||
|       |  |  - User feedback collected within 1 week                 ||
|       |  |  - 80% of core features validated                        ||
|       |  |                                                          ||
|       |  +----------------------------------------------------------+|
|       |                                                              |
|       |  BEST FOR                                                    |
|       |  +----------------------------------------------------------+|
|       |  |                                                          ||
|       |  |  Industries:  E-commerce, SaaS, Healthcare, Restaurant   ||
|       |  |  Goals:       Launch MVP, Validate idea, Build prototype ||
|       |  |  Pairs with:  Frontend Developer, Sprint Prioritizer,    ||
|       |  |               Reality Checker                            ||
|       |  |                                                          ||
|       |  +----------------------------------------------------------+|
|       |                                                              |
|       |  CURRENTLY ASSIGNED TO                                       |
|       |  +----------------------------------------------------------+|
|       |  |                                                          ||
|       |  |  Dr. Patel's Clinic — Building booking bot               ||
|       |  |  FreshBox Meals — Designing order flow                   ||
|       |  |                                                          ||
|       |  +----------------------------------------------------------+|
|       |                                                              |
+----------------------------------------------------------------------+
```

**Tabs:**
- About: agent description, mission, rules, metrics (parsed from .md file)
- Capabilities: detailed methodology sections
- Use Cases: example tasks with sample outputs
- Run History: table of past runs with inputs/outputs/tokens/duration

---

## Screen 3: Agent Runner — /app/agents/:slug/run

**Purpose:** Execute an agent on a specific task. Input a prompt, get structured output.

```
+----------------------------------------------------------------------+
|  [=] AMO AI    Agents > Rapid Prototyper > Run           (Avatar) SK  |
+----------------------------------------------------------------------+
|       |                                                              |
| SIDE  |  RUN: Rapid Prototyper                                       |
| BAR   |                                                              |
|       |  +----------------------------+  +-------------------------+ |
|       |  | TASK INPUT                 |  | AGENT OUTPUT            | |
|       |  |                            |  |                         | |
|       |  | Context (optional):        |  |  (waiting for input)    | |
|       |  | +------------------------+ |  |                         | |
|       |  | | Dr. Patel's Dental     | |  |  Run the agent to see  | |
|       |  | | Clinic, 8 employees,   | |  |  output here.          | |
|       |  | | Medellin Colombia.     | |  |                         | |
|       |  | | No online booking.     | |  |                         | |
|       |  | +------------------------+ |  |                         | |
|       |  |                            |  |                         | |
|       |  | Task:                      |  |                         | |
|       |  | +------------------------+ |  |                         | |
|       |  | | Scope an MVP for a     | |  |                         | |
|       |  | | WhatsApp booking bot.  | |  |                         | |
|       |  | | Budget: $5K.           | |  |                         | |
|       |  | | Timeline: 2 weeks.     | |  |                         | |
|       |  | | Must support Spanish   | |  |                         | |
|       |  | | and English.           | |  |                         | |
|       |  | +------------------------+ |  |                         | |
|       |  |                            |  |                         | |
|       |  | Output format:             |  |                         | |
|       |  | (*) Structured report      |  |                         | |
|       |  | ( ) Free-form text         |  |                         | |
|       |  | ( ) JSON                   |  |                         | |
|       |  |                            |  |                         | |
|       |  | [ Run Agent ]              |  |                         | |
|       |  +----------------------------+  +-------------------------+ |
|       |                                                              |
+----------------------------------------------------------------------+
```

**After running:**

```
|       |  +----------------------------+  +-------------------------+ |
|       |  | TASK INPUT                 |  | AGENT OUTPUT            | |
|       |  |                            |  |                         | |
|       |  | (same as above)            |  | MVP SCOPE: WhatsApp     | |
|       |  |                            |  | Booking Bot             | |
|       |  |                            |  |                         | |
|       |  |                            |  | Timeline: 2 weeks       | |
|       |  |                            |  | Budget: $5,000          | |
|       |  |                            |  |                         | |
|       |  |                            |  | WEEK 1:                 | |
|       |  |                            |  | - WhatsApp Business API | |
|       |  |                            |  |   setup                 | |
|       |  |                            |  | - Booking flow (select  | |
|       |  |                            |  |   service, date, time)  | |
|       |  |                            |  | - Calendar sync with    | |
|       |  |                            |  |   Google Calendar       | |
|       |  |                            |  | - Bilingual: ES + EN    | |
|       |  |                            |  |                         | |
|       |  |                            |  | WEEK 2:                 | |
|       |  |                            |  | - Confirmation messages  | |
|       |  |                            |  | - Reminder (24hr before)| |
|       |  |                            |  | - Cancellation flow     | |
|       |  |                            |  | - Testing + go-live     | |
|       |  |                            |  |                         | |
|       |  |                            |  | NOT IN MVP:             | |
|       |  |                            |  | - Payment collection    | |
|       |  |                            |  | - Multi-location        | |
|       |  |                            |  | - AI chat (just menus)  | |
|       |  |                            |  |                         | |
|       |  |                            |  | STACK:                  | |
|       |  |                            |  | Twilio for WhatsApp,    | |
|       |  |                            |  | Supabase for data,      | |
|       |  |                            |  | n8n for automation      | |
|       |  |                            |  |                         | |
|       |  |                            |  | ----                    | |
|       |  |                            |  | Tokens: 1,847           | |
|       |  |                            |  | Duration: 3.2s          | |
|       |  |                            |  |                         | |
|       |  |                            |  | [Copy] [Save] [Share]   | |
|       |  +----------------------------+  +-------------------------+ |
```

---

## Mobile — Agent Catalog

```
+-------------------------+
| [=] Agent Catalog  (o)  |
+-------------------------+
| [ Search agents... ]    |
+-------------------------+
| [All][Eng][Sales][Mktg] |
|         < scroll >      |
+-------------------------+
|                         |
| +---------------------+ |
| | (o) Software        | |
| |     Architect       | |
| | System architecture | |
| | and tech strategy   | |
| | ENGINEERING         | |
| | [View]    [Run]     | |
| +---------------------+ |
|                         |
| +---------------------+ |
| | (o) Rapid           | |
| |     Prototyper      | |
| | Ultra-fast MVP and  | |
| | proof-of-concept    | |
| | ENGINEERING         | |
| | [View]    [Run]     | |
| +---------------------+ |
|                         |
| +---------------------+ |
| | (o) Frontend        | |
| |     Developer       | |
| | Responsive web apps | |
| | with pixel-perfect  | |
| | precision           | |
| | ENGINEERING         | |
| | [View]    [Run]     | |
| +---------------------+ |
|                         |
+-------------------------+
| Dash | Agents | CRM | + |
+-------------------------+
```

## Mobile — Agent Runner

```
+-------------------------+
| [<] Run: Rapid Proto.   |
+-------------------------+
|                         |
| Context:                |
| +---------------------+ |
| | Dr. Patel's Dental  | |
| | Clinic, 8 employees | |
| +---------------------+ |
|                         |
| Task:                   |
| +---------------------+ |
| | Scope a WhatsApp    | |
| | booking bot MVP.    | |
| | Budget: $5K.        | |
| | Timeline: 2 weeks.  | |
| +---------------------+ |
|                         |
| [ Run Agent ]           |
|                         |
| ---- OUTPUT ----        |
|                         |
| MVP SCOPE: WhatsApp     |
| Booking Bot             |
|                         |
| WEEK 1:                 |
| - WhatsApp Business     |
|   API setup             |
| - Booking flow          |
| ...                     |
|                         |
| [Copy] [Save] [Share]   |
+-------------------------+
| Dash | Agents | CRM | + |
+-------------------------+
```
