const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');

const mapping = {
  'body-1.jpg': 'pic-1.jpg',
  'body-2.jpg': 'pic-2.jpg',
  'body-3.jpg': 'pic-3.jpg',
  'body-4.jpg': 'pic-4.jpg',
  'body-5.jpg': 'pic-5.jpg',
  'body-6.jpg': 'pic-1.jpg',
  'body-7.jpg': 'pic-2.jpg',
  'body-8.jpg': 'pic-3.jpg',
  'body-9.jpg': 'pic-4.jpg',
  'body.jpg':   'pic.jpg',
  'banner-1.jpg':'pic-5.jpg'
};

let copied = 0;
for (const [target, src] of Object.entries(mapping)) {
  const srcPath = path.join(imagesDir, src);
  const targetPath = path.join(imagesDir, target);

  if (!fs.existsSync(srcPath)) {
    console.warn(`source missing: ${src} (skipping ${target})`);
    continue;
  }

  try {
    fs.copyFileSync(srcPath, targetPath);
    console.log(`copied ${src} -> ${target}`);
    copied++;
  } catch (err) {
    console.error(`failed copying ${src} -> ${target}:`, err.message);
  }
}

console.log(`Done. total copied: ${copied}`);
