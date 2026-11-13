import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Database,
  Workflow,
  Layout,
  Cloud,
  Sun,
  Shield,
  Box,
  Zap,
  MessageSquare,
  Phone,
  PenLine,
  Code2,
  Monitor,
  Globe,
  Briefcase,
  GitBranch,
  Star,
  Share2,
  CloudUpload,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   C08 — Detailed Technology Stack — Services Page
   ═══════════════════════════════════════════════════════════════

   Design: BCG consulting capability page
   Dark charcoal-emerald background, warm-white individual tech cards
   5 categories with numbered headers and 3-col card grids
   Category-specific hover accent colors
   Stats band at bottom

   ═══════════════════════════════════════════════════════════════ */

interface TechCardData {
  icon: React.ElementType;
  name: string;
  use: string;
  description: string;
}

interface CategoryData {
  number: string;
  title: string;
  accent?: 'teal' | 'blue' | 'warm';
  technologies: TechCardData[];
}

const categories: CategoryData[] = [
  {
    number: '01',
    title: 'AI & Agent Intelligence',
    technologies: [
      {
        icon: Sun,
        name: 'OpenAI ChatGPT',
        use: 'Powers intelligent chatbots, AI copilots, and customer support assistants.',
        description:
          'Multimodal AI that handles text, images, and code in one interface — deployed where speed and broad capability coverage are the priority.',
      },
      {
        icon: Box,
        name: 'Assistants API',
        use: 'Builds autonomous AI agents that perform tasks, retrieve data, and automate workflows.',
        description:
          "OpenAI's stateful agent framework with persistent memory and tool calling — no manual state management required.",
      },
      {
        icon: Shield,
        name: 'Anthropic Claude',
        use: 'Used to build advanced AI applications, coding assistants, and long-document analysis tools.',
        description:
          'Constitutional AI built for reliable reasoning and structured outputs — deployed where nuance and safe agent behavior are non-negotiable.',
      },
      {
        icon: Brain,
        name: 'LlamaIndex',
        use: 'Connects AI systems to company documents, databases, and internal knowledge.',
        description:
          'RAG framework that makes AI answer from your real business data — not generic training — using retrieval-augmented generation pipelines.',
      },
      {
        icon: Star,
        name: 'Google Gemini',
        use: 'Enables multimodal AI applications for search, research, coding, and data analysis.',
        description:
          '1M-token context with native function calling and search grounding — primary intelligence engine for the AMO AI diagnostic wizard and agent platform.',
      },
    ],
  },
  {
    number: '02',
    title: 'Data & Vector Infrastructure',
    accent: 'teal',
    technologies: [
      {
        icon: Database,
        name: 'Supabase + pgvector',
        use: 'Stores company data and enables AI systems to search and understand knowledge bases.',
        description:
          'Postgres backend with vector similarity search, real-time APIs, and Row Level Security — the core data layer for every AMO AI product deployment.',
      },
      {
        icon: Zap,
        name: 'Redis',
        use: 'Accelerates AI applications with ultra-fast caching and real-time data access.',
        description:
          'In-memory data store for managing task queues and keeping real-time agent workflows fast under production load.',
      },
      {
        icon: CloudUpload,
        name: 'Cloudinary',
        use: 'Manages and optimizes images and videos used in AI-powered applications.',
        description:
          'Media CDN with auto-transformation and format optimization — essential for media-intensive e-commerce, fashion, and content platform deployments.',
      },
    ],
  },
  {
    number: '03',
    title: 'Automation & Integration',
    technologies: [
      {
        icon: Share2,
        name: 'n8n',
        use: 'Automates business workflows by connecting AI agents with apps and APIs.',
        description:
          'Self-hosted engine with 400+ native integrations — links AI agents to CRMs, WhatsApp, and databases with full data sovereignty and no per-task pricing.',
      },
      {
        icon: MessageSquare,
        name: 'WhatsApp Business API',
        use: 'Enables AI assistants to communicate with customers directly on WhatsApp.',
        description:
          "Official Meta API for production-scale AI — agent replies, broadcast campaigns, order tracking, and CRM sync on the world's most-used messaging channel.",
      },
      {
        icon: Phone,
        name: 'Twilio',
        use: 'Integrates AI with SMS, voice calls, and messaging platforms.',
        description:
          'Programmable communication APIs for multi-channel AI reach — used when SMS, voice, and email integrations are required beyond WhatsApp.',
      },
      {
        icon: PenLine,
        name: 'Tiptap',
        use: 'Builds AI-powered editors for writing, content generation, and collaboration.',
        description:
          'Headless editor framework for AI-powered proposal generators, content tools, and collaborative writing interfaces embedded in client dashboards.',
      },
    ],
  },
  {
    number: '04',
    title: 'Frontend & Application',
    accent: 'blue',
    technologies: [
      {
        icon: Code2,
        name: 'React',
        use: 'Builds interactive dashboards and AI-powered web applications.',
        description:
          "Component-based framework powering AMO AI's diagnostic wizard, client portals, and agent dashboards — fast rendering, composable architecture.",
      },
      {
        icon: Zap,
        name: 'Next.js',
        use: 'Creates fast, scalable websites and AI platforms.',
        description:
          'Full-stack React framework with server rendering, API routes, and Edge functions — the production standard for public-facing AMO AI products.',
      },
      {
        icon: Layout,
        name: 'TypeScript',
        use: 'Improves reliability when building complex AI software systems.',
        description:
          'Typed superset of JavaScript that enforces data contracts and catches errors before runtime — essential for maintainable AI codebases at scale.',
      },
      {
        icon: Monitor,
        name: 'Tailwind CSS',
        use: 'Designs modern, responsive user interfaces quickly.',
        description:
          'Utility-first CSS framework with design tokens — every AMO AI interface ships with a consistent visual language built for rapid iteration.',
      },
      {
        icon: Zap,
        name: 'Vite',
        use: 'Speeds up development and improves web application performance.',
        description:
          'Next-generation build tooling with sub-second hot reload and optimized production bundles — default development environment for all AMO AI React applications.',
      },
    ],
  },
  {
    number: '05',
    title: 'Deployment & Infrastructure',
    accent: 'warm',
    technologies: [
      {
        icon: Globe,
        name: 'Vercel',
        use: 'Deploys websites and AI applications globally with fast performance.',
        description:
          'Edge-optimized cloud platform with zero-config CI/CD, instant rollbacks, and built-in performance monitoring for React and Next.js applications.',
      },
      {
        icon: Briefcase,
        name: 'Docker',
        use: 'Ensures AI systems run reliably across development and production environments.',
        description:
          'Container runtime that packages AI software identically across every environment — zero drift, predictable deployments, consistent behavior at every stage.',
      },
      {
        icon: GitBranch,
        name: 'GitHub',
        use: 'Manages code, collaboration, and software updates for AI applications.',
        description:
          'Version control platform for managing codebases, reviewing changes, and maintaining full audit trails across every AMO AI product build.',
      },
    ],
  },
];

