const fs = require('fs');
const css = fs.readFileSync('src/index.css', 'utf8');
console.log('CSS lines count:', css.split('\n').length);
const matches = css.split('\n').filter(l => /filter|opacity|linear-gradient|hero/i.test(l));
console.log('Matches:', matches);

