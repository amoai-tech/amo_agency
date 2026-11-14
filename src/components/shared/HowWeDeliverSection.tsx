// C09 — How We Deliver Section (4-Phase)
// BCG design system: warm off-white, charcoal text, Georgia serif, green accents
// 4px border radius, no gradients, thin borders

import { Link } from 'react-router';
import { Search, Layers, Code, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DeliveryPhase {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  duration: string;
}

const deliveryPhases: DeliveryPhase[] = [
  {
    icon: <Search className="w-5 h-5" />,
    eyebrow: 'Phase 1',
    title: 'Discover & Architect',
    description: 'We map your workflows, data, and bottlenecks — then define the fastest path to ROI.',
    bullets: ['Lead flow → scoring rules', 'Knowledge base → retrieval plan', 'Integrations → API map'],
    duration: 'Phase 1',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    eyebrow: 'Phase 2',
    title: 'Design Sprint',
    description: 'We turn scope into screens and system logic — UX, flows, and technical architecture.',
    bullets: ['UX flows + wireframes', 'Data model + permissions', 'Implementation plan'],
    duration: 'Phase 2',
  },
  {
    icon: <Code className="w-5 h-5" />,
    eyebrow: 'Phase 3',
    title: 'Build & Integrate',
    description: 'Production builds in weekly sprints — agents, chatbots, automations, and integrations.',
    bullets: ['RAG + tool actions', 'CRM + WhatsApp sync', 'Admin + analytics'],
    duration: 'Phase 3',
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    eyebrow: 'Phase 4',
    title: 'Launch & Optimize',
    description: 'Deploy, train your team, monitor quality, and improve performance with real usage data.',
    bullets: ['QA + launch checklist', 'Monitoring + handoff', 'Continuous improvements'],
    duration: 'Phase 4 + Ongoing',
  },
];

export default function HowWeDeliverSection() {
  return (
    <section className="border-t" style={{ backgroundColor: '#F5F5F0', borderColor: '#E8E8E4' }}>
      <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: '#00875A', letterSpacing: '0.08em' }}
          >
            Our Process
          </p>
          <h2
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontWeight: 400 }}
          >
            How We Deliver
          </h2>
          <div className="w-16 h-0.5 mx-auto mb-4" style={{ backgroundColor: '#00875A' }} />
          <p className="text-base mb-1" style={{ color: '#1A1A1A' }}>
            Strategy. Systems. Speed.
          </p>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#6B6B63' }}>
            A focused process with review points adapted to the project.
          </p>
        </div>

        {/* Mini Timeline */}
        <MiniTimeline />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {deliveryPhases.map((phase, idx) => (
            <PhaseCard key={idx} phase={phase} delay={idx * 0.1} />
          ))}
        </div>

        {/* Section CTA */}
        <div className="text-center">
          <Link
            to="/process"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: '#00875A' }}
          >
            Explore Our Process
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MiniTimeline() {
  const weekLabels = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

  return (
    <div className="relative mb-14 px-8 hidden md:block">
      {/* Horizontal Line */}
      <div
        className="absolute top-[18px] left-[8%] right-[8%] h-px"
        style={{ backgroundColor: '#E8E8E4' }}
      />

      {/* Dots */}
      <div className="relative flex justify-between items-center">
        {weekLabels.map((label, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <span className="text-xs" style={{ color: '#6B6B63' }}>
              {label}
            </span>
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: '#00875A',
                boxShadow: '0 0 0 3px #F5F5F0',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PhaseCard({ phase, delay }: { phase: DeliveryPhase; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="border rounded p-6 flex flex-col transition-all hover:shadow-sm"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E8E8E4',
        borderRadius: '4px',
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded flex items-center justify-center mb-4"
        style={{ backgroundColor: '#E6F4ED', color: '#00875A', borderRadius: '4px' }}
      >
        {phase.icon}
      </div>

      {/* Eyebrow */}
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: '#00875A', letterSpacing: '0.08em' }}
      >
        {phase.eyebrow}
      </p>

      {/* Title */}
      <h3 className="text-lg mb-2" style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}>
        {phase.title}
      </h3>

      {/* Description */}
      <p className="text-sm mb-4" style={{ color: '#6B6B63', lineHeight: 1.6 }}>
        {phase.description}
      </p>

      {/* Bullets */}
      <ul className="space-y-1.5 mb-5">
        {phase.bullets.map((bullet, idx) => (
          <li key={idx} className="text-xs flex items-center gap-1.5" style={{ color: '#6B6B63' }}>
            <span style={{ color: '#00875A' }}>&#8226;</span> {bullet}
          </li>
        ))}
      </ul>

      {/* Duration */}
      <div className="mt-auto pt-4 border-t" style={{ borderColor: '#F0F0EC' }}>
        <p className="text-xs tracking-widest uppercase mb-1" style={{ color: '#9CA39B', letterSpacing: '0.08em' }}>
          Duration
        </p>
        <p className="text-sm" style={{ color: '#00875A' }}>
          {phase.duration}
        </p>
      </div>
    </motion.div>
  );
}
