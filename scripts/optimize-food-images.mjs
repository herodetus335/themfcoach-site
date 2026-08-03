/**
 * Generate desktop/mobile AVIF + WebP (+ JPEG fallback) for calculator collage.
 * Originals in images/food/*.jpg are left untouched as backups.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'images', 'food');
const outDir = path.join(srcDir, 'optimized');

const images = [
  {
    file: 'pexels-leonardo-vazquez-1427877-3743169.jpg',
    slug: 'leonardo',
    // Large collage tile (~1/3 viewport width × full height @2x)
    desktop: { width: 1400, height: 2200 },
    mobile: { width: 900, height: 1200 },
  },
  {
    file: 'pexels-noon-30770322.jpg',
    slug: 'noon',
    desktop: { width: 1000, height: 1400 },
    mobile: { width: 600, height: 900 },
  },
  {
    file: 'pexels-muhammad-solikin-2148932884-36853608.jpg',
    slug: 'solikin',
    desktop: { width: 1000, height: 1400 },
    mobile: { width: 600, height: 900 },
  },
  {
    file: 'pexels-caio-niceas-2148806704-36616789.jpg',
    slug: 'caio',
    desktop: { width: 1000, height: 1400 },
    mobile: { width: 600, height: 900 },
  },
  {
    file: 'pexels-valeriya-28292008.jpg',
    slug: 'valeriya',
    desktop: { width: 1000, height: 1400 },
    mobile: { width: 600, height: 900 },
  },
];

fs.mkdirSync(outDir, { recursive: true });

async function writeVariant(pipeline, outPath, format) {
  let output = pipeline.clone();
  if (format === 'avif') {
    output = output.avif({ quality: 58, effort: 4 });
  } else if (format === 'webp') {
    output = output.webp({ quality: 78 });
  } else {
    output = output.jpeg({ quality: 82, mozjpeg: true });
  }
  await output.toFile(outPath);
  const { size } = fs.statSync(outPath);
  const meta = await sharp(outPath).metadata();
  return { size, width: meta.width, height: meta.height };
}

async function processImage(entry) {
  const input = path.join(srcDir, entry.file);
  const results = [];

  for (const [label, dims] of [
    ['desktop', entry.desktop],
    ['mobile', entry.mobile],
  ]) {
    const base = sharp(input).rotate().resize({
      width: dims.width,
      height: dims.height,
      fit: 'inside',
      withoutEnlargement: true,
    });

    for (const format of ['avif', 'webp', 'jpg']) {
      const outName = `${entry.slug}-${label}.${format === 'jpg' ? 'jpg' : format}`;
      const outPath = path.join(outDir, outName);
      const info = await writeVariant(base, outPath, format);
      results.push({ outName, ...info, kb: Math.round((info.size / 1024) * 10) / 10 });
      console.log(
        `  ${outName.padEnd(28)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ${String(info.kb).padStart(6)} KB`
      );
    }
  }

  return results;
}

const all = [];
for (const entry of images) {
  console.log(`\n${entry.file}`);
  all.push(...(await processImage(entry)));
}

const totalOptimized = all
  .filter((r) => r.outName.endsWith('.avif') || r.outName.endsWith('.webp'))
  .reduce((sum, r) => sum + r.size, 0);

// Typical transfer: browser picks one format × one size per image (5 images).
// Estimate desktop AVIF set and mobile AVIF set:
const desktopAvif = all.filter((r) => r.outName.includes('-desktop.avif'));
const mobileAvif = all.filter((r) => r.outName.includes('-mobile.avif'));
const desktopWebp = all.filter((r) => r.outName.includes('-desktop.webp'));
const mobileWebp = all.filter((r) => r.outName.includes('-mobile.webp'));

const sum = (arr) => arr.reduce((s, r) => s + r.size, 0);

console.log('\n=== Transfer estimates (5 images, one variant each) ===');
console.log(`Desktop AVIF: ${Math.round(sum(desktopAvif) / 1024)} KB`);
console.log(`Desktop WebP: ${Math.round(sum(desktopWebp) / 1024)} KB`);
console.log(`Mobile AVIF:  ${Math.round(sum(mobileAvif) / 1024)} KB`);
console.log(`Mobile WebP:  ${Math.round(sum(mobileWebp) / 1024)} KB`);
console.log(`All generated files total: ${Math.round(totalOptimized / 1024)} KB (both sizes + formats)`);
