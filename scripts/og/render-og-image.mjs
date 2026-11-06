// Renders scripts/og/og-image.html to public/og-image.png (1200x630) with headless Edge or Chrome.
// Set BROWSER to the browser executable if it is not in the default Windows location.
// Run: node scripts/og/render-og-image.mjs
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const WIDTH = 1200;
const HEIGHT = 630;
const browser = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const template = pathToFileURL(resolve('scripts/og/og-image.html')).href;
const output = resolve('public/og-image.png');
const profile = mkdtempSync(join(tmpdir(), 'og-'));

try {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--user-data-dir=${profile}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    `--screenshot=${output}`,
    template,
  ]);
  console.log(`wrote ${output}`);
} finally {
  rmSync(profile, { recursive: true, force: true });
}
