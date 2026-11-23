import { motion } from 'motion/react';
import { Wand2, Brain, CheckCircle, Code, Rocket, TrendingUp, ArrowRight, ArrowDown } from 'lucide-react';

const STEPS = [
  {
    number: 1,
    icon: Wand2,
    title: 'Client Input',
    description: 'Define requirements and goals',
  },
  {
    number: 2,
    icon: Brain,
    title: 'AI Analysis',
    description: 'System design and architecture',
  },
  {
    number: 3,
    icon: CheckCircle,
    title: 'Human Approval',
    description: 'Review and validate approach',
  },
  {
    number: 4,
    icon: Code,
    title: 'System Build',
    description: 'Development with AI acceleration',
  },
  {
    number: 5,
    icon: Rocket,
    title: 'Production',
    description: 'Deploy and launch',
  },
  {
    number: 6,
    icon: TrendingUp,
    title: 'Results',
    description: 'Monitor and optimize',
  },
];

export default function SystemDiagram() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#1A1A1A' }}
          >
            How AMO AI Builds
          </h2>
          <p className="text-lg" style={{ color: '#6B6B63' }}>
            Our AI Product Systems Architect framework
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto p-8 lg:p-12 border border-[#EFE9E4] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLeftColumn = index % 2 === 0;
              const isLastInColumn = index >= STEPS.length - 2;

              return (
                <div key={step.number} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-[#F59E0B]/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-[#F59E0B]" />
                    </div>

                    {/* Number */}
                    <div className="text-sm text-[#999999] mb-2">Step {step.number}</div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#666666]">{step.description}</p>
                  </motion.div>

                  {/* Arrows */}
                  {!isLastInColumn && (
                    <div className="hidden md:flex absolute top-full left-1/2 transform -translate-x-1/2 mt-6">
                      {isLeftColumn ? (
                        <ArrowDown className="w-6 h-6 text-[#D1C7BD]" strokeWidth={2} />
                      ) : (
                        <ArrowDown className="w-6 h-6 text-[#D1C7BD]" strokeWidth={2} />
                      )}
                    </div>
                  )}

                  {/* Horizontal arrow between columns (mobile) */}
                  {index < STEPS.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <ArrowDown className="w-6 h-6 text-[#D1C7BD]" strokeWidth={2} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="border border-[#1A1A1A] text-[#1A1A1A] px-10 py-5 font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors">
            Learn Our Process
          </button>
        </motion.div>
      </div>
    </section>
  );
}