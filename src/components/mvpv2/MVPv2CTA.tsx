import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';

export default function MVPv2CTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative bg-[#0F3D3E] text-white py-32 lg:py-40 overflow-hidden"
    >
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Animated top divider line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#84CC16]"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl lg:text-5xl mb-8"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Stop Planning. Start Building.
          </h2>

          <p className="text-lg text-white/70 mb-10 leading-relaxed font-['Lora'] max-w-2xl mx-auto">
            Book a 30-minute MVP strategy session. We'll pressure-test the
            concept, define the v1 scope, estimate timeline + investment, and
            tell you plainly if we're the right fit. If yes, we can start the
            scope workshop the same week.
          </p>

          <Link
            to="/booking"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#84CC16] text-gray-900 rounded-full hover:bg-[#9DD679] transition-all duration-300 hover:shadow-lg hover:shadow-[#84CC16]/30 text-base font-semibold font-['Lora']"
          >
            Start Your MVP Brief
          </Link>

          <p className="mt-6 text-sm text-white/50 font-['Lora']">
            Free 30-minute session. No obligations. No pitch deck required.
          </p>

          {/* Optional scarcity line (commented out by default) */}
          {/* <p className="mt-4 text-sm text-[#84CC16] font-['Lora'] italic">
            Limited build slots available this month.
          </p> */}
        </motion.div>
      </div>
    </section>
  );
}