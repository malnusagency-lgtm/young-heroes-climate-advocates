const fs = require('fs');
const transcriptPath = 'C:\\Users\\alexf\\.gemini\\antigravity\\brain\\ca901b7e-7a0a-4bb9-8062-617b1ccd70de\\.system_generated\\logs\\transcript.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');

const regex = /fonts\.googleapis\.com[^\n"]+/g;
let match;
let found = new Set();
while ((match = regex.exec(content)) !== null) {
  found.add(match[0]);
}
console.log('Google Fonts in transcript:', Array.from(found));

