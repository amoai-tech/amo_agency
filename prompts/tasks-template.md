# AMO AI — Task Template

> **Purpose:** Generate implementation tasks from wizard specs, diagrams, and PRD
> **Rule:** PRD → Diagrams → Tasks → Implementation
> **Updated:** 2026-03-07 | **Version:** 1.0
> Adapted for AMO AI wizard-first platform. 5-part structured descriptions, real-world examples, outcomes.

---

## File Naming

**Format:** `XXX-name.md` (sequential, no gaps)
**Location:** `/home/sk/sunv2/tasks/`

| Range | Phase | Question |
|-------|-------|----------|
| 001-008 | P0 CRITICAL | Can the wizard work end-to-end? |
| 009-016 | P1 HIGH | Can the client use their dashboard? |
| 017-024 | P2 MEDIUM | Can the agency manage clients? |
| 025-030 | P3 LOW | Polish, integrations, scale |

---

## Scope Guard

Before adding any item, ask: **"Does the user need this on day 1?"**

- One task = one shippable unit (3-5 days max)
- Max 10 acceptance criteria — if more, split the task
- No speculative features — only what the wizard flow or dashboard requires
- Defer polish to v1.1 (animations, transitions, advanced scoring)

---

## Task Structure

Every task file follows this order. Sections marked (optional) can be omitted for simple tasks.

### 1. Frontmatter

```yaml
---
task_id: 001-WIZ
title: Task Title
phase: CRITICAL | HIGH | MEDIUM | LOW
priority: P0 | P1 | P2 | P3
status: Not Started | In Progress | Completed
estimated_effort: 1 day | 3 days | 1 week
area: wizard | client-dashboard | agency-dashboard | auth | ai-agents | infrastructure
wizard_step: 1 | 2 | 3 | 4 | 5 | null
skill: [category/skill-name, ...]
subagents: [code-reviewer, supabase-expert]
edge_function: function-name
schema_tables: [table1, table2]
depends_on: [XXX-task]
figma_prompt: prompts/XX-screen-name.md
mermaid_diagram: mermaid-wizard/XX-diagram-name.md
---
```

### 2. Summary Table

```markdown
| Aspect | Details |
|--------|---------|
| **Screens** | Wizard Step 3, Right Panel |
| **Features** | AI recommendations, system selection, investment tier |
| **Edge Functions** | recommend-systems |
| **Tables** | project_systems, ai_cache, systems |
| **Agents** | recommend-systems (Pro, Thinking Mode) |
| **Real-World** | "Client selects 3 AI systems — summary updates live in right panel" |
```

### 3. Description (5-part structured format)

```markdown
## Description

**The situation:** What's the current state? What exists, what's broken, what's missing?
Describe the concrete reality — reference specific wizard screens, panels, or dashboard tabs.

**Why it matters:** Why is this a problem worth solving? What's the cost of inaction?
Connect to the wizard flow — blocked steps, missing data, broken user journey.

**What already exists:** What code, patterns, or infrastructure can we build on?
Name specific files, Edge Functions, hooks, tables, or wizard prompts that are relevant.

**The build:** What exactly will be created or changed?
Describe the implementation — components, migrations, Edge Function connections, panel updates.

**Example:** One concrete scenario showing the feature in action.
Use a real business type (e.g., "Acme Retail Group, an e-commerce company with 50 employees").
Show the wizard step before and after this task is complete.
```

### 4. Rationale

```markdown
## Rationale
**Problem:** What pain point does this solve for the client or agency?
**Solution:** How does this feature address it within the wizard/dashboard flow?
**Impact:** What changes for the user? Reference the three-panel layout where relevant.
```

### 5. User Stories

```markdown
| As a... | I want to... | So that... |
|---------|--------------|------------|
| Client | see AI-ranked system recommendations | I can choose the right systems for my business |
| Agency user | view completed wizard data | I can prepare the executive brief |
```

User types: Client, Agency Owner, Agency Consultant, Guest

### 6. Goals & Acceptance Criteria

```markdown
## Goals
1. **Primary:** User can [core action in wizard/dashboard]
2. **Quality:** < X seconds for AI response, auto-save works

## Acceptance Criteria
- [ ] User can [action]
- [ ] Data persisted to [table] via wizard_answers or dedicated table
- [ ] Left panel updates with [context/signals/selections]
- [ ] Right panel shows [guidance/summary/reasoning]
- [ ] Auto-save indicator shows "Saving..." then "Saved"
- [ ] Continue button enabled/disabled based on [validation]
- [ ] Error states handled (network, AI failure, validation)
- [ ] Loading + empty states shown (skeleton screens, not blank)
- [ ] Responsive: mobile single-column, tablet two-panel, desktop three-panel
```

