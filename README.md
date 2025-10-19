# ADGENAI Static Starter

This is a dead-simple static landing page for Vercel.
- No build step.  
- Framework preset: **Other**
- Root Directory: `./`
- **Build Command:** *(leave blank)*
- **Output Directory:** `.`

## Local preview
Open `index.html` in your browser.

## Deploy
1. Commit these files to your GitHub repo (branch `main`).
2. In Vercel, import the repo and deploy with the settings above.

## ⚡ Spark Index Endpoint

Lists all Spark‑born apps registered in `codex_spark_index.json`.

```bash
curl -s https://<site>.netlify.app/.netlify/functions/ritual-spark-index | jq
```

• **Add new apps** by editing `codex_spark_index.json`.  
• **Served automatically** via `ritual-spark-index.ts`.
