// Converts every PNG/JPG under public/images/projects to WebP:
//   <name>.webp        full image, at most FULL_WIDTH wide (gallery)
//   <name>.thumb.webp  thumbnail, THUMB_WIDTH wide (cards and gallery strip)
// The originals are removed. Run: npm run images:optimize
import { readdir, rm, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images/projects';
const FULL_WIDTH = 1920;
const THUMB_WIDTH = 640;
const QUALITY = 82;
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (SOURCE_EXTENSIONS.has(extname(entry.name).toLowerCase())) yield path;
  }
}

let before = 0;
let after = 0;
for await (const file of walk(ROOT)) {
  const base = file.slice(0, -extname(file).length);
  before += (await stat(file)).size;
  await sharp(file).resize({ width: FULL_WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(`${base}.webp`);
  await sharp(file).resize({ width: THUMB_WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(`${base}.thumb.webp`);
  after += (await stat(`${base}.webp`)).size + (await stat(`${base}.thumb.webp`)).size;
  await rm(file);
  console.log(`converted ${file}`);
}
console.log(`total: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB`);
