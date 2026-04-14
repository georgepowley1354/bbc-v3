import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const svgPath = path.join(iconsDir, 'icon.svg');
const svgContent = fs.readFileSync(svgPath);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 16, 32, 48];

const results = await Promise.allSettled(
  sizes.map((size) =>
    sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`))
      .then(() => console.log(`Generated icon-${size}x${size}.png`))
  )
);

const failed = results.filter((r) => r.status === 'rejected');
if (failed.length > 0) {
  console.error('Some icons failed to generate:');
  failed.forEach((f) => console.error(f.reason?.message));
  process.exit(1);
} else {
  console.log('All icons generated successfully.');
}
