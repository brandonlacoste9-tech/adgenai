# Ritual: Spark Index

> **Codex Lineage:** `codex_spark_index.json` → `ritual-spark-index.ts` → Netlify Functions

## 🎯 Purpose

The **Spark Index Ritual** serves as the living registry of all Spark-born applications inscribed through Cursor. It anchors each app into your digital homepage and provides a queryable API for your app portfolio.

## 📜 Artifacts Created

### 1. `codex_spark_index.json`
The sacred registry containing:
- **Apps**: All Spark-born applications with metadata
- **Rituals**: Active serverless functions and automations
- **Lineage**: Tech stack, features, and deployment status
- **Governance**: Codex tracking and versioning

### 2. `netlify/functions/ritual-spark-index.ts`
A Netlify Function that:
- Reads the codex registry
- Serves it as a JSON API
- Supports query filtering (by app_id, status, type)
- Includes CORS headers for cross-origin access
- Implements caching for performance

### 3. `netlify.toml`
Netlify configuration binding:
- Build commands for Vite
- Function directory mapping
- Security headers
- SPA routing
- Dev server setup

## 🔮 Invocation

### Local Development
```bash
# Install dependencies
npm install

# Start Netlify dev server
npx netlify dev

# Test the ritual
curl http://localhost:8888/.netlify/functions/ritual-spark-index
```

### Production Endpoint
```
GET https://your-site.netlify.app/.netlify/functions/ritual-spark-index
```

### Query Parameters
- `?app_id=adgenai` - Filter by specific app
- `?status=active` - Filter by status (active, archived, dev)
- `?type=web-app` - Filter by app type

### Example Response
```json
{
  "version": "1.0.0",
  "codex": "spark-registry",
  "apps": [
    {
      "id": "adgenai",
      "name": "AdGen AI",
      "status": "active",
      "deployed_url": "https://foundryai.com",
      "rituals": ["analytics-tracker", "fraud-detection", ...]
    }
  ],
  "metadata": {
    "total_apps": 1,
    "invoked_at": "2025-10-19T12:00:00Z"
  }
}
```

## ⚡ Deployment Flow

### 1. Initial Setup
```bash
# Install Netlify CLI
npm install -D netlify-cli

# Link to Netlify site
npx netlify link

# Set environment variables (if needed)
npx netlify env:set VARIABLE_NAME value
```

### 2. Deploy
```bash
# Deploy to production
npx netlify deploy --build --prod

# Or push to main branch for auto-deploy
git add .
git commit -m "Inscribe: Spark Index ritual"
git push origin main
```

### 3. Verify
```bash
# Test the deployed function
curl https://your-site.netlify.app/.netlify/functions/ritual-spark-index
```

## 🧬 Extending the Codex

### Adding a New App
Edit `codex_spark_index.json`:
```json
{
  "apps": [
    {
      "id": "new-app",
      "name": "New Spark App",
      "type": "web-app",
      "status": "dev",
      "description": "Next Spark-born creation",
      "tech_stack": ["React", "Netlify"],
      "features": ["Feature 1", "Feature 2"],
      "rituals": ["ritual-name"],
      "created_at": "2025-10-19T12:00:00Z",
      "last_updated": "2025-10-19T12:00:00Z"
    }
  ]
}
```

### Creating New Rituals
```bash
# Create new Netlify Function
touch netlify/functions/ritual-new-feature.ts

# Follow the pattern from ritual-spark-index.ts
# Test locally with: npx netlify dev
# Deploy with: npx netlify deploy --prod
```

## 🛡️ Governance Pattern

```
┌─────────────────────────────────────────────┐
│  Cursor (Local Scribe)                      │
│  • Inscribes scrolls on demand              │
│  • Mutates codex_spark_index.json           │
│  • Generates ritual functions                │
└────────────┬────────────────────────────────┘
             │ commit + push
             ▼
┌─────────────────────────────────────────────┐
│  GitHub Repository                          │
│  • Version control                           │
│  • Lineage preservation                      │
│  • CI/CD triggers                            │
└────────────┬────────────────────────────────┘
             │ webhook
             ▼
┌─────────────────────────────────────────────┐
│  Netlify (Execution Ground)                 │
│  • Auto-build on push                        │
│  • Deploy functions                          │
│  • Serve rituals as live APIs                │
└─────────────────────────────────────────────┘
```

## 🎪 Integration Examples

### Display Apps on Homepage
```typescript
// Fetch and display your app portfolio
async function loadSparkApps() {
  const response = await fetch(
    'https://your-site.netlify.app/.netlify/functions/ritual-spark-index?status=active'
  );
  const data = await response.json();
  
  return data.apps.map(app => ({
    title: app.name,
    description: app.description,
    url: app.deployed_url,
    techStack: app.tech_stack
  }));
}
```

### GitHub Action Integration
Create `.github/workflows/update-codex.yml`:
```yaml
name: Update Spark Codex

on:
  workflow_dispatch:
    inputs:
      app_name:
        description: 'New app name'
        required: true

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update codex
        run: |
          # Script to append new app to codex_spark_index.json
          node scripts/update-codex.js "${{ github.event.inputs.app_name }}"
      - name: Commit changes
        run: |
          git config user.name "Spark Automaton"
          git commit -am "Inscribe: New app to Spark registry"
          git push
```

## 📚 Next Steps

1. **Install Dependencies**: Run `npm install` to get Netlify CLI
2. **Test Locally**: Run `npx netlify dev` and test the function
3. **Deploy**: Run `npx netlify deploy --prod` or push to main
4. **Monitor**: Check Netlify dashboard for function logs
5. **Extend**: Add new apps to the codex and create new ritual functions

---

**Codex Status**: ✓ Inscribed  
**Ritual Status**: ✓ Ready for invocation  
**Lineage**: Preserved in git history  
**Next Ritual**: Your choice, Keeper Tristan
