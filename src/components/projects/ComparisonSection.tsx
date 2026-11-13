// C-PJ02 — Comparison Section
// BCG design system: off-white bg, charcoal text, Georgia serif, green accent card, 4px radius

import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

const TRADITIONAL_FEATURES = [
  '12-16 weeks typical timeline',
  'Manual workflows and processes',
  'Static deliverables and mockups',
  'Limited post-launch support',
  'High client time investment',
  'Costly change requests',
];

const AMO_AI_FEATURES = [
  '6-8 weeks from start to launch',
  'AI-powered automation',
  'Live, production-ready systems',
  'Built to scale from day one',
  'Minimal client time required',
  'Flexible, iterative development',
];

export default function ComparisonSection() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#F5F5F0' }}>
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2
            className="text-3xl lg:text-4xl"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
          >
            Why Our Projects Ship Faster
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional Agency */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 border"
            style={{ borderColor: '#E8E8E4', backgroundColor: '#FFFFFF', borderRadius: '4px' }}
          >
            <h3
              className="text-xl mb-6"
              style={{ fontFamily: 'Georgia, serif', color: '#6B6B63' }}
            >
              Traditional Agency
            </h3>
            <ul className="space-y-4">
              {TRADITIONAL_FEATURES.map((feature, index) => (
                <li key={index} className="flex gap-3" style={{ color: '#6B6B63' }}>
                  <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#6B6B63' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AMO AI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 border-2"
            style={{ borderColor: '#00875A', backgroundColor: 'rgba(0,135,90,0.03)', borderRadius: '4px' }}
          >
            <h3
              className="text-xl mb-6"
              style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
            >
              AMO AI
            </h3>
            <ul className="space-y-4">
              {AMO_AI_FEATURES.map((feature, index) => (
                <li key={index} className="flex gap-3" style={{ color: '#1A1A1A' }}>
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#00875A' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
