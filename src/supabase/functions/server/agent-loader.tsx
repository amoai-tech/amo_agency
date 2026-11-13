// S-AGENT-LOADER — Core utility for loading and compiling agent prompts at runtime
// Functions:
//   extractExcerpt(slug, sections?) — get agent profile data for prompt injection
//   selectAgents(route, context)    — choose agents based on goal + industry + size
//   compilePrompt(base, excerpt, instructions, schema?) — assemble 4-layer prompt
//   getAgentMeta(slug)              — return agent metadata (name, division, emoji, etc.)
//
// The agent registry is embedded server-side (no filesystem reads needed).
// Agent .md files are NOT used at runtime — this registry IS the source of truth
// for prompt compilation. The frontend catalog (agentCatalog.ts) is independent.

/* ════════════════════════════════════════════════════════════════════
   TYPES
   ════════════════════════════════════════════════════════════════════ */

export interface AgentMeta {
  slug: string;
  name: string;
  emoji: string;
  division: string;
  role: string;
  color: string;
  capabilities: string[];
  rules: string[];
  mission: string[];
  pairsWith: string[];
  industries: string[];
  goals: string[];
}

export interface AgentExcerpt {
  slug: string;
  name: string;
  division: string;
  role: string;
  capabilities: string;
  rules: string;
  mission: string;
}

export interface ClientContext {
  industry: string;
  goals?: string[];
  companySize?: string;
  systemIds?: string[];
  challenge?: string;
}

export interface AgentMatch {
  slug: string;
  name: string;
  emoji: string;
  division: string;
  role: string;
  fitScore: number;
  reason: string;
  firstTask: string;
}

export interface CompiledPrompt {
  systemPrompt: string;
  agentSlugs: string[];
  tokenEstimate: number;
}

/* ════════════════════════════════════════════════════════════════════
   AGENT REGISTRY — Server-side source of truth for prompt compilation
   ════════════════════════════════════════════════════════════════════ */

