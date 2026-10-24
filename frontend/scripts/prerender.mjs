import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist/frontend/browser');
const shell = fs.readFileSync(path.join(dist, 'index.html'));
const candidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = candidates.find((file) => fs.existsSync(file));
if (!chrome) {
  // CI images (e.g. Netlify) have no Chrome; ship the SPA shell instead of failing the build.
  console.warn('Chrome not found, skipping prerender. Set CHROME_PATH to enable it.');
  process.exit(0);
}
const routes = ['/', '/local-business', '/web-development', '/about', '/privacy', '/terms', '/404'];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url || '/', 'http://127.0.0.1').pathname);
  const ext = path.extname(pathname);
  if (ext) {
    const file = path.join(dist, pathname);
    if (!file.startsWith(dist) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404);
      res.end('missing');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(shell);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;

function dump(route) {
  const url = origin + route;
  return new Promise((resolve, reject) => {
    const child = spawn(
      chrome,
      [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--hide-scrollbars',
        `--user-data-dir=${path.join(process.env.TEMP || '/tmp', 'synapse-prerender-' + port + '-' + route.replace(/\W/g, ''))}`,
        '--virtual-time-budget=25000',
        '--timeout=40000',
        '--dump-dom',
        url,
      ],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );
    child.on('error', reject);
    let out = '';
    let err = '';
    child.stdout.on('data', (chunk) => {
      out += chunk;
    });
    child.stderr.on('data', (chunk) => {
      err += chunk;
    });
    child.on('exit', (code) => {
      const html = out.replaceAll(origin, '');
      if (code !== 0 || !html.includes('<h1')) {
        reject(new Error(`Prerender failed for ${route}\n${err.slice(-800)}\n${html.slice(0, 400)}`));
        return;
      }
      resolve(html);
    });
  });
}

try {
  for (const route of routes) {
    const html = await dump(route);
    const folder = route === '/' ? dist : path.join(dist, route.slice(1));
    fs.mkdirSync(folder, { recursive: true });
    const file = route === '/' ? path.join(dist, 'index.html') : path.join(folder, 'index.html');
    fs.writeFileSync(file, html);
    if (route === '/404') fs.writeFileSync(path.join(dist, '404.html'), html);
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '');
    console.log('prerendered', route, '→', h1);
  }
} finally {
  server.close();
}
