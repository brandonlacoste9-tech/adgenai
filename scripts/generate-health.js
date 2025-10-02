#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json to get the version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Generate health data
const healthData = {
  status: 'ok',
  timestamp: new Date().toISOString(),
  version: packageJson.version,
  env: process.env.NODE_ENV || 'production',
  commit: process.env.COMMIT_HASH || ''
  // Add custom fields here for easy extension:
  // app_name: 'adgenai',
  // build_id: process.env.BUILD_ID || '',
  // region: process.env.REGION || 'us-east-1',
};

// Write health.json to public directory
const publicDir = path.join(__dirname, '..', 'public');
const healthJsonPath = path.join(publicDir, 'health.json');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(healthJsonPath, JSON.stringify(healthData, null, 2));

console.log('✅ Health endpoint generated successfully!');
console.log('📍 Location: public/health.json');
console.log('📊 Data:', JSON.stringify(healthData, null, 2));
