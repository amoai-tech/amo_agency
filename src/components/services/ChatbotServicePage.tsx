/* ═══════════════════════════════════════════════════════════════
   S2 — Chatbot Service Page (Superside Layout System)
   ═══════════════════════════════════════════════════════════════
   Route: /services/chatbot
   12-section editorial layout modeled on Superside's service pages:
   alternating dark/light bands, sticky left + scrolling right,
   large metrics, hairline rules, Cormorant Garamond + Jost fonts.
   ═══════════════════════════════════════════════════════════════ */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  ArrowRight, MessageSquare, Clock, Zap, Database, TrendingUp,
  Shield, Users, BarChart, Target, Sparkles, Brain, Workflow,
  XCircle, CheckCircle, Globe, Calendar, ShoppingBag, Home,
  Laptop, ChevronDown, Plus, Minus, Bot, Send, Phone
} from 'lucide-react';

/* ─── Color Tokens ──────────────────────────────── */
const cx = {
  darkBg: '#0F1612',
  emerald: '#1A5C3E',
  bright: '#2FA06A',
  parchment: '#F8F6F2',
  white: '#FFFFFF',
  text: '#18170F',
  textOnDark: 'rgba(255,255,255,0.85)',
  muted: '#726F66',
  rule: '#E4E1DA',
};

