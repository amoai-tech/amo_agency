import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import LighthouseGauge from './LighthouseGauge';

export default function PerformanceFirst() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scores = [
    { score: 94, label: 'Performance' },
    { score: 96, label: 'Accessibility' },
    { score: 95, label: 'Best Practices' },
    { score: 98, label: 'SEO' }
  ];

  const comparisonData = [
    { category: 'Performance', industry: 52, amoAI: 94 },
    { category: 'Accessibility', industry: 68, amoAI: 96 },
    { category: 'Best Practices', industry: 71, amoAI: 95 },
    { category: 'SEO', industry: 74, amoAI: 98 }
  ];

  return (
    <section ref={ref} className="bg-[#F3F4F6] py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-[#84CC16] font-semibold font-['Lora']">
            Performance
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl lg:text-5xl mb-8 text-gray-900 text-center"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Every Page Scores 90+ on Lighthouse
        </motion.h2>

        {/* Body Copy */}
        <motion.div
          className="max-w-4xl mx-auto mb-16 space-y-6 text-lg text-gray-600 leading-relaxed font-['Lora'] text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Page speed is not a vanity metric. It directly impacts search rankings, user experience, and conversion rates. A one-second delay in page load reduces conversions by 7%. A site scoring below 50 on Lighthouse is actively losing you money. We engineer every website to exceed 90 across all four Lighthouse categories — Performance, Accessibility, Best Practices, and SEO.
          </p>
          <p>
            This is not optional optimization. It is baked into our development process. Your visitors get a fast, smooth experience. Google rewards you with better rankings. Your conversion rates climb because people do not bounce.
          </p>
        </motion.div>

        {/* Lighthouse Gauges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-20">
          {scores.map((item, index) => (
            <LighthouseGauge
              key={index}
              score={item.score}
              label={item.label}
              delay={0.3 + index * 0.15}
            />
          ))}
        </div>

        {/* Bar Chart Comparison */}
        <motion.div
          className="bg-white border border-gray-200 p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl mb-8 text-gray-900 font-['Lora'] font-semibold text-center">
            Industry Average vs AMO AI
          </h3>

          <div className="space-y-8 max-w-4xl mx-auto">
            {comparisonData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700 font-['Lora']">
                    {item.category}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {/* Industry Average Bar */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-['Lora'] w-24">Industry Avg</span>
                    <div className="flex-1 h-8 bg-gray-100 border border-gray-300 relative">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gray-400 flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.industry}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                      >
                        <span className="text-xs font-semibold text-white font-['Lora']">
                          {item.industry}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* AMO AI Bar */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-900 font-semibold font-['Lora'] w-24">AMO AI</span>
                    <div className="flex-1 h-8 bg-gray-100 border-2 border-[#84CC16] relative">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-[#84CC16] flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.amoAI}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                      >
                        <span className="text-xs font-bold text-gray-900 font-['Lora']">
                          {item.amoAI}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400" />
              <span className="text-sm text-gray-600 font-['Lora']">Industry Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#84CC16]" />
              <span className="text-sm text-gray-900 font-semibold font-['Lora']">AMO AI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
