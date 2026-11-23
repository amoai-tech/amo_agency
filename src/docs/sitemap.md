# SITEMAP — AMO AI WEBSITE

**Version:** 13  
**Last Updated:** 2026-03-09  
**Status:** All routes implemented with React Router (`react-router`)  
**Design System:** BCG Consulting-Inspired (Calm Luxury Editorial)  
**Base URL:** `https://www.amoai.ca`

---

## COMPLETE ROUTE TREE (ACTIVE)

All routes below are live and implemented in `/routes.tsx` using `react-router`.

```
www.amoai.ca
│
├── / ─────────────────────────── Home (V3 – BCG Luxury)         [HomePageV3]
│
├── HOME VARIANTS
│   ├── /home-v1 ──────────────── Home V1 (Original)             [HomePage]
│   └── /home-v4 ──────────────── Home V4 (Luxury Editorial)     [HomePageV2]
│
├── SERVICES
│   ├── /services ─────────────── Services Overview & Tech Stack  [ServicesPage]
│   ├── /solutions ────────────── AI-Powered Business Solutions   [SolutionsPage]
│   ├── /web-design ───────────── AI Web Design Services          [WebDesignPage]
│   ├── /web-apps ─────────────── Custom Web App Development      [WebAppsPage]
│   ├── /mvp-builder ──────────── Rapid MVP Builder               [MVPBuilderPage]
│   └── /mvp-v2 ───────────────── MVP Builder V2 (Enhanced)      [MVPv2Page]
│
├── AI & AGENTS
│   ├── /agents ───────────────── AI Agents Overview              [AgentsPage]
│   ├── /ai-agents ────────────── AI Agents (alias)               [AIAgentsPage]
│   ├── /services/ai-agents ───── AI Agents Service Page          [AIAgentsPage]
│   ├── /chatbots ─────────────── AI Chatbot Solutions            [ChatbotsPage]
│   ├── /sales-crm ────────────── Sales CRM Automation            [SalesCRMPage]
│   ├── /services/crm ─────────── Sales CRM (alias)              [SalesCRMPage]
│   └── /services/sales-crm ──── Sales CRM (alias)               [SalesCRMPage]
│
├── INDUSTRIES
│   ├── /industries ───────────── Industries Overview             [IndustriesPage]
│   ├── /industries/e-commerce ── E-Commerce AI Solutions         [EcommercePage]
│   ├── /industries/fashion ───── Fashion & Retail AI             [FashionPage]
│   ├── /industries/travel ────── Travel & Tourism AI             [TravelPage]
│   └── /financial ────────────── Financial Services AI           [FinancialPage]
│
├── COMPANY
│   ├── /about ────────────────── About Us                        [AboutPage]
│   ├── /process ──────────────── Delivery Process (V12)          [ProcessPageV12]
│   ├── /projects ─────────────── Featured Project Showcases      [ProjectsPage]
│   ├── /case-studies ─────────── Client Case Studies             [CaseStudiesPage]
│   └── /booking ──────────────── Book a Consultation             [BookingPage]
│
├── RESOURCES
│   ├── /style-guide ──────────── BCG Design System Reference     [StyleGuidePage]
│   ├── /sections ─────────────── Component Sections Showcase     [SectionsPage]
│   └── /sitemap ──────────────── Visual Sitemap                  [SitemapPage]
│
├── ADDITIONAL SERVICES
│   ├── /services/chatbot ─────── Chatbot Service Page             [ChatbotServicePage]
│   ├── /whatsapp-ai ──────────── WhatsApp AI Automation           [WhatsAppAIPage]
│   └── /docs/supabase ────────── Supabase Architecture Docs       [SupabaseArchitecturePage]
│
├── AUTH (standalone layout)
│   ├── /login ────────────────── Sign In / Sign Up (Google, LinkedIn, email) [AuthPage]
│   └── /auth/callback ────────── OAuth Callback Handler           [AuthCallbackPage]
│
├── WIZARD (standalone layout, 5-step project brief)
│   ├── /wizard ───────────────── Project Brief Wizard             [WizardPage]
│   ├── /wizard/processing ────── AI Analysis Processing Screen    [ProcessingPage]
│   └── /wizard/proposal ──────── Generated Proposal               [ProposalPage]
│
├── APP DASHBOARD (authenticated, sidebar layout — /app/*)
│   ├── /app ──────────────────── Redirect → /app/dashboard
│   ├── /app/dashboard ────────── Dashboard Home (KPIs, charts)    [DashboardHome]
│   ├── /app/strategy ─────────── Lean Strategy Engine (v0.24)     [StrategyEnginePage]
│   │   ├── Lean Canvas 3×3 grid with AI block synthesis
│   │   ├── Roadmap Execution panel (phase cards + progress)
│   │   ├── Intelligence panel (insights, recommendations, opportunities)
│   │   ├── Analysis Progress sheet (5-agent animated overlay)
│   │   ├── Canvas Version History side-sheet (view/revert)
│   │   └── Mobile: 3-tab [Canvas|Roadmap|Intel] navigation
│   ├── /app/projects ─────────── Project List                     [ProjectsList]
│   ├── /app/projects/:id ─────── Project Detail                   [ProjectDetail]
│   ├── /app/roadmap ──────────── Implementation Roadmap           [RoadmapPage]
│   ├── /app/clients ──────────── Client Management CRM            [ClientsListPage]
│   ├── /app/clients/:id ──────── Client Detail                    [ClientDetailPage]
│   ├── /app/crm/pipelines ────── CRM Pipeline (Kanban board)     [CRMPipelinePage]
│   ├── /app/insights ─────────── AI Insights Dashboard            [InsightsPage]
│   ├── /app/documents ────────── Document Management              [DocumentManagementPage]
│   ├── /app/financial ────────── Financial Dashboard              [FinancialDashboardPage]
│   ├── /app/workflows ────────── Workflow Automation              [WorkflowAutomationPage]
│   ├── /app/agents ───────────── AI Agent Management              [DashAgentsPage]
│   └── /app/settings ─────────── User Settings                    [SettingsPageComponent]
│
└── /* ────────────────────────── 404 Not Found                   [NotFound]
```