### 7. Wiring Plan

```markdown
| Layer | File | Action |
|-------|------|--------|
| Page | `src/components/wizard/StepX.tsx` | Create/Modify |
| Component | `src/components/wizard/XCard.tsx` | Create |
| Hook | `src/lib/hooks/useX.ts` | Create |
| Edge Function | `supabase/functions/x/index.ts` | Create/Modify |
| Migration | `supabase/migrations/xxx_x.sql` | Create |
| Types | `src/lib/types/x.ts` | Create |
| Constants | `src/lib/constants.ts` | Modify |
```

### 8. Schema (optional — if new tables or modifications)

```markdown
### Table: [table_name]
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| org_id | uuid | FK to organizations, NOT NULL |
| project_id | uuid | FK to projects |
| created_at | timestamptz | default now() |

### RLS Policies
| Policy | Operation | Rule |
|--------|-----------|------|
| select_own | SELECT | org_id = user_org_id() |
| insert_own | INSERT | org_id = user_org_id() |
| update_own | UPDATE | org_id = user_org_id() WITH CHECK org_id = user_org_id() |
```

### 9. Edge Cases (optional)

```markdown
| Scenario | Expected Behavior |
|----------|-------------------|
| AI cache miss on Step 3 | Run Edge Function synchronously, show skeleton |
| Brief not approved at Step 5 | Redirect back to Step 4 with message |
| User returns to completed step | Pre-fill from saved wizard_answers |
| Network error during save | Show retry option, don't lose form data |
| Guest user (no auth) | Save to localStorage, prompt signup |
```

### 10. Real-World Examples

```markdown
## Real-World Examples

**Scenario 1 — [Short title]:** [Concrete scenario with a named business].
[What happens today without this feature]. **With this implementation,**
[what happens after]. [Why it matters for the wizard/dashboard flow].

**Scenario 2 — [Short title]:** [Different angle — edge case, returning user,
or failure mode]. [Before]. **With this implementation,** [after].
```

Write 2-3 scenarios per task. Use real business types (e-commerce, real estate, healthcare).
Name the company. Show before/after behavior. Cover both happy path and failure modes.

### 11. Outcomes

```markdown
## Outcomes

| Before | After |
|--------|-------|
| Step 3 shows static recommendation cards | AI-ranked cards with personalized "Why it fits" bullets |
| Right panel is empty on Step 3 | Live selection summary with count, impact, and tier |
| No project created at wizard end | Full project with roadmap, phases, and 12 AI-generated tasks |
```

3-5 rows. Each row is a concrete before/after pair. Avoid vague statements.

---

## Design System Reference

When implementing wizard screens, follow these constraints:

| Element | Specification |
|---------|---------------|
| Colors | #0A211F (dark teal), #84CC16 (lime green), #F1EEEA (beige), #FFFFFF (white), #D4CFC8 (border) |
| Headings | Playfair Display (serif) |
| Body | Lora (serif) |
| Max content width | 1200px (site), 640px (wizard center panel) |
| Card radius | 4px or 8px max |
| Input height | 48px |
| Spacing | 8px base unit |
| Shadows | None (use borders instead) |
| Gradients | None |

### Three-Panel Layout (Wizard Steps 1-4)
- Left (240px): Progress stepper + context — read-only
- Center (flex-1, max 640px): Forms, questions, selections — human-first
- Right (320px): AI reasoning, guidance, summaries — read-only

### Step 5 Exception
- Centered single-column layout (no three-panel)
- Max-width 800px project summary card

### Dashboard Layout (Post-Wizard)
- Standard sidebar + main content
- No three-panel

---

## AI Agent Reference

| Agent | Model | Thinking | Screen | Edge Function |
|-------|-------|----------|--------|---------------|
| analyze-business | gemini-3-flash-preview | low | Step 1 | analyze-business (URL Context + Google Search) |
| analyst | gemini-3-flash-preview | low | Step 1 | analyst (Google Search) |
| generate-diagnostics | gemini-3-flash-preview | low | Step 2 | generate-diagnostics |
| extractor | gemini-3-flash-preview | low | Step 2 | extractor |
| recommend-systems | gemini-3.1-pro-preview | high | Step 3 | recommend-systems |
| optimizer | gemini-3.1-pro-preview | high | Step 3 | optimizer |
| scorer | gemini-3.1-pro-preview | high | Step 4 | scorer |
| summary | gemini-3.1-pro-preview | high | Step 4 | summary |
| generate-roadmap | gemini-3.1-pro-preview | high | Step 4 | generate-roadmap |
| task-generator | gemini-3-flash-preview | medium | Step 5 | task-generator |
| assistant | gemini-3-flash-preview | low | Dashboard | assistant |

