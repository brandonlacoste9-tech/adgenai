# Copilot Coding Agent Instructions

This codebase powers Adgenai's AI-driven advertising solutions, including dashboards, campaign management, analytics, fraud detection, and ML-powered performance prediction.

## Architecture & Tech Stack

- **Frontend:**  
  - React 18 with TypeScript
  - Build tool: Vite (not Next.js - this is a SPA)
  - Key folders: `/src/components`, `/src/pages`, `/src/lib`, `/src/hooks`, `/public`
  - Styling: Tailwind CSS 4.x with custom theme extensions
  - Routing: React Router DOM v6
  - Animations: Framer Motion

- **Backend/Serverless:**  
  - Supabase Edge Functions (Deno runtime)
  - Located in: `/supabase/functions/`
  - Key functions: fraud-detection, ml-performance-api, cms-automation-api, stripe-webhook
  - No traditional Express/Node.js server

- **Database:**  
  - Supabase (PostgreSQL)
  - Migrations in `/supabase/migrations/`
  - Client library: @supabase/supabase-js

- **AI/ML:**
  - TensorFlow.js for client-side ML
  - Performance prediction engine (`src/lib/performance-prediction.ts`)
  - Fraud detection (`src/lib/fraud-detection.ts`)
  - Brand voice engine and CMS automation

## Developer Workflows

- **Install dependencies:** `npm install`
- **Development server:** `npm run dev` (starts Vite dev server on port 3000)
- **Build:** `npm run build` (outputs to `/dist`)
- **Type check:** `npm run typecheck` (runs TypeScript compiler without emitting)
- **Lint:** `npm run lint` (ESLint for TS/TSX files)
- **Preview build:** `npm run preview`
- **Deploy:** Vercel (configured in `vercel.json`)
- **CI/CD:** GitHub Actions in `.github/workflows/npm-grunt.yml` (tests Node 18.x, 20.x, 22.x)

## Environment & Config

- Environment variables: `.env` file (not committed)
- Required variables: Supabase URL/keys, Stripe keys, OpenAI API keys
- Vite config: `vite.config.ts` (uses path aliases: `@/` → `./src/`)
- TypeScript configs: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Tailwind config: `tailwind.config.js` (custom color palette, animations, keyframes)

## Code Organization & Conventions

- **Components:** `/src/components/` (Dashboard variants, Analytics, CMS, Agency tools)
- **Pages:** `/src/pages/` (Autopsy, Comparison, Share pages, Launch Command)
- **Library/Services:** `/src/lib/` (ML engines, fraud detection, analytics, CMS, attribution)
- **Hooks:** `/src/hooks/` (custom React hooks)
- **Types:** `/src/types/` (TypeScript type definitions)
- **Assets:** `/src/assets/` (images, icons, etc.)
- **Build output:** `/dist/` (generated, not committed)

### Naming Conventions
- Components: PascalCase (e.g., `AdvancedMLDashboard.tsx`)
- Services/libs: kebab-case (e.g., `fraud-detection.ts`, `cms-engine.ts`)
- Each file has `.js`, `.d.ts`, and `.tsx` versions (TypeScript compilation artifacts)

## Key Features & Integrations

- **Stripe:** Payment processing and subscriptions
  - Client: `src/lib/stripe.ts`
  - Webhook handler: `supabase/functions/stripe-webhook/`
  
- **Fraud Detection:**
  - Advanced ML-based fraud detection (`src/lib/fraud-detection.ts`)
  - API endpoint: `supabase/functions/fraud-detection-api/`
  
- **Performance Prediction:**
  - ML-powered ad performance prediction (`src/lib/performance-prediction.ts`)
  - Features: CTR, CPA prediction, creative analysis
  - Platform support: Facebook, Google, Instagram, TikTok, LinkedIn
  
- **CMS Automation:**
  - Auto-generates "autopsy" posts for competitor analysis
  - Case study generation
  - Templates in `src/lib/cms-engine.js`
  
- **Analytics:**
  - Attribution tracking (`src/lib/attribution-analytics.ts`)
  - Multi-touch attribution models
  - Analytics dashboard components

## Deployment

- **Primary:** Vercel (static site deployment)
- **Alternative:** Netlify (documented in `NETLIFY_DEPLOY.md`)
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework preset:** Vite (React)

## Testing

- No test framework currently configured (no `.test.*` or `.spec.*` files)
- Manual testing recommended for UI changes
- Type safety enforced via TypeScript (`npm run typecheck`)

## Unique Patterns

- Advanced dashboard charts with Recharts
- AI prompt engineering for campaign generation
- ML-based creative feature extraction (aspect ratio, color contrast, CTA presence)
- Multi-platform ad optimization
- Automated content generation for marketing (autopsy posts, case studies)
- Real-time fraud detection scoring
- Attribution modeling with complex customer journey analysis

## Contributor Tips

- Run `npm install` first on fresh clone
- Use TypeScript for all new code
- Follow existing component structure (separate .tsx, .d.ts, .js files)
- Tailwind utility classes preferred over custom CSS
- Test builds locally with `npm run build` before committing
- Lint with `npm run lint` to catch issues early
- Use `@/` path alias for cleaner imports (e.g., `import { foo } from '@/lib/utils'`)
- Supabase functions use Deno, not Node.js (different import syntax)

## Important Notes

- This is NOT a Next.js project (despite some docs mentioning it)
- No server-side rendering - pure client-side React SPA
- No traditional backend API - all backend logic in Supabase Edge Functions
- Build artifacts (`.js`, `.d.ts` files) are committed alongside source
- CI runs on multiple Node versions (18.x, 20.x, 22.x) but uses Grunt for builds

---

_Last updated: 2024 - Review and update this file after major refactors or workflow changes to keep AI agents productive._
