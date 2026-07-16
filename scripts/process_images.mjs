// scripts/process_images.mjs
// This script reads scraped_images.json and generates a mapping of hero images for each page.
// It selects the first non-data:image URL for each page as the representative hero image.
// If no suitable image is found, it falls back to a default Unsplash placeholder.
import fs from 'fs';
import path from 'path';

const SCRAPED_PATH = path.resolve('scraped_images.json');
const OUTPUT_PATH = path.resolve('image_mapping.json');
const DEFAULT_PLACEHOLDER = 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop';

function getFirstValidImage(images) {
  for (const img of images) {
    if (img && img.src && !img.src.startsWith('data:image')) {
      return img.src;
    }
  }
  return DEFAULT_PLACEHOLDER;
}

try {
  const raw = fs.readFileSync(SCRAPED_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const mapping = {};
  for (const [page, images] of Object.entries(data)) {
    // Normalize page path, e.g., '/' stays '/', others keep slash.
    const hero = getFirstValidImage(images);
    mapping[page] = hero;
  }
  // Write mapping to JSON file.
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mapping, null, 2), 'utf-8');
  console.log('Image mapping generated at', OUTPUT_PATH);
} catch (err) {
  console.error('Error processing images:', err);
  process.exit(1);
}
