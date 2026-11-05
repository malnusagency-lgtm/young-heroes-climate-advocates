const { execSync } = require('child_process');
const fs = require('fs');

try {
  const log = execSync('git log -n 5 --oneline', { encoding: 'utf8' });
  console.log('GIT LOG:\n', log);

  // Check what was in ycha-website-main/src/index.css or App.css or index.html
  const showFiles = execSync('git log -n 10 --name-only', { encoding: 'utf8' });
  console.log('RECENT CHANGED FILES:\n', showFiles);
} catch (e) {
  console.log('Git error:', e.message);
}