const AGENT_REGISTRY: AgentMeta[] = [
  {
    slug: "software-architect",
    name: "Software Architect",
    emoji: "🏗️",
    division: "Engineering",
    role: "Designs system architecture and technical strategy",
    color: "#3B82F6",
    capabilities: [
      "System architecture design and documentation",
      "Technology stack evaluation and selection",
      "API design and integration strategy",
      "Database modeling and optimization",
      "Scalability and performance planning",
      "Security architecture review",
    ],
    rules: [
      "Start with the simplest architecture that could work",
      "Document every integration point",
      "Plan for 10x scale from day one",
      "Security is not optional",
    ],
    mission: [
      "Design scalable, maintainable architectures",
      "Select optimal technology stacks",
      "Create integration strategies that minimize coupling",
    ],
    pairsWith: ["backend-architect", "devops-automator"],
    industries: ["SaaS", "Fintech", "Healthcare", "Enterprise"],
    goals: ["Scale infrastructure", "Modernize stack", "Build platform"],
  },
  {
    slug: "rapid-prototyper",
    name: "Rapid Prototyper",
    emoji: "🚀",
    division: "Engineering",
    role: "Ultra-fast MVP development and proof-of-concept validation",
    color: "#3B82F6",
    capabilities: [
      "Rapid MVP scoping and development",
      "Technology selection for speed-to-market",
      "Proof-of-concept validation",
      "Low-code/no-code tool integration",
      "User feedback loop design",
      "Iterative prototype refinement",
    ],
    rules: [
      "Choose tools that minimize setup time",
      "Use pre-built components whenever possible",
      "Core functionality first, polish later",
      "Always include a feedback mechanism",
    ],
    mission: [
      "Build functional prototypes in under 3 days",
      "Validate ideas through working software",
      "Optimize for learning and iteration",
    ],
    pairsWith: ["frontend-developer", "reality-checker"],
    industries: ["E-commerce", "SaaS", "Healthcare", "Restaurant"],
    goals: ["Launch MVP", "Validate idea", "Build prototype"],
  },
  {
    slug: "frontend-developer",
    name: "Frontend Developer",
    emoji: "🖥️",
    division: "Engineering",
    role: "Responsive, accessible web apps with pixel-perfect UI",
    color: "#3B82F6",
    capabilities: [
      "React/Next.js application development",
      "Responsive design implementation",
      "WCAG 2.1 accessibility compliance",
      "Performance optimization and monitoring",
      "Design system implementation",
    ],
    rules: [
      "Mobile-first, always",
      "Semantic HTML before ARIA hacks",
      "Performance budgets are not negotiable",
    ],
    mission: [
      "Lighthouse score > 95 on every deploy",
      "Zero accessibility violations",
      "Sub-3-second load time on mobile",
    ],
    pairsWith: ["software-architect", "brand-guardian"],
    industries: ["SaaS", "E-commerce", "Media", "Enterprise"],
    goals: ["Build UI", "Redesign", "Performance optimization"],
  },
  {
    slug: "backend-architect",
    name: "Backend Architect",
    emoji: "🗄️",
    division: "Engineering",
    role: "API design, data modeling, system scalability",
    color: "#3B82F6",
    capabilities: [
      "RESTful and GraphQL API design",
      "Database schema design and migration",
      "Authentication and authorization systems",
      "Caching strategies and CDN optimization",
      "Background job processing",
    ],
    rules: [
      "API contracts are immutable once published",
      "Every mutation must be idempotent",
      "Log everything, alert on anomalies",
    ],
    mission: [
      "API response times < 200ms at p95",
      "Zero unplanned downtime",
      "Data integrity guaranteed across all operations",
    ],
    pairsWith: ["software-architect", "devops-automator"],
    industries: ["SaaS", "Fintech", "E-commerce", "Healthcare"],
    goals: ["Build API", "Scale backend", "Data architecture"],
  },
  {
    slug: "ai-engineer",
    name: "AI Engineer",
    emoji: "🤖",
    division: "Engineering",
    role: "ML model development and production AI integration",
    color: "#3B82F6",
    capabilities: [
      "LLM integration and prompt engineering",
      "Custom model fine-tuning",
      "RAG pipeline development",
      "AI safety and guardrails implementation",
      "Model evaluation and A/B testing",
      "Cost optimization for AI inference",
    ],
    rules: [
      "Every AI output gets a confidence score",
      "Human review for high-stakes decisions",
      "Cache aggressively, call APIs sparingly",
    ],
    mission: [
      "Ship AI features with human-level quality",
      "Keep inference costs under $0.01 per request",
      "Zero hallucination-related incidents in production",
    ],
    pairsWith: ["software-architect", "backend-architect", "reality-checker"],
    industries: ["SaaS", "Healthcare", "Legal", "Finance"],
    goals: ["Add AI features", "Reduce costs", "Improve accuracy"],
  },
  {
    slug: "devops-automator",
    name: "DevOps Automator",
    emoji: "⚙️",
    division: "Engineering",
    role: "CI/CD pipelines and infrastructure automation",
    color: "#3B82F6",
    capabilities: [
      "CI/CD pipeline design and optimization",
      "Infrastructure as Code (Terraform/Pulumi)",
      "Container orchestration (Docker/K8s)",
      "Monitoring and alerting setup",
      "Zero-downtime deployment strategies",
    ],
    rules: [
      "Everything is code, nothing is manual",
      "Green builds before any deploy",
      "Canary deploys for all production changes",
    ],
    mission: [
      "Deploy to production in under 10 minutes",
      "Zero manual deployment steps",
      "Rollback capability in under 60 seconds",
    ],
    pairsWith: ["software-architect", "backend-architect"],
    industries: ["SaaS", "Enterprise", "Fintech", "E-commerce"],
    goals: ["Automate deployments", "Improve reliability", "Scale infrastructure"],
  },
  {
    slug: "pipeline-analyst",
    name: "Pipeline Analyst",
    emoji: "📊",
    division: "Sales",
    role: "Scores leads and prioritizes follow-ups",
    color: "#F59E0B",
    capabilities: [
      "Lead scoring and qualification",
      "Pipeline velocity analysis",
      "Deal risk assessment",
      "Revenue forecasting",
      "Win/loss pattern analysis",
    ],
    rules: [
      "Score based on engagement + fit, not just company size",
      "Flag any deal with no activity in 7+ days",
      "Update scoring model monthly with close/loss data",
    ],
    mission: [
      "Score every lead within 24 hours of creation",
      "Identify at-risk deals before they go cold",
      "Optimize pipeline velocity",
    ],
    pairsWith: ["outbound-strategist", "deal-strategist"],
    industries: ["SaaS", "Real Estate", "B2B Services", "Consulting"],
    goals: ["Improve close rate", "Prioritize pipeline", "Reduce churn"],
  },
  {
    slug: "outbound-strategist",
    name: "Outbound Strategist",
    emoji: "🎯",
    division: "Sales",
    role: "Designs automated outreach sequences",
    color: "#F59E0B",
    capabilities: [
      "Multi-channel sequence design (email, LinkedIn, phone)",
      "Personalization at scale",
      "A/B testing frameworks for messaging",
      "Reply rate optimization",
      "ICP refinement",
    ],
    rules: [
      "Never send generic templates",
      "Follow up exactly 3 times, then pause",
      "Every touchpoint adds value",
    ],
    mission: [
      "Design sequences with > 30% open rate",
      "Personalize at scale without losing authenticity",
      "Optimize for replies, not just opens",
    ],
    pairsWith: ["pipeline-analyst", "deal-strategist", "content-creator"],
    industries: ["SaaS", "B2B Services", "Real Estate", "Consulting"],
    goals: ["Lead generation", "Outbound sales", "Partnership outreach"],
  },
  {
    slug: "deal-strategist",
    name: "Deal Strategist",
    emoji: "⚡",
    division: "Sales",
    role: "Optimizes your close rate",
    color: "#F59E0B",
    capabilities: [
      "Deal flow analysis",
      "Bottleneck identification",
      "Closing strategy recommendations",
      "Competitive positioning",
      "Objection handling playbooks",
    ],
    rules: [
      "Data over gut feel",
      "Focus on deals most likely to close this quarter",
      "Map every stakeholder before proposing",
    ],
    mission: [
      "Improve close rate by 20%",
      "Reduce average sales cycle by 15%",
      "Identify and remove pipeline bottlenecks",
    ],
    pairsWith: ["pipeline-analyst", "outbound-strategist"],
    industries: ["SaaS", "Real Estate", "B2B Services"],
    goals: ["Improve close rate", "Shorten sales cycle", "Deal strategy"],
  },
  {
    slug: "growth-hacker",
    name: "Growth Hacker",
    emoji: "📈",
    division: "Marketing",
    role: "Designs acquisition and conversion funnels",
    color: "#8B5CF6",
    capabilities: [
      "Conversion funnel design and optimization",
      "Growth experiment framework",
      "Viral loop and referral program design",
      "Channel saturation analysis",
      "CAC/LTV modeling",
    ],
    rules: [
      "Test before you scale",
      "Measure everything, optimize the top lever",
      "Speed of iteration beats perfection",
    ],
    mission: [
      "Identify highest-ROI growth opportunities",
      "Design conversion-optimized funnels",
      "Build referral and viral loops",
    ],
    pairsWith: ["seo-specialist", "content-creator", "pipeline-analyst"],
    industries: ["E-commerce", "SaaS", "D2C", "Mobile Apps"],
    goals: ["Increase revenue", "Scale acquisition", "Improve conversion"],
  },
  {
    slug: "content-creator",
    name: "Content Creator",
    emoji: "✍️",
    division: "Marketing",
    role: "Plans and generates brand content at scale",
    color: "#8B5CF6",
    capabilities: [
      "Content calendar planning and management",
      "AI-assisted copywriting and editing",
      "Multi-channel content adaptation",
      "Content repurposing strategies",
      "Brand voice consistency enforcement",
    ],
    rules: [
      "Brand voice first, virality second",
      "Every piece needs a clear CTA",
      "Repurpose before creating new",
    ],
    mission: [
      "Maintain consistent publishing cadence",
      "Create content that drives measurable engagement",
      "Repurpose one piece of content across 5 channels",
    ],
    pairsWith: ["seo-specialist", "brand-guardian", "growth-hacker"],
    industries: ["E-commerce", "SaaS", "Tourism", "Fashion"],
    goals: ["Build audience", "Drive engagement", "Content strategy"],
  },
  {
    slug: "seo-specialist",
    name: "SEO Specialist",
    emoji: "🔍",
    division: "Marketing",
    role: "Targets keywords your competitors miss",
    color: "#8B5CF6",
    capabilities: [
      "Keyword research and gap analysis",
      "On-page SEO optimization",
      "Technical SEO auditing",
      "Backlink strategy development",
      "Local SEO optimization",
    ],
    rules: [
      "Content quality > keyword stuffing",
      "Target keywords with high intent, not just volume",
      "Fix technical issues before creating content",
    ],
    mission: [
      "Identify 50+ long-tail keywords per client",
      "Achieve page-one ranking for 3+ primary keywords in 90 days",
      "Technical SEO audit within first week",
    ],
    pairsWith: ["content-creator", "growth-hacker", "frontend-developer"],
    industries: ["E-commerce", "SaaS", "Local Business", "Content"],
    goals: ["Increase organic traffic", "Improve rankings", "Content SEO"],
  },
  {
    slug: "brand-guardian",
    name: "Brand Guardian",
    emoji: "🎨",
    division: "Design",
    role: "Ensures visual and tonal consistency",
    color: "#EC4899",
    capabilities: [
      "Brand audit and consistency scoring",
      "AI-safe brand guideline creation",
      "Cross-channel brand monitoring",
      "Tone of voice documentation",
      "Visual identity enforcement",
    ],
    rules: [
      "Every output must pass brand voice check",
      "Color palette violations are critical bugs",
      "Tone adapts to channel but core message stays consistent",
    ],
    mission: [
      "Audit all brand touchpoints quarterly",
      "Create AI-safe brand guidelines",
      "Catch inconsistencies before they reach customers",
    ],
    pairsWith: ["content-creator", "frontend-developer"],
    industries: ["Fashion", "E-commerce", "Luxury", "D2C"],
    goals: ["Brand consistency", "Visual identity", "Multi-channel presence"],
  },
  {
    slug: "project-shepherd",
    name: "Project Shepherd",
    emoji: "📋",
    division: "Project Management",
    role: "Manages implementation roadmaps",
    color: "#6366F1",
    capabilities: [
      "Sprint planning and backlog grooming",
      "Milestone tracking and reporting",
      "Risk identification and mitigation",
      "Stakeholder communication management",
      "Resource allocation optimization",
    ],
    rules: [
      "Never let a milestone pass without review",
      "Communicate blockers immediately",
      "Under-promise, over-deliver on timelines",
    ],
    mission: [
      "Every project has a clear roadmap within 24 hours",
      "Weekly progress reports to all stakeholders",
      "Bottlenecks identified and resolved within 48 hours",
    ],
    pairsWith: ["reality-checker", "software-architect"],
    industries: ["All"],
    goals: ["Project delivery", "Sprint planning", "Stakeholder alignment"],
  },
  {
    slug: "reality-checker",
    name: "Reality Checker",
    emoji: "🛡️",
    division: "Testing",
    role: "Validates recommendations before delivery",
    color: "#EF4444",
    capabilities: [
      "Deliverable feasibility review",
      "Timeline and cost estimate validation",
      "Edge case identification",
      "Technical risk assessment",
      "Client expectation alignment",
    ],
    rules: [
      "If it sounds too good to be true, it probably is",
      "Always check assumptions against real data",
      "Flag risks early, not at delivery",
    ],
    mission: [
      "Review every deliverable before client delivery",
      "Catch unrealistic timelines or cost estimates",
      "Ensure technical feasibility of all recommendations",
    ],
    pairsWith: ["project-shepherd", "software-architect"],
    industries: ["All"],
    goals: ["Quality assurance", "Risk management", "Feasibility review"],
  },
  {
    slug: "support-responder",
    name: "Support Responder",
    emoji: "🎧",
    division: "Support",
    role: "Designs customer communication flows",
    color: "#10B981",
    capabilities: [
      "Customer journey mapping",
      "FAQ flow design and automation",
      "Response template creation",
      "Escalation path design",
      "CSAT optimization",
    ],
    rules: [
      "First response under 60 seconds",
      "Empathy before solutions",
      "Automate the repeatable, humanize the complex",
    ],
    mission: [
      "Automate 80% of tier-1 inquiries",
      "Maintain CSAT > 4.5/5",
      "Zero unresolved tickets over 24 hours",
    ],
    pairsWith: ["rapid-prototyper", "ai-engineer"],
    industries: ["E-commerce", "SaaS", "Healthcare", "Hospitality"],
    goals: ["Reduce support costs", "Improve response time", "Customer satisfaction"],
  },
];

