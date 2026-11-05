const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Let's inspect git or transcript
const transcriptPath = 'C:\\Users\\alexf\\.gemini\\antigravity\\brain\\ca901b7e-7a0a-4bb9-8062-617b1ccd70de\\.system_generated\\logs\\transcript.jsonl';

if (fs.existsSync(transcriptPath)) {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n');
  console.log('Total transcript lines:', lines.length);
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.includes('sdg') || line.includes('font-family') || line.includes('SDG') || line.includes('Marquee') || line.includes('font')) {
      // Find excerpts
      const idx = line.indexOf('font-family');
      if (idx !== -1) {
        console.log('Found font-family:', line.substring(Math.max(0, idx - 100), Math.min(line.length, idx + 200)));
      }
    }
  }
}