**Total:** 51 unique routes (excluding 404)  
**Public pages:** 32 (marketing site + resources)  
**Authenticated pages:** 16 (dashboard + wizard + auth)  
**Aliases:** 3 routes (ai-agents, services/crm, services/sales-crm)  
**Unique pages:** 48

---

## VISUAL RELATIONSHIP MAP

```
                            ┌──────────────────┐
                            │                  │
                            │    HOME (V3)     │◄──── Primary Entry
                            │        /         │
                            │                  │
                            └───────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
   │    SERVICES       │  │    INDUSTRIES     │  │    COMPANY       │
   │    /services      │  │    /industries    │  │    /about        │
   └───────┬──────────┘  └───────┬──────────┘  └───────┬──────────┘
           │                     │                     │
     ┌─────┼─────┐         ┌────┼────┐          ┌─────┼─────┐
     │     │     │         │    │    │          │     │     │
     ▼     ▼     ▼         ▼    ▼    ▼          ▼     ▼     ▼
   ┌────┐┌────┐┌────┐  ┌────┐┌───┐┌────┐   ┌─────┐┌────┐┌─────┐
   │Web ││Web ││MVP │  │E-  ││Fa-││Tra-│   │Pro- ││Pro-││Book-│
   │Des.││Apps││Bld.│  │Com.││sh.││vel │   │cess ││j.  ││ing  │
   └────┘└────┘└────┘  └────┘└───┘└────┘   └─────┘└────┘└─────┘
                                    │
     ┌──────────────────┐           │
     │  AI & AGENTS     │           │
     │                  │           │
     ├── /agents        │     ┌─────┘
     ├── /chatbots      │     │
     ├── /sales-crm     │     ▼
     └── /ai-agents     │  ┌──────────────────┐
                        │  │   /financial      │
                        │  └──────────────────┘
                        │
              ┌─────────┘
              ▼
   ┌──────────────────┐
   │    RESOURCES      │
   ├── /style-guide    │
   ├── /sections       │
   ├── /sitemap        │
   └── /case-studies   │
   └──────────────────┘
```

---

## ROUTE-TO-COMPONENT MAPPING TABLE

