import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function MVPv2Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cinematic Blurred Background */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
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
                MVP BUILDER
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
              Your AI Product,{' '}
              <span className="italic">Live</span> in 6 Weeks
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              className="text-lg lg:text-xl text-white/90 mb-10 leading-relaxed font-['Lora'] max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We turn product ideas into working MVPs—scoped, architected, and shipped for real users. Skip the 6-month cycle. Launch the version that proves demand.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
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

            {/* Proof Line */}
            <motion.p
              className="text-sm text-white/60 mb-6 font-['Lora']"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              8 MVPs launched in the last 12 months. 3 went on to raise funding.
            </motion.p>

            {/* Micro-trust Row */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#84CC16] rounded-full" />
                <span className="text-sm text-white/80 font-['Lora']">
                  Weekly deployments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#84CC16] rounded-full" />
                <span className="text-sm text-white/80 font-['Lora']">
                  Production-grade foundations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#84CC16] rounded-full" />
                <span className="text-sm text-white/80 font-['Lora']">
                  Clear scope + fixed timeline
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Laptop Mockup - MVP Dashboard */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-10"
              >
                {/* Laptop Frame */}
                <div className="bg-gray-900 rounded-t-lg shadow-2xl border-2 border-gray-800">
                  {/* Screen Content */}
                  <div className="bg-gradient-to-br from-[#0F3D3E] to-[#1a5f5e] p-12 rounded-t-lg aspect-video flex flex-col justify-center items-start">
                    <div className="text-white w-full">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-['Playfair_Display'] text-3xl">
                          MVP Dashboard
                        </h3>
                        <span className="bg-[#84CC16] text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                          Week 5
                        </span>
                      </div>
                      
                      <p className="font-['Lora'] text-white/70 text-sm mb-6">
                        6-week build timeline · Real-time progress tracking
                      </p>
                      
                      {/* Progress Bars */}
                      <div className="space-y-3 mb-6">
                        {[
                          { label: 'Scope', progress: 100, color: '#84CC16' },
                          { label: 'Architecture', progress: 100, color: '#9DD679' },
                          { label: 'Core Build', progress: 85, color: '#0A9396' },
                          { label: 'AI + Polish', progress: 60, color: '#84CC16' },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">{item.label}</span>
                              <span className="text-white/80">{item.progress}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ duration: 1, delay: 0.8 + idx * 0.1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                          <div className="text-[#84CC16] font-bold text-xl">5.2w</div>
                          <div className="text-white/60 text-xs">Timeline</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                          <div className="text-[#84CC16] font-bold text-xl">47</div>
                          <div className="text-white/60 text-xs">Features</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                          <div className="text-[#84CC16] font-bold text-xl">94%</div>
                          <div className="text-white/60 text-xs">Complete</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Laptop Bottom */}
                  <div className="bg-gray-800 h-3 rounded-b-lg" />
                </div>
                
                {/* Laptop Base */}
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-2 w-full mx-auto rounded-b-xl shadow-lg" />
              </motion.div>

              {/* Phone Mockup - MVP Mobile View */}
              <motion.div
                initial={{ opacity: 0, y: 60, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -bottom-16 -right-8 z-20"
              >
                {/* Phone Frame */}
                <div className="bg-gray-900 rounded-[2.5rem] shadow-2xl border-[6px] border-gray-800 w-64">
                  {/* Notch */}
                  <div className="bg-gray-900 h-6 w-32 mx-auto rounded-b-2xl relative -top-[6px]" />
                  
                  {/* Screen Content */}
                  <div className="bg-white p-6 -mt-6 rounded-[2rem] min-h-[520px] flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#84CC16] rounded-full flex items-center justify-center">
                            <span className="text-gray-900 font-bold text-sm">M</span>
                          </div>
                          <span className="font-['Playfair_Display'] text-gray-900 text-xl font-bold">MVP Launch</span>
                        </div>
                        <span className="bg-[#84CC16]/20 text-[#84CC16] px-2 py-1 rounded text-xs font-semibold">
                          Live
                        </span>
                      </div>
                      <h4 className="font-['Playfair_Display'] text-2xl text-gray-900 mb-2">
                        Production Ready
                      </h4>
                      <p className="text-gray-600 text-sm font-['Lora']">
                        Deployed and accepting users
                      </p>
                    </div>

                    {/* Status Cards */}
                    <div className="space-y-3 mb-6">
                      <div className="bg-[#F4F3EE] p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">Users</span>
                          <span className="text-xl font-bold text-gray-900">127</span>
                        </div>
                        <div className="text-xs text-gray-600">+24 this week</div>
                      </div>
                      
                      <div className="bg-[#F4F3EE] p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">Uptime</span>
                          <span className="text-xl font-bold text-[#84CC16]">99.8%</span>
                        </div>
                        <div className="text-xs text-gray-600">All systems operational</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      className="w-full bg-[#84CC16] text-gray-900 py-4 rounded-full font-['Lora'] font-semibold text-sm mb-4"
                      disabled
                    >
                      View Analytics →
                    </button>

                    {/* Footer Badge */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-['Lora']">Deployed via CI/CD</span>
                        <div className="flex gap-2">
                          <span className="bg-[#84CC16]/10 text-[#84CC16] px-2 py-1 rounded font-semibold">Live</span>
                          <span className="bg-[#84CC16]/10 text-[#84CC16] px-2 py-1 rounded font-semibold">Monitored</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}