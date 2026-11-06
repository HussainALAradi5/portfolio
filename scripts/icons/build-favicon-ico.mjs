// Builds public/favicon.ico (16, 32 and 48 px) from public/favicon.svg.
// Browsers and link crawlers request /favicon.ico directly, even when the page declares an SVG icon.
// Run: node scripts/icons/build-favicon-ico.mjs
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SOURCE = 'public/favicon.svg';
const OUTPUT = 'public/favicon.ico';
const SIZES = [16, 32, 48];
const HEADER_BYTES = 6;
const ENTRY_BYTES = 16;

const images = await Promise.all(
  SIZES.map((size) => sharp(SOURCE, { density: 384 }).resize(size, size).png().toBuffer()),
);

// ICO layout: a 6-byte header, one 16-byte entry per image, then the PNG data of each image.
const header = Buffer.alloc(HEADER_BYTES);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

let offset = HEADER_BYTES + ENTRY_BYTES * images.length;
const entries = images.map((image, index) => {
  const entry = Buffer.alloc(ENTRY_BYTES);
  entry.writeUInt8(SIZES[index], 0); // width
  entry.writeUInt8(SIZES[index], 1); // height
  entry.writeUInt8(0, 2); // no palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(image.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += image.length;
  return entry;
});

writeFileSync(OUTPUT, Buffer.concat([header, ...entries, ...images]));
console.log(`wrote ${OUTPUT} (${SIZES.join(', ')} px)`);