| # | Route | Component File | Category | Design System |
|---|-------|---------------|----------|---------------|
| 1 | `/` | `HomePageV3.tsx` | Home | BCG ✅ |
| 2 | `/home-v1` | `HomePage.tsx` | Home | V1 Legacy |
| 3 | `/home-v4` | `HomePageV2.tsx` | Home | V2 Luxury |
| 4 | `/services` | `services/ServicesPage.tsx` | Services | BCG ✅ |
| 5 | `/solutions` | `SolutionsPage.tsx` | Services | V1 |
| 6 | `/web-design` | `pages/WebDesignPage.tsx` | Services | V1 |
| 7 | `/web-apps` | `pages/WebAppsPage.tsx` | Services | V1 |
| 8 | `/mvp-builder` | `pages/MVPBuilderPage.tsx` | Services | V1 |
| 9 | `/mvp-v2` | `pages/MVPv2Page.tsx` | Services | V1 |
| 10 | `/agents` | `AgentsPage.tsx` | AI & Agents | V1 |
| 11 | `/ai-agents` | `pages/AIAgentsPage.tsx` | AI & Agents | V1 |
| 12 | `/services/ai-agents` | `pages/AIAgentsPage.tsx` | AI & Agents | V1 |
| 13 | `/chatbots` | `ChatbotsPage.tsx` | AI & Agents | V1 |
| 14 | `/sales-crm` | `pages/SalesCRMPage.tsx` | AI & Agents | V1 |
| 15 | `/services/crm` | `pages/SalesCRMPage.tsx` | AI & Agents | V1 (alias) |
| 16 | `/services/sales-crm` | `pages/SalesCRMPage.tsx` | AI & Agents | V1 (alias) |
| 17 | `/industries` | `IndustriesPage.tsx` | Industries | V1 |
| 18 | `/industries/e-commerce` | `EcommercePage.tsx` | Industries | V1 |
| 19 | `/industries/fashion` | `FashionPage.tsx` | Industries | V1 |
| 20 | `/industries/travel` | `TravelPage.tsx` | Industries | V1 |
| 21 | `/financial` | `FinancialPage.tsx` | Industries | V1 |
| 22 | `/about` | `AboutPage.tsx` | Company | V1 |
| 23 | `/process` | `process/v12/ProcessPageV12.tsx` | Company | V11 |
| 24 | `/projects` | `ProjectsPage.tsx` | Company | V11 |
| 25 | `/case-studies` | `CaseStudiesPage.tsx` | Company | V1 |
| 26 | `/booking` | `BookingPage.tsx` | Company | V1 |
| 27 | `/style-guide` | `StyleGuidePage.tsx` | Resources | BCG ✅ |
| 28 | `/sections` | `SectionsPage.tsx` | Resources | V1 |
| 29 | `/sitemap` | `SitemapPage.tsx` | Resources | BCG ✅ |
| 30 | `/services/chatbot` | `ChatbotServicePage.tsx` | Additional Services | V1 |
| 31 | `/whatsapp-ai` | `WhatsAppAIPage.tsx` | Additional Services | V1 |
| 32 | `/docs/supabase` | `SupabaseArchitecturePage.tsx` | Additional Services | V1 |
| 33 | `/login` | `AuthPage.tsx` | Auth | V1 |
| 34 | `/auth/callback` | `AuthCallbackPage.tsx` | Auth | V1 |
| 35 | `/wizard` | `WizardPage.tsx` | Wizard | V1 |
| 36 | `/wizard/processing` | `ProcessingPage.tsx` | Wizard | V1 |
| 37 | `/wizard/proposal` | `ProposalPage.tsx` | Wizard | V1 |
| 38 | `/app` | `DashboardHome.tsx` | App Dashboard | V1 |
| 39 | `/app/dashboard` | `DashboardHome.tsx` | App Dashboard | V1 |
| 40 | `/app/strategy` | `StrategyEnginePage.tsx` | App Dashboard | V1 |
| 41 | `/app/projects` | `ProjectsList.tsx` | App Dashboard | V1 |
| 42 | `/app/projects/:id` | `ProjectDetail.tsx` | App Dashboard | V1 |
| 43 | `/app/roadmap` | `RoadmapPage.tsx` | App Dashboard | V1 |
| 44 | `/app/clients` | `ClientsListPage.tsx` | App Dashboard | V1 |
| 45 | `/app/clients/:id` | `ClientDetailPage.tsx` | App Dashboard | V1 |
| 46 | `/app/crm/pipelines` | `CRMPipelinePage.tsx` | App Dashboard | V1 |
| 47 | `/app/insights` | `InsightsPage.tsx` | App Dashboard | V1 |
| 48 | `/app/documents` | `DocumentManagementPage.tsx` | App Dashboard | V1 |
| 49 | `/app/financial` | `FinancialDashboardPage.tsx` | App Dashboard | V1 |
| 50 | `/app/workflows` | `WorkflowAutomationPage.tsx` | App Dashboard | V1 |
| 51 | `/app/agents` | `DashAgentsPage.tsx` | App Dashboard | V1 |
| 52 | `/app/settings` | `SettingsPageComponent.tsx` | App Dashboard | V1 |

---

## FULL URL LIST

