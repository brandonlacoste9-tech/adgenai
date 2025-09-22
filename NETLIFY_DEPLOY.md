# Netlify Deployment Guide for Next.js

## Step 1: Install Netlify Dependencies

Run the following command in your project root:

```bash
npm i -D @netlify/plugin-nextjs netlify-cli
```

---

## Step 2: Add `netlify.toml`

Create a `netlify.toml` file in your project root with the following content:

```toml
[build]
command = "npm run build"
publish = ".next"

[build.environment]
NEXT_PUBLIC_SITE_URL = "https://foundryai.com"
NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
package = "@netlify/plugin-nextjs"
```

The `@netlify/plugin-nextjs` plugin handles Next.js features such as App Router, dynamic routes, and image optimization.

---

## Step 3: Initialize Site

Use the Netlify CLI to connect your repository:

```bash
npx netlify init
```

1. Choose **"Import from GitHub"**.
2. Select your repository.
3. Set the build command to `npm run build` and publish directory to `.next`.

---

## Step 4: Add Environment Variables

In the **Netlify UI**, navigate to:

**Site settings → Build & deploy → Environment variables**

Add any required variables for your app, such as:
- `NEXT_PUBLIC_*` variables
- API keys and secrets

Redeploy your site for these variables to take effect.

---

## Step 5: First Deploy

Deploy your application to production:

```bash
npx netlify deploy --build --prod
```

This will:
- Build your Next.js app.
- Process redirects and headers from `netlify.toml`.
- Upload static assets, serverless functions, and dynamic routes.

---

## Step 6: Ongoing Deploys

- Pushes to the `main` branch trigger **automatic deployments**.
- Pull Requests generate **Deploy Previews**.
- To manually trigger a production deploy:

```bash
npx netlify deploy --prod
```

---

## Notes & Guardrails

- If Netlify doesn’t auto-detect Next.js, the `netlify.toml` ensures compatibility.
- Use the local `netlify-cli` for reproducible builds in CI/CD pipelines.