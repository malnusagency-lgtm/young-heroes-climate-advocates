const fs = require('fs');
const css = fs.readFileSync('src/index.css', 'utf8');
css.split('\n').forEach((l, i) => {
  if (l.includes('filter') || l.includes('opacity') || l.includes('hero') || l.includes('gradient')) {
    console.log(`${i+1}: ${l}`);
  }
});