```
https://www.amoai.ca/
https://www.amoai.ca/home-v1
https://www.amoai.ca/home-v4
https://www.amoai.ca/services
https://www.amoai.ca/solutions
https://www.amoai.ca/web-design
https://www.amoai.ca/web-apps
https://www.amoai.ca/mvp-builder
https://www.amoai.ca/mvp-v2
https://www.amoai.ca/agents
https://www.amoai.ca/ai-agents
https://www.amoai.ca/services/ai-agents
https://www.amoai.ca/chatbots
https://www.amoai.ca/sales-crm
https://www.amoai.ca/services/crm
https://www.amoai.ca/services/sales-crm
https://www.amoai.ca/industries
https://www.amoai.ca/industries/e-commerce
https://www.amoai.ca/industries/fashion
https://www.amoai.ca/industries/travel
https://www.amoai.ca/financial
https://www.amoai.ca/about
https://www.amoai.ca/process
https://www.amoai.ca/projects
https://www.amoai.ca/case-studies
https://www.amoai.ca/booking
https://www.amoai.ca/style-guide
https://www.amoai.ca/sections
https://www.amoai.ca/sitemap
https://www.amoai.ca/services/chatbot
https://www.amoai.ca/whatsapp-ai
https://www.amoai.ca/docs/supabase
https://www.amoai.ca/login
https://www.amoai.ca/auth/callback
https://www.amoai.ca/wizard
https://www.amoai.ca/wizard/processing
https://www.amoai.ca/wizard/proposal
https://www.amoai.ca/app
https://www.amoai.ca/app/dashboard
https://www.amoai.ca/app/strategy
https://www.amoai.ca/app/projects
https://www.amoai.ca/app/projects/:id
https://www.amoai.ca/app/roadmap
https://www.amoai.ca/app/clients
https://www.amoai.ca/app/clients/:id
https://www.amoai.ca/app/crm/pipelines
https://www.amoai.ca/app/insights
https://www.amoai.ca/app/documents
https://www.amoai.ca/app/financial
https://www.amoai.ca/app/workflows
https://www.amoai.ca/app/agents
https://www.amoai.ca/app/settings
```

---

## PAGE INVENTORY & STATUS

### ✅ COMPLETED PAGES

| Route | Component | Design System | Status |
|-------|-----------|---------------|--------|
| `/` | HomePageV3 | BCG ✅ | ✅ Complete |
| `/home-v1` | HomePage | V1 Legacy | ✅ Complete |
| `/home-v4` | HomePageV2 | V2 Luxury | ✅ Complete |
| `/services` | ServicesPage | BCG ✅ | ✅ Complete |
| `/solutions` | SolutionsPage | V1 | ✅ Complete |
| `/web-design` | WebDesignPage | V1 | ✅ Complete |
| `/web-apps` | WebAppsPage | V1 | ✅ Complete |
| `/mvp-builder` | MVPBuilderPage | V1 | ✅ Complete |
| `/mvp-v2` | MVPv2Page | V1 | ✅ Complete |
| `/agents` | AgentsPage | V1 | ✅ Complete |
| `/ai-agents` | AIAgentsPage | V1 | ✅ Complete |
| `/services/ai-agents` | AIAgentsPage | V1 | ✅ Complete |
| `/chatbots` | ChatbotsPage | V1 | ✅ Complete |
| `/sales-crm` | SalesCRMPage | V1 | ✅ Complete |
| `/services/crm` | SalesCRMPage | V1 (alias) | ✅ Complete |
| `/services/sales-crm` | SalesCRMPage | V1 (alias) | ✅ Complete |
| `/industries` | IndustriesPage | V1 | ✅ Complete |
| `/industries/e-commerce` | EcommercePage | V1 | ✅ Complete |
| `/industries/fashion` | FashionPage | V1 | ✅ Complete |
| `/industries/travel` | TravelPage | V1 | ✅ Complete |
| `/financial` | FinancialPage | V1 | ✅ Complete |
| `/about` | AboutPage | V1 | ✅ Complete |
| `/process` | ProcessPageV12 | V11 | ✅ Complete |
| `/projects` | ProjectsPage | V11 | ✅ Complete |
| `/case-studies` | CaseStudiesPage | V1 | ✅ Complete |
| `/booking` | BookingPage | V1 | ✅ Complete |
| `/style-guide` | StyleGuidePage | BCG ✅ | ✅ Complete |
| `/sections` | SectionsPage | V1 | ✅ Complete |
| `/sitemap` | SitemapPage | BCG ✅ | ✅ Complete |
| `/services/chatbot` | ChatbotServicePage | V1 | ✅ Complete |
| `/whatsapp-ai` | WhatsAppAIPage | V1 | ✅ Complete |
| `/docs/supabase` | SupabaseArchitecturePage | V1 | ✅ Complete |
| `/login` | AuthPage | V1 | ✅ Complete |
| `/auth/callback` | AuthCallbackPage | V1 | ✅ Complete |
| `/wizard` | WizardPage | V1 | ✅ Complete |
| `/wizard/processing` | ProcessingPage | V1 | ✅ Complete |
| `/wizard/proposal` | ProposalPage | V1 | ✅ Complete |
| `/app` | DashboardHome | V1 | ✅ Complete |
| `/app/dashboard` | DashboardHome | V1 | ✅ Complete |
| `/app/strategy` | StrategyEnginePage | V1 | ✅ Complete |
| `/app/projects` | ProjectsList | V1 | ✅ Complete |
| `/app/projects/:id` | ProjectDetail | V1 | ✅ Complete |
| `/app/roadmap` | RoadmapPage | V1 | ✅ Complete |
| `/app/clients` | ClientsListPage | V1 | ✅ Complete |
| `/app/clients/:id` | ClientDetailPage | V1 | ✅ Complete |
| `/app/crm/pipelines` | CRMPipelinePage | V1 | ✅ Complete |
| `/app/insights` | InsightsPage | V1 | ✅ Complete |
| `/app/documents` | DocumentManagementPage | V1 | ✅ Complete |
| `/app/financial` | FinancialDashboardPage | V1 | ✅ Complete |
| `/app/workflows` | WorkflowAutomationPage | V1 | ✅ Complete |
| `/app/agents` | DashAgentsPage | V1 | ✅ Complete |
| `/app/settings` | SettingsPageComponent | V1 | ✅ Complete |