const stats = [
  { number: '20', suffix: '+', label: 'Production-tested technologies in active deployment' },
  { number: '48', suffix: '+', label: 'Specialized AI agent types deployable from this stack' },
  { number: '4–6', suffix: 'wk', label: 'Median time to full production deployment' },
  { number: '100', suffix: '%', label: 'Client codebase ownership — no vendor lock-in' },
];

/* ── Accent color maps ── */

const accentColors = {
  default: {
    iconBgHover: 'rgba(0,135,90,0.06)',
    iconBorderHover: 'rgba(0,135,90,0.2)',
    iconStrokeHover: '#00875A',
    barGradient: 'linear-gradient(to bottom, #2FA06A, #1A5C3E)',
  },
  teal: {
    iconBgHover: '#E6F4F4',
    iconBorderHover: 'rgba(13,110,110,0.2)',
    iconStrokeHover: '#0D7A78',
    barGradient: 'linear-gradient(to bottom, #0ABFBC, #0D7A78)',
  },
  blue: {
    iconBgHover: '#EBF0FA',
    iconBorderHover: 'rgba(27,79,191,0.2)',
    iconStrokeHover: '#1B4FBF',
    barGradient: 'linear-gradient(to bottom, #5B8EFF, #1B4FBF)',
  },
  warm: {
    iconBgHover: '#F5F0E8',
    iconBorderHover: 'rgba(180,120,40,0.2)',
    iconStrokeHover: '#9A6B20',
    barGradient: 'linear-gradient(to bottom, #D4A03A, #9A6B20)',
  },
};

/* ── Individual Tech Card ── */