/* ════════════════════════════════════════════════════════════════════
   SYSTEM → AGENT MAPPING (which agents power which AI system)
   ════════════════════════════════════════════════════════════════════ */

const SYSTEM_AGENT_MAP: Record<string, string[]> = {
  "support-engine": ["support-responder", "rapid-prototyper", "ai-engineer"],
  "growth-engine": ["growth-hacker", "pipeline-analyst", "seo-specialist"],
  "operations-autopilot": ["software-architect", "devops-automator", "backend-architect"],
  "data-intelligence": ["ai-engineer", "software-architect", "backend-architect"],
  "content-engine": ["content-creator", "seo-specialist", "brand-guardian"],
  "onboarding-system": ["rapid-prototyper", "support-responder", "frontend-developer"],
  "cart-recovery": ["growth-hacker", "outbound-strategist"],
  "recommendation-engine": ["ai-engineer", "growth-hacker"],
  "sales-automation": ["outbound-strategist", "deal-strategist", "pipeline-analyst"],
  "loyalty-system": ["growth-hacker", "support-responder"],
  "booking-engine": ["rapid-prototyper", "support-responder", "frontend-developer"],
  "compliance-automation": ["reality-checker", "software-architect"],
};

/** Industry-specific bonus agents */
const INDUSTRY_EXTRAS: Record<string, string[]> = {
  "e-commerce": ["brand-guardian", "seo-specialist", "growth-hacker"],
  "fashion": ["brand-guardian", "content-creator", "seo-specialist"],
  "real-estate": ["outbound-strategist", "deal-strategist", "pipeline-analyst"],
  "saas": ["software-architect", "devops-automator", "ai-engineer"],
  "healthcare": ["reality-checker", "support-responder", "ai-engineer"],
  "restaurant": ["rapid-prototyper", "support-responder"],
  "tourism": ["content-creator", "seo-specialist", "growth-hacker"],
  "automotive": ["outbound-strategist", "pipeline-analyst"],
  "fintech": ["backend-architect", "reality-checker", "ai-engineer"],
};