const serif = 'Cormorant Garamond, Georgia, serif';
const sans = 'Jost, Inter, system-ui, sans-serif';

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO (Dark, full-bleed)
   ═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const pills = ['Website Chat', 'WhatsApp', 'Email', 'CRM Sync', '24/7'];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: cx.darkBg, minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Emerald glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: `radial-gradient(ellipse, ${cx.emerald}33 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-6"
              style={{ fontSize: '0.7rem', fontFamily: sans, fontWeight: 600, color: cx.bright }}
            >
              AI Chatbot Systems
            </p>
            <h1
              className="mb-6"
              style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: 1.1, color: cx.textOnDark }}
            >
              AI Chatbots That Run{' '}
              <br />
              Your Business&nbsp;&mdash;{' '}
              <em style={{ color: cx.bright, fontStyle: 'italic' }}>Not Just Talk</em>
            </h1>
            <p
              className="mb-10 max-w-lg"
              style={{ fontFamily: sans, fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}
            >
              Automate sales, support, and operations with AI chatbots that execute workflows, qualify leads, and sync with your CRM&nbsp;&mdash; 24/7.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-7 py-3.5 transition-all duration-300 group"
                style={{
                  background: cx.emerald,
                  color: cx.white,
                  fontFamily: sans,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  borderRadius: '6px',
                }}
              >
                Build My Chatbot System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="#use-cases"
                className="inline-flex items-center gap-2 px-7 py-3.5 transition-all duration-300"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: sans,
                  fontWeight: 400,
                  fontSize: '0.9rem',
                }}
              >
                See Real Use Cases&nbsp;&rarr;
              </Link>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="px-4 py-1.5"
                  style={{
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: sans,
                    fontSize: '0.75rem',
                    fontWeight: 400,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Floating chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 2 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: cx.white,
                boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                transform: 'rotate(2deg)',
                maxWidth: 400,
                marginLeft: 'auto',
              }}
            >
              {/* Chat header */}
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: cx.emerald }}>
                <Bot className="w-6 h-6 text-white" />
                <div>
                  <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.85rem', color: cx.white }}>AMO AI Assistant</p>
                  <p style={{ fontFamily: sans, fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>Online now</p>
                </div>
                <div className="ml-auto w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              {/* Chat messages */}
              <div className="px-6 py-5 space-y-4" style={{ background: '#f9f9f7' }}>
                {[
                  { from: 'bot', text: "Hi! I'm your AI assistant. How can I help you today?" },
                  { from: 'user', text: 'I need pricing for the enterprise plan' },
                  { from: 'bot', text: "I'll pull up our enterprise options. Are you looking for a team of 50+ or 200+?" },
                  { from: 'user', text: 'Around 120 people' },
                  { from: 'bot', text: "Perfect. I've prepared a custom quote and booked a slot with our solutions team for Thursday at 2pm. Check your email!" },
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.4 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="px-4 py-2.5 max-w-[85%]"
                      style={{
                        borderRadius: msg.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                        background: msg.from === 'user' ? cx.emerald : cx.white,
                        color: msg.from === 'user' ? cx.white : cx.text,
                        fontFamily: sans,
                        fontSize: '0.8rem',
                        fontWeight: 300,
                        lineHeight: 1.5,
                        boxShadow: msg.from === 'bot' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Input bar */}
              <div className="px-6 py-3 flex items-center gap-3" style={{ borderTop: `1px solid ${cx.rule}`, background: cx.white }}>
                <div className="flex-1 px-4 py-2 rounded-full" style={{ background: '#f5f5f0', fontFamily: sans, fontSize: '0.8rem', color: cx.muted }}>
                  Type a message...
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: cx.emerald }}>
                  <Send className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — SOCIAL PROOF TICKER (Light)
   ═══════════════════════════════════════════════════════════════ */
function SocialProofTicker() {
  const logos = ['Shopify', 'HubSpot', 'Salesforce', 'Typeform', 'Intercom', 'Calendly', 'Stripe', 'Slack'];
  const doubled = [...logos, ...logos];

  return (
    <section
      style={{ background: cx.parchment, borderTop: `1px solid ${cx.rule}`, borderBottom: `1px solid ${cx.rule}` }}
      className="py-12 overflow-hidden"
    >
      <p
        className="text-center mb-8 uppercase tracking-[0.15em]"
        style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 500, color: cx.muted }}
      >
        Trusted by teams across fashion, real estate, SaaS, and e-commerce
      </p>
      <div className="relative">
        <div className="flex animate-[marquee_30s_linear_infinite]">
          {doubled.map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex-shrink-0 mx-10 flex items-center justify-center opacity-40 hover:opacity-90 transition-opacity cursor-default"
              style={{ fontFamily: sans, fontWeight: 600, fontSize: '1.1rem', color: cx.text, letterSpacing: '0.03em' }}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — PROBLEM / SOLUTION SPLIT (Light)
   ═══════════════════════════════════════════════════════════════ */
function ProblemSolutionSplit() {
  const problems = [
    'Only answer frequently asked questions',
    "Can't connect to your CRM or internal tools",
    'Create more work instead of saving time',
    'Drop context between sessions',
    'Can\'t take action beyond sending links',
  ];

  const solutions = [
    { icon: Zap, title: 'Qualify leads', desc: 'Score and route high-intent prospects automatically' },
    { icon: Calendar, title: 'Book meetings', desc: 'Sync with calendars and confirm in real-time' },
    { icon: Database, title: 'Update your CRM', desc: 'Every conversation logged with full context' },
    { icon: TrendingUp, title: 'Trigger workflows', desc: 'Connect to Zapier, Make, or custom APIs' },
    { icon: Shield, title: 'Escalate to humans', desc: 'Only when complexity truly requires it' },
  ];

  return (
    <section style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: cx.text, lineHeight: 1.15 }}>
            Most chatbots just <em style={{ color: cx.bright }}>answer</em>.
            <br />
            Ours <em style={{ color: cx.bright }}>execute</em>.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-0">
          {/* Left — Problems */}
          <motion.div
            className="lg:pr-12"
            style={{ borderRight: `1px solid ${cx.rule}` }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-8"
              style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.muted }}
            >
              Common Problem
            </p>
            <div className="space-y-5">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#B8B3A8' }} />
                  <span style={{ fontFamily: sans, fontWeight: 400, fontSize: '0.9rem', color: cx.muted, lineHeight: 1.6 }}>
                    {p}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Solutions */}
          <motion.div
            className="lg:pl-12"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-8"
              style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
            >
              AMO AI Approach
            </p>
            <div className="space-y-0">
              {solutions.map((s, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 py-5"
                  style={{ borderBottom: `1px solid ${cx.rule}` }}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <s.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: cx.bright }} />
                  <div>
                    <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.9rem', color: cx.text }}>{s.title}</p>
                    <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.8rem', color: cx.muted, marginTop: 2 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom callout */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.4rem', fontStyle: 'italic', color: cx.muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            "The difference isn't features. It's whether the conversation ends in a real business outcome."
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — METRICS BAND (Dark)
   ═══════════════════════════════════════════════════════════════ */
function MetricsBand() {
  const stats = [
    { number: '60-80%', label: 'Conversations automated', desc: 'Most queries handled end-to-end without human intervention' },
    { number: '3\u00d7', label: 'Faster speed to first reply', desc: 'Instant responses that capture leads before competitors' },
    { number: '24/7', label: 'Always available', desc: 'Never miss a lead, even outside business hours' },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: cx.darkBg }}>
      {/* Dot texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
        style={{ background: `radial-gradient(ellipse, ${cx.emerald}22 0%, transparent 70%)` }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.p
          className="text-center uppercase tracking-[0.2em] mb-16"
          style={{ fontFamily: sans, fontSize: '0.7rem', fontWeight: 600, color: cx.bright }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The impact of deploying smarter
        </motion.p>

        <div className="grid md:grid-cols-3 gap-0">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center py-8 px-6"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <p style={{ fontFamily: serif, fontWeight: 300, fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: cx.textOnDark, lineHeight: 1 }}>
                {stat.number}
              </p>
              <p
                className="mt-3 uppercase tracking-[0.15em]"
                style={{ fontFamily: sans, fontWeight: 500, fontSize: '0.75rem', color: cx.textOnDark }}
              >
                {stat.label}
              </p>
              <p
                className="mt-2 max-w-[240px] mx-auto"
                style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}
              >
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — CORE CAPABILITIES (Light, sticky left)
   ═══════════════════════════════════════════════════════════════ */
function CoreCapabilities() {
  const dayOne = [
    { icon: Clock, title: '24/7 Instant Responses', desc: 'No missed leads or slow replies — ever' },
    { icon: Brain, title: 'Intent Detection', desc: 'Understands what users actually want, not just keywords' },
    { icon: Database, title: 'Knowledge Base Answers', desc: 'RAG-powered accurate responses from your docs' },
    { icon: Users, title: 'Human Handoff', desc: 'Smart escalation only when needed' },
    { icon: MessageSquare, title: 'Multi-Channel', desc: 'Website, WhatsApp, Email from one system' },
  ];

  const growth = [
    { icon: Workflow, title: 'Workflow Execution', desc: 'Refunds, bookings, and updates handled automatically' },
    { icon: BarChart, title: 'CRM Sync', desc: 'Every conversation updates leads and contacts' },
    { icon: Target, title: 'Lead Qualification', desc: 'Sales only talks to high-intent prospects' },
    { icon: Sparkles, title: 'Personalization', desc: 'Tailored responses based on customer data' },
    { icon: TrendingUp, title: 'Analytics & Insights', desc: 'See what customers ask and where deals drop' },
  ];

  const all = [
    ...dayOne.map((f, i) => ({ ...f, tag: 'DAY ONE', tagColor: cx.bright, num: i + 1 })),
    ...growth.map((f, i) => ({ ...f, tag: 'GROWTH', tagColor: '#3B82F6', num: i + 6 })),
  ];

  return (
    <section style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16">
          {/* Left sticky */}
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
            >
              Complete Platform
            </p>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: '2.6rem', color: cx.text, lineHeight: 1.15, marginBottom: 16 }}>
              Built for day-one value and long-term scale
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.95rem', color: cx.muted, lineHeight: 1.7, marginBottom: 24 }}>
              Every feature ships production-ready. Start automating conversations on day one, then layer in advanced capabilities as your needs grow.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 group"
              style={{ fontFamily: sans, fontWeight: 500, fontSize: '0.85rem', color: cx.emerald }}
            >
              View all capabilities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right scrolling rows */}
          <div>
            {all.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-5 py-5"
                style={{ borderBottom: `1px solid ${cx.rule}` }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * i, duration: 0.4 }}
              >
                <span
                  className="flex-shrink-0 w-8 text-right"
                  style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.75rem', color: cx.muted }}
                >
                  {String(f.num).padStart(2, '0')}
                </span>
                <f.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: f.tagColor }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.85rem', color: cx.text }}>{f.title}</p>
                    <span
                      className="px-2 py-0.5 rounded"
                      style={{
                        fontFamily: sans,
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: `${f.tagColor}18`,
                        color: f.tagColor,
                      }}
                    >
                      {f.tag}
                    </span>
                  </div>
                  <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.8rem', color: cx.muted, lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — REAL-WORLD WORKFLOWS (Dark)
   ═══════════════════════════════════════════════════════════════ */
function RealWorldWorkflows() {
  const workflows = [
    {
      industry: 'E-commerce',
      title: 'Order Status + Upsell Flow',
      quote: '"Where is my order?"',
      steps: [
        { num: 1, text: 'Customer asks about order status' },
        { num: 2, text: 'Bot retrieves tracking data from Shopify' },
        { num: 3, text: 'Sends tracking link + delivery ETA' },
        { num: 4, text: 'Offers personalized product recommendation', highlight: true },
      ],
      outcome: 'Support tickets reduced by 70%',
      metric: '70%',
      metricLabel: 'Fewer Tickets',
    },
    {
      industry: 'Real Estate',
      title: 'Lead Qualification Pipeline',
      quote: '"I want to see the apartment on Elm Street"',
      steps: [
        { num: 1, text: 'Visitor asks about a property listing' },
        { num: 2, text: 'Bot qualifies budget, timeline, preferences' },
        { num: 3, text: 'Scores lead (1-10) and books viewing' },
        { num: 4, text: 'Notifies agent with full lead brief', highlight: true },
      ],
      outcome: '3\u00d7 faster speed-to-lead',
      metric: '3\u00d7',
      metricLabel: 'Faster Response',
    },
    {
      industry: 'SaaS',
      title: 'Demo Booking Automation',
      quote: '"Can I get a demo of the enterprise plan?"',
      steps: [
        { num: 1, text: 'Prospect requests a demo on website' },
        { num: 2, text: 'Bot qualifies company size + use case' },
        { num: 3, text: 'Pulls available calendar slots for AE' },
        { num: 4, text: 'Confirms booking, sends calendar invite', highlight: true },
      ],
      outcome: 'Pipeline velocity increased 2.4\u00d7',
      metric: '2.4\u00d7',
      metricLabel: 'Pipeline Velocity',
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: cx.darkBg }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
          >
            Not theoretical &mdash; deployed in production
          </p>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: cx.textOnDark, lineHeight: 1.15 }}>
            Real workflows. <em style={{ color: cx.bright }}>Real outcomes.</em>
          </h2>
        </motion.div>

        <div className="space-y-12">
          {workflows.map((w, wi) => (
            <motion.div
              key={wi}
              className="rounded-2xl p-8 lg:p-10"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: wi * 0.1, duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left: Steps */}
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full mb-5"
                    style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, background: `${cx.emerald}44`, color: cx.bright }}
                  >
                    {w.industry}
                  </span>
                  <div className="space-y-4">
                    {w.steps.map((step) => (
                      <div key={step.num} className="flex items-start gap-4">
                        <div
                          className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center"
                          style={{
                            background: step.highlight ? cx.emerald : 'rgba(255,255,255,0.08)',
                            color: step.highlight ? cx.white : 'rgba(255,255,255,0.5)',
                            fontFamily: sans,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          {step.num}
                        </div>
                        <p
                          className="pt-1"
                          style={{
                            fontFamily: sans,
                            fontWeight: step.highlight ? 500 : 300,
                            fontSize: '0.85rem',
                            color: step.highlight ? cx.bright : 'rgba(255,255,255,0.65)',
                            lineHeight: 1.5,
                          }}
                        >
                          {step.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Text */}
                <div className="flex flex-col justify-between">
                  <div>
                    <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '1.2rem', color: cx.textOnDark, marginBottom: 8 }}>
                      {w.title}
                    </p>
                    <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
                      {w.quote}
                    </p>
                    <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.6rem', fontStyle: 'italic', color: cx.bright, lineHeight: 1.3 }}>
                      {w.outcome}
                    </p>
                  </div>
                  <div
                    className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-lg self-start"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <span style={{ fontFamily: serif, fontWeight: 300, fontSize: '2rem', color: cx.textOnDark }}>{w.metric}</span>
                    <span style={{ fontFamily: sans, fontWeight: 400, fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {w.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — INDUSTRY USE CASES (Light)
   ═══════════════════════════════════════════════════════════════ */
function IndustryUseCasesSection() {
  const industries = [
    {
      icon: ShoppingBag, name: 'E-commerce & Retail',
      uses: ['Product Q&A and recommendations', 'Order tracking & returns', 'Cart recovery automation', 'Checkout upsells'],
      outcome: 'More conversions, same traffic',
      metric: '+32%', metricLabel: 'Conv. Rate',
    },
    {
      icon: Home, name: 'Real Estate',
      uses: ['WhatsApp lead handling 24/7', 'Property qualification', 'Tour scheduling & reminders', 'Instant pricing info'],
      outcome: 'Win deals faster than competitors',
      metric: '3\u00d7', metricLabel: 'Response Speed',
    },
    {
      icon: Calendar, name: 'Events & Tourism',
      uses: ['Ticket availability & booking', 'Itinerary planning', 'Experience upsells', 'Post-event feedback'],
      outcome: 'Higher revenue per guest',
      metric: '+45%', metricLabel: 'Revenue/Guest',
    },
    {
      icon: Laptop, name: 'SaaS & B2B',
      uses: ['Demo booking & qualification', 'Onboarding assistance', 'Churn prevention', 'Feature request collection'],
      outcome: 'Better retention & pipeline',
      metric: '92%', metricLabel: 'Retention',
    },
  ];

  return (
    <section id="use-cases" style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
          >
            Industry Solutions
          </p>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: cx.text, lineHeight: 1.15 }}>
            Tailored for your business model.
            <br />
            Not just <em style={{ color: cx.bright }}>any</em> business.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {industries.map((ind, i) => (
            <motion.div
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{ background: cx.white, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: `1px solid ${cx.rule}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              {/* Top accent */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cx.emerald}, ${cx.bright})` }} />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: `${cx.bright}15` }}
                  >
                    <ind.icon className="w-6 h-6" style={{ color: cx.bright }} />
                  </div>
                  <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '1rem', color: cx.text }}>
                    {ind.name}
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  {ind.uses.map((u, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cx.bright }} />
                      <span style={{ fontFamily: sans, fontWeight: 400, fontSize: '0.85rem', color: cx.muted, lineHeight: 1.5 }}>
                        {u}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${cx.rule}`, paddingTop: 16 }} className="flex items-center justify-between">
                  <div>
                    <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.1rem', fontStyle: 'italic', color: cx.bright }}>
                      {ind.outcome}
                    </p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.6rem', color: cx.text }}>{ind.metric}</p>
                    <p style={{ fontFamily: sans, fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: cx.muted }}>
                      {ind.metricLabel}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — AGENT ARCHITECTURE (Dark, radial diagram)
   ═══════════════════════════════════════════════════════════════ */
