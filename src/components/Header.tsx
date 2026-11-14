// C01 — Header / Navigation
// BCG design system: charcoal text, green accents, Georgia serif logo
// 4px border radius, no glassmorphism, no rounded-full pills

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, ArrowRight, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthContext';

export default function Header() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/solutions', label: 'Solutions' },
    { path: '/services', label: 'Services' },
    { path: '/industries', label: 'Industries' },
    { path: '/agents', label: 'AI Agents' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    await signOut();
  };

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4' }}
      >
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded transition-colors hover:bg-gray-50"
                style={{ border: '1px solid #E8E8E4', borderRadius: '4px' }}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" style={{ color: '#1A1A1A' }} />
                ) : (
                  <Menu className="w-4 h-4" style={{ color: '#1A1A1A' }} />
                )}
              </button>

              <Link
                to="/"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{ color: '#1A1A1A' }}
              >
                <Sun className="w-5 h-5" style={{ color: '#00875A' }} />
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem' }}>
                  Sun AI Agency
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3.5 py-2 text-sm transition-colors"
                  style={{
                    color: isActive(item.path) ? '#1A1A1A' : '#6B6B63',
                    borderBottom: isActive(item.path) ? '2px solid #00875A' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-3 flex items-center gap-2">
                {/* User menu or Login link */}
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm border rounded transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#E8E8E4', borderRadius: '4px', color: '#1A1A1A' }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{ backgroundColor: '#E6F4ED', color: '#00875A' }}
                      >
                        {(user.name || user.email).charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{user.name || user.email.split('@')[0]}</span>
                      <ChevronDown className="w-3 h-3" style={{ color: '#9CA39B' }} />
                    </button>

                    {userMenuOpen && (
                      <div
                        className="absolute right-0 mt-1.5 w-56 border rounded shadow-lg overflow-hidden"
                        style={{ backgroundColor: '#FFFFFF', borderColor: '#E8E8E4', borderRadius: '4px', zIndex: 60 }}
                      >
                        <div className="px-4 py-3 border-b" style={{ borderColor: '#F0F0EC' }}>
                          <p className="text-sm truncate" style={{ color: '#1A1A1A' }}>{user.name || 'User'}</p>
                          <p className="text-xs truncate" style={{ color: '#9CA39B' }}>{user.email}</p>
                        </div>
                        <Link
                          to="/wizard"
                          className="flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                          style={{ color: '#1A1A1A' }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-3.5 h-3.5" style={{ color: '#6B6B63' }} />
                          My Wizard Sessions
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm w-full text-left transition-colors hover:bg-gray-50"
                          style={{ color: '#DC2626' }}
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm border rounded transition-colors hover:bg-gray-50"
                    style={{ borderColor: '#E8E8E4', borderRadius: '4px', color: '#1A1A1A' }}
                  >
                    <User className="w-3.5 h-3.5" />
                    Sign In
                  </Link>
                )}

                <Link
                  to="/wizard"
                  className="flex items-center gap-1.5 px-5 py-2 text-sm transition-colors"
                  style={{
                    backgroundColor: '#00875A',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                  }}
                >
                  Start Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-200 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(26, 26, 26, 0.15)' }}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-16 left-0 right-0 border-b transition-transform duration-200 ease-out ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: '#E8E8E4',
            maxHeight: 'calc(100dvh - 4rem)',
            overflowY: 'auto',
          }}
        >
          <nav className="px-6 py-5">
            {/* Primary nav links */}
            <div className="space-y-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded transition-colors"
                  style={{
                    backgroundColor: isActive(item.path) ? '#F0FAF5' : 'transparent',
                    borderRadius: '4px',
                    borderLeft: isActive(item.path) ? '2px solid #00875A' : '2px solid transparent',
                  }}
                >
                  <span
                    className="text-sm"
                    style={{
                      color: isActive(item.path) ? '#1A1A1A' : '#6B6B63',
                      fontFamily: isActive(item.path) ? 'Georgia, serif' : 'inherit',
                    }}
                  >
                    {item.label}
                  </span>
                  {isActive(item.path) && (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00875A' }} />
                  )}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t" style={{ borderColor: '#E8E8E4' }} />

            {/* Sub-pages */}
            <div className="space-y-0.5">
              <p
                className="px-4 py-2 text-xs uppercase tracking-widest"
                style={{ color: '#9CA39B', letterSpacing: '0.08em' }}
              >
                Industries
              </p>
              {[
                { path: '/industries/e-commerce', label: 'E-Commerce' },
                { path: '/industries/fashion', label: 'Fashion' },
                { path: '/industries/travel', label: 'Travel' },
                { path: '/financial', label: 'Financial' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-2.5 rounded text-sm transition-colors"
                  style={{
                    color: isActive(item.path) ? '#1A1A1A' : '#6B6B63',
                    backgroundColor: isActive(item.path) ? '#F0FAF5' : 'transparent',
                    borderRadius: '4px',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Account section */}
            <div className="my-4 border-t" style={{ borderColor: '#E8E8E4' }} />
            {user ? (
              <div className="px-4 space-y-2">
                <div className="flex items-center gap-2 py-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: '#E6F4ED', color: '#00875A' }}
                  >
                    {(user.name || user.email).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#1A1A1A' }}>{user.name || 'User'}</p>
                    <p className="text-xs" style={{ color: '#9CA39B' }}>{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={async () => { setMobileMenuOpen(false); await signOut(); }}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm rounded w-full transition-colors hover:bg-red-50"
                  style={{ color: '#DC2626', borderRadius: '4px' }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="px-4">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-sm border rounded transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#E8E8E4', borderRadius: '4px', color: '#1A1A1A' }}
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In
                </Link>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-4 space-y-2 px-4">
              <Link
                to="/wizard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm transition-colors"
                style={{
                  backgroundColor: '#00875A',
                  color: '#FFFFFF',
                  borderRadius: '4px',
                }}
              >
                Start Project
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-full py-3 text-sm border transition-colors"
                style={{
                  borderColor: '#1A1A1A',
                  color: '#1A1A1A',
                  borderRadius: '4px',
                }}
              >
                Book a Call
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}