### 🚧 IN DEVELOPMENT

| Route | Component | Design System | Priority |
|-------|-----------|---------------|----------|
| `/solutions/*` | Individual solution pages | V11 | High |
| `/industries/*` | Individual industry pages | V11 | High |
| `/support` | SupportPage | V11 | Medium |

### 📋 PLANNED

*All previously planned routes are now implemented (see Complete Route Tree above).*

---

## USER JOURNEY 1: Discovery → Booking

**Persona:** First-time visitor exploring AI services

### Journey Map
```
1. LANDING
   ↓
   / (Home V11)
   • Hero: "Build intelligent AI systems for your business"
   • Scan: Proof metrics, services grid, approach section
   • See: How It Works carousel with 8-week timeline
   ↓
   DECISION: Interested in specific solution

2. DEEP DIVE
   ↓
   /solutions/ai-agents
   • Learn: What AI agents are, how they work, pricing tiers
   • See: Case study examples, ROI calculator
   • Trust: Timeline clarity, transparent pricing
   ↓
   DECISION: Ready to explore fit for their industry

3. INDUSTRY VALIDATION
   ↓
   /industries/saas
   • Confirm: Use cases match their business model
   • Read: Testimonials from similar companies
   • Recognize: Specific pain points addressed
   ↓
   DECISION: Convinced, wants to start conversation

4. CONVERSION
   ↓
   /booking
   • Book: 30-min discovery call via calendar
   • Provide: Basic business context
   ↓
   EXIT: Email confirmation, calendar invite, pre-call questionnaire
```

**Conversion Rate Goal:** 15-20% (landing → booking)  
**Average Time:** 8-12 minutes

---

## USER JOURNEY 2: Solution Research → Brief Wizard

**Persona:** Decision-maker comparing AI vendors

### Journey Map
```
1. ENTRY
   ↓
   /solutions (Overview)
   • Compare: All 7 solutions side-by-side
   • Filter: By business need (automation, customer service, sales)
   • Pricing: Transparent tier structure visible
   ↓
   DECISION: AI Chatbots + Sales CRM fit needs

2. SOLUTION 1
   ↓
   /solutions/chatbots
   • Understand: Features, integrations, use cases
   • Pricing: $5K-$15K range, 4-6 week timeline
   • See: Live demo video
   ↓
   DECISION: Interested, but want to see process

3. PROCESS CLARITY
   ↓
   /process-v12
   • Review: 7-phase methodology, timeline expectations
   • See: Circular diagram animation (8 weeks delivery)
   • Trust: Client time investment matrix (75% savings)
   ↓
   DECISION: Ready to get scoped proposal

4. SELF-SERVICE SCOPING
   ↓
   /wizard
   • Input: Business goals, timeline, budget, technical details
   • Experience: AI-powered analysis, intelligent follow-ups
   • Receive: Instant ballpark estimate
   ↓
   /processing
   • Watch: AI analyzing requirements
   • Trust: Transparent "thinking states" not loading spinners
   ↓
   /proposal
   • Review: Detailed scope, timeline, pricing
   • Action: Accept → Stripe payment OR Book call for questions
   ↓
   EXIT: Project initiated or sales call scheduled
```

**Conversion Rate Goal:** 25-30% (wizard start → proposal view)  
**Average Time:** 15-20 minutes

---

## USER JOURNEY 3: Brand Trust Building

**Persona:** Enterprise buyer doing due diligence