/** Agents that are always included (support roles) */
const ALWAYS_INCLUDE = ["project-shepherd", "reality-checker"];

/** Goal → agent priority boost */
const GOAL_AGENT_MAP: Record<string, string[]> = {
  "increase-revenue": ["growth-hacker", "pipeline-analyst", "outbound-strategist"],
  "reduce-costs": ["devops-automator", "ai-engineer", "software-architect"],
  "improve-cx": ["support-responder", "brand-guardian", "content-creator"],
  "launch-product": ["rapid-prototyper", "frontend-developer", "software-architect"],
  "scale-team": ["project-shepherd", "devops-automator"],
  "enter-market": ["growth-hacker", "seo-specialist", "content-creator"],
};

/** Task templates keyed by system → agent */
const TASK_TEMPLATES: Record<string, Record<string, string>> = {
  "support-engine": {
    "support-responder": "Design customer communication flows and FAQ library",
    "rapid-prototyper": "Build AI support chatbot MVP",
    "ai-engineer": "Implement RAG pipeline for knowledge base",
  },
  "growth-engine": {
    "growth-hacker": "Design primary conversion funnel",
    "pipeline-analyst": "Score existing leads and prioritize follow-ups",
    "seo-specialist": "Audit search visibility and organic traffic gaps",
  },
  "content-engine": {
    "content-creator": "Plan first month content calendar",
    "seo-specialist": "Identify long-tail keywords competitors miss",
    "brand-guardian": "Audit brand voice and create AI style guidelines",
  },
  "sales-automation": {
    "outbound-strategist": "Design automated lead nurture sequences",
    "deal-strategist": "Optimize listing-to-close conversion",
    "pipeline-analyst": "Analyze pipeline health and conversion rates",
  },
  "operations-autopilot": {
    "software-architect": "Map existing systems and design integration architecture",
    "devops-automator": "Set up CI/CD pipeline and monitoring",
    "backend-architect": "Design API layer for system integration",
  },
};

