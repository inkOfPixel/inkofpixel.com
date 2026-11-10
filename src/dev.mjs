// Local preview: builds the site, serves /dist and rebuilds when a source file changes.
//   npm run dev   ->  http://localhost:4321
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createContactHandler } from '../server/contact.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.mp4': 'video/mp4',
};

function build() {
  // A fresh process each time, so edited templates are picked up.
  spawnSync(process.execPath, [path.join(ROOT, 'src/build.mjs')], { stdio: 'inherit', env: { ...process.env, SKIP_REMOTE: '1' } });
}

// Same lookup order as the production server: the file, then .html, then the folder index.
function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  for (const candidate of [clean, `${clean}.html`, path.join(clean, 'index.html')]) {
    const file = path.join(DIST, candidate);
    if (file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

build();

// Without SMTP settings the handler prints each message here instead of sending it.
const handleContact = createContactHandler();

let timer = null;
for (const dir of ['src', 'content', 'static']) {
  fs.watch(path.join(ROOT, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 150);
  });
}

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost');
    if (pathname === '/api/contact') return handleContact(req, res);
    const file = resolve(pathname);
    if (!file) {
      const notFound = path.join(DIST, pathname.startsWith('/it/') ? 'it/404.html' : '404.html');
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(fs.readFileSync(notFound));
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Preview on http://localhost:${PORT}`));
