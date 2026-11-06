// Captures the README screenshots in docs/screenshots.
// Starts the dev server on its own port, drives headless Edge or Chrome over the DevTools protocol
// (to emulate a phone, pick the colour scheme and open the command palette or lightbox), then stops
// the server again.
//   npm run screenshots
// BASE_URL uses an already running server instead; BROWSER overrides the Edge path.
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';

/** A port of its own, so it never captures another app on the usual 4200. */
const SERVER_PORT = 4321;
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${SERVER_PORT}`;
const STARTS_SERVER = !process.env.BASE_URL;
const SERVER_TIMEOUT_MS = 180_000;
const BROWSER = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUTPUT_DIR = 'docs/screenshots';
const DEBUG_PORT = 9333;
const SETTLE_MS = 1800;
const JPEG_QUALITY = 82;

const DESKTOP = { width: 1280, height: 860, scale: 1, mobile: false, outputWidth: 800 };
const PHONE = { width: 375, height: 812, scale: 2, mobile: true, outputWidth: 600 };

/** Scripts run in the page before the capture. */
const OPEN_PALETTE = `
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
  await new Promise((r) => setTimeout(r, 200));
  const input = document.querySelector('app-command-palette input');
  input.value = 'spring';
  input.dispatchEvent(new Event('input'));`;
const OPEN_LIGHTBOX = `document.querySelector('app-project-gallery button.preview').click();`;
/** Shows a past role rather than the default current one. */
const SELECT_ODOO_STOP =`document.querySelectorAll('app-experience-timeline [role="tab"]')[2].click();`;

const SHOTS = [
  { name: 'home-light', path: '/', scheme: 'light', device: DESKTOP, height: 1384 },
  { name: 'projects-dark', path: '/projects', scheme: 'dark', device: DESKTOP, height: 1416 },
  { name: 'project-detail-light', path: '/projects/fun-travels-tour', scheme: 'light', device: DESKTOP, height: 1384 },
  { name: 'experience-dark', path: '/experience', scheme: 'dark', device: DESKTOP, height: 900, script: SELECT_ODOO_STOP },
  { name: 'skills-light', path: '/skills', scheme: 'light', device: DESKTOP, height: 820 },
  { name: 'command-palette-dark', path: '/', scheme: 'dark', device: DESKTOP, height: 820, script: OPEN_PALETTE },
  { name: 'lightbox-dark', path: '/projects/fun-travels-tour', scheme: 'dark', device: DESKTOP, height: 820, script: OPEN_LIGHTBOX },
  { name: 'home-mobile', path: '/', scheme: 'light', device: PHONE, height: 1400 },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function isUp(url) {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false;
  }
}

/** Starts `ng serve` and resolves once it answers, or fails after SERVER_TIMEOUT_MS. */
async function startServer() {
  if (await isUp(BASE_URL)) {
    throw new Error(`Port ${SERVER_PORT} is already in use; stop that server or pass BASE_URL.`);
  }
  console.log(`starting the dev server on port ${SERVER_PORT}…`);
  const server = spawn(`npx ng serve --port ${SERVER_PORT}`, { shell: true, stdio: 'ignore' });
  const deadline = Date.now() + SERVER_TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (await isUp(BASE_URL)) return server;
    await wait(1000);
  }
  stopProcess(server);
  throw new Error('The dev server did not start in time.');
}

/** Stops a process and its children (ng serve runs under a shell). */
function stopProcess(child) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    child.kill();
  }
}

async function connect() {
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return new Cdp(page.webSocketDebuggerUrl);
    } catch {
      // The browser is still starting.
    }
    await wait(200);
  }
  throw new Error('The browser did not open a debugging port.');
}

class Cdp {
  #socket;
  #nextId = 1;
  #pending = new Map();
  #ready;

  constructor(url) {
    this.#socket = new WebSocket(url);
    this.#ready = new Promise((resolve) => this.#socket.addEventListener('open', resolve, { once: true }));
    this.#socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      const pending = this.#pending.get(message.id);
      if (!pending) return;
      this.#pending.delete(message.id);
      message.error ? pending.reject(new Error(message.error.message)) : pending.resolve(message.result);
    });
  }

  async send(method, params = {}) {
    await this.#ready;
    const id = this.#nextId++;
    this.#socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.#pending.set(id, { resolve, reject }));
  }

  close() {
    this.#socket.close();
  }
}

async function capture(cdp, shot) {
  const { device } = shot;
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: device.width,
    height: shot.height,
    deviceScaleFactor: device.scale,
    mobile: device.mobile,
  });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: shot.scheme }] });
  // A stored theme would override the emulated scheme, so start each shot from a clean slate.
  await cdp.send('Runtime.evaluate', { expression: 'try { localStorage.clear() } catch {}' });
  await cdp.send('Page.navigate', { url: `${BASE_URL}${shot.path}` });
  await wait(SETTLE_MS);
  if (shot.script) {
    await cdp.send('Runtime.evaluate', { expression: `(async () => { ${shot.script} })()`, awaitPromise: true });
    await wait(SETTLE_MS / 2);
  }
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
  const file = join(OUTPUT_DIR, `${shot.name}.jpg`);
  await sharp(Buffer.from(data, 'base64'))
    .resize({ width: device.outputWidth })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(file);
  console.log(`wrote ${file}`);
}

const server = STARTS_SERVER ? await startServer() : null;
const profile = mkdtempSync(join(tmpdir(), 'shots-'));
const browser = spawn(BROWSER, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${DEBUG_PORT}`,
  `--user-data-dir=${profile}`,
  'about:blank',
]);

let cdp;
try {
  cdp = await connect();
  await cdp.send('Page.enable');
  for (const shot of SHOTS) {
    await capture(cdp, shot);
  }
} finally {
  cdp?.close();
  stopProcess(browser);
  if (server) stopProcess(server);
  await wait(500);
  rmSync(profile, { recursive: true, force: true });
}