---

## Skill Reference

Use exact paths from `.agents/`. Each task should list 1-3 skills the implementer should invoke.

| Category | Skill | Use When |
|----------|-------|----------|
| `ai/gemini` | Gemini integration | Edge Functions calling Gemini API |
| `mermaid-diagrams` | Diagram creation | Creating flow/state/ERD diagrams |
| `data/database-migration` | Schema changes | New tables, FK fixes, triggers, RLS |
| `data/supabase-edge-functions` | Edge fn patterns | Timeout, rate limiting, CORS, JWT |
| `design/frontend-design` | UI components | React pages, shadcn/ui, Tailwind |
| `devops/edge-function-creator` | New edge functions | Creating/deploying new functions |
| `devops/security-hardening` | Security audit | RLS audit, error leakage, JWT |
| `product/api-wiring` | Backend to Frontend | Connecting Edge Functions to hooks/UI |
| `product/feature-dev` | Multi-file features | Features spanning types, hooks, components |

---

## Anti-Patterns

| Don't | Do Instead |
|-------|------------|
| `any` type | Proper TypeScript types |
| Inline styles | Tailwind classes |
| Direct Supabase in components | Custom hooks (useWizardStep, useProjectData) |
| Console.log in production | Proper error handling |
| Hardcoded strings | Constants in src/lib/constants.ts |
| Nested ternaries | Early returns |
| Components > 200 lines | Split into smaller components |
| Add features not requested | Solve only the stated problem |
| Client-side AI calls | Edge Functions for all Gemini calls |
| Skip auto-save | Always debounce 500ms and save to wizard_answers |
| Break three-panel layout | Follow panel roles (context / work / intelligence) |

---

## Prompting Best Practices (Claude 4.6)

### Be Explicit, Not Aggressive

Use clear, normal language. Over-prompting causes overtriggering.

| Avoid | Prefer |
|-------|--------|
| "You MUST ALWAYS use X" | "Use X for this task" |
| "CRITICAL: NEVER do Y" | "Avoid Y because [reason]" |

### Provide Context, Not Just Commands

Explain why a constraint exists so Claude can generalize correctly.

### Scope the Work Clearly

- State what to implement and what to skip
- Name exact files to create or modify in the wiring plan
- Set explicit quality targets

### Research Before Implementation

- "Read src/components/wizard/Step1.tsx and follow the existing pattern"
- "Check the existing RLS policies on wizard_answers before adding new ones"

### Keep Solutions Minimal

- Don't add error handling for scenarios that can't happen
- Don't create abstractions for one-time operations
- Three similar lines of code is better than a premature abstraction

---

## Workflow

1. Read task prompt completely
2. Read the referenced Figma prompt in tasks/wizard/prompts/
3. Review the mermaid diagram in tasks/wizard/mermaid-wizard/
4. Read existing files referenced in wiring plan
5. Implement each file in wiring plan order
6. Run npm run build to verify
7. Verify acceptance criteria manually
8. Mark task complete

---

## Checklists

### Production Ready

- [ ] npm run build passes
- [ ] No console.log in production code
- [ ] Loading, error, empty states handled
- [ ] Auto-save works (500ms debounce)
- [ ] RLS policies enforce org isolation (if new tables)
- [ ] Edge Function verifies JWT (if new function)
- [ ] No secrets in client code
- [ ] Three-panel layout intact (wizard steps 1-4)
- [ ] Responsive behavior matches spec (mobile, tablet, desktop)

### Regression (manual spot-check)

- [ ] Wizard Step 1: form saves, context card updates, continue validates
- [ ] Wizard Step 2: questions load per industry, signals detect, AI triggers on continue
- [ ] Wizard Step 3: recommendations display, selection updates right panel
- [ ] Wizard Step 4: brief generates, inline edit works, approval flow complete
- [ ] Wizard Step 5: project creates, checklist animates, dashboard CTA works
- [ ] Auth: login/signup/OAuth cycle works
- [ ] Dashboard: loads project data after wizard completion
