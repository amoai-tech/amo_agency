import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   Process Hero — Luxury Editorial Edition
   ═══════════════════════════════════════════════════════════════ 
   
   Design: Premium light hero with AMO AI Spruced palette
   Focus: 8-week velocity system with sophistication
   
   Color Palette:
   - Background: #F5F5F0 (warm off-white)
   - Headlines: #1A1A1A (charcoal)
   - Accent: #00875A (BCG green)
   - Highlight: #00875A (BCG green)
   - Muted: #E8E8E4 (border)
   
   ═══════════════════════════════════════════════════════════════ */

interface ProcessHeroProps {
  onNavigateToWizard?: () => void;
  onNavigateToProjects?: () => void;
}

export function ProcessHero({ onNavigateToWizard, onNavigateToProjects }: ProcessHeroProps) {
  return (
    <section 
      className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden"
      style={{ background: '#F5F5F0' }}
    >
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-right radial glow */}
        <div 
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(0, 135, 90, 0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Bottom-left sage glow */}
        <div 
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(232, 232, 228, 0.6) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div>
            {/* Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))',
                border: '1px solid rgba(26, 26, 26, 0.12)',
                boxShadow: '0 4px 16px rgba(26, 26, 26, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ 
                  background: '#00875A',
                  boxShadow: '0 0 12px rgba(0, 135, 90, 0.6)',
                }}
              />
              <span 
                className="text-sm font-semibold tracking-[0.12em] uppercase"
                style={{ 
                  color: '#00875A',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                The AMO AI Process
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
              style={{ 
                color: '#1A1A1A',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(2.75rem, 6vw, 5rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
              }}
            >
              Build AI in{' '}
              <span 
                className="relative inline-block"
                style={{ color: '#00875A' }}
              >
                8 Weeks
                {/* Decorative underline */}
                <svg 
                  className="absolute left-0 -bottom-1 w-full h-3"
                  viewBox="0 0 200 12" 
                  preserveAspectRatio="none"
                  style={{ opacity: 0.4 }}
                >
                  <motion.path
                    d="M0,6 Q50,3 100,6 T200,6"
                    fill="none"
                    stroke="#00875A"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
                  />
                </svg>
              </span>
              .<br/>
              <span style={{ color: 'rgba(26, 26, 26, 0.5)' }}>
                Not 8 Months.
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl lg:text-2xl mb-10 max-w-xl"
              style={{ 
                color: 'rgba(26, 26, 26, 0.65)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 300,
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
              }}
            >
              We move fast without cutting corners—AI acceleration + expert delivery for measurable results.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              {/* Primary CTA */}
              <button
                onClick={onNavigateToWizard}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #00875A 0%, #1A1A1A 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 16px rgba(26, 26, 26, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <span>Start Your AI Brief</span>
                <ArrowRight 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onNavigateToProjects}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(26, 26, 26, 0.15)',
                  color: '#1A1A1A',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(26, 26, 26, 0.08)',
                }}
              >
                <span>See Success Stories</span>
              </button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-3 gap-6 pt-8"
              style={{
                borderTop: '1px solid rgba(26, 26, 26, 0.12)',
              }}
            >
              {[
                { value: '40+', label: 'Projects Delivered' },
                { value: '$5M+', label: 'Client Revenue Impact' },
                { value: '4.2×', label: 'Average ROI' }
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div 
                    className="mb-1.5 transition-colors duration-300"
                    style={{
                      color: '#1A1A1A',
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="transition-colors duration-300"
                    style={{
                      color: 'rgba(26, 26, 26, 0.5)',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual — Premium Timeline Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              
              {/* Central Hub */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex flex-col items-center justify-center z-20"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                  border: '2px solid rgba(26, 26, 26, 0.15)',
                  boxShadow: '0 8px 32px rgba(26, 26, 26, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)',
                }}
              >
                <div 
                  className="mb-2"
                  style={{
                    color: '#00875A',
                    fontFamily: 'Georgia, serif',
                    fontSize: '3rem',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  8
                </div>
                <div 
                  className="mb-1"
                  style={{
                    color: '#1A1A1A',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  Weeks
                </div>
                <div 
                  style={{
                    color: 'rgba(26, 26, 26, 0.5)',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Delivery Cycle
                </div>

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: '2px solid rgba(0, 135, 90, 0.3)',
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Animated Orbital Ring */}
              <svg 
                viewBox="0 0 400 400" 
                className="absolute inset-0 w-full h-full"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle 
                  cx="200" 
                  cy="200" 
                  r="190" 
                  fill="none" 
                  stroke="rgba(26, 26, 26, 0.08)" 
                  strokeWidth="1.5"
                />
                <motion.circle 
                  cx="200" 
                  cy="200" 
                  r="190" 
                  fill="none" 
                  stroke="#00875A" 
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="1194" // 2 * pi * 190
                  initial={{ strokeDashoffset: 1194 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ 
                    duration: 2, 
                    delay: 0.6,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(0, 135, 90, 0.4))',
                  }}
                />
              </svg>

              {/* Orbiting Phase Nodes */}
              {[
                { 
                  icon: Sparkles, 
                  label: 'Strategy', 
                  sublabel: 'Week 1',
                  angle: 0,
                  delay: 0.5,
                },
                { 
                  icon: Clock, 
                  label: 'Build', 
                  sublabel: 'Weeks 2–6',
                  angle: 90,
                  delay: 0.6,
                },
                { 
                  icon: CheckCircle2, 
                  label: 'Test', 
                  sublabel: 'Week 7',
                  angle: 180,
                  delay: 0.7,
                },
                { 
                  icon: TrendingUp, 
                  label: 'Launch', 
                  sublabel: 'Week 8',
                  angle: 270,
                  delay: 0.8,
                }
              ].map((node, i) => {
                const radius = 190;
                const x = radius * Math.cos((node.angle * Math.PI) / 180);
                const y = radius * Math.sin((node.angle * Math.PI) / 180);
                const Icon = node.icon;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 group"
                    style={{
                      width: '80px',
                      height: '80px',
                      marginTop: '-40px',
                      marginLeft: '-40px',
                    }}
                    initial={{ opacity: 0, scale: 0.5, x, y }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{ 
                      delay: node.delay, 
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    {/* Node card */}
                    <div 
                      className="w-full h-full rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                        border: '1px solid rgba(26, 26, 26, 0.12)',
                        boxShadow: '0 4px 16px rgba(26, 26, 26, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
                      }}
                    >
                      <Icon 
                        className="w-6 h-6 mb-1 transition-colors duration-300"
                        style={{ color: '#00875A' }}
                      />
                      <div 
                        className="text-xs font-semibold transition-colors duration-300"
                        style={{
                          color: '#1A1A1A',
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                      >
                        {node.label}
                      </div>
                      <div 
                        className="text-[0.6rem] transition-colors duration-300"
                        style={{
                          color: 'rgba(26, 26, 26, 0.5)',
                          fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                      >
                        {node.sublabel}
                      </div>

                      {/* Hover glow */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(0, 135, 90, 0.1) 0%, transparent 70%)',
                        }}
                      />
                    </div>

                    {/* Connecting line to center */}
                    <div 
                      className="absolute top-1/2 left-1/2 w-px origin-center pointer-events-none"
                      style={{
                        height: `${radius - 96}px`,
                        background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.15), transparent)',
                        transform: `rotate(${180 + node.angle}deg) translateY(-40px)`,
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Decorative floating dots */}
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) + 30;
                const radius = 220;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'rgba(0, 135, 90, 0.3)',
                      marginTop: '-3px',
                      marginLeft: '-3px',
                      x,
                      y,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Reduced motion support */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Button hover effects */
        button:hover {
          transform: translateY(-2px);
        }

        button:active {
          transform: translateY(0);
        }
      `}} />
    </section>
  );
}