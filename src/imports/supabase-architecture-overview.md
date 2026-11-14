You are a senior product architect and Supabase expert.

Create a **visual reference document** that explains how the AMO AI platform connects the frontend, backend, and Supabase database.

The goal is to produce a **clear system reference for developers** showing how data flows between:

• Frontend UI
• Edge Functions
• Supabase Database
• AI services
• Authentication
• Realtime
• Storage

The document should be **structured and visually organized**, similar to a technical architecture blueprint.

Use clean consulting-style diagrams and developer reference tables.

------------------------------------------------

PROJECT CONTEXT

Product:
AMO AI

Platform Type:
AI Business Operating System

Tech Stack:
Frontend
• React + TypeScript
• Vite
• Tailwind

Backend
• Supabase Postgres
• Supabase Edge Functions (Deno)

AI
• Google Gemini
• AI agents

Infrastructure
• Supabase Auth
• Supabase Realtime
• Supabase Storage
• pgvector (RAG)

------------------------------------------------

SECTION 1 — SYSTEM ARCHITECTURE DIAGRAM

Create a high-level architecture diagram showing:

Frontend (React App)
↓
Supabase Client SDK
↓
Supabase Services

Auth  
Database  
Edge Functions  
Realtime  
Storage

External services

Gemini API  
Stripe  
Email  
WhatsApp

The diagram should show:

User → Frontend → Supabase → AI → Database → Dashboard

------------------------------------------------

SECTION 2 — DATABASE STRUCTURE

Create a visual table map of the core schema.

Key tables:

organizations  
profiles  
team_members  

clients  
projects  
tasks  
milestones  
deliverables  

wizard_sessions  
wizard_answers  

context_snapshots  
roadmaps  
roadmap_phases  

services  
systems  
system_services  
project_services  

ai_run_logs  
ai_cache  

invoices  
payments  

Show relationships between these tables.

Highlight multi-tenant pattern:

org_id → isolates organization data.

------------------------------------------------

SECTION 3 — FRONTEND DATA FLOW

Create a flow diagram showing how frontend components interact with Supabase.

Example flows:

Wizard Flow

Frontend Wizard UI
→ call Edge Function
→ Gemini analysis
→ store results
→ Supabase tables
→ Dashboard

Dashboard Flow

Frontend
→ Supabase query
→ Realtime subscription
→ UI update

------------------------------------------------

SECTION 4 — EDGE FUNCTION ARCHITECTURE

Create a diagram for Edge Functions.

Functions include:

analyze-business  
industry-diagnostics  
system-recommendations  
readiness-score  
generate-roadmap  

Each function should show:

Input → AI processing → Database writes.

------------------------------------------------

SECTION 5 — AUTHENTICATION FLOW

Show how authentication works.

User login
↓
Supabase Auth
↓
JWT token
↓
RLS policies
↓
Database access

Include multi-tenant security:

team_members → org access.

------------------------------------------------

SECTION 6 — REALTIME SYSTEM

Create a diagram showing realtime updates.

Supabase Realtime
↓
subscription
↓
frontend dashboard updates

Example:

tasks updated → dashboard refresh.

------------------------------------------------

SECTION 7 — AI DATA PIPELINE

Create a visual pipeline:

User input
↓
Edge Function
↓
Gemini AI
↓
structured output
↓
database
↓
dashboard insights

Include AI logs:

ai_run_logs  
ai_cache.

------------------------------------------------

SECTION 8 — API REFERENCE TABLE

Create a developer reference table listing:

Function  
Purpose  
Input  
Output  
Tables Used

Example:

analyze-business  
Input: business description  
Output: industry analysis  
Tables: wizard_sessions

------------------------------------------------

SECTION 9 — FRONTEND HOOKS

Show example frontend integrations.

Examples:

fetch wizard session  
create project  
subscribe to tasks  
get roadmap

------------------------------------------------

SECTION 10 — DESIGN STYLE

Use a consulting-style architecture visual.

Design style:

clean  
minimal  
light background  
thin connector lines  
rounded blocks  
subtle grid background  

Color palette:

warm white background  
soft gray lines  
emerald green accents  

Typography:

clean sans-serif  
clear hierarchy  
technical labels

Avoid heavy gradients or complex diagrams.

The result should look like a **developer system blueprint** for Supabase integration.