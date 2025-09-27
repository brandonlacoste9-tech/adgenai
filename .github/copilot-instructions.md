# Copilot Coding Agent Instructions

This codebase powers Adgenai’s AI-driven advertising solutions, including dashboards, campaign management, and analytics.

## Architecture & Tech Stack

- **Frontend:**  
  - React (some projects use Next.js)
  - Key folders: `/src`, `/components`, `/pages` (Next.js), `/public`
  - Styling: CSS Modules or Tailwind

- **Backend:**  
  - Node.js (Express or custom server)
  - API endpoints: `/api`
  - Some projects use Python (FastAPI/Django for AI/ML features)

- **Database:**  
  - MongoDB (Mongoose for Node.js)
  - PostgreSQL for structured apps

## Developer Workflows

- **Build:** `yarn build` or `npm run build`
- **Test:** `yarn test` or `npm run test`
- **Deploy:** Vercel, Netlify, or AWS
- **CI/CD:** GitHub Actions in `.github/workflows/`

## Environment & Config

- Secrets/env vars: `.env.local` or `.env` (never committed)
- Use `.env.example` as a template

## Code Organization & Conventions

- Features grouped by folder (e.g., `/features/ads`)
- API routes in `/api`
- Branch naming: `feature/` or `fix/` prefix
- Custom hooks for data fetching
- Multi-tenancy: user/org separation in data models

## Integrations

- Stripe API (payments)
- Google OAuth (authentication)
- External AI services (OpenAI, custom endpoints)

## Unique Patterns

- Advanced dashboard charts
- AI prompt engineering for campaign generation

## Contributor Tips

- Follow naming conventions in existing code
- Use setup scripts (`yarn setup` if available)
- Review `README.md` for project-specific quirks

---

_Review and update this file after major refactors or workflow changes to keep AI agents productive._