### Journey Map
```
1. REFERRAL ENTRY
   ↓
   /about
   • Learn: Company story, team expertise, mission
   • Validate: Years in business, credentials, team bios
   • Trust: Professional photography, calm luxury design
   ↓
   DECISION: Want to see proof of work

2. SOCIAL PROOF
   ↓
   /projects (Case Studies V11)
   • Browse: 4 detailed project showcases
   • Filter: StartupAI, FashionOS, EventsOS, Medellín AI
   • Study: Problem → Solution → Results with metrics
   • Tech: Review tech stacks, implementation details
   ↓
   DECISION: Impressed, want to understand process

3. METHODOLOGY
   ↓
   /process-v12
   • Study: 7-phase AI Product Systems Architect framework
   • Appreciate: Discovery → Support with clear deliverables
   • Compare: Client time investment vs traditional agency
   • See: Methodology comparison table
   ↓
   DECISION: Aligned with quality standards

4. DIRECT CONTACT
   ↓
   /support OR /booking
   • Choose: Live chat for questions OR book strategic call
   • Enterprise: Request custom proposal for larger scope
   ↓
   EXIT: In sales conversation, custom RFP submitted
```

**Conversion Rate Goal:** 40-50% (referred traffic → contact)  
**Average Time:** 20-30 minutes (high intent)

---

## USER JOURNEY 4: Industry-Specific Entry

**Persona:** E-commerce owner searching "AI for online stores"

### Journey Map
```
1. SEO LANDING
   ↓
   /industries/ecommerce
   • Recognize: Pain points (cart abandonment, support volume, inventory)
   • See: E-commerce-specific AI solutions highlighted
   • Trust: Case study from similar e-commerce brand
   ↓
   DECISION: Want to see chatbot solution

2. SOLUTION DEEP DIVE
   ↓
   /solutions/chatbots
   • Learn: Shopify/WooCommerce integration details
   • Pricing: $8K-$12K for e-commerce chatbot
   • Timeline: 4 weeks to launch
   • ROI: Average 35% reduction in support tickets
   ↓
   DECISION: Interested in MVP approach

3. MVP VALIDATION
   ↓
   /solutions/mvp-builder
   • Understand: Rapid prototyping methodology
   • Timeline: 4-6 week delivery
   • Pricing: Fixed-price packages
   • Risk: 30-day money-back guarantee
   ↓
   DECISION: Perfect fit, ready to brief

4. WIZARD FLOW
   ↓
   /wizard
   • Input: E-commerce platform, monthly visitors, support volume
   • AI Analysis: Recommends Chatbot + Basic CRM integration
   ↓
   /processing
   • AI generates: Technical requirements, integration plan
   ↓
   /proposal
   • Review: $9,500, 5-week timeline, deliverables list
   • Accept: Stripe checkout OR Book call
   ↓
   EXIT: Project started or sales call scheduled
```

**Conversion Rate Goal:** 20-25% (SEO traffic → wizard completion)  
**Average Time:** 10-15 minutes

---

## USER JOURNEY 5: Existing Client Re-engagement

**Persona:** Past client returning for new project

### Journey Map
```
1. DIRECT LOGIN
   ↓
   /login
   • Enter: Existing credentials
   • 2FA: Optional security verification
   ↓
   ROUTE: Redirected to /dashboard

2. CLIENT PORTAL
   ↓
   /dashboard
   • Review: Past project history (StartupAI completed 2025-11)
   • Status: Current projects in progress
   • Explore: "New Services" notification badge
   • See: Recommended add-ons based on usage patterns
   ↓
   DECISION: Want to add WhatsApp automation

3. NEW SOLUTION RESEARCH
   ↓
   /solutions/sales-crm OR /whatsapp
   • Learn: WhatsApp Business API integration
   • Pricing: Add-on pricing for existing clients (20% discount)
   • Integration: Works with existing StartupAI system
   ↓
   DECISION: Request add-on to existing account

4. INTERNAL REQUEST
   ↓
   /dashboard → "Request New Feature" button
   • Submit: Brief for WhatsApp integration
   • AI Pre-Analysis: Compatibility check, estimated timeline
   • Route: Assigned to existing account manager
   ↓
   EXIT: Account manager email notification, 24-hour response SLA
```

**Conversion Rate Goal:** 60-70% (returning clients → new project)  
**Average Time:** 5-8 minutes (established trust)

---

## USER JOURNEY 6: Support & Education

**Persona:** Active user needing help

### Journey Map
```
1. ENTRY
   ↓
   /support
   • Options: Live chat, help docs, video tutorials, ticket system
   • Status: System status page (uptime, known issues)
   • Hours: Support availability clearly stated
   ↓
   DECISION: Start with help docs

2. SELF-SERVICE
   ↓
   /support/docs (future help center)
   • Browse: Getting started guides, API docs, troubleshooting
   • Search: "How to integrate chatbot with Shopify"
   • Watch: Video tutorial library
   ↓
   DECISION: Need human help for custom issue

3. ESCALATION
   ↓
   /support → "Contact Support" → Live chat
   • Chat: AI chatbot initial triage
   • Route: Escalated to human agent within 2 minutes
   • Collect: Screenshots, error logs, account details
   ↓
   TICKET CREATED
   • Priority: Auto-assigned based on issue severity
   • SLA: Response time commitment shown (4 hours for standard)
   ↓
   EXIT: Ticket reference number, email confirmation
```

