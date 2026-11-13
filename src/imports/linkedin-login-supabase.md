Implement LinkedIn Login using Supabase Auth for a React + Vite app.

Project:
AMO AI dashboard.

Goal:
Allow users to sign in with LinkedIn and access the dashboard.

Requirements:

1. Create a simple login page with:
- Title: "Sign in to AMO AI"
- Button: "Continue with LinkedIn"

2. When the button is clicked run:

await supabase.auth.signInWithOAuth({
  provider: 'linkedin_oidc',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`
  }
})

3. Create a Supabase client file:

src/lib/supabase.ts

Use environment variables:
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

4. Create these pages:
- /login
- /auth/callback
- /dashboard

5. Callback page behavior:
- restore session
- if login success → redirect to /dashboard
- if login fails → redirect to /login

6. If user is already logged in:
- skip login and go directly to /dashboard

7. Use React Router.

8. Create these files:
- src/lib/supabase.ts
- src/context/AuthContext.tsx
- src/components/auth/LinkedInLoginButton.tsx
- src/components/auth/ProtectedRoute.tsx
- src/pages/Login.tsx
- src/pages/AuthCallback.tsx

9. UI requirements:
- centered login card
- clean SaaS layout
- mobile responsive
- LinkedIn button as primary action
- simple loading and error states

10. Code requirements:
- React + Vite only
- TypeScript
- complete working code
- no Next.js
- no SSR patterns
- no placeholder pseudo-code

11. Also include a short setup checklist at the end for:
- LinkedIn Developer app setup
- required redirect URL
- Supabase LinkedIn (OIDC) provider setup
- localhost callback for local development