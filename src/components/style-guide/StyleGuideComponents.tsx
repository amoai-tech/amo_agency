import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { TrendingUp, Users, Zap, Brain, Check } from 'lucide-react';

// ===== METRIC CARD =====
interface MetricCardProps {
  value: string;
  label: string;
  trend?: string;
  icon?: React.ReactNode;
  variant?: 'dark' | 'light';
}

export function MetricCard({ value, label, trend, icon, variant = 'light' }: MetricCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <motion.div
      className={`p-8 border transition-all duration-300 hover:-translate-y-1 ${
        isDark 
          ? 'bg-[#0F3D3E] border-[#0F3D3E] text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}
      whileHover={{ borderColor: '#84CC16' }}
    >
      {icon && (
        <div className={`w-12 h-12 flex items-center justify-center mb-6 ${
          isDark ? 'bg-[#84CC16]' : 'bg-[#84CC16]'
        }`}>
          <div className="text-gray-900">{icon}</div>
        </div>
      )}
      
      <div className={`text-5xl lg:text-6xl font-['Playfair_Display'] mb-3 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {value}
      </div>
      
      <div className={`text-base font-['Lora'] mb-2 ${
        isDark ? 'text-white/80' : 'text-gray-600'
      }`}>
        {label}
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 mt-4">
          <TrendingUp className="w-4 h-4 text-[#84CC16]" />
          <span className={`text-sm font-['Lora'] ${
            isDark ? 'text-white/60' : 'text-gray-500'
          }`}>
            {trend}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ===== SERVICE CARD =====
interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  variant?: 'dark' | 'light';
}

export function ServiceCard({ title, description, features, icon, variant = 'light' }: ServiceCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <motion.div
      className={`p-8 border transition-all duration-300 hover:-translate-y-1 ${
        isDark 
          ? 'bg-[#0F3D3E] border-[#0F3D3E]' 
          : 'bg-white border-gray-200'
      }`}
      whileHover={{ borderColor: '#84CC16' }}
    >
      {/* Icon */}
      <div className={`w-16 h-16 flex items-center justify-center mb-6 ${
        isDark ? 'bg-[#84CC16]' : 'bg-[#84CC16]'
      }`}>
        <div className="text-gray-900 w-8 h-8">{icon}</div>
      </div>
      
      {/* Title */}
      <h3 className={`text-2xl lg:text-3xl font-['Playfair_Display'] mb-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      
      {/* Description */}
      <p className={`text-base font-['Lora'] leading-relaxed mb-6 ${
        isDark ? 'text-white/80' : 'text-gray-600'
      }`}>
        {description}
      </p>
      
      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              isDark ? 'text-[#84CC16]' : 'text-[#84CC16]'
            }`} />
            <span className={`text-sm font-['Lora'] ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      
      {/* CTA */}
      <button className={`mt-8 px-6 py-3 font-['Lora'] transition-colors ${
        isDark 
          ? 'bg-[#84CC16] text-gray-900 hover:bg-[#73b512]' 
          : 'bg-gray-900 text-white hover:bg-gray-800'
      }`}>
        Learn More
      </button>
    </motion.div>
  );
}

// ===== FRAMEWORK TAB =====
interface FrameworkTabProps {
  tabs: {
    id: string;
    label: string;
    content: {
      title: string;
      description: string;
      points: string[];
    };
  }[];
  variant?: 'dark' | 'light';
}

export function FrameworkTab({ tabs, variant = 'light' }: FrameworkTabProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const isDark = variant === 'dark';
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;
  
  return (
    <div className={`border ${
      isDark 
        ? 'bg-[#0F3D3E] border-[#0F3D3E]' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Tab Headers */}
      <div className={`flex border-b ${
        isDark ? 'border-white/10' : 'border-gray-200'
      }`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-4 font-['Lora'] font-medium transition-all ${
              activeTab === tab.id
                ? isDark 
                  ? 'bg-[#84CC16] text-gray-900' 
                  : 'bg-[#84CC16] text-gray-900'
                : isDark
                  ? 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-8 lg:p-12"
      >
        <h3 className={`text-3xl lg:text-4xl font-['Playfair_Display'] mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {activeContent?.title}
        </h3>
        
        <p className={`text-lg font-['Lora'] leading-relaxed mb-8 ${
          isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          {activeContent?.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeContent?.points.map((point, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-4 border ${
                isDark 
                  ? 'border-white/10 bg-white/5' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-[#84CC16] flex-shrink-0">
                <span className="text-sm font-bold text-gray-900">{index + 1}</span>
              </div>
              <p className={`text-sm font-['Lora'] ${
                isDark ? 'text-white/70' : 'text-gray-600'
              }`}>
                {point}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ===== INSIGHT CARD =====
interface InsightCardProps {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  gradient: string;
  variant?: 'dark' | 'light';
}

export function InsightCard({ category, title, excerpt, readTime, gradient, variant = 'light' }: InsightCardProps) {
  const isDark = variant === 'dark';
  
  return (
    <motion.article
      className="border border-gray-200 overflow-hidden group cursor-pointer"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient Header */}
      <div 
        className="h-48 relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white text-gray-900 px-4 py-2 text-xs font-['Lora'] font-semibold uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className={`p-8 ${
        isDark ? 'bg-[#0F3D3E]' : 'bg-white'
      }`}>
        <h3 className={`text-2xl lg:text-3xl font-['Playfair_Display'] mb-4 leading-tight ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        
        <p className={`text-base font-['Lora'] leading-relaxed mb-6 ${
          isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          {excerpt}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className={`text-sm font-['Lora'] inline-flex items-center gap-2 group-hover:gap-3 transition-all ${
            isDark ? 'text-[#84CC16]' : 'text-[#84CC16]'
          }`}>
            Read Article
            <span>→</span>
          </span>
          
          <span className={`text-xs font-['Lora'] ${
            isDark ? 'text-white/50' : 'text-gray-400'
          }`}>
            {readTime}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ===== SHOWCASE SECTION =====
export default function StyleGuideComponentsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-['Playfair_Display'] text-4xl lg:text-5xl text-gray-900 mb-4">
            Component Examples
          </h2>
          <p className="font-['Lora'] text-xl text-gray-600 max-w-3xl">
            Live, interactive examples of core components used throughout the AMO AI experience.
          </p>
        </motion.div>

        {/* METRIC CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="font-['Playfair_Display'] text-3xl text-gray-900 mb-8">
            Metric Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              value="94%"
              label="Client Satisfaction"
              trend="+12% from last quarter"
              icon={<Users className="w-6 h-6" />}
              variant="light"
            />
            <MetricCard
              value="500+"
              label="AI Models Deployed"
              trend="+45% year over year"
              icon={<Brain className="w-6 h-6" />}
              variant="dark"
            />
            <MetricCard
              value="<2hrs"
              label="Average Response Time"
              trend="Industry leading"
              icon={<Zap className="w-6 h-6" />}
              variant="light"
            />
          </div>
        </motion.div>

        {/* SERVICE CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="font-['Playfair_Display'] text-3xl text-gray-900 mb-8">
            Service Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ServiceCard
              title="AI Chatbots"
              description="Intelligent conversational agents powered by cutting-edge natural language processing technology."
              features={[
                'Natural language understanding',
                '24/7 automated customer support',
                'Multi-language support',
                'Seamless CRM integration'
              ]}
              icon={<Brain className="w-8 h-8" />}
              variant="light"
            />
            <ServiceCard
              title="AI Agents"
              description="Autonomous systems that take action, make decisions, and complete complex workflows on your behalf."
              features={[
                'Task automation and delegation',
                'Real-time decision making',
                'Learning from interactions',
                'Cross-platform integration'
              ]}
              icon={<Zap className="w-8 h-8" />}
              variant="dark"
            />
          </div>
        </motion.div>

        {/* FRAMEWORK TAB */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="font-['Playfair_Display'] text-3xl text-gray-900 mb-8">
            Framework Tab
          </h3>
          <FrameworkTab
            variant="light"
            tabs={[
              {
                id: 'discover',
                label: 'Discover',
                content: {
                  title: 'Discovery & Research',
                  description: 'Deep analysis of your business challenges, market position, and AI readiness to define a strategic roadmap.',
                  points: [
                    'Stakeholder interviews and requirements gathering',
                    'Technical infrastructure assessment',
                    'Competitive landscape analysis',
                    'AI opportunity identification and prioritization'
                  ]
                }
              },
              {
                id: 'design',
                label: 'Design',
                content: {
                  title: 'Solution Design',
                  description: 'Architecting scalable AI systems with clear data flows, model selection, and integration patterns.',
                  points: [
                    'AI model selection and fine-tuning strategy',
                    'System architecture and data pipeline design',
                    'User experience and interface planning',
                    'Performance metrics and success criteria'
                  ]
                }
              },
              {
                id: 'deliver',
                label: 'Deliver',
                content: {
                  title: 'Development & Deployment',
                  description: 'Building, testing, and launching production-ready AI solutions with continuous monitoring and optimization.',
                  points: [
                    'Model training and validation',
                    'Integration with existing systems',
                    'Comprehensive testing and quality assurance',
                    'Production deployment and performance monitoring'
                  ]
                }
              }
            ]}
          />
        </motion.div>

        {/* INSIGHT CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-['Playfair_Display'] text-3xl text-gray-900 mb-8">
            Insight Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <InsightCard
              category="AI Strategy"
              title="Building Enterprise AI That Actually Scales"
              excerpt="Learn how leading companies are moving beyond pilot projects to deploy AI at scale across their organizations."
              readTime="6 min read"
              gradient="linear-gradient(135deg, #0F3D3E 0%, #2E6F5E 100%)"
              variant="light"
            />
            <InsightCard
              category="Technical Guide"
              title="RAG vs Fine-Tuning: Choosing the Right Approach"
              excerpt="A practical comparison of retrieval-augmented generation and model fine-tuning for your specific use case."
              readTime="8 min read"
              gradient="linear-gradient(135deg, #1E3D36 0%, #84CC16 100%)"
              variant="light"
            />
            <InsightCard
              category="Case Study"
              title="How We Reduced Customer Support Costs by 60%"
              excerpt="A deep dive into implementing an AI-powered support system that handles 10,000+ queries per month."
              readTime="5 min read"
              gradient="linear-gradient(135deg, #2E6F5E 0%, #0F3D3E 100%)"
              variant="light"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}