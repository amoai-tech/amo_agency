// C91-AUTH-PAGE — Login / Signup Page
// Spec: /imports/auth-split-screen-ui.md (003-auth-ui-layout)
// Split-screen: dark teal brand panel (#0A211F) + white form panel
// Tab toggle: "Sign In" | "Create Account"
// Inputs: 48px height, per-field inline validation
// Fonts: Playfair Display headings, Lora body
// Responsive: mobile 120px band, tablet 40/60, desktop 50/50
// Auth: Google OAuth, LinkedIn OIDC, email/password, guest access

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link, useSearchParams } from 'react-router';
import { Sun, ArrowRight, Eye, EyeOff, Loader2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Mode = 'login' | 'signup';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

// Password strength calculation
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '#E8E8E4' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: '#DC2626' };
  if (score <= 2) return { score: 2, label: 'Fair', color: '#F59E0B' };
  if (score <= 3) return { score: 3, label: 'Good', color: '#00875A' };
  return { score: 4, label: 'Strong', color: '#00875A' };
}

// Validate a single field
function validateField(field: keyof FieldErrors, value: string, mode: Mode): string | undefined {
  switch (field) {
    case 'name':
      if (mode === 'signup' && !value.trim()) return 'Name is required';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
      return undefined;
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return undefined;
    default:
      return undefined;
  }
}

