// Production entry point of the container.
// Caddy serves the static site on port 80 and passes /api/* to the small server below,
// which only handles the contact form. This process starts Caddy and stops with it, so
// the container restarts as a whole if either of the two goes down.
import { spawn } from 'node:child_process';
import http from 'node:http';
import { createContactHandler } from './contact.mjs';

const PORT = Number(process.env.API_PORT) || 3001;
const handleContact = createContactHandler();

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  if (pathname === '/api/contact') return handleContact(req, res);
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => console.log(`contact form listening on 127.0.0.1:${PORT}`));

const caddy = spawn('caddy', ['run', '--config', '/etc/caddy/Caddyfile', '--adapter', 'caddyfile'], { stdio: 'inherit' });
caddy.on('exit', (code) => process.exit(code ?? 1));
caddy.on('error', (error) => {
  console.error('could not start caddy:', error.message);
  process.exit(1);
});
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close();
    caddy.kill(signal);
  });
}
