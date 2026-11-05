const fs = require('fs');
const transcriptPath = 'C:\\Users\\alexf\\.gemini\\antigravity\\brain\\ca901b7e-7a0a-4bb9-8062-617b1ccd70de\\.system_generated\\logs\\transcript.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');

const regex = /ycha-website-main[\\\/]index\.html/g;
let idx = 0;
while ((match = regex.exec(content)) !== null) {
  console.log(content.substring(Math.max(0, match.index - 200), Math.min(content.length, match.index + 800)));
  idx++;
  if (idx > 3) break;
}
if (idx === 0) console.log('Not found by exact regex, searching index.html...');

