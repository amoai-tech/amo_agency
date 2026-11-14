import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function MVPHero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0F3D3E] via-[#1a5f5e] to-[#0F3D3E]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Small Label */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-white/80 font-semibold font-['Lora']">
                MVP BUILDER SERVICE
              </span>
            </motion.div>

            {/* Headline with Italic Emphasis */}
            <motion.h1
              className="text-5xl lg:text-7xl xl:text-8xl mb-8 text-white leading-[1.1]"
              style={{ fontFamily: 'Playfair Display, serif' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Your AI product,{' '}
              <span className="italic">live in 6 weeks</span>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed font-['Lora'] max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We turn product ideas into working MVPs — scoped, architected, and built for market validation.
              Skip the 6-month cycle and get a production-grade application in front of users fast.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <button
                onClick={() => navigate('/booking')}
                className="bg-[#84CC16] text-gray-900 px-8 py-4 rounded-full font-['Lora'] font-semibold hover:bg-[#73b512] hover:shadow-lg hover:shadow-[#84CC16]/30 transition-all flex items-center justify-center gap-3 text-base"
              >
                Start Your MVP Brief
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/projects')}
                className="text-white px-8 py-4 font-['Lora'] font-medium hover:text-[#84CC16] transition-colors flex items-center justify-center gap-2 text-base"
              >
                View MVPs We've Shipped
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-3 text-white/60 text-sm font-['Lora']"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#84CC16] rounded-full" />
                <span>8 MVPs launched</span>
              </div>
              <span>•</span>
              <span>3 raised funding</span>
            </motion.div>
          </motion.div>

          {/* Right Column - 6-Week Timeline Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="font-['Playfair_Display'] text-3xl text-white mb-8">
                6-Week Timeline
              </h3>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {[
                  { week: 'Week 1', title: 'Scope Workshop', color: '#84CC16' },
                  { week: 'Week 2', title: 'Architecture Design', color: '#84CC16' },
                  { week: 'Week 3-4', title: 'Core Development', color: '#84CC16' },
                  { week: 'Week 5', title: 'AI Integration', color: '#84CC16' },
                  { week: 'Week 6', title: 'Launch 🚀', color: '#FF6B4A' },
                ].map((step, index) => (
                  <motion.div
                    key={step.week}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: step.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3">
                        <span className="text-white/50 text-sm font-['Lora']">
                          {step.week}
                        </span>
                        <span className="text-white font-['Lora'] text-lg">
                          {step.title}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
                <div>
                  <div className="text-[#84CC16] font-bold text-2xl">6</div>
                  <div className="text-white/60 text-xs">Weeks</div>
                </div>
                <div>
                  <div className="text-[#84CC16] font-bold text-2xl">$15K</div>
                  <div className="text-white/60 text-xs">Starting</div>
                </div>
                <div>
                  <div className="text-[#84CC16] font-bold text-2xl">100%</div>
                  <div className="text-white/60 text-xs">Yours</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}