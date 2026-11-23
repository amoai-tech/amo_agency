---
id: 003-auth-ui-layout
diagram_id: CORE-AUTH-01
prd_section: Authentication and Entry Flow
title: Auth page split-screen UI with sign-in and sign-up forms
skill: frontend
phase: CORE
priority: P0
status: Open
owner: Frontend
dependencies:
  - 001-project-foundation
estimated_effort: M
percent_complete: 0
---

## Objective
Build the `/auth` route with split-screen layout and tab-toggled authentication forms.

## Scope
- `/auth` route rendering `AuthPage` component
- Split-screen layout:
  - Left half (50%): `#0A211F` background, AMO AI logo, value proposition text, minimal pattern
  - Right half (50%): white background, centered form container (max-width 380px)
- Tab toggle: "Sign In" | "Create Account" — switches form below
- Sign In form:
  - Email input (48px height)
  - Password input with show/hide toggle
  - "Forgot password?" link (placeholder for now)
  - Sign In submit button
- Create Account form:
  - Full name input
  - Email input
  - Password input with strength indicator
  - Create Account submit button
  - Terms link (placeholder)
- Google OAuth button: "Continue with Google" — below both forms
- Form validation: inline error messages per field, disabled submit until valid
- Loading state: spinner on submit button during auth call
- Responsive breakpoints:
  - Mobile: left half becomes 120px header band
  - Tablet: 40/60 split
  - Desktop: 50/50 split
- Design system: Playfair Display headings, Lora body, 4px/8px card radius, no shadows

## Acceptance Criteria
- Split-screen renders correctly at desktop (1440px), tablet (768px), mobile (375px)
- Tab toggle switches between Sign In and Create Account forms
- Inline validation shows errors on blur and submit
- Submit button shows loading spinner during auth
- Google OAuth button is present and styled
- All inputs are 48px height per design system

## Failure Handling
- Form validation prevents submission of invalid data
- Already-authenticated user visiting /auth redirects to /app