/* ════════════════════════════════════════════════════════════════════
   PUBLIC API
   ════════════════════════════════════════════════════════════════════ */

/**
 * Get agent metadata by slug.
 */
export function getAgentMeta(slug: string): AgentMeta | null {
  return AGENT_REGISTRY.find((a) => a.slug === slug) || null;
}

/**
 * Get all agent metadata.
 */
export function getAllAgentMeta(): AgentMeta[] {
  return [...AGENT_REGISTRY];
}

/**
 * Extract a prompt-ready excerpt for a specific agent.
 * Formats capabilities, rules, and mission into a structured text block
 * that can be injected into the middle of a compiled prompt.
 */
export function extractExcerpt(
  slug: string,
  sections?: ("capabilities" | "rules" | "mission")[]
): AgentExcerpt | null {
  const agent = getAgentMeta(slug);
  if (!agent) return null;

  const include = sections || ["capabilities", "rules", "mission"];

  const parts: string[] = [];
  if (include.includes("capabilities")) {
    parts.push(
      "CAPABILITIES:\n" + agent.capabilities.map((c) => `- ${c}`).join("\n")
    );
  }
  if (include.includes("rules")) {
    parts.push("RULES:\n" + agent.rules.map((r) => `- ${r}`).join("\n"));
  }
  if (include.includes("mission")) {
    parts.push(
      "MISSION:\n" + agent.mission.map((m) => `- ${m}`).join("\n")
    );
  }

  return {
    slug: agent.slug,
    name: agent.name,
    division: agent.division,
    role: agent.role,
    capabilities: parts.join("\n\n"),
    rules: agent.rules.join("; "),
    mission: agent.mission.join("; "),
  };
}

