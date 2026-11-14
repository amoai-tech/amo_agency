// C29-LAYOUT — Three-Panel Wizard Shell
// Left sidebar (steps + context) | Center content | Right panel (guidance)
// Step 5 breaks to single-column centered layout
// Reactive auto-save indicator in header

import { useWizard, type SaveStatus } from './WizardContext';
import { WizardSidebar } from './WizardSidebar';
import { WizardFooter } from './WizardFooter';
import { Sun, Loader2, Check, Cloud } from 'lucide-react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';

function SaveIndicator({ saveStatus }: { saveStatus: SaveStatus }) {
  return (
    <AnimatePresence mode="wait">
      {saveStatus === 'saving' && (
        <motion.span
          key="saving"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs flex items-center gap-1.5"
          style={{ color: '#9CA39B' }}
        >
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="hidden sm:inline">Saving…</span>
        </motion.span>
      )}
      {saveStatus === 'saved' && (
        <motion.span
          key="saved"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs flex items-center gap-1.5"
          style={{ color: '#00875A' }}
        >
          <Check className="w-3 h-3" />
          <span className="hidden sm:inline">Saved</span>
        </motion.span>
      )}
      {saveStatus === 'idle' && (
        <motion.span
          key="idle"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="text-xs flex items-center gap-1.5"
          style={{ color: '#C4C4BC' }}
        >
          <Cloud className="w-3 h-3" />
          <span className="hidden sm:inline">Draft</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function MobileSaveIndicator({ saveStatus }: { saveStatus: SaveStatus }) {
  return (
    <AnimatePresence mode="wait">
      {saveStatus === 'saving' && (
        <motion.span
          key="saving-m"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs flex items-center gap-1"
          style={{ color: '#9CA39B' }}
        >
          <Loader2 className="w-3 h-3 animate-spin" />
        </motion.span>
      )}
      {saveStatus === 'saved' && (
        <motion.span
          key="saved-m"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs flex items-center gap-1"
          style={{ color: '#00875A' }}
        >
          <Check className="w-3 h-3" />
          Saved
        </motion.span>
      )}
      {saveStatus === 'idle' && (
        <motion.span
          key="idle-m"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs"
          style={{ color: '#C4C4BC' }}
        >
          Draft
        </motion.span>
      )}
    </AnimatePresence>
  );
}

interface WizardLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export function WizardLayout({ children, rightPanel }: WizardLayoutProps) {
  const { state, saveStatus } = useWizard();
  const isStep5 = state.currentStep === 5;
  const STEPS_META = [
    { number: 1, label: 'Business Context' },
    { number: 2, label: 'Industry Diagnostics' },
    { number: 3, label: 'System Recommendations' },
    { number: 4, label: 'Executive Summary' },
    { number: 5, label: 'Launch Project' },
  ];
  const currentLabel = STEPS_META.find(s => s.number === state.currentStep)?.label || '';

  if (isStep5) {
    // Step 5: Single-column centered layout
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#F5F5F0' }}>
        {/* Header */}
        <header className="border-b" style={{ borderColor: '#E8E8E4', backgroundColor: '#FFFFFF' }}>
          <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" style={{ color: '#1A1A1A' }}>
              <Sun className="w-5 h-5" style={{ color: '#00875A' }} />
              <span style={{ fontFamily: 'Georgia, serif' }}>AMO AI</span>
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  // Steps 1-4: Three-panel layout
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5F5F0' }}>
      {/* Header */}
      <header className="border-b shrink-0" style={{ borderColor: '#E8E8E4', backgroundColor: '#FFFFFF' }}>
        <div className="max-w-[1440px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" style={{ color: '#1A1A1A' }}>
            <Sun className="w-5 h-5" style={{ color: '#00875A' }} />
            <span style={{ fontFamily: 'Georgia, serif' }}>AMO AI</span>
          </Link>
          <span className="text-sm hidden md:block" style={{ color: '#6B6B63' }}>
            Step {state.currentStep}: {currentLabel}
          </span>
          <SaveIndicator saveStatus={saveStatus} />
        </div>
      </header>

      {/* Mobile step indicator */}
      <div className="md:hidden border-b px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
        <span className="text-sm" style={{ color: '#1A1A1A' }}>Step {state.currentStep}/5</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: state.completedSteps.includes(n) ? '#00875A'
                  : n === state.currentStep ? '#00875A'
                  : '#E8E8E4',
                opacity: n === state.currentStep ? 1 : state.completedSteps.includes(n) ? 0.7 : 0.4,
              }}
            />
          ))}
        </div>
        <MobileSaveIndicator saveStatus={saveStatus} />
      </div>

      {/* Three-panel body */}
      <div className="flex-1 flex max-w-[1440px] mx-auto w-full">
        {/* Left Sidebar — hidden on mobile */}
        <aside className="hidden lg:block w-60 shrink-0 border-r overflow-y-auto" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
          <WizardSidebar />
        </aside>

        {/* Center Panel */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto px-6 py-10 md:py-12">
            {children}
          </div>
        </main>

        {/* Right Panel — hidden on mobile + tablet */}
        {rightPanel && (
          <aside className="hidden xl:block w-80 shrink-0 border-l overflow-y-auto" style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}>
            <div className="p-6">
              {rightPanel}
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      <WizardFooter />
    </div>
  );
}