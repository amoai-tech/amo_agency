import { Link } from 'react-router';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Brain, 
  Zap, 
  Workflow, 
  LineChart,
  Target,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  Users,
  Globe
} from 'lucide-react';
import ServicesTechStackDetailed from './ServicesTechStackDetailed';

export function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* 1. HERO — SERVICES OVERVIEW */}
      <section className="pt-[200px] pb-[128px] px-6 md:px-16 relative overflow-hidden bg-[#1A3A32]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A32] via-[#1A3A32] to-[#0D1F1A] opacity-80" />
        
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <p className="text-[12px] uppercase tracking-[0.2em] text-white/50 font-medium mb-6">
                AI SERVICES
              </p>
              <h1 className="mb-6">
                <span 
                  className="block text-[56px] md:text-[72px] leading-[1.05] font-normal text-white"
                  style={{ 
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  AI services bring{' '}
                </span>
                <span 
                  className="block text-[56px] md:text-[72px] leading-[1.05] font-normal text-white"
                  style={{ 
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                    letterSpacing: '-0.02em'
                  }}
                >
                  speed and impact
                </span>
                <span 
                  className="block text-[56px] md:text-[72px] leading-[1.05] font-normal text-white"
                  style={{ 
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {' '}at any scale
                </span>
              </h1>
              <p className="text-[16px] text-white/70 leading-[1.6] mb-10 max-w-[540px]">
                <strong className="text-white font-semibold">Still starting from scratch with every AI project?</strong> AMO AI specialists design, build, and deploy AI systems that scale with your business—delivering measurable results without the overhead of building in-house.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/wizard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FAF8F5] text-[#1A3A32] text-[14px] font-semibold rounded-lg hover:bg-[#E8DCC4] transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                >
                  Book a demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative hidden md:block"
            >
              {/* Abstract 3D card grid visual */}
              <div className="relative w-full aspect-square">
                {/* Card 1 - Top left */}
                <div 
                  className="absolute top-0 left-0 w-[45%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: '#FAF8F5',
                    border: '1px solid rgba(26, 58, 50, 0.1)'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="w-6 h-6 text-[#1A3A32]" />
                      <span className="text-xs text-[#1A3A32]/60 uppercase tracking-wider">AI Strategy</span>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Discovery
                      </div>
                      <p className="text-xs text-[#1A3A32]/60">Roadmap & architecture</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Top right */}
                <div 
                  className="absolute top-[10%] right-0 w-[50%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: '#C5F467'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-6 h-6 text-[#0A0A0A]" />
                      <span className="text-xs text-[#0A0A0A]/60 uppercase tracking-wider">AI Products</span>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-[#0A0A0A] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Build
                      </div>
                      <p className="text-xs text-[#0A0A0A]/60">Custom applications</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Middle */}
                <div 
                  className="absolute top-[35%] left-[15%] w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #2D5548 0%, #1A3A32 100%)',
                    border: '1px solid rgba(197, 244, 103, 0.2)'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <Workflow className="w-6 h-6 text-[#C5F467]" />
                      <span className="text-xs text-white/60 uppercase tracking-wider">AI Agents</span>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Automate
                      </div>
                      <p className="text-xs text-white/50">Intelligent workflows</p>
                    </div>
                  </div>
                </div>

                {/* Card 4 - Bottom left */}
                <div 
                  className="absolute bottom-0 left-0 w-[42%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: '#E8DCC4',
                    border: '1px solid rgba(26, 58, 50, 0.1)'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-6 h-6 text-[#1A3A32]" />
                      <span className="text-xs text-[#1A3A32]/60 uppercase tracking-wider">Analytics</span>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        Scale
                      </div>
                      <p className="text-xs text-[#1A3A32]/60">Performance tracking</p>
                    </div>
                  </div>
                </div>

                {/* Card 5 - Bottom right */}
                <div 
                  className="absolute bottom-[5%] right-[5%] w-[45%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #3D5550 0%, #2D3F3A 100%)',
                    border: '1px solid rgba(197, 244, 103, 0.2)'
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-6 h-6 text-[#C5F467]" />
                      <span className="text-xs text-white/60 uppercase tracking-wider">Outcomes</span>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-white mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        3.2x ROI
                      </div>
                      <p className="text-xs text-white/50">Average impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / CLIENT SIGNALS */}
      <section className="py-12 px-6 md:px-16 border-y border-[#E0E0DE]">
        <div className="max-w-[1280px] mx-auto text-center">
          <p className="text-[12px] uppercase tracking-widest text-[#9E9E9E] font-medium mb-8">
            Trusted by teams across industries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            <div className="text-[18px] font-semibold text-[#1F2421]">Acme Inc</div>
            <div className="text-[18px] font-semibold text-[#1F2421]">TechCorp</div>
            <div className="text-[18px] font-semibold text-[#1F2421]">Innovate Co</div>
            <div className="text-[18px] font-semibold text-[#1F2421]">NextGen</div>
            <div className="text-[18px] font-semibold text-[#1F2421]">FutureWorks</div>
          </div>
        </div>
      </section>

      {/* 2B. PROVEN PROCESS — SCROLL SECTION */}
      <section className="py-32 px-6 md:px-16 bg-[#1A3A32] overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* LEFT COLUMN — STICKY */}
            <div className="md:sticky md:top-32 md:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-[12px] uppercase tracking-widest text-[#C5F467]/70 font-medium mb-6">
                  HOW WE WORK
                </p>
                <h2 
                  className="text-[48px] md:text-[56px] leading-[1.1] font-normal text-white mb-6"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '-0.02em'
                  }}
                >
                  A proven process for{' '}
                  <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                    speed, scale, and alignment
                  </span>
                </h2>
                <p className="text-[16px] text-white/70 leading-[1.6] mb-10 max-w-[480px]">
                  Our workflow is built for seamless collaboration between your team and ours, minimizing surprises and maximizing outcomes.
                </p>
                <Link
                  to="/wizard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#FAF8F5] text-[#1A3A32] text-[14px] font-semibold rounded-lg hover:bg-[#E8DCC4] transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
                >
                  Book a demo
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN — VERTICAL TIMELINE */}
            <div className="relative py-8">
              {/* Vertical line connector */}
              <div className="absolute left-[23px] top-[60px] bottom-[60px] w-[2px] bg-[#C5F467]/20" />
              
              <div className="space-y-16">
                {[
                  {
                    number: '1',
                    title: 'Onboarding',
                    description: 'We align on your brand, design system goals, and tech stack to define the project scope and strategic approach.'
                  },
                  {
                    number: '2',
                    title: 'Team assignment',
                    description: 'You\'re matched with a consistent team, including a Design System Creative Lead, Designer, and Project Manager.'
                  },
                  {
                    number: '3',
                    title: 'System audit or planning',
                    description: 'We audit your existing system or plan a new one with design input from your team to define the foundational elements, components, and documentation needed.'
                  },
                  {
                    number: '4',
                    title: 'Architecture and component design',
                    description: 'We create scalable styles and components to ensure consistency and ease of use for internal teams and external contributors.'
                  },
                  {
                    number: '5',
                    title: 'Collaboration and documentation',
                    description: 'Through Superspace, we manage feedback, approvals, and delivery. All components are supported by comprehensive documentation and organized for seamless adoption.'
                  },
                  {
                    number: '6',
                    title: 'Integration and handoff',
                    description: 'We prepare your system for smooth integration into Figma, Storybook, or custom tools, following best practices and your team\'s specific requirements.'
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Numbered circle */}
                    <div className="absolute left-0 top-0 w-12 h-12 rounded-full border-2 border-[#C5F467]/40 bg-[#1A3A32] flex items-center justify-center">
                      <span className="text-[18px] text-[#C5F467]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-[28px] md:text-[32px] font-normal text-white mb-3 leading-[1.2]">
                        {step.title}
                      </h3>
                      <p className="text-[15px] text-white/60 leading-[1.6] max-w-[520px]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICE CATEGORIES */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              What we deliver
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              End-to-end AI services designed to transform how your business operates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Strategy & Architecture',
                description: 'Roadmaps, maturity assessments, and governance frameworks for enterprise AI adoption.'
              },
              {
                icon: Sparkles,
                title: 'AI Products & Applications',
                description: 'Custom AI tools and customer-facing applications built for scale and impact.'
              },
              {
                icon: Workflow,
                title: 'AI Agents & Workflows',
                description: 'Intelligent agents that automate research, operations, CRM, and support.'
              },
              {
                icon: Zap,
                title: 'Automation & Integrations',
                description: 'Workflow automation and system integrations that power AI-enabled operations.'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-[#E0E0DE] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#E8F5E9] rounded-lg flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-[#34C759]" />
                </div>
                <h3 className="text-[20px] font-medium text-[#1F2421] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  {service.title}
                </h3>
                <p className="text-[14px] text-[#6B7370] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAILED SERVICES GRID */}
      <section className="py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Our services in detail
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px]">
              From strategy to deployment, we handle every aspect of your AI transformation.
            </p>
          </div>

          <div className="space-y-16">
            {/* AI Strategy */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[24px] font-medium text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  AI Strategy
                </h3>
                <p className="text-[14px] text-[#6B7370]">
                  Build the foundation for enterprise AI success.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Discovery & Assessment', desc: 'Evaluate AI readiness and identify opportunities' },
                  { title: 'AI Maturity Analysis', desc: 'Benchmark capabilities and create growth plans' },
                  { title: 'Strategic Roadmaps', desc: 'Prioritized implementation plans with clear milestones' },
                  { title: 'Governance Frameworks', desc: 'Policies, compliance, and risk management' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-[#FAF8F5] rounded-lg border border-[#E0E0DE]">
                    <div className="text-[16px] font-medium text-[#1F2421] mb-2">{item.title}</div>
                    <div className="text-[13px] text-[#6B7370] leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Products */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[24px] font-medium text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  AI Products
                </h3>
                <p className="text-[14px] text-[#6B7370]">
                  Custom AI applications designed for your business.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Custom AI Apps', desc: 'Tailored solutions for unique business challenges' },
                  { title: 'Internal Tools', desc: 'Productivity platforms for teams and operations' },
                  { title: 'Customer-Facing AI', desc: 'Intelligent experiences that drive engagement' },
                  { title: 'API Development', desc: 'Scalable AI services and integrations' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-[#FAF8F5] rounded-lg border border-[#E0E0DE]">
                    <div className="text-[16px] font-medium text-[#1F2421] mb-2">{item.title}</div>
                    <div className="text-[13px] text-[#6B7370] leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Agents */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[24px] font-medium text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  AI Agents
                </h3>
                <p className="text-[14px] text-[#6B7370]">
                  Intelligent automation that works 24/7.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Research Agents', desc: 'Automated data gathering and analysis' },
                  { title: 'Operations Agents', desc: 'Workflow automation and task management' },
                  { title: 'CRM Agents', desc: 'Lead qualification and customer insights' },
                  { title: 'Support Agents', desc: 'Intelligent customer service and ticketing' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-[#FAF8F5] rounded-lg border border-[#E0E0DE]">
                    <div className="text-[16px] font-medium text-[#1F2421] mb-2">{item.title}</div>
                    <div className="text-[13px] text-[#6B7370] leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Automations */}
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-[24px] font-medium text-[#1A3A32] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  Automations
                </h3>
                <p className="text-[14px] text-[#6B7370]">
                  Seamless integration with your existing systems.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Workflow Automation', desc: 'End-to-end process optimization' },
                  { title: 'System Integrations', desc: 'Connect AI to your existing tools' },
                  { title: 'AI-Enabled Operations', desc: 'Transform daily work with intelligent systems' },
                  { title: 'Data Pipelines', desc: 'Automated data flow and transformation' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-[#FAF8F5] rounded-lg border border-[#E0E0DE]">
                    <div className="text-[16px] font-medium text-[#1F2421] mb-2">{item.title}</div>
                    <div className="text-[13px] text-[#6B7370] leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW SERVICES ARE DELIVERED */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              A proven delivery process
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              Four clear phases that reduce risk and ensure successful AI adoption.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Diagnose',
                description: 'Assess readiness, identify opportunities, and define success metrics.'
              },
              {
                number: '02',
                title: 'Design',
                description: 'Create technical architecture, user flows, and implementation plans.'
              },
              {
                number: '03',
                title: 'Build',
                description: 'Develop AI systems with continuous feedback and rapid iteration.'
              },
              {
                number: '04',
                title: 'Scale',
                description: 'Deploy, train teams, optimize performance, and ensure long-term success.'
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-[48px] font-light text-[#34C759] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  {phase.number}
                </div>
                <h3 className="text-[24px] font-medium text-[#1F2421] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  {phase.title}
                </h3>
                <p className="text-[14px] text-[#6B7370] leading-relaxed">
                  {phase.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-[2px] bg-[#E0E0DE]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES SERVED */}
      <section className="py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Industries we serve
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              Tailored AI solutions across sectors.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'SaaS & Technology', desc: 'Product intelligence and user automation' },
              { title: 'E-commerce & Retail', desc: 'Personalization and inventory optimization' },
              { title: 'Real Estate', desc: 'Lead qualification and market analysis' },
              { title: 'Fashion & Luxury', desc: 'Trend forecasting and customer experience' },
              { title: 'Agencies & Services', desc: 'Client management and workflow automation' },
              { title: 'Finance & Legal', desc: 'Document processing and compliance' }
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-8 bg-[#FAF8F5] rounded-xl border border-[#E0E0DE] hover:border-[#34C759] transition-all duration-300"
              >
                <h3 className="text-[18px] font-medium text-[#1F2421] mb-2">
                  {industry.title}
                </h3>
                <p className="text-[13px] text-[#6B7370]">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6B. TECHNOLOGY STACK */}
      <ServicesTechStackDetailed />

      {/* 7. RESULTS & OUTCOMES */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Results that matter
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              Measurable impact across implementations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { number: '3.2x', label: 'Average ROI', sublabel: 'within first year' },
              { number: '68%', label: 'Time saved', sublabel: 'on manual workflows' },
              { number: '94%', label: 'Adoption rate', sublabel: 'across teams' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-[72px] font-light text-[#1A3A32] mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {metric.number}
                </div>
                <div className="text-[18px] font-medium text-[#1F2421] mb-1">
                  {metric.label}
                </div>
                <div className="text-[14px] text-[#6B7370]">
                  {metric.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY AMO AI */}
      <section className="py-32 px-6 md:px-16 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Why AMO AI
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              We bring deep expertise, systems thinking, and a commitment to your long-term success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: 'Deep AI Expertise',
                description: 'Our team combines technical excellence with strategic business insight to deliver AI that actually works.'
              },
              {
                icon: Globe,
                title: 'Systems Thinking',
                description: 'We design holistic solutions that integrate seamlessly with your existing operations and scale with your growth.'
              },
              {
                icon: Users,
                title: 'Long-Term Partnership',
                description: 'Beyond delivery, we provide ongoing support, training, and optimization to ensure sustained value.'
              },
              {
                icon: Shield,
                title: 'Enterprise-Grade Delivery',
                description: 'Security, compliance, and reliability built into every solution from day one.'
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                  <reason.icon className="w-7 h-7 text-[#34C759]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-medium text-[#1F2421] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    {reason.title}
                  </h3>
                  <p className="text-[14px] text-[#6B7370] leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ENGAGEMENT MODELS */}
      <section className="py-32 px-6 md:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-[48px] leading-[1.1] font-normal text-[#1F2421] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              How we work with you
            </h2>
            <p className="text-[18px] text-[#6B7370] max-w-[640px] mx-auto">
              Flexible engagement models to match your needs and timeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Strategy & Advisory',
                description: 'Expert guidance on AI roadmaps, vendor selection, and governance.',
                features: ['AI maturity assessment', 'Strategic roadmaps', 'Architecture review', 'Ongoing advisory']
              },
              {
                title: 'Build & Implement',
                description: 'End-to-end development and deployment of AI solutions.',
                features: ['Custom AI development', 'System integration', 'Training & handoff', 'Launch support'],
                featured: true
              },
              {
                title: 'Ongoing Optimization',
                description: 'Continuous improvement and expansion of AI capabilities.',
                features: ['Performance monitoring', 'Feature expansion', 'Model retraining', 'Strategic updates']
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-8 rounded-2xl border transition-all duration-300 ${
                  model.featured
                    ? 'bg-[#1A3A32] border-[#1A3A32] shadow-xl'
                    : 'bg-white border-[#E0E0DE] hover:shadow-lg'
                }`}
              >
                <h3 
                  className={`text-[24px] font-medium mb-3 ${
                    model.featured ? 'text-white' : 'text-[#1F2421]'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {model.title}
                </h3>
                <p className={`text-[14px] leading-relaxed mb-6 ${
                  model.featured ? 'text-[#C5F467]' : 'text-[#6B7370]'
                }`}>
                  {model.description}
                </p>
                <ul className="space-y-3">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        model.featured ? 'text-[#C5F467]' : 'text-[#34C759]'
                      }`} />
                      <span className={`text-[13px] ${
                        model.featured ? 'text-white/90' : 'text-[#6B7370]'
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CTA — START YOUR AI PROJECT */}
      <section className="py-32 px-6 md:px-16 bg-[#1A3A32]">
        <div className="max-w-[960px] mx-auto text-center">
          <h2 
            className="text-[56px] md:text-[64px] leading-[1.1] font-normal text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Build AI That Actually Ships
          </h2>
          <p className="text-[18px] text-white/70 mb-10 max-w-[640px] mx-auto">
            Start with a strategy session to identify your highest-impact AI opportunities.
          </p>
          <Link
            to="/wizard"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#C5F467] text-[#1A3A32] text-[16px] font-semibold rounded-lg hover:bg-[#B8E84F] transition-all duration-200 shadow-[0_6px_24px_rgba(197,244,103,0.3)] hover:shadow-[0_8px_32px_rgba(197,244,103,0.4)]"
          >
            Start Your AI Strategy
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}