// C95-SETTINGS — Account settings + System Health diagnostics at /app/settings
// Tab layout: Account (profile, org, session) and System Health (endpoint tests).
// Mobile-first responsive. BCG style.

import { useAuth } from '../AuthContext';
import { useDashboardData } from '../../lib/hooks/useDashboardData';
import { motion } from 'motion/react';
import { User, Building2, Shield, Clock, Mail, Key, LogOut, ExternalLink, Activity } from 'lucide-react';
import { useState } from 'react';
import SystemHealthPanel from './settings/SystemHealthPanel';

type Tab = 'account' | 'health';

export default function SettingsPage() {
  const { user, accessToken, signOut } = useAuth();
  const { data } = useDashboardData(user?.id || null, accessToken);
  const [signingOut, setSigningOut] = useState(false);
  const [tab, setTab] = useState<Tab>('account');

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'health', label: 'System Health', icon: Activity },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-2xl"
    >
      {/* Tab Bar */}
      <div className="flex gap-1 border-b border-[#E8E8E4]">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-colors relative min-h-[44px]"
              style={{
                color: isActive ? '#00875A' : '#6B6B63',
                borderBottom: isActive ? '2px solid #00875A' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              <Icon className="w-4 h-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {tab === 'account' && (
        <div className="space-y-6">
          {/* Account Section */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#00875A]" />
              <h2 className="font-[Georgia,serif] text-base sm:text-lg font-semibold text-[#1A1A1A]">
                Account
              </h2>
            </div>

            <div className="bg-white rounded border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Name</p>
                  <p className="text-sm text-[#1A1A1A] font-medium truncate">
                    {user?.name || 'Not set'}
                  </p>
                </div>
                <User className="w-4 h-4 text-[#9CA39B] shrink-0" />
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-[#1A1A1A] truncate">
                    {user?.email || 'Unknown'}
                  </p>
                </div>
                <Mail className="w-4 h-4 text-[#9CA39B] shrink-0" />
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">User ID</p>
                  <p className="text-xs font-mono text-[#6B6B63] truncate">
                    {user?.id || '---'}
                  </p>
                </div>
                <Key className="w-4 h-4 text-[#9CA39B] shrink-0" />
              </div>
            </div>
          </section>

          {/* Organization Section */}
          {data?.org && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-[#00875A]" />
                <h2 className="font-[Georgia,serif] text-base sm:text-lg font-semibold text-[#1A1A1A]">
                  Organization
                </h2>
              </div>

              <div className="bg-white rounded border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Company</p>
                    <p className="text-sm text-[#1A1A1A] font-medium truncate">{data.org.name}</p>
                  </div>
                  <Building2 className="w-4 h-4 text-[#9CA39B] shrink-0" />
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Industry</p>
                    <p className="text-sm text-[#1A1A1A] truncate">{data.org.industry}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Size</p>
                    <p className="text-sm text-[#1A1A1A] truncate">{data.org.size}</p>
                  </div>
                </div>

                {data.org.description && (
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Description</p>
                    <p className="text-sm text-[#6B6B63] leading-relaxed line-clamp-3">{data.org.description}</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#9CA39B] mt-2 px-1">
                Organization data is derived from your wizard analysis. Re-run the wizard to update.
              </p>
            </section>
          )}

          {/* Session & Security */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#00875A]" />
              <h2 className="font-[Georgia,serif] text-base sm:text-lg font-semibold text-[#1A1A1A]">
                Session & Security
              </h2>
            </div>

            <div className="bg-white rounded border border-[#E8E8E4] divide-y divide-[#E8E8E4]">
              {data?.sessionId && (
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Wizard Session</p>
                    <p className="text-xs font-mono text-[#6B6B63] truncate">{data.sessionId}</p>
                  </div>
                  <Clock className="w-4 h-4 text-[#9CA39B] shrink-0" />
                </div>
              )}

              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-[#9CA39B] uppercase tracking-wider mb-0.5">Authentication</p>
                  <p className="text-sm text-[#1A1A1A]">
                    {accessToken ? 'Active session' : 'No active session'}
                  </p>
                </div>
                <Shield className="w-4 h-4 text-[#00875A] shrink-0" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className="space-y-3">
            <a
              href="/wizard"
              className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white rounded border border-[#E8E8E4] hover:bg-[#F5F5F0] transition-colors min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-[#00875A]" />
                <span className="text-sm text-[#1A1A1A]">Re-run Discovery Wizard</span>
              </div>
              <span className="text-xs text-[#9CA39B]">Update your analysis</span>
            </a>

            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-3 w-full px-4 sm:px-5 py-3 bg-white rounded border border-[#E8E8E4] hover:bg-[#FEF2F2] hover:border-[#FECACA] transition-colors text-left min-h-[48px] disabled:opacity-50"
            >
              <LogOut className="w-4 h-4 text-[#DC2626]" />
              <span className="text-sm text-[#DC2626]">
                {signingOut ? 'Signing out...' : 'Sign Out'}
              </span>
            </button>
          </section>

          {/* Version */}
          <div className="text-xs text-[#9CA39B] text-center pt-4 pb-2">
            AMO AI · Dashboard v0.18.0
          </div>
        </div>
      )}

      {tab === 'health' && <SystemHealthPanel />}
    </motion.div>
  );
}
