# Copilot / AI Agent Instructions — brandonlacoste9-tech

> Use this as your reference to act in this org. Nothing ambiguous; just precise paths, patterns, and rules.

---

## 1. Big Picture & Architecture

- This org supports three interlinked repos:
  - **adgenai** — backend / ad generation logic, templating, APIs  
  - **adgenxai-2.0** — frontend / UI logic, tokenization, transformations  
  - **Adgenai.ca** — marketing, landing pages, public doc surfaces  

- Typical flow:
  1. UI or input layer collects parameters (via adgenxai)  
  2. adgenai computes, templates output  
  3. adgenxai-2.0 styles, serializes, and sends to Adgenai.ca or deploy layer  
  4. Guardrails, CI/CD, and documentation sync run across all repos  

- Shared infrastructure:
  - `.github/workflows/` contains shared workflows like `docs-guard.yml`, `daily-sweep.yml`, `dca-cron.yml`  
  - Documentation and milestones stored under `docs/mcp-milestones/` with `MCP_MILESTONES.md`

---

## 2. Developer & Agent Workflow

- Local commands (inside each repo):
  - `npm install` / `yarn install`  
  - `npm run lint`  
  - `npm run test` (if tests present)  
  - `npm run build` for production artifacts  
  - `npm run dev` or `yarn dev` for local dev server  

- CI / Deployment:
  - Merge into `main` triggers CI pipeline defined in `.github/workflows/ci.yml`
  - Pipeline steps: checkout → install → lint → test → build → deploy  
  - Deploy target: **Cloudflare Pages** (primary)  
  - Fallback: Netlify CLI deploy (if configured)  
  - Required secrets:
    - `CF_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_PROJECT_NAME`
    - `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` (if fallback)

- Documentation / Milestones:
  - Doc-only PRs → **squash merge**
  - After merge, run:
    ```bash
    git push origin --delete docs/mcp-milestones
    git checkout main && git pull origin main
    ```
  - Always reflect changes in `MCP_MILESTONES.md` and link from docs / README  

- Agent behaviors:
  - Agents must use override flags (`AUTOPUSH_MODE=TRUE`, `SKIP_REVIEW_LOCK=TRUE`) when performing actions  
  - No unnecessary prompts, no asking teammates  
  - Always report PR number, status after any operation  

  ## Stripe Webhook / MCP Instructions

  1. Add Stripe values to `.env`:
    ```env
    STRIPE_SECRET_KEY=sk_test_…
    STRIPE_WEBHOOK_SECRET=whsec_…
    ```
  2. Webhook logic lives in `supabase/functions/stripe-webhook/index.ts` (or `.js`)  
  3. To test locally, use **Stripe CLI** to forward events to your local dev server  
  4. If you later integrate Stripe MCP server, use the `@stripe/mcp` package or config in agent tool definitions  

---

## 3. Conventions & Patterns

- Branch naming: `feature/…`, `chore/…`, `docs/…`, `ci-setup`, `chore/agent-guide-refresh`  
- Always lowercase + hyphens; no case-only duplicates  
- Key files:
  - `.github/copilot-instructions.md`  
  - Workflow files: `ci.yml`, `docs-guard.yml`, `daily-sweep.yml`, `dca-cron.yml`  
- PR patterns:
  - Doc edits → squash merge
  - Infra / feature → standard merge / rebase (depending on repo settings)  
  - Agents always wrap actions with status reporting  

---

## 4. Integrations & Services

- **Cloudflare Pages**:
  - Match output directory (e.g. `dist`, `build`) to deploy steps  
  - Use secrets for linking via GitHub Actions  
- **Netlify CLI fallback**:
  - Triggered only if Cloudflare deploy fails  
  - Uses `NETLIFY_AUTH_TOKEN` & `NETLIFY_SITE_ID`
- **DeepWiki / AI docs**:
  - Agents may query DeepWiki-Open REST API to inspect module doc, embeddings, cross-repo relationships  
- **External APIs (future / monetization)**:
  - E.g. Coinbase, Google stablecoin — declare their endpoints in docs, map secrets, and wrap via internal “service” modules  

---

## 5. Examples from This Codebase

- To add a new route in `adgenai`:  
  - Place file under `src/api/…`  
  - Export endpoint, then register it in central router  
- To adjust deploy:  
  - Update `.github/workflows/ci.yml` under `jobs.build-deploy.steps`  
- To sync docs changes:
  - Edit `docs/mcp-milestones/MCP_MILESTONES.md`  
  - Ensure matching changelog or release notes  

---

Let me know:

- Which repo you want this applied to first (adgenai / adgenxai‑2.0 / Adgenai.ca)  
- Any commands or patterns you use locally that aren’t covered  
- If tone or structure should be more terse, more verbose, or include “agent reference” sections  

I’ll iterate instantly.