function TechCard({
  tech,
  accent = 'default',
  index,
}: {
  tech: TechCardData;
  accent?: 'default' | 'teal' | 'blue' | 'warm';
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const colors = accentColors[accent];
  const IconComp = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-default relative overflow-hidden"
      style={{
        background: hovered ? '#FFFFFF' : '#FAFAF8',
        borderRadius: '12px',
        padding: '26px 24px 24px',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.14), 0 3px 10px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '3px',
          background: colors.barGradient,
          borderRadius: '12px 0 0 12px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0.4)',
          transition: 'opacity 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Icon */}
      <div
        className="w-[38px] h-[38px] rounded-[9px] flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: hovered ? colors.iconBgHover : '#F0EDE6',
          border: `1px solid ${hovered ? colors.iconBorderHover : '#EDEBE5'}`,
        }}
      >
        <IconComp
          size={17}
          strokeWidth={1.5}
          className="transition-colors duration-300"
          style={{ color: hovered ? colors.iconStrokeHover : '#726F66' }}
        />
      </div>

      {/* Name */}
      <h4
        style={{
          color: '#18170F',
          fontSize: '13.5px',
          fontWeight: 600,
          letterSpacing: '0.01em',
          marginBottom: '9px',
          lineHeight: 1.25,
        }}
      >
        {tech.name}
      </h4>

      {/* Use line */}
      <p
        style={{
          color: '#2E2D25',
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: '0.005em',
          marginBottom: '8px',
        }}
      >
        {tech.use}
      </p>

      {/* Description */}
      <p
        style={{
          color: '#A8A59C',
          fontSize: '12px',
          fontWeight: 300,
          lineHeight: 1.6,
          letterSpacing: '0.01em',
          borderTop: '1px solid #EDEBE5',
          paddingTop: '8px',
          marginTop: '2px',
        }}
      >
        {tech.description}
      </p>
    </motion.div>
  );
}

/* ── Main Export ── */

export default function ServicesTechStackDetailed() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(170deg, #0F1612 0%, #141E18 40%, #0F1612 100%)',
        paddingTop: '88px',
        paddingBottom: '100px',
      }}
    >
      {/* ── Dot texture ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── Top emerald glow ── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-0"
        style={{
          height: '320px',
          background:
            'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(26,92,62,0.18) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-[72px]"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-[1.5px]" style={{ background: '#2FA06A' }} />
            <span
              style={{
                fontSize: '10.5px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#2FA06A',
              }}
            >
              AMO AI · Technology Stack
            </span>
            <div className="w-8 h-[1.5px]" style={{ background: '#2FA06A' }} />
          </div>

          <h2
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.022em',
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '16px',
            }}
          >
            Built on the right tools.
            <br />
            <em style={{ fontStyle: 'italic', color: '#2FA06A' }}>
              Deployed with precision.
            </em>
          </h2>

          <p
            className="max-w-[520px] mx-auto"
            style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.42)',
            }}
          >
            Every technology is chosen for a specific reason — performance,
            scalability, and fit for AI-native products. No vendor lock-in. No
            generic toolchains.
          </p>
        </motion.div>

        {/* ── Category Blocks ── */}
        <div className="space-y-14">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: 0.05 + catIdx * 0.07,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-white/[0.07]">
                <span
                  style={{
                    fontFamily: "Georgia, 'Playfair Display', serif",
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.05em',
                    width: '24px',
                    flexShrink: 0,
                  }}
                >
                  {cat.number}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {cat.title}
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.2)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {cat.technologies.length} technologies
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                {cat.technologies.map((tech, i) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    accent={cat.accent || 'default'}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Band ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 xl:grid-cols-4 overflow-hidden"
          style={{
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.06)',
            gap: '1px',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 transition-colors duration-200 hover:bg-white/[0.06]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '24px 28px',
              }}
            >
              <div style={{ lineHeight: 1 }}>
                <span
                  style={{
                    fontFamily: "Georgia, 'Playfair Display', serif",
                    fontSize: '34px',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontFamily: "Georgia, 'Playfair Display', serif",
                    fontSize: '34px',
                    fontWeight: 400,
                    color: '#2FA06A',
                  }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p
                style={{
                  fontSize: '11.5px',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.3)',
                  lineHeight: 1.4,
                  letterSpacing: '0.01em',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
