// C-PJ03 — Projects Final CTA
// BCG design system dark variant: charcoal bg, white text, Georgia serif, green CTA, 4px radius

import { motion } from 'motion/react';

interface ProjectsFinalCTAProps {
  onStartProject?: () => void;
  onContactUs?: () => void;
}

export default function ProjectsFinalCTA({
  onStartProject,
  onContactUs,
}: ProjectsFinalCTAProps) {
  return (
    <section className="py-20 lg:py-28 text-white" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-[1120px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl lg:text-4xl mb-7 leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Ready to Build a Real AI Product?
          </h2>

          <p className="text-lg mb-10" style={{ color: 'rgba(245,245,240,0.6)' }}>
            Explore the services and examples behind these product experiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartProject}
              className="px-8 py-4 text-sm transition-colors"
              style={{ backgroundColor: '#00875A', color: '#FFFFFF', borderRadius: '4px' }}
            >
              Explore Services
            </button>
            <button
              onClick={onContactUs}
              className="px-8 py-4 border text-sm transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', borderRadius: '4px' }}
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
