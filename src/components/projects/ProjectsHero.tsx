// C-PJ01 — Projects Hero
// BCG design system: white bg, charcoal text, Georgia serif, green CTA, 4px radius

import { motion } from 'motion/react';

interface ProjectsHeroProps {
  onStartClick?: () => void;
  onProcessClick?: () => void;
}

export default function ProjectsHero({
  onStartClick,
  onProcessClick,
}: ProjectsHeroProps) {
  return (
    <section style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[1120px] mx-auto px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#00875A', letterSpacing: '0.08em' }}>
            Public Product Examples
          </p>

          <h1
            className="text-4xl lg:text-5xl tracking-tight mb-5"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
          >
            Real AI Products. Real Work.
          </h1>

          <h2 className="text-xl lg:text-2xl mb-3" style={{ color: '#6B6B63' }}>
            Explore two public products and the workflows they support.
          </h2>

          <p className="text-base mb-10" style={{ color: '#6B6B63' }}>
            Screenshots are captured from the actual public product websites. No client ROI or delivery guarantees are implied.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartClick}
              className="px-8 py-4 text-sm transition-colors"
              style={{ backgroundColor: '#00875A', color: '#FFFFFF', borderRadius: '4px' }}
            >
              Explore Services
            </button>
            <button
              onClick={onProcessClick}
              className="border px-8 py-4 text-sm transition-colors hover:bg-[#1A1A1A] hover:text-white"
              style={{ borderColor: '#1A1A1A', color: '#1A1A1A', borderRadius: '4px' }}
            >
              View Product Examples
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
