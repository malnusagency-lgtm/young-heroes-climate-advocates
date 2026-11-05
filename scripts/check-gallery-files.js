const fs = require('fs');
const path = require('path');

const galleryDir = path.resolve(__dirname, '..', 'public', 'gallery');
const useGalleryContent = fs.readFileSync('src/hooks/useGallery.js', 'utf8');

const regex = /image_path:\s*'([^']+)'/g;
let match;
let missing = 0;
while ((match = regex.exec(useGalleryContent)) !== null) {
  const file = match[1];
  const exists = fs.existsSync(path.join(galleryDir, file));
  if (!exists) {
    console.log('Missing in public/gallery:', file);
    missing++;
  }
}
console.log('Finished check. Missing count:', missing);

