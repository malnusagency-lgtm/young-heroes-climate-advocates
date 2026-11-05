const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\alexf\\.gemini\\antigravity\\brain\\ca901b7e-7a0a-4bb9-8062-617b1ccd70de';
const LOGO_SRC = path.join(ARTIFACT_DIR, '.user_uploaded', 'media_1793556307003_ef2afb0b.jpg');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const assetsImgDir = path.join(rootDir, 'src', 'assets', 'images');
const publicGalleryDir = path.join(publicDir, 'gallery');

[publicDir, assetsImgDir, publicGalleryDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function copyIfSourceExists(src, targets) {
  if (fs.existsSync(src)) {
    targets.forEach((dest) => {
      try {
        fs.copyFileSync(src, dest);
        console.log(`[Asset Setup] Copied ${path.basename(src)} -> ${path.relative(rootDir, dest)}`);
      } catch (err) {
        console.warn(`[Asset Setup] Could not copy to ${dest}:`, err.message);
      }
    });
  } else {
    console.warn(`[Asset Setup] Source not found: ${src}`);
  }
}

// 1. Copy Logo if in artifact directory
if (fs.existsSync(LOGO_SRC)) {
  copyIfSourceExists(LOGO_SRC, [
    path.join(publicDir, 'logo.jpeg'),
    path.join(publicDir, 'logo.jpg'),
    path.join(assetsImgDir, 'logo.jpeg'),
    path.join(assetsImgDir, 'logo.jpg'),
  ]);
}

// 2. Ensure hero background exists
const heroPublic = path.join(publicDir, 'hero-bg.jpg');
if (fs.existsSync(heroPublic)) {
  copyIfSourceExists(heroPublic, [
    path.join(publicDir, 'hero-bg.jpeg'),
    path.join(assetsImgDir, 'hero-bg.jpg'),
    path.join(assetsImgDir, 'hero-bg.jpeg'),
  ]);
}

// 3. Count gallery images
if (fs.existsSync(publicGalleryDir)) {
  const galleryFiles = fs.readdirSync(publicGalleryDir).filter((file) => {
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase());
  });
  console.log(`[Asset Setup] Verified ${galleryFiles.length} gallery images in public/gallery.`);
}

console.log('[Asset Setup] Ready for Next.js.');
