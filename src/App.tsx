import { Component, useEffect, type ReactNode } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './components/AuthContext';
import { updateSeo } from './lib/seo';

/** Global error boundary — prevents white screen on uncaught errors */
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0b', color: '#e4e4e7', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ textAlign: 'center', maxWidth: 440, padding: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ color: '#a1a1aa', marginBottom: 24 }}>{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
              style={{ padding: '10px 24px', background: '#18181b', border: '1px solid #27272a', borderRadius: 8, color: '#e4e4e7', cursor: 'pointer', fontSize: 14 }}
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    updateSeo(router.state.location.pathname);
    return router.subscribe((state) => updateSeo(state.location.pathname));
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