export default function AuthPage() {
  const { signIn, signUp, signInWithGoogle, signInWithLinkedIn, loading, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnPath = searchParams.get('return') || '/app/dashboard';
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [googleRedirecting, setGoogleRedirecting] = useState(false);
  const [linkedinRedirecting, setLinkedinRedirecting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate(returnPath);
    }
  }, [user, loading, navigate, returnPath]);

  // Password strength (only for signup mode)
  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  // Handle field blur — validate and mark touched
  const handleBlur = useCallback((field: keyof FieldErrors) => {
    setTouched(t => ({ ...t, [field]: true }));
    const value = field === 'name' ? name : field === 'email' ? email : password;
    const err = validateField(field, value, mode);
    setFieldErrors(prev => ({ ...prev, [field]: err }));
  }, [name, email, password, mode]);

  // Validate all fields on submit
  const validateAll = (): boolean => {
    const errors: FieldErrors = {};
    if (mode === 'signup') {
      errors.name = validateField('name', name, mode);
    }
    errors.email = validateField('email', email, mode);
    errors.password = validateField('password', password, mode);

    setFieldErrors(errors);
    setTouched({ name: true, email: true, password: true });
    return !errors.name && !errors.email && !errors.password;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!validateAll()) return;

    let result: { success: boolean; error?: string };
    if (mode === 'login') {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password, name);
    }

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate(returnPath), 800);
    } else {
      setLocalError(result.error || 'Something went wrong');
    }
  }, [mode, email, password, name, signIn, signUp, clearError, navigate, returnPath]);

  const handleGoogleSignIn = useCallback(async () => {
    setLocalError(null);
    clearError();
    setGoogleRedirecting(true);
    await signInWithGoogle(returnPath);
    setGoogleRedirecting(false);
  }, [signInWithGoogle, clearError, returnPath]);

  const handleLinkedInSignIn = useCallback(async () => {
    setLocalError(null);
    clearError();
    setLinkedinRedirecting(true);
    await signInWithLinkedIn(returnPath);
    setLinkedinRedirecting(false);
  }, [signInWithLinkedIn, clearError, returnPath]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setLocalError(null);
    clearError();
    setSuccess(false);
    setFieldErrors({});
    setTouched({});
  };

  const displayError = localError || error;
  const isDisabled = loading || success || googleRedirecting || linkedinRedirecting;

  // Check if submit should be disabled (all required fields filled)
  const isFormValid = useMemo(() => {
    if (mode === 'signup' && !name.trim()) return false;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    if (!password || password.length < 6) return false;
    return true;
  }, [mode, name, email, password]);

  // Inline error component
  const FieldError = ({ error: err }: { error?: string }) => {
    if (!err) return null;
    return (
      <motion.p
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex items-center gap-1 mt-1.5"
        style={{ color: '#DC2626', fontFamily: "'Lora', Georgia, serif", fontSize: '0.75rem' }}
      >
        <AlertCircle className="w-3 h-3 shrink-0" />
        {err}
      </motion.p>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* ══════════════════════════════════════════════════════
          LEFT BRAND PANEL
          Mobile: 120px header band
          Tablet: 40% width
          Desktop: 50% width
          Background: #0A211F (dark teal)
         ══════════════════════════════════════════════════════ */}
      <div
        className="relative h-[120px] md:h-auto md:w-[40%] lg:w-1/2 shrink-0 flex flex-col justify-between overflow-hidden"
        style={{ backgroundColor: '#0A211F' }}
      >
        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #FFFFFF 12%, transparent 12.5%, transparent 87%, #FFFFFF 87.5%, #FFFFFF),
              linear-gradient(150deg, #FFFFFF 12%, transparent 12.5%, transparent 87%, #FFFFFF 87.5%, #FFFFFF),
              linear-gradient(30deg, #FFFFFF 12%, transparent 12.5%, transparent 87%, #FFFFFF 87.5%, #FFFFFF),
              linear-gradient(150deg, #FFFFFF 12%, transparent 12.5%, transparent 87%, #FFFFFF 87.5%, #FFFFFF),
              linear-gradient(60deg, rgba(255,255,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.5)),
              linear-gradient(60deg, rgba(255,255,255,0.5) 25%, transparent 25.5%, transparent 75%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.5))
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
          }}
        />

        {/* Mobile: compact header */}
        <div className="relative z-10 p-6 md:p-10 lg:p-12">
          <Link to="/" className="flex items-center gap-2">
            <Sun className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#00875A' }} />
            <span
              className="text-base md:text-lg"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#FFFFFF' }}
            >
              AMO AI
            </span>
          </Link>

          {/* Desktop/Tablet: full value proposition (hidden on mobile) */}
          <div className="hidden md:block mt-12 lg:mt-16">
            <h1
              className="text-2xl lg:text-3xl leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#FFFFFF', fontWeight: 400 }}
            >
              Your AI transformation
              <br />starts here.
            </h1>
            <p
              className="text-sm leading-relaxed max-w-[320px]"
              style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
            >
              Sign in to save your progress, access personalized AI recommendations,
              and collaborate with your team on implementation roadmaps.
            </p>

            <div className="mt-10 space-y-3.5">
              {[
                'Wizard progress saved to cloud',
                'AI-powered readiness assessments',
                'Team collaboration on roadmaps',
                'Dashboard with project tracking',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(0, 135, 90, 0.2)' }}
                  >
                    <Check className="w-3 h-3" style={{ color: '#00875A' }} />
                  </div>
                  <span
                    className="text-sm"
                    style={{ fontFamily: "'Lora', Georgia, serif", color: '#C4C4BC' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer — desktop/tablet only */}
        <div className="hidden md:block relative z-10 p-10 lg:p-12">
          <p className="text-xs" style={{ fontFamily: "'Lora', Georgia, serif", color: '#6B6B63' }}>
            &copy; 2026 AMO AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          RIGHT FORM PANEL
          Mobile: full width
          Tablet: 60% width
          Desktop: 50% width
          Background: white (#FFFFFF)
         ══════════════════════════════════════════════════════ */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-10 md:py-12"
        style={{ backgroundColor: '#FFFFFF' }}
      >
        <div className="w-full" style={{ maxWidth: '380px' }}>
          {/* ── Tab Toggle: "Sign In" | "Create Account" ── */}
          <div
            className="flex mb-8"
            style={{ borderBottom: '1px solid #E8E8E4' }}
          >
            <button
              type="button"
              onClick={() => switchMode('login')}
              className="flex-1 pb-3 text-sm transition-colors relative"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: mode === 'login' ? 600 : 400,
                color: mode === 'login' ? '#0A211F' : '#9CA39B',
              }}
            >
              Sign In
              {mode === 'login' && (
                <motion.div
                  layoutId="auth-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: '#00875A' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className="flex-1 pb-3 text-sm transition-colors relative"
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontWeight: mode === 'signup' ? 600 : 400,
                color: mode === 'signup' ? '#0A211F' : '#9CA39B',
              }}
            >
              Create Account
              {mode === 'signup' && (
                <motion.div
                  layoutId="auth-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: '#00875A' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Section label */}
              <p
                className="text-xs tracking-widest uppercase mb-2"
                style={{ color: '#00875A', letterSpacing: '0.1em', fontFamily: "'Lora', Georgia, serif" }}
              >
                {mode === 'login' ? 'Welcome back' : 'Get started'}
              </p>
              <h2
                className="text-2xl mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#0A211F', fontWeight: 400 }}
              >
                {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
              </h2>
              <p
                className="text-sm mb-8"
                style={{ fontFamily: "'Lora', Georgia, serif", color: '#6B6B63' }}
              >
                {mode === 'login'
                  ? 'Enter your credentials to continue where you left off.'
                  : 'Set up your account to save your AI transformation progress.'
                }
              </p>

              {/* ── General Error Banner ── */}
              <AnimatePresence>
                {displayError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 flex items-start gap-2 px-3 py-2.5 border text-sm"
                    style={{
                      borderColor: '#DC2626',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      borderRadius: '4px',
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{displayError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Success Banner ── */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 flex items-center gap-2 px-3 py-2.5 border text-sm"
                    style={{
                      borderColor: '#00875A',
                      backgroundColor: '#E6F4ED',
                      color: '#00875A',
                      borderRadius: '4px',
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                  >
                    <Check className="w-4 h-4" />
                    <span>{mode === 'login' ? 'Signed in!' : 'Account created!'} Redirecting…</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Email Form ── */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Full name — signup only */}
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label
                        className="block text-xs mb-1.5"
                        style={{ fontFamily: "'Lora', Georgia, serif", color: '#6B6B63', fontWeight: 500 }}
                      >
                        Full name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => {
                          setName(e.target.value);
                          if (touched.name) {
                            setFieldErrors(prev => ({ ...prev, name: validateField('name', e.target.value, mode) }));
                          }
                        }}
                        onBlur={() => handleBlur('name')}
                        placeholder="Jane Smith"
                        className="w-full px-3 text-sm border outline-none transition-colors"
                        style={{
                          height: '48px',
                          borderColor: touched.name && fieldErrors.name ? '#DC2626' : '#E8E8E4',
                          borderRadius: '4px',
                          backgroundColor: '#FFFFFF',
                          color: '#0A211F',
                          fontFamily: "'Lora', Georgia, serif",
                        }}
                        onFocus={e => {
                          if (!(touched.name && fieldErrors.name)) e.target.style.borderColor = '#00875A';
                        }}
                        autoComplete="name"
                        disabled={isDisabled}
                      />
                      <AnimatePresence>
                        {touched.name && fieldErrors.name && <FieldError error={fieldErrors.name} />}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs mb-1.5"
                    style={{ fontFamily: "'Lora', Georgia, serif", color: '#6B6B63', fontWeight: 500 }}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      if (touched.email) {
                        setFieldErrors(prev => ({ ...prev, email: validateField('email', e.target.value, mode) }));
                      }
                    }}
                    onBlur={() => handleBlur('email')}
                    placeholder="you@company.com"
                    className="w-full px-3 text-sm border outline-none transition-colors"
                    style={{
                      height: '48px',
                      borderColor: touched.email && fieldErrors.email ? '#DC2626' : '#E8E8E4',
                      borderRadius: '4px',
                      backgroundColor: '#FFFFFF',
                      color: '#0A211F',
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                    onFocus={e => {
                      if (!(touched.email && fieldErrors.email)) e.target.style.borderColor = '#00875A';
                    }}
                    autoComplete="email"
                    disabled={isDisabled}
                  />
                  <AnimatePresence>
                    {touched.email && fieldErrors.email && <FieldError error={fieldErrors.email} />}
                  </AnimatePresence>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="block text-xs"
                      style={{ fontFamily: "'Lora', Georgia, serif", color: '#6B6B63', fontWeight: 500 }}
                    >
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        className="text-xs transition-colors"
                        style={{ fontFamily: "'Lora', Georgia, serif", color: '#00875A' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#006644')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#00875A')}
                        onClick={() => {
                          // Placeholder — future forgot password flow
                        }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        if (touched.password) {
                          setFieldErrors(prev => ({ ...prev, password: validateField('password', e.target.value, mode) }));
                        }
                      }}
                      onBlur={() => handleBlur('password')}
                      placeholder="••••••••"
                      className="w-full px-3 pr-10 text-sm border outline-none transition-colors"
                      style={{
                        height: '48px',
                        borderColor: touched.password && fieldErrors.password ? '#DC2626' : '#E8E8E4',
                        borderRadius: '4px',
                        backgroundColor: '#FFFFFF',
                        color: '#0A211F',
                        fontFamily: "'Lora', Georgia, serif",
                      }}
                      onFocus={e => {
                        if (!(touched.password && fieldErrors.password)) e.target.style.borderColor = '#00875A';
                      }}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      disabled={isDisabled}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                      tabIndex={-1}
                    >
                      {showPassword
                        ? <EyeOff className="w-4 h-4" style={{ color: '#9CA39B' }} />
                        : <Eye className="w-4 h-4" style={{ color: '#9CA39B' }} />
                      }
                    </button>
                  </div>
                  <AnimatePresence>
                    {touched.password && fieldErrors.password && <FieldError error={fieldErrors.password} />}
                  </AnimatePresence>

                  {/* Password strength indicator — signup only */}
                  {mode === 'signup' && password.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2"
                    >
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{
                              backgroundColor: passwordStrength.score >= level ? passwordStrength.color : '#E8E8E4',
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="text-xs"
                        style={{
                          fontFamily: "'Lora', Georgia, serif",
                          color: passwordStrength.color,
                        }}
                      >
                        {passwordStrength.label}
                      </p>
                    </motion.div>
                  )}
                  {mode === 'signup' && password.length === 0 && (
                    <p
                      className="text-xs mt-1.5"
                      style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
                    >
                      Minimum 6 characters
                    </p>
                  )}
                </div>

                {/* Submit button — disabled until valid */}
                <button
                  type="submit"
                  disabled={isDisabled || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 text-sm transition-all"
                  style={{
                    height: '48px',
                    backgroundColor: success ? '#E6F4ED' : (!isFormValid || isDisabled) ? '#9CA39B' : '#0A211F',
                    color: success ? '#00875A' : '#FFFFFF',
                    borderRadius: '4px',
                    fontFamily: "'Lora', Georgia, serif",
                    fontWeight: 500,
                    cursor: (isDisabled || !isFormValid) ? 'default' : 'pointer',
                    opacity: (isDisabled && !success) ? 0.7 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!isDisabled && isFormValid) e.currentTarget.style.backgroundColor = '#00875A';
                  }}
                  onMouseLeave={e => {
                    if (!isDisabled && isFormValid && !success) e.currentTarget.style.backgroundColor = '#0A211F';
                  }}
                >
                  {success ? (
                    <><Check className="w-4 h-4" /> Success</>
                  ) : loading && !googleRedirecting && !linkedinRedirecting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                  ) : (
                    <>
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Terms — signup only */}
                {mode === 'signup' && (
                  <p
                    className="text-xs text-center"
                    style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
                  >
                    By creating an account you agree to our{' '}
                    <button
                      type="button"
                      className="underline transition-colors"
                      style={{ color: '#00875A' }}
                      onClick={() => { /* Placeholder — future terms page */ }}
                    >
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      className="underline transition-colors"
                      style={{ color: '#00875A' }}
                      onClick={() => { /* Placeholder — future privacy page */ }}
                    >
                      Privacy Policy
                    </button>.
                  </p>
                )}
              </form>

              {/* ── Divider ── */}
              <div className="mt-6 mb-6 flex items-center gap-3">
                <div className="flex-1 border-t" style={{ borderColor: '#E8E8E4' }} />
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
                >
                  or continue with
                </span>
                <div className="flex-1 border-t" style={{ borderColor: '#E8E8E4' }} />
              </div>

              {/* ── Google Sign-In Button ── */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isDisabled}
                className="w-full flex items-center justify-center gap-3 text-sm border transition-colors"
                style={{
                  height: '48px',
                  borderColor: '#E8E8E4',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A211F',
                  fontFamily: "'Lora', Georgia, serif",
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: isDisabled && !googleRedirecting ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!isDisabled) e.currentTarget.style.backgroundColor = '#F5F5F0';
                }}
                onMouseLeave={e => {
                  if (!isDisabled) e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                {googleRedirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#00875A' }} />
                    Redirecting to Google…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 2.58Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              {/* ── LinkedIn Sign-In Button ── */}
              <button
                type="button"
                onClick={handleLinkedInSignIn}
                disabled={isDisabled}
                className="w-full flex items-center justify-center gap-3 text-sm border transition-colors mt-3"
                style={{
                  height: '48px',
                  borderColor: '#E8E8E4',
                  borderRadius: '4px',
                  backgroundColor: '#FFFFFF',
                  color: '#0A211F',
                  fontFamily: "'Lora', Georgia, serif",
                  cursor: isDisabled ? 'default' : 'pointer',
                  opacity: isDisabled && !linkedinRedirecting ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!isDisabled) e.currentTarget.style.backgroundColor = '#F5F5F0';
                }}
                onMouseLeave={e => {
                  if (!isDisabled) e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                {linkedinRedirecting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#0A66C2' }} />
                    Redirecting to LinkedIn…
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.335 15.339H12.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.086-1.601 2.207v4.248H7.013V6.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM4.003 5.575a1.546 1.546 0 1 1 0-3.092 1.546 1.546 0 0 1 0 3.092zM5.339 15.339H2.666V6.75h2.673v8.589zM16.67 0H1.329C.593 0 0 .58 0 1.297v15.406C0 17.42.594 18 1.328 18h15.339C17.4 18 18 17.42 18 16.703V1.297C18 .58 17.4 0 16.67 0z" fill="#0A66C2"/>
                    </svg>
                    Continue with LinkedIn
                  </>
                )}
              </button>

              {/* ── Guest Access ── */}
              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 border-t" style={{ borderColor: '#E8E8E4' }} />
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
                >
                  or
                </span>
                <div className="flex-1 border-t" style={{ borderColor: '#E8E8E4' }} />
              </div>

              <Link
                to="/wizard"
                className="mt-4 w-full flex items-center justify-center gap-2 text-sm border transition-colors"
                style={{
                  height: '48px',
                  borderColor: '#E8E8E4',
                  color: '#6B6B63',
                  borderRadius: '4px',
                  fontFamily: "'Lora', Georgia, serif",
                  display: 'flex',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F5F5F0')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Continue as Guest
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <p
                className="text-xs text-center mt-2"
                style={{ fontFamily: "'Lora', Georgia, serif", color: '#9CA39B' }}
              >
                Guest progress is saved locally and can be linked to an account later.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