function AgentArchitecture() {
  const agents = [
    { name: 'Analyst', role: 'Intent' },
    { name: 'Retriever', role: 'Knowledge' },
    { name: 'Ops', role: 'Execution' },
    { name: 'Scorer', role: 'Quality' },
    { name: 'Controller', role: 'Safety' },
    { name: 'Content', role: 'Response' },
  ];

  const pillars = [
    { icon: CheckCircle, title: 'Accurate', desc: 'RAG-powered retrieval from verified sources eliminates hallucinations and provides consistent, reliable answers.' },
    { icon: Shield, title: 'Safe', desc: 'Controller agent enforces business rules, content policies, and approval gates before any action is executed.' },
    { icon: BarChart, title: 'Auditable', desc: 'Full conversation logs, decision traces, and action records for compliance and continuous improvement.' },
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: cx.darkBg }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${cx.emerald}18 0%, transparent 60%)`,
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3rem)', color: cx.textOnDark, lineHeight: 1.15 }}>
            One conversation. Six specialists.
            <br />
            <em style={{ color: cx.bright }}>Working in parallel.</em>
          </h2>
        </motion.div>

        {/* Radial diagram */}
        <div className="relative max-w-[600px] mx-auto mb-16">
          {/* Center node */}
          <motion.div
            className="mx-auto w-32 h-32 rounded-full flex flex-col items-center justify-center z-10 relative"
            style={{ background: cx.emerald, boxShadow: `0 0 60px ${cx.emerald}66` }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.3 }}
          >
            <Bot className="w-8 h-8 text-white mb-1" />
            <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.7rem', color: cx.white, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Orchestrator
            </p>
          </motion.div>

          {/* Surrounding agents */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {agents.map((a, i) => (
              <motion.div
                key={i}
                className="text-center p-4 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              >
                <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.8rem', color: cx.textOnDark }}>{a.name}</p>
                <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>{a.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Approval gate bar */}
        <motion.div
          className="rounded-lg px-6 py-4 flex items-center justify-center gap-3 mb-16 max-w-lg mx-auto"
          style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Shield className="w-5 h-5" style={{ color: '#F59E0B' }} />
          <p style={{ fontFamily: sans, fontWeight: 500, fontSize: '0.85rem', color: '#F59E0B' }}>
            Human-in-the-Loop &mdash; Nothing executes without your approval
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
            >
              <p.icon className="w-6 h-6 mx-auto mb-4" style={{ color: cx.bright }} />
              <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.9rem', color: cx.textOnDark, marginBottom: 8 }}>{p.title}</p>
              <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — BUSINESS BENEFITS (Light, sticky left)
   ═══════════════════════════════════════════════════════════════ */
function BusinessBenefitsSection() {
  const benefits = [
    { metric: '10-40hrs', title: 'Time Saved Weekly', desc: 'Eliminate repetitive conversations and manual follow-ups' },
    { metric: '2-3\u00d7', title: 'Conversion Increase', desc: 'Instant responses and intelligent qualification boost sales' },
    { metric: '60-80%', title: 'Automation Rate', desc: 'Most conversations handled without human intervention' },
    { metric: '$0', title: 'Additional Hiring', desc: 'Scale customer interactions without growing headcount' },
    { metric: '6-8 wk', title: 'Time to ROI', desc: 'Start seeing measurable results within two months' },
  ];

  return (
    <section style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16">
          {/* Left sticky */}
          <motion.div
            className="lg:sticky lg:top-32 lg:self-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="uppercase tracking-[0.2em] mb-4"
              style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
            >
              Executive View
            </p>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: '2.6rem', color: cx.text, lineHeight: 1.15 }}>
              Real, measurable impact on your bottom line
            </h2>
          </motion.div>

          {/* Right: rows */}
          <div>
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-6 py-6"
                style={{ borderBottom: `1px solid ${cx.rule}` }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
              >
                <span
                  className="flex-shrink-0 w-28 text-right"
                  style={{ fontFamily: serif, fontWeight: 400, fontSize: '2.1rem', color: cx.bright, lineHeight: 1 }}
                >
                  {b.metric}
                </span>
                <div>
                  <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.95rem', color: cx.text, marginBottom: 4 }}>
                    {b.title}
                  </p>
                  <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.8rem', color: cx.muted, lineHeight: 1.5 }}>
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 10 — TRUST / TESTIMONIALS (Light)
   ═══════════════════════════════════════════════════════════════ */
function TrustSection() {
  const testimonials = [
    {
      quote: 'Our chatbot handles 73% of support tickets now. We saved two full-time hires in the first quarter.',
      author: 'Head of Operations',
      company: 'Fashion E-commerce Brand',
    },
    {
      quote: 'Leads that come through the chatbot close 2.4\u00d7 faster because they arrive pre-qualified and booked.',
      author: 'Sales Director',
      company: 'B2B SaaS Platform',
    },
    {
      quote: 'We went from 18-hour average response time to under 30 seconds. Our conversion rate doubled.',
      author: 'CEO',
      company: 'Real Estate Agency',
    },
  ];

  return (
    <section style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="uppercase tracking-[0.2em] mb-4"
            style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
          >
            Client Results
          </p>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: cx.text, lineHeight: 1.15 }}>
            Real outcomes from <em style={{ color: cx.bright }}>real teams</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="group rounded-xl p-8"
              style={{ background: cx.white, border: `1px solid ${cx.rule}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
            >
              <p style={{ fontFamily: serif, fontWeight: 400, fontSize: '1.15rem', fontStyle: 'italic', color: cx.text, lineHeight: 1.5, marginBottom: 24 }}>
                "{t.quote}"
              </p>
              <div style={{ borderTop: `1px solid ${cx.rule}`, paddingTop: 16 }}>
                <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.85rem', color: cx.text }}>{t.author}</p>
                <p style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.75rem', color: cx.muted }}>{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 11 — FAQ (Light, accordion)
   ═══════════════════════════════════════════════════════════════ */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'How long does it take to launch a chatbot?', a: 'Most projects launch within 3-6 weeks depending on complexity. Simple FAQ bots can go live in under a week. Enterprise deployments with CRM integration and custom workflows typically take 4-6 weeks.' },
    { q: 'What platforms do your chatbots work on?', a: 'We deploy across website widgets, WhatsApp Business API, Facebook Messenger, Instagram DMs, email, and SMS. All channels connect to one unified dashboard.' },
    { q: 'Will the chatbot sound like a robot?', a: 'No. We fine-tune the personality, tone, and language to match your brand voice. Conversations feel natural, professional, and on-brand. We also support multiple languages.' },
    { q: 'What happens when the bot can\'t answer?', a: 'Smart escalation to a human agent with full conversation context. The handoff is seamless — your team sees everything the bot discussed, so the customer never has to repeat themselves.' },
    { q: 'Do I need technical expertise to manage it?', a: 'Not at all. We provide a simple dashboard for editing responses, viewing analytics, and managing workflows. Our team handles all technical maintenance and updates.' },
    { q: 'How do you measure ROI?', a: 'We track conversations automated, leads qualified, bookings made, tickets deflected, and response times. You get a monthly report with clear metrics tied to business outcomes.' },
  ];

  return (
    <section style={{ background: cx.parchment }} className="py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: '2.6rem', color: cx.text, lineHeight: 1.15 }}>
              Frequently asked <em style={{ color: cx.bright }}>questions</em>
            </h2>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                style={{ borderBottom: `1px solid ${cx.rule}` }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  className="w-full flex items-center justify-between py-5 text-left group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span style={{ fontFamily: sans, fontWeight: 600, fontSize: '0.95rem', color: cx.text, paddingRight: 16 }}>
                    {faq.q}
                  </span>
                  {openIndex === i ? (
                    <Minus className="w-5 h-5 flex-shrink-0" style={{ color: cx.bright }} />
                  ) : (
                    <Plus className="w-5 h-5 flex-shrink-0" style={{ color: cx.bright }} />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5" style={{ fontFamily: sans, fontWeight: 300, fontSize: '0.85rem', color: cx.muted, lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 12 — CLOSING CTA (Dark, full-bleed)
   ═══════════════════════════════════════════════════════════════ */
function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ background: cx.darkBg, minHeight: '55vh' }}
    >
      {/* Emerald glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
        style={{ background: `radial-gradient(ellipse, ${cx.emerald}22 0%, transparent 60%)` }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="uppercase tracking-[0.2em] mb-6"
            style={{ fontFamily: sans, fontSize: '0.65rem', fontWeight: 600, color: cx.bright }}
          >
            Ready to build
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: serif,
              fontWeight: 400,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              color: cx.textOnDark,
              lineHeight: 1.1,
            }}
          >
            Your business runs 24/7.
            <br />
            <em style={{ color: cx.bright, fontStyle: 'italic' }}>Your AI should too.</em>
          </h2>
          <p
            className="max-w-md mx-auto mb-10"
            style={{ fontFamily: sans, fontWeight: 300, fontSize: '1rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
          >
            Get a custom chatbot strategy designed for your business, industry, and goals.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 transition-all duration-300 group"
            style={{
              background: cx.emerald,
              color: cx.white,
              fontFamily: sans,
              fontWeight: 500,
              fontSize: '0.95rem',
              borderRadius: '6px',
              height: 52,
            }}
          >
            Design My Chatbot System
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="mt-6">
            <Link
              to="#use-cases"
              style={{ fontFamily: sans, fontWeight: 400, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}
            >
              See use cases by industry
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ChatbotServicePage() {
  return (
    <div>
      <HeroSection />
      <SocialProofTicker />
      <ProblemSolutionSplit />
      <MetricsBand />
      <CoreCapabilities />
      <RealWorldWorkflows />
      <IndustryUseCasesSection />
      <AgentArchitecture />
      <BusinessBenefitsSection />
      <TrustSection />
      <FAQSection />
      <ClosingCTA />
    </div>
  );
}
