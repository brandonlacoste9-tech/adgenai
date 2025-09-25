/**
 * Simple scan for lines in git history containing suspicious tokens.
 * Run this before commit / in CI to catch leaked secrets.
 */
const { execSync } = require('child_process');

function scanGitHistory() {
  let log;
  try {
    log = execSync('git log -p', { encoding: 'utf8' });
  } catch (err) {
    console.error('Failed to read git log:', err.message);
    process.exit(1);
  }
  const patterns = [
    /API_KEY/i,
    /TOKEN/i,
    /SECRET/i,
    /PRIVATE_KEY/i,
    /ACCESS_KEY/i
  ];
  const matches = patterns.flatMap(p => {
    const found = [];
    let m;
    const re = new RegExp(p, 'gi');
    while ((m = re.exec(log)) !== null) {
      found.push({ pattern: p.toString(), index: m.index });
    }
    return found;
  });
  if (matches.length > 0) {
    console.error('⚠️ Possible secrets found in git history:');
    matches.forEach(m => console.error('  •', m.pattern, 'at index', m.index));
    process.exit(1);
  } else {
    console.log('✅ No obvious secrets found.');
  }
}

scanGitHistory();