/**
 * Select the best agents for a given route and client context.
 * Returns 4-8 matched agents with fit scores and first tasks.
 *
 * Scoring:
 *   - System match: +25 per matching system
 *   - Industry match: +15
 *   - Goal match: +10
 *   - Always-include agents get baseline score of 60
 *   - Industry extras get +12 bonus
 */
export function selectAgents(
  context: ClientContext
): AgentMatch[] {
  const scores = new Map<string, number>();
  const reasons = new Map<string, string>();
  const tasks = new Map<string, string>();

  // 1. Score from selected systems
  if (context.systemIds) {
    for (const systemId of context.systemIds) {
      const agentSlugs = SYSTEM_AGENT_MAP[systemId] || [];
      for (const slug of agentSlugs) {
        scores.set(slug, (scores.get(slug) || 0) + 25);
        reasons.set(slug, `Specialist for ${systemId.replace(/-/g, " ")}`);
        // Set task from template
        const systemTasks = TASK_TEMPLATES[systemId];
        if (systemTasks?.[slug]) {
          tasks.set(slug, systemTasks[slug]);
        }
      }
    }
  }

  // 2. Industry match bonus
  const industryKey = context.industry?.toLowerCase().replace(/\s+/g, "-") || "";
  const industryExtras = INDUSTRY_EXTRAS[industryKey] || [];
  for (const slug of industryExtras) {
    scores.set(slug, (scores.get(slug) || 0) + 12);
    if (!reasons.has(slug)) {
      reasons.set(slug, `Industry specialist for ${context.industry}`);
    }
  }

  // Industry match from agent registry
  for (const agent of AGENT_REGISTRY) {
    const industryMatch = agent.industries.some(
      (i) =>
        i.toLowerCase() === industryKey ||
        i.toLowerCase() === "all" ||
        industryKey.includes(i.toLowerCase())
    );
    if (industryMatch) {
      scores.set(agent.slug, (scores.get(agent.slug) || 0) + 15);
    }
  }

  // 3. Goal match bonus
  if (context.goals) {
    for (const goal of context.goals) {
      const goalKey = goal.toLowerCase().replace(/\s+/g, "-");
      const goalAgents = GOAL_AGENT_MAP[goalKey] || [];
      for (const slug of goalAgents) {
        scores.set(slug, (scores.get(slug) || 0) + 10);
        if (!reasons.has(slug)) {
          reasons.set(slug, `Aligned with your goal: ${goal}`);
        }
      }
      // Also check agent goals
      for (const agent of AGENT_REGISTRY) {
        if (
          agent.goals.some(
            (g) =>
              g.toLowerCase().includes(goalKey) ||
              goalKey.includes(g.toLowerCase())
          )
        ) {
          scores.set(agent.slug, (scores.get(agent.slug) || 0) + 8);
        }
      }
    }
  }

  // 4. Always-include agents get baseline
  for (const slug of ALWAYS_INCLUDE) {
    if (!scores.has(slug)) {
      scores.set(slug, 60);
      reasons.set(
        slug,
        slug === "project-shepherd"
          ? "Manages your implementation roadmap"
          : "Validates all recommendations before delivery"
      );
    }
  }

  // 5. Build sorted matches
  const matches: AgentMatch[] = [];
  for (const [slug, score] of scores.entries()) {
    const agent = getAgentMeta(slug);
    if (!agent) continue;

    // Normalize score to 0-100
    const maxPossible = 100;
    const normalized = Math.min(Math.round((score / maxPossible) * 100), 99);

    // Default task
    const task =
      tasks.get(slug) ||
      getDefaultTask(slug, context.industry) ||
      `${agent.role} for your project`;

    matches.push({
      slug: agent.slug,
      name: agent.name,
      emoji: agent.emoji,
      division: agent.division,
      role: agent.role,
      fitScore: Math.max(normalized, 30), // Floor at 30%
      reason: reasons.get(slug) || `${agent.division} specialist`,
      firstTask: task,
    });
  }

  // Sort by fitScore descending, take top 8
  matches.sort((a, b) => b.fitScore - a.fitScore);
  return matches.slice(0, 8);
}