**Resolution Rate Goal:** 85% first-contact resolution  
**Average Time:** 8-12 minutes (first response)

---

## NAVIGATION STRUCTURE

### Header (Global Navigation)

```
┌─────────────────────────────────────────────────────────┐
│ [AMO AI Logo]                    [Navigation]    │
│                                                          │
│  Solutions ▼  Industries ▼  Company ▼   [Start Project] │
└─────────────────────────────────────────────────────────┘
```

#### Dropdown Menus

**Solutions Dropdown:**
- AI Web Design
- App Development
- AI Agents
- Chatbots
- Sales CRM
- MVP Builder
- *View All Solutions →*

**Industries Dropdown:**
- SaaS
- E-commerce
- Real Estate
- B2B Services
- Automotive
- Tourism
- *View All Industries →*

**Company Dropdown:**
- About Us
- Projects (Case Studies)
- Our Process
- Booking
- Support
- *Careers →*

**Primary CTA:**
- Button: "Start Project" → `/wizard`
- Style: `bg-gray-900 text-white px-6 py-2.5`

### Footer (Global)

```
┌─────────────────────────────────────────────────────────┐
│                    AMO AI                         │
│     Premium AI services for businesses                   │
│                                                          │
│  COMPANY          SOLUTIONS        INDUSTRIES   RESOURCES│
│  About            AI Web Design    SaaS         Wizard   │
│  Process          App Dev          E-commerce   Projects │
│  Projects         AI Agents        Real Estate  Docs     │
│  Booking          Chatbots         B2B          Blog     │
│  Support          Sales CRM        Automotive   API      │
│                   MVP Builder      Tourism               │
│                                                          │
│  © 2026 AMO AI    Privacy • Terms    [Socials]   │
└─────────────────────────────────────────────────────────┘
```

---

## KEY CONVERSION PATHS

### Primary Conversion Matrix

| Entry Point | Primary CTA | Secondary CTA | Tertiary CTA | Exit Goal |
|-------------|-------------|---------------|--------------|-----------|
| `/` | Start Your Project | Book a Call | View Process | `/wizard` |
| `/solutions/*` | Get Started | View Pricing | See Projects | `/wizard` or `/booking` |
| `/industries/*` | See Solutions | Case Studies | Book Call | `/solutions/*` |
| `/about` | Work With Us | Our Process | View Projects | `/booking` |
| `/projects` | Start Your Project | Contact Us | View Process | `/wizard` |
| `/process-v12` | Start Your Project | Schedule Call | See Projects | `/wizard` |
| `/case-studies` | Start Similar Project | View Process | Contact Us | `/wizard` |

### Conversion Funnel Stages

```
AWARENESS
↓
/ (Homepage)
├→ /solutions (Service education)
├→ /industries (Industry validation)
└→ /projects (Social proof)
↓
CONSIDERATION
↓
/process-v12 (Methodology trust)
├→ /about (Team credibility)
└→ Pricing research across solution pages
↓
DECISION
↓
/wizard (Self-service scoping)
├→ /processing (AI analysis)
└→ /proposal (Final offer)
↓
ACTION
↓
Payment OR /booking (Sales call)
```

---

## CROSS-LINKING STRATEGY

### Solutions Pages Link To:

**Every `/solutions/*` page must link to:**
1. **2-3 Relevant Industry Pages**
   - Example: `/solutions/chatbots` → `/industries/ecommerce`, `/industries/saas`
2. **Process Page**
   - Link text: "How we build it" → `/process-v12`
3. **Case Studies**
   - Link text: "See it in action" → `/projects`
4. **Wizard CTA**
   - Button: "Start Your Project" → `/wizard`

**Example: `/solutions/chatbots`**
```markdown
Industries using chatbots:
- [E-commerce](/industries/ecommerce) - Automate customer support
- [SaaS](/industries/saas) - Qualify leads 24/7
- [Tourism](/industries/tourism) - Handle bookings

[How we build chatbots](/process-v12)
[See chatbot case studies](/projects#fashionos)
[Get started →](/wizard)
```

### Industry Pages Link To:

**Every `/industries/*` page must link to:**
1. **3-4 Relevant Solution Pages**
   - Example: `/industries/ecommerce` → `/solutions/chatbots`, `/solutions/ai-web-design`, `/solutions/sales-crm`
2. **Industry-Specific Case Study**
   - Link to relevant project in `/projects` with hash anchor
3. **Booking CTA**
   - Button: "Book Industry Expert Call" → `/booking?industry=ecommerce`

