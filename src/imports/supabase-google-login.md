Implement Google Login using Supabase Auth for a React + Vite app.

Project:
AMO AI dashboard.

Goal:
Allow users to sign in with Google and access the dashboard.

Requirements:

1. Create a simple login page with:
- Title: "Sign in to AMO AI"
- One button: "Continue with Google"

2. When the button is clicked run:

await supabase.auth.signInWithOAuth({
  provider: 'google',
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

/login  
/auth/callback  
/dashboard

5. Callback page behavior:

- Restore session
- If login success → redirect to `/dashboard`
- If login fails → redirect to `/login`

6. If a user is already logged in:
skip login and go directly to `/dashboard`.

7. Use React Router.

8. Make the login page clean and centered:
- card layout
- Google button
- mobile responsive
- simple SaaS style.

Generate complete working React + TypeScript code for all files.
Do not use Next.js.
Use React + Vite only.