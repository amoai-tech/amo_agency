import { Link } from 'react-router';
import { ArrowRight, Sparkles, Bot, Workflow, BrainCircuit, BarChart3, Settings, Layers, Lightbulb, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import HowWeDeliverSection from './shared/HowWeDeliverSection';
import VelocityProcessSection from './home/VelocityProcessSection';
import TechStackSection from './home/TechStackSection';
import AIAgentSystemsSection from './home/AIAgentSystemsSection';

/* ═══════════════════════════════════════════════════════════════
   Sun AI Agency — HomePageV3 (BCG Consulting Design System)
   ═══════════════════════════════════════════════════════════════
   
   Design Language: BCG / McKinsey / Bain consulting editorial
   
   Color Palette:
   - Background:    #F5F5F0 (warm off-white)
   - Surface:       #FFFFFF (clean white)
   - Text Primary:  #1A1A1A (near-black charcoal)
   - Text Secondary: #666666 (muted gray)
   - Text Tertiary:  #999999 (light gray captions)
   - Accent Green:  #00875A (BCG signature green)
   - Dark Section:  #1A1A1A (charcoal, NOT dark green)
   - Border:        #E8E8E4 (subtle warm gray)
   - Sage Surface:  #EDEEEA (very light warm gray)
   
   Typography:
   - Headlines: Georgia serif, editorial weight
   - Body: system sans-serif, high readability
   - Captions: small uppercase tracking
   
   ═══════════════════════════════════════════════════════════════ */

const HERO_IMG =
  '/images/projects/mdeai-public-home.webp';

const STORY_IMG =
  'https://images.unsplash.com/photo-1765371513765-d2b624850162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYm9va3NoZWxmJTIwbW9kZXJuJTIbWludGVyaW9uJTIwZGVzaWduJTIwYXJ0JTIwbmF0dXJhbCUyMGxpZ2h0fGVufDF8fHx8MTc3MjAxMzc5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

/* ── BCG Design Tokens ── */

const cx = {
  bg: '#F5F5F0',
  bgWhite: '#FFFFFF',
  surface: '#EDEEEA',
  deepGreen: '#1A1A1A',
  sage: '#EDEEEA',
  accent: '#00875A',
  dark: '#1A1A1A',
  muted: '#666666',
  caption: '#999999',
  border: '#E8E8E4',
};

function SectionWrap({
  children,
  bg = cx.bg,
  className = '',
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} style={{ background: bg }} className={className}>
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

function BtnPrimary({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-white transition-all duration-300 hover:opacity-90"
      style={{ background: cx.dark, fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.02em' }}
    >
      {children}
    </Link>
  );
}

function BtnOutline({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none transition-all duration-300 hover:bg-black/5"
      style={{ border: `1px solid ${cx.border}`, fontSize: '0.875rem', fontWeight: 500, color: cx.dark }}
    >
      {children}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1 — HERO
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  return (
    <SectionWrap>
      <div className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Editorial eyebrow */}
        <p
          className="uppercase tracking-[0.2em] mb-8"
          style={{ fontSize: '0.7rem', fontWeight: 600, color: cx.accent }}
        >
          AI Consulting & Development
        </p>

        {/* Large editorial headline — BCG style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1
              className="tracking-tight mb-8"
              style={{
                fontFamily: "Georgia, 'Playfair Display', serif",
                fontSize: 'clamp(2.75rem, 5.5vw, 4.25rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: cx.dark,
                letterSpacing: '-0.02em',
              }}
            >
              AI Solutions That Work for Your Business
            </h1>
            <p
              className="max-w-xl mb-10"
              style={{ fontSize: '1.1rem', lineHeight: 1.75, color: cx.muted }}
            >
              We build AI assistants, connected workflows, and custom software
              around the needs of your business.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <BtnPrimary to="/services">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </BtnPrimary>
              <BtnOutline to="/projects">View Our Work</BtnOutline>
            </div>
          </div>

          {/* Right — editorial image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '4/3' }}>
              <ImageWithFallback
                src={HERO_IMG}
                alt="MDE AI public product homepage showing its Medellín concierge interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Thin rule divider — BCG signature */}
        <div className="mt-20" style={{ height: '1px', background: cx.border }} />
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2 — AI CAPABILITIES
   ════════════════════════════════════════════════════════════ */

const CAPABILITIES = [
  {
    title: 'AI Strategy & Architecture',
    desc: 'We audit your workflows and data to design a custom AI roadmap — from LLM selection to deployment infrastructure.',
    Icon: BrainCircuit,
  },
  {
    title: 'Generative AI Products',
    desc: 'Production-grade chatbots, content engines, and RAG systems built on enterprise-ready architecture.',
    Icon: Sparkles,
  },
  {
    title: 'Autonomous AI Agents',
    desc: 'Multi-step agents that handle sales, support, and operations — integrated with your CRM and workflows.',
    Icon: Bot,
  },
];

function CapabilitiesSection() {
  return (
    <SectionWrap id="capabilities" bg={cx.bgWhite}>
      <div className="py-24 sm:py-32">
        {/* Header — BCG editorial left-aligned */}
        <div className="mb-16 max-w-2xl">
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 600, color: cx.accent }}
          >
            Our Capabilities
          </p>
          <h2
            className="tracking-tight mb-4"
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: cx.dark,
            }}
          >
            AI Solutions and Capabilities
          </h2>
          <p style={{ fontSize: '1rem', color: cx.muted, lineHeight: 1.7 }}>
            Strategic design. Intelligent automation. Production-ready systems.
          </p>
        </div>

        {/* Cards — BCG minimal with left green border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: cx.border }}>
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="p-8 transition-all duration-300 group"
              style={{ background: cx.bgWhite, borderTop: `3px solid ${cx.accent}`, borderBottom: 'none', borderLeft: 'none', borderRight: 'none' }}
            >
              <cap.Icon className="w-6 h-6 mb-6" style={{ color: cx.accent }} strokeWidth={1.5} />
              <h3
                className="mb-3"
                style={{ fontSize: '1.125rem', fontWeight: 600, color: cx.dark }}
              >
                {cap.title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: cx.muted }}>
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3 — CREDIBILITY BAND
   ══════════════════════════════════════════════════════════════ */

function CredibilityBand() {
  return (
    <section style={{ background: cx.bg }} className="py-20 sm:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 border-y py-12" style={{ borderColor: cx.border }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-[0.2em] mb-3" style={{ fontSize: '0.7rem', fontWeight: 600, color: cx.accent }}>How We Work</p>
            <h2 className="tracking-tight" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: cx.dark }}>
              AI solutions scoped around real work.
            </h2>
          </div>
          <p style={{ color: cx.muted, lineHeight: 1.75 }}>
            We start with your workflows, identify practical opportunities,
            and build technology you can evaluate with your team.
            Timelines and results depend on the project.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4 — STORY SECTION
   ═══════════════════════════════════════════════════════════════ */

function StorySection() {
  return (
    <SectionWrap bg={cx.bgWhite}>
      <div className="py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left — image */}
        <div className="lg:col-span-5 overflow-hidden" style={{ borderRadius: '4px', aspectRatio: '4/3' }}>
          <ImageWithFallback
            src={STORY_IMG}
            alt="Modern workspace"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right — text */}
        <div className="lg:col-span-7 max-w-lg">
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 600, color: cx.accent }}
          >
            Our Approach
          </p>
          <h2
            className="tracking-tight mb-6"
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: cx.dark,
            }}
          >
            AI systems built for long-term performance.
          </h2>
          <p
            className="mb-8"
            style={{ fontSize: '0.95rem', lineHeight: 1.8, color: cx.muted }}
          >
            We combine product design, AI architecture, and operational
            automation to build intelligent systems that scale. Every engagement
            starts with understanding your business — not selling a template.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 transition-colors duration-300 hover:opacity-70"
            style={{ fontSize: '0.875rem', fontWeight: 500, color: cx.accent }}
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5 — SPECIALIZED SERVICES SECTION (Spruced-style 3-card)
   ═══════════════════════════════════════════════════════════════ */

const SPECIALIZED_SERVICES = [
  {
    title: 'AI Product Development',
    desc: 'Get strategy-aligned AI products from concept to launch — MVPs, SaaS tools, and internal platforms built to scale.',
    image:
      'https://images.unsplash.com/photo-1764258057610-be7ca21a0978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzcyMDE0ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.35) 100%)',
    to: '/solutions',
  },
  {
    title: 'Automation Design',
    desc: 'Get on-brand workflow automation designed to enhance your operations, customer experience, and revenue pipelines.',
    image:
      'https://images.unsplash.com/photo-1761063198799-9d2a44cca2da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG9yYW5nZSUyMGdyYWRpZW50JTIwY3JlYXRpdmUlMjBkZXNpZ258ZW58MXx8fHwxNzcyMDE0ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.25) 100%)',
    to: '/solutions',
  },
  {
    title: 'AI Agent Systems',
    desc: 'Push your operational boundaries into a new dimension with autonomous AI agents that handle complex multi-step tasks.',
    image:
      'https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsYXB0b3AlMjB3b3Jrc3BhY2UlMjBwbGFudHMlMjBtaW5pbWFsJTIwbGlnaHR8ZW58MXx8fHwxNzcyMDE0ODM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 100%)',
    to: '/agents',
  },
];

function SpecializedServicesSection() {
  return (
    <section style={{ background: '#1A1A1A' }} className="py-24 sm:py-32">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        {/* Heading — BCG editorial */}
        <div className="mb-14 max-w-2xl">
          <p
            className="uppercase tracking-[0.2em] mb-4 text-white/40"
            style={{ fontSize: '0.7rem', fontWeight: 600 }}
          >
            Featured Services
          </p>
          <h2
            className="text-white tracking-tight"
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Specialized Production Services
          </h2>
        </div>

        {/* 3-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SPECIALIZED_SERVICES.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden cursor-pointer"
              style={{ aspectRatio: '3 / 3.2', borderRadius: '4px' }}
            >
              {/* Background image */}
              <ImageWithFallback
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: service.overlay }}
              />

              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7">
                {/* Top — title + description */}
                <div>
                  <h3
                    className="text-white mb-2.5"
                    style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.25 }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-white/65 max-w-[280px]"
                    style={{ fontSize: '0.8rem', lineHeight: 1.55 }}
                  >
                    {service.desc}
                  </p>
                </div>

                {/* Bottom — learn more */}
                <Link
                  to={service.to}
                  className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-300"
                  style={{ fontSize: '0.8rem', fontWeight: 500 }}
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6 — SERVICES GRID (BCG-inspired minimal image cards)
   ═══════════════════════════════════════════════════════════════ */

const SERVICE_CARDS = [
  {
    title: 'AI Agent Systems',
    desc: 'Autonomous digital workers that handle leads, onboard customers, and manage operations.',
    extended: 'Imagine a teammate that works tirelessly, learns continuously, and adapts to your needs. That\'s the promise of AI agents. With the ability to observe, plan, and act autonomously, AI agents open a new chapter of end-to-end transformation across industries — from lead qualification and customer onboarding to operational task management and intelligent escalation workflows.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772414130/ai21_i0ctwm.jpg',
    to: '/ai-agents',
  },
  {
    title: 'AI Chatbots',
    desc: 'Production-grade chatbots with RAG, CRM sync, and workflow execution.',
    extended: 'Go beyond basic Q&A with intelligent chatbots that retrieve real-time data from your knowledge base, sync seamlessly with your CRM, and execute multi-step workflows. Built on RAG architecture with enterprise-grade reliability, our chatbots handle complex conversations while maintaining context across sessions.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772720465/mobile12_l2n2xa.webp',
    to: '/chatbots',
  },
  {
    title: 'WhatsApp AI Automation',
    desc: 'Turn WhatsApp into a sales and support channel with AI agents and CRM sync.',
    extended: 'Transform WhatsApp from a simple messaging app into a powerful revenue engine. Our AI-powered automation handles lead capture, appointment booking, product recommendations, and customer support — all within the WhatsApp interface your customers already use. Fully integrated with your CRM and payment systems.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1773097147/whatsapp-1_oqovpm.jpg',
    to: '/whatsapp-ai',
  },
  {
    title: 'AI Sales & Marketing CRM',
    desc: 'AI-powered lead capture, scoring, automated outreach, and proposal generation.',
    extended: 'Supercharge your sales pipeline with AI that captures leads from every channel, scores them intelligently, and triggers personalized outreach sequences. From automated proposal generation to predictive deal forecasting, our CRM solutions turn your sales team into a precision revenue machine.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772723165/crmai6_gb0llk.png',
    to: '/sales-crm',
  },
  {
    title: 'AI MVP Development',
    desc: 'Plan, prototype, and validate an AI product around a clearly defined use case.',
    extended: 'Move from concept to a fully functional AI product in record time. Our rapid MVP process combines strategic scoping, AI architecture design, and agile development to deliver a production-ready minimum viable product — complete with user testing, deployment infrastructure, and a clear roadmap for scale.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772725302/mvp-01_qxz7fv.png',
    to: '/mvp-v2',
  },
  {
    title: 'Custom AI Development',
    desc: 'RAG systems, personalization engines, predictive analytics, decision dashboards.',
    extended: 'Get bespoke AI solutions engineered for your exact business requirements. From retrieval-augmented generation systems and recommendation engines to predictive analytics platforms and executive decision dashboards — we build the intelligent infrastructure that gives you a competitive edge.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772367392/screens16_b9nxog.jpg',
    to: '/services',
  },
  {
    title: 'AI Automations',
    desc: 'Industry-specific AI-powered workflows that automate repetitive business processes, connect your tools, and run operations automatically.',
    extended: 'AI solutions designed to automate operations, customer communication, and workflows across Healthcare, Real Estate, Automotive, Tourism, and E-commerce.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1773099619/automation_coppbc.jpg',
    to: '/industries',
  },
  {
    title: 'AI-Powered Web Development',
    desc: 'Responsive websites with accessible design, clear copy, and useful AI integrations.',
    extended: 'Build responsive websites with clear content, helpful AI features, and measured performance. We test accessibility, speed, and usability against the agreed project requirements.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772367392/screens9_uyjzie.jpg',
    to: '/web-apps',
  },
  {
    title: 'E-commerce AI',
    desc: 'Product recommendations, cart recovery, checkout optimization, and personalized flows.',
    extended: 'Unlock the full revenue potential of your online store with AI that understands your customers. From intelligent product recommendations and abandoned cart recovery to checkout optimization and hyper-personalized shopping flows — our e-commerce AI solutions drive measurable increases in conversion and average order value.',
    image: 'https://res.cloudinary.com/ddysyn5rr/image/upload/v1772725771/ecommerceai-001_juurhy.jpg',
    to: '/industries/e-commerce',
  },
];

function ServicesGrid() {
  return (
    <section style={{ background: cx.bg }}>
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        {/* Section header — BCG editorial left-aligned */}
        <div className="mb-12 max-w-2xl">
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontSize: '0.7rem', fontWeight: 600, color: cx.accent }}
          >
            Our Solutions for AI in Business
          </p>
          <h2
            className="tracking-tight mb-4"
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: cx.dark,
            }}
          >
            Our Services in Digital, Technology, and Data
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: cx.muted }}>
            Strategic execution across AI, data, and digital transformation.
          </p>
        </div>

        {/* 3-column image card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group cursor-pointer overflow-hidden transition-all duration-[250ms]"
              style={{
                background: '#FFFFFF',
                border: `1px solid ${cx.border}`,
                borderRadius: '4px',
                position: 'relative',
              }}
            >
              {/* Default state: image + short info */}
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                {/* Image area */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <ImageWithFallback
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                  {'badge' in card && card.badge && (
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1"
                      style={{
                        background: cx.accent,
                        color: '#FFFFFF',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                        {card.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content area */}
                <div style={{ padding: '24px' }}>
                  <h3
                    style={{
                      fontFamily: "Georgia, 'Playfair Display', serif",
                      fontSize: '1.15rem',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color: cx.dark,
                      marginBottom: '8px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.825rem',
                      lineHeight: 1.6,
                      color: cx.muted,
                      marginBottom: '16px',
                    }}
                  >
                    {card.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{ fontSize: '0.8rem', fontWeight: 500, color: cx.accent }}
                  >
                    Read More
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Hover state: expanded info overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-between translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  background: cx.bg,
                  padding: '28px 24px',
                }}
              >
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <h3
                    style={{
                      fontFamily: "Georgia, 'Playfair Display', serif",
                      fontSize: '1.15rem',
                      fontWeight: 400,
                      lineHeight: 1.3,
                      color: cx.dark,
                      marginBottom: '14px',
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      lineHeight: 1.65,
                      color: cx.muted,
                    }}
                  >
                    {card.extended}
                  </p>
                </div>

                <Link
                  to={card.to}
                  className="inline-flex items-center gap-2 px-5 py-2.5 self-start translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-85"
                  style={{
                    background: cx.dark,
                    color: '#FFFFFF',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase' as const,
                    marginTop: '20px',
                  }}
                >
                  LEARN MORE
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7 — PROCESS VISUALIZATION
   ═══════════════════════════════════════════════════════════════ */

const PROCESS_STEPS = ['Discover', 'Design', 'Build', 'Deploy', 'Optimize'];

function ProcessSection() {
  return (
    <SectionWrap bg={cx.bgWhite}>
      <div className="py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <div className="max-w-md">
          <h2
            className="tracking-tight mb-5"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              color: cx.dark,
            }}
          >
            A proven process for enterprise AI transformation.
          </h2>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: cx.muted }}>
            Every project follows a rigorous, repeatable framework — ensuring
            quality, speed, and measurable outcomes.
          </p>
        </div>

        {/* Right — progress bars */}
        <div className="space-y-5">
          {PROCESS_STEPS.map((step, i) => {
            const pct = 40 + i * 15; // visual progress width
            return (
              <div key={step}>
                <div className="flex justify-between mb-2">
                  <span
                    style={{ fontSize: '0.825rem', fontWeight: 500, color: cx.dark }}
                  >
                    {String(i + 1).padStart(2, '0')}. {step}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: cx.sage }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      background: i === PROCESS_STEPS.length - 1 ? cx.accent : cx.deepGreen,
                      opacity: 0.7 + i * 0.06,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrap>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8 — PLAYBOOK / RESOURCES
   ═══════════════════════════════════════════════════════════════ */

// ... remove this code ...

/* ═══════════════════════════════════════════════════════════════
   9 — TESTIMONIAL
   ═══════════════════════════════════════════════════════════════ */

// ... remove this code ...

/* ═══════════════════════════════════════════════════════════════
   10 — METRICS BAND
   ═══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   11 — FINAL CTA
   ═══════════════════════════════════════════════════════════════ */

function FinalCTA() {
  return (
    <section style={{ background: cx.dark }} className="py-24 sm:py-32">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 text-center">
        <p
          className="uppercase tracking-[0.2em] mb-6 text-white/40"
          style={{ fontSize: '0.7rem', fontWeight: 600 }}
        >
          Get Started
        </p>
        <h2
          className="text-white tracking-tight mb-6"
          style={{
            fontFamily: "Georgia, 'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          Ready to build a real AI system?
        </h2>
        <p
          className="text-white/50 max-w-lg mx-auto mb-10"
          style={{ fontSize: '1rem', lineHeight: 1.7 }}
        >
          Explore our services and examples to see what might fit your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[#1A1A1A] transition-all duration-300 hover:opacity-90"
            style={{ background: '#FFFFFF', fontSize: '0.875rem', fontWeight: 500 }}
          >
            Explore Services
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white/70 hover:text-white transition-all duration-300"
            style={{ border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.875rem', fontWeight: 500 }}
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   12 — FOOTER (in-page variant to maintain V3 palette)
   ═══════════════════════════════════════════════════════════════ */

/* We reuse the global Layout footer, so nothing extra needed here. */

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════ */

export default function HomePageV3() {
  return (
    <div>
      <HeroSection />
      <ServicesGrid />
      <VelocityProcessSection />
      <TechStackSection />
      <AIAgentSystemsSection />
      <CapabilitiesSection />
      <CredibilityBand />
      <StorySection />
      <SpecializedServicesSection />
      <HowWeDeliverSection />
      <FinalCTA />
    </div>
  );
}