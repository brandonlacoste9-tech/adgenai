# Copilot Coding Agent Instructions

This codebase powers Adgenai's AI-driven advertising solutions, including dashboards, campaign management, and analytics.

## Architecture & Tech Stack

- **Frontend:**  
  - React 18 + TypeScript with Vite
  - Key folders: `/src/components`, `/src/pages`, `/src/lib`, `/src/hooks`, `/public`
  - Routing: React Router DOM
  - Styling: Tailwind CSS
  - Build tool: Vite (dev server on port 3000)

- **Backend:**  
  - Supabase Edge Functions (Deno runtime)
  - API endpoints in `/supabase/functions/`
  - Key functions: fraud-detection, performance-prediction, cms-automation-api, analytics-tracker, stripe-webhook

- **Database:**  
  - Supabase (PostgreSQL)
  - Connection via `@supabase/supabase-js`
  - Client initialized in `src/lib/supabase.ts`

## Developer Workflows

- **Install:** `npm install`
- **Dev:** `npm run dev` (starts Vite dev server on port 3000)
- **Build:** `npm run build` (outputs to `/dist`)
- **Preview:** `npm run preview`
- **Lint:** `npm run lint` (ESLint with TypeScript)
- **Type Check:** `npm run typecheck`
- **Deploy:** Vercel or Netlify (static build from `/dist`)
- **CI/CD:** GitHub Actions in `.github/workflows/`

## Environment & Config

- **Environment variables:** Use `.env` file (never committed - already in `.gitignore`)
- **Required env vars:**
  - `VITE_SUPABASE_URL` - Supabase project URL
  - `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key
  - `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe public key
  - `STRIPE_SECRET_KEY` - Stripe secret key (backend only)
- Vite uses `VITE_` prefix for env vars accessible in frontend
- Import env vars with `import.meta.env.VITE_*`

## Code Organization & Conventions

- **Components:** `/src/components` - Reusable React components
- **Pages:** `/src/pages` - Route-specific page components
- **Utilities:** `/src/lib` - Shared utilities and clients (Supabase, brand-voice-engine, etc.)
- **Hooks:** `/src/hooks` - Custom React hooks
- **Types:** `/src/types` - TypeScript type definitions
- **Assets:** `/src/assets` - Static images, icons
- **Backend functions:** `/supabase/functions` - Serverless edge functions
- **Branch naming:** `feature/` or `fix/` prefix
- **Path aliases:** `@/` maps to `./src/`

## Key Features & Patterns

- **AI-powered ad generation:** Campaign creation with performance prediction
- **Fraud detection:** Real-time fraud analysis using ML models
- **Performance prediction:** TensorFlow.js-based creative scoring
- **Brand voice engine:** Automated brand consistency validation
- **CMS automation:** Auto-generated competitor autopsies and case studies
- **Advanced analytics:** Multi-touch attribution and campaign tracking
- **Stripe integration:** Payment processing and webhooks

## Integrations

- **Supabase:** Database, authentication, edge functions
- **Stripe:** Payment processing (`@stripe/stripe-js`, `stripe` SDK)
- **TensorFlow.js:** ML models for performance prediction
- **OpenAI/GPT:** AI content generation (via backend functions)
- **Recharts:** Dashboard visualization
- **Framer Motion:** Animations and transitions

## Testing

- Currently no test infrastructure
- Manual testing required for UI and API changes

## Contributor Tips

- Follow existing TypeScript patterns and interfaces
- Use Tailwind utility classes for styling (defined in `tailwind.config.js`)
- Check `src/types/` for existing type definitions before creating new ones
- Supabase functions run in Deno (not Node.js) - check compatibility
- Review component structure in existing pages before creating new ones

---

_Review and update this file after major refactors or workflow changes to keep AI agents productive._
