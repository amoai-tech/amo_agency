// C08 — Velocity Process Section
// BCG design system: warm off-white, charcoal text, Georgia serif, green accents
// 4px border radius, no gradients, no glassmorphism

import { motion } from 'motion/react';
import { Compass, Zap, Link2, Rocket, ArrowRight } from 'lucide-react';

const phases = [
  {
    weeks: 'Phase 1',
    title: 'Strategy & Design',
    desc: 'AI opportunity audit, roadmap prioritization, and system architecture.',
    icon: Compass,
  },
  {
    weeks: 'Phase 2',
    title: 'System Architecture',
    desc: 'UX flows, AI behavior design, and technical blueprint.',
    icon: Zap,
  },
  {
    weeks: 'Phase 3',
    title: 'Build & Integrate',
    desc: 'Production AI development with weekly sprint releases.',
    icon: Link2,
  },
  {
    weeks: 'Phase 4',
    title: 'Launch & Optimize',
    desc: 'Deployment, team enablement, and continuous improvement.',
    icon: Rocket,
  },
];

export default function VelocityProcessSection() {
  return (
    <section className="border-t border-b" style={{ backgroundColor: '#F5F5F0', borderColor: '#E8E8E4' }}>
      <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: '#00875A', letterSpacing: '0.08em' }}
          >
            The Sun AI Velocity System
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A', fontWeight: 400, lineHeight: 1.15 }}
          >
            Build AI with <span style={{ color: '#00875A' }}>a Clear Plan</span>.
            <br className="hidden md:block" />
            From Idea to Useful Software.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base"
            style={{ color: '#6B6B63', lineHeight: 1.7 }}
          >
            A phased approach to discovery, design, delivery, and refinement. Timelines depend on project scope.
          </motion.p>

          <div className="mt-6 mx-auto h-0.5 w-16" style={{ backgroundColor: '#00875A' }} />
        </div>

        {/* Timeline Line (desktop) */}
        <div className="relative mb-16 hidden lg:block">
          <div
            className="absolute top-[28px] left-[8%] right-[8%] h-px"
            style={{ backgroundColor: '#E8E8E4' }}
          />
          <div className="flex justify-between px-[5%]">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2.5 relative z-10">
                <span className="text-xs" style={{ color: '#6B6B63' }}>{phase.weeks}</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: '#00875A',
                    boxShadow: '0 0 0 4px #F5F5F0',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Phase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border rounded p-6 transition-all hover:shadow-sm"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E8E8E4',
                  borderRadius: '4px',
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded flex items-center justify-center mb-4"
                  style={{ backgroundColor: '#E6F4ED', borderRadius: '4px' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#00875A' }} />
                </div>

                {/* Week label */}
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: '#00875A', letterSpacing: '0.08em' }}
                >
                  {phase.weeks}
                </p>

                {/* Title */}
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
                >
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="text-sm" style={{ color: '#6B6B63', lineHeight: 1.6 }}>
                  {phase.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom copy + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-1" style={{ color: '#1A1A1A' }}>
            Strategy. Architecture. Production. Optimization.
          </p>
          <p className="text-sm mb-6" style={{ color: '#6B6B63' }}>
            Every stage has a practical review point. Timing depends on scope.
          </p>
          <a
            href="/process"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: '#00875A' }}
          >
            Explore Our Process
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
