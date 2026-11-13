import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function WhyAIPowered() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const comparisonData = {
    traditional: {
      timeline: '3-6 months',
      copy: '2-4 weeks per round',
      design: '3-5 rounds over weeks',
      performance: '60-75 average',
      chatbot: 'Add-on ($5K-15K)',
      support: 'Hourly billing'
    },
    amoAI: {
      timeline: '4-6 weeks',
      copy: 'Hours per round',
      design: '10+ variations in days',
      performance: '90+ guaranteed',
      chatbot: 'Built-in, standard',
      support: '30 days included'
    }
  };

  return (
    <section ref={ref} className="bg-[#F3F4F6] py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest text-[#84CC16] font-semibold font-['Lora']">
            The Advantage
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl lg:text-5xl mb-8 text-gray-900"
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Speed Without Sacrificing Quality
        </motion.h2>

        {/* Body Copy */}
        <motion.div
          className="max-w-4xl mb-16 space-y-6 text-lg text-gray-600 leading-relaxed font-['Lora']"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Traditional web agencies operate on a 3-to-6-month timeline. Discovery takes 4 weeks. Design takes 6. Development takes 8. QA takes 2. By the time you launch, your market has shifted, your messaging is stale, and you have spent $30,000 or more on a site that needs updating before it goes live.
          </p>
          <p>
            We compress that entire cycle into 4 to 6 weeks — without cutting corners. AI accelerates every phase: generating copy options in minutes instead of weeks, producing design variations faster than any human team, writing clean production code that passes accessibility and performance audits from day one, and optimizing images, fonts, and assets automatically.
          </p>
          <p>
            The result is not a rushed product. It is a better product, delivered faster, because the repetitive parts of web development — the parts that slow down traditional agencies — are handled by systems that operate at machine speed.
          </p>
        </motion.div>

        {/* Timeline Comparison Visualization */}
        <motion.div
          className="bg-white border border-gray-200 p-8 lg:p-12 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl mb-8 text-gray-900 font-['Lora'] font-semibold">Timeline Comparison</h3>
          
          {/* Traditional Agency Timeline */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-3 font-['Lora']">Traditional Agency</p>
            <div className="relative h-12 bg-gray-100 border border-gray-300">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gray-400 flex items-center justify-center text-xs text-white font-['Lora']"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <span className="absolute left-4">Discovery</span>
                <span className="absolute left-1/4">Design</span>
                <span className="absolute left-1/2">Development</span>
                <span className="absolute right-4">QA</span>
              </motion.div>
            </div>
            <p className="text-xs text-gray-500 mt-2 font-['Lora']">20+ weeks (5 months)</p>
          </div>

          {/* AMO AI Timeline */}
          <div>
            <p className="text-sm text-gray-900 font-semibold mb-3 font-['Lora']">AMO AI (AI-Powered)</p>
            <div className="relative h-12 bg-gray-100 border-2 border-[#84CC16]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#84CC16] flex items-center justify-center text-xs text-gray-900 font-['Lora'] font-semibold"
                initial={{ width: 0 }}
                animate={isInView ? { width: '25%' } : { width: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <span className="absolute left-2 text-[10px]">Disc+Des</span>
                <span className="absolute left-1/3 text-[10px]">Dev</span>
                <span className="absolute right-2 text-[10px]">Test</span>
              </motion.div>
            </div>
            <p className="text-xs text-gray-900 font-semibold mt-2 font-['Lora']">5 weeks</p>
          </div>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Agency Card */}
          <motion.div
            className="bg-white border border-gray-200 p-8"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-2xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Traditional Agency
            </h4>
            <div className="space-y-4 font-['Lora'] text-gray-600">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Timeline</span>
                <span>{comparisonData.traditional.timeline}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Copy Production</span>
                <span>{comparisonData.traditional.copy}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Design Iterations</span>
                <span>{comparisonData.traditional.design}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Performance Score</span>
                <span>{comparisonData.traditional.performance}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Chatbot Integration</span>
                <span>{comparisonData.traditional.chatbot}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Post-Launch Support</span>
                <span>{comparisonData.traditional.support}</span>
              </div>
            </div>
          </motion.div>

          {/* AMO AI Card */}
          <motion.div
            className="bg-[#84CC16]/10 border-2 border-[#84CC16] p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h4 className="text-2xl mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              AMO AI (AI-Powered)
            </h4>
            <div className="space-y-4 font-['Lora'] text-gray-900 font-semibold">
              <div className="flex justify-between border-b border-[#84CC16]/30 pb-3">
                <span>Timeline</span>
                <span>{comparisonData.amoAI.timeline}</span>
              </div>
              <div className="flex justify-between border-b border-[#84CC16]/30 pb-3">
                <span>Copy Production</span>
                <span>{comparisonData.amoAI.copy}</span>
              </div>
              <div className="flex justify-between border-b border-[#84CC16]/30 pb-3">
                <span>Design Iterations</span>
                <span>{comparisonData.amoAI.design}</span>
              </div>
              <div className="flex justify-between border-b border-[#84CC16]/30 pb-3">
                <span>Performance Score</span>
                <span>{comparisonData.amoAI.performance}</span>
              </div>
              <div className="flex justify-between border-b border-[#84CC16]/30 pb-3">
                <span>Chatbot Integration</span>
                <span>{comparisonData.amoAI.chatbot}</span>
              </div>
              <div className="flex justify-between">
                <span>Post-Launch Support</span>
                <span>{comparisonData.amoAI.support}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