/**
 * Compile a 4-layer prompt from base instructions, agent excerpt(s),
 * route-specific instructions, and optional JSON schema.
 *
 * Layer order:
 *   1. AMO AI Base (identity, tone)
 *   2. Agent Excerpt (reasoning methodology)
 *   3. Route Instructions (task-specific guidance)
 *   4. JSON Schema (output format — ALWAYS last for LLM priority)
 */
export function compilePrompt(
  baseInstructions: string,
  agentSlugs: string[],
  routeInstructions: string,
  jsonSchema?: string
): CompiledPrompt {
  const parts: string[] = [];

  // Layer 1: Base
  parts.push(baseInstructions);

  // Layer 2: Agent excerpts
  if (agentSlugs.length > 0) {
    parts.push("\n--- SPECIALIST AGENT CONTEXT ---\n");
    for (const slug of agentSlugs) {
      const excerpt = extractExcerpt(slug);
      if (excerpt) {
        parts.push(
          `[${excerpt.name} — ${excerpt.division}]\nROLE: ${excerpt.role}\n\n${excerpt.capabilities}\n`
        );
      }
    }
    parts.push("--- END AGENT CONTEXT ---\n");
  }

  // Layer 3: Route instructions
  parts.push(routeInstructions);

  // Layer 4: JSON schema (must be LAST)
  if (jsonSchema) {
    parts.push(
      "\n--- OUTPUT FORMAT ---\nReturn ONLY valid JSON matching this schema:\n" +
        jsonSchema
    );
  }

  const systemPrompt = parts.join("\n\n");
  const tokenEstimate = Math.round(systemPrompt.length / 4);

  return { systemPrompt, agentSlugs, tokenEstimate };
}

/* ════════════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════════════ */

function getDefaultTask(slug: string, industry?: string): string {
  const templates: Record<string, string> = {
    "software-architect": "Design your system integration architecture",
    "rapid-prototyper": "Build your first working prototype",
    "frontend-developer": "Build your responsive web interface",
    "backend-architect": "Design your API layer and data model",
    "ai-engineer": "Implement AI features with proper guardrails",
    "devops-automator": "Set up your deployment pipeline and monitoring",
    "pipeline-analyst": "Build lead scoring model for your pipeline",
    "outbound-strategist": "Design your automated outreach sequence",
    "deal-strategist": "Analyze your deal conversion bottlenecks",
    "growth-hacker": "Identify your top 3 growth opportunities",
    "content-creator": "Draft your content strategy roadmap",
    "seo-specialist": "Run keyword gap analysis vs competitors",
    "brand-guardian": "Review brand consistency across channels",
    "project-shepherd": "Set up sprint plan and milestones",
    "reality-checker": "Review system specs and validate feasibility",
    "support-responder": "Design your automated response flows",
  };
  let task = templates[slug] || "Analyze and optimize your project";
  if (industry) {
    task = task.replace("your", `your ${industry}`);
  }
  return task;
}