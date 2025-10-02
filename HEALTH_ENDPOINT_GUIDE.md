# Health Endpoint Implementation Guide

## Overview
This project includes an automated health endpoint that generates `/health` (or `/health.json`) on every build. The endpoint provides real-time status information about the deployed application.

## Implementation Details

### Files Added/Modified
1. **`scripts/generate-health.js`** - Node script that generates `public/health.json`
2. **`package.json`** - Added `prebuild` hook to run the script before each build
3. **`.gitignore`** - Added `public/health.json` to exclude generated files from version control

### How It Works
1. When you run `npm run build`, the `prebuild` hook automatically executes
2. `scripts/generate-health.js` generates `public/health.json` with current metadata
3. Vite builds the app and copies all files from `public/` to `dist/`
4. The `dist/health.json` file is deployed to Netlify
5. The endpoint becomes available at `https://www.adgenxai.com/health`

## Health Endpoint Response

The endpoint returns a JSON object with the following fields:

```json
{
  "status": "ok",
  "timestamp": "2025-10-02T19:24:47.737Z",
  "version": "1.0.0",
  "env": "production",
  "commit": "a1b2c3d4e5f6"
}
```

### Fields

| Field | Description | Source |
|-------|-------------|--------|
| `status` | Always returns `"ok"` | Hardcoded |
| `timestamp` | Build time in ISO 8601 format (UTC) | Generated at build time |
| `version` | Application version | From `package.json` |
| `env` | Environment name | `NODE_ENV` env var (defaults to `"production"`) |
| `commit` | Git commit hash | `COMMIT_HASH` env var (empty if not set) |

## Netlify Configuration

### Setting the Commit Hash

To include the commit hash in the health endpoint, configure Netlify environment variables:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings → Build & deploy → Environment variables**
3. Add the following variable:
   - **Key:** `COMMIT_HASH`
   - **Value:** `$COMMIT_REF` (Netlify provides this automatically)

Alternatively, you can set it in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  COMMIT_HASH = "$COMMIT_REF"
```

### Verifying the Deployment

After deploying to Netlify:

1. Visit `https://www.adgenxai.com/health`
2. You should see a JSON response with current metadata
3. The `timestamp` should reflect the latest build time
4. The `commit` should show the deployed commit hash (if configured)

## Testing Locally

### Default Production Build
```bash
npm run build
cat dist/health.json
```

### Development Environment
```bash
NODE_ENV=development npm run build
cat dist/health.json
```

### With Commit Hash
```bash
COMMIT_HASH=abc123def npm run build
cat dist/health.json
```

## Extending the Health Endpoint

To add custom fields (e.g., `app_name`, `build_id`, `region`), edit `scripts/generate-health.js`:

```javascript
const healthData = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  version: packageJson.version,
  env: process.env.NODE_ENV || 'production',
  commit: process.env.COMMIT_HASH || '',
  
  // Add custom fields here:
  app_name: 'adgenai',
  build_id: process.env.BUILD_ID || '',
  region: process.env.REGION || 'us-east-1',
};
```

Then set the corresponding environment variables in Netlify.

## Monitoring and Alerts

You can use the health endpoint for:

- **Uptime monitoring** - Services like Pingdom, UptimeRobot can monitor `/health`
- **Build verification** - Check if `timestamp` is recent
- **Version tracking** - Verify the deployed version matches expectations
- **Deployment tracking** - Monitor `commit` hash for deployment changes

## Troubleshooting

### Health endpoint returns 404
- Ensure `public/health.json` is generated during build
- Check that files from `public/` are copied to `dist/`
- Verify Netlify's publish directory is set to `dist`

### Missing or incorrect fields
- Check environment variables in Netlify dashboard
- Run build locally to verify script output
- Review `scripts/generate-health.js` for any errors

### Timestamp not updating
- Verify that `prebuild` hook is running (check build logs)
- Ensure `public/health.json` is not cached
- Check that Netlify is doing a fresh build (not using cached artifacts)