**Example: `/industries/ecommerce`**
```markdown
Recommended solutions for e-commerce:
- [AI Chatbots](/solutions/chatbots) - Reduce support tickets by 40%
- [AI Web Design](/solutions/ai-web-design) - Convert more visitors
- [Sales CRM](/solutions/sales-crm) - Manage customer relationships

Case study: [How FashionOS reduced returns by 35%](/projects#fashionos)
[Book e-commerce expert call](/booking?industry=ecommerce)
```

### Company Pages Link To:

**Every company page must link to:**
1. **At least 1 Solution Page**
   - Contextual based on page content
2. **Conversion Path**
   - `/wizard` OR `/booking`
3. **Related Company Pages**
   - Internal cross-linking (About ↔ Process ↔ Projects)

**Example: `/about`**
```markdown
We specialize in [AI Agent development](/solutions/ai-agents) and 
[MVP building](/solutions/mvp-builder) for startups.

See our [proven process](/process-v12)
View [client success stories](/projects)
[Start your project](/wizard)
```

---

## SEO OPTIMIZATION STRATEGY

### URL Structure

```
✅ GOOD:
/solutions/ai-agents
/industries/saas
/projects#startupai

❌ AVOID:
/solutions?id=123
/industries/index.php?cat=saas
/projects/details/4
```

### Meta Title Templates

```
Homepage: "AMO AI | Build AI Systems for Your Business"
Solutions: "[Solution Name] | AI Development in 8 Weeks | AMO AI"
Industries: "AI Solutions for [Industry] | AMO AI"
Projects: "AI Case Studies | Real Results | AMO AI"
Process: "Our AI Development Process | 8 Weeks to Launch | AMO AI"
```

### Internal Linking Principles

1. **Depth Limit:** Every page ≤ 3 clicks from homepage
2. **Contextual Links:** Use descriptive anchor text (no "click here")
3. **Bidirectional:** If A links to B, B should link back to A
4. **Hierarchy:** Parent pages link to children, children link to parent
5. **Conversion Paths:** Every page has 1 primary conversion path

---

## MOBILE NAVIGATION

### Hamburger Menu Structure

```
☰ Menu
├── Home
├── Solutions
│   ├── All Solutions
│   ├── AI Web Design
│   ├── App Development
│   ├── AI Agents
│   ├── Chatbots
│   ├── Sales CRM
│   └── MVP Builder
├── Industries
│   ├── All Industries
│   ├── SaaS
│   ├── E-commerce
│   ├── Real Estate
│   ├── B2B Services
│   ├── Automotive
│   └── Tourism
├── Company
│   ├── About
│   ├── Projects
│   ├── Process
│   ├── Booking
│   └── Support
└── [Start Project Button]
```

---

## ANALYTICS TRACKING PLAN

### Key Events to Track

**Page Views:**
- Track all route changes
- UTM parameters captured
- Referral source logged

**Conversion Events:**
- Wizard started
- Wizard completed
- Proposal viewed
- Booking submitted
- Payment completed

**Engagement Events:**
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 60s, 120s+)
- Video plays
- CTA clicks
- External link clicks

**Navigation Events:**
- Navigation clicks (track which menu items)
- Footer link clicks
- Internal search queries
- 404 errors (track broken links)

---

## FUTURE EXPANSIONS

### Phase 2 (Q2 2026)
- `/blog` - Content marketing hub
- `/resources` - Whitepapers, templates, tools
- `/pricing` - Transparent pricing calculator
- `/partners` - Partner/referral program

### Phase 3 (Q3 2026)
- `/careers` - Job listings, culture page
- `/api-docs` - Developer documentation
- `/integrations` - Integration marketplace
- `/community` - User forum/Slack community

### Phase 4 (Q4 2026)
- Multi-language support (Spanish, Portuguese)
- `/es/`, `/pt/` route prefixes
- Regional pricing and case studies

---

## TECHNICAL NOTES

### Current Implementation
- **Framework:** Vite + React
- **Routing:** `react-router` v7 with `createBrowserRouter` (Data mode)
- **Auth:** Supabase Auth (email, Google, LinkedIn)
- **Backend:** Supabase Edge Functions (Hono server)
- **State Management:** React hooks + `useAuth()` context
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (via `motion/react`)

### Router Configuration
```javascript
// /routes.tsx — using react-router (NOT react-router-dom)
import { createBrowserRouter } from 'react-router';
// 3 layout groups: Layout (public), DashboardLayout (/app/*), WizardPage (/wizard/*)
```

---

## DOCUMENT CHANGELOG

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2026-01-08 | 1.0 | Initial sitemap creation | System |
| 2026-03-07 | 1.2 | Add individual solution pages | System |
| 2026-03-07 | 1.3 | Add individual industry pages | System |
| 2026-03-09 | 13 | Add auth, wizard, app dashboard (23 routes), strategy engine sub-features | System |

---

**END OF SITEMAP DOCUMENTATION**