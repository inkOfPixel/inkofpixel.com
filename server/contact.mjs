// Receives the contact form and forwards it by email. Nothing is stored.
//
// Configuration (environment variables):
//   CONTACT_TO      where messages go, e.g. hello@inkofpixel.com
//   CONTACT_FROM    sender shown in the inbox; must be allowed by the SMTP provider
//   SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD
//   SITE_HOSTS      comma-separated hosts allowed to post the form
// Without SMTP_HOST, outside production, messages are printed instead of sent.
import nodemailer from 'nodemailer';

const MAX_BODY = 20_000; // bytes
const LIMITS = { name: 120, email: 200, message: 5000 };
const RATE = { max: 5, windowMs: 10 * 60 * 1000 }; // per address
const CONTACT_PAGE = { en: '/contacts', it: '/it/contatti' };

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error('too large'));
        req.destroy();
      } else {
        chunks.push(chunk);
      }
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function parse(raw, contentType = '') {
  if (contentType.includes('application/json')) {
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : {};
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

const clean = (value, max) => String(value ?? '').replace(/\r/g, '').trim().slice(0, max);
// A header value must stay on one line.
const oneLine = (value) => value.replace(/[\n\t]+/g, ' ');

function validate(fields) {
  const name = oneLine(clean(fields.name, LIMITS.name));
  const email = oneLine(clean(fields.email, LIMITS.email));
  const message = clean(fields.message, LIMITS.message);
  const valid = name.length > 0 && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email) && message.length >= 10;
  return valid ? { name, email, message } : null;
}

export function createContactHandler(env = process.env) {
  const production = env.NODE_ENV === 'production';
  const allowedHosts = (env.SITE_HOSTS || 'inkofpixel.com,www.inkofpixel.com,localhost').split(',').map((host) => host.trim());
  const transport = env.SMTP_HOST
    ? nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT) || 587,
        secure: Number(env.SMTP_PORT) === 465,
        auth: env.SMTP_USERNAME ? { user: env.SMTP_USERNAME, pass: env.SMTP_PASSWORD } : undefined,
      })
    : null;
  if (!transport) console.warn(production ? 'contact form: SMTP_HOST is not set, messages cannot be sent' : 'contact form: no SMTP_HOST, messages are printed here instead of sent');

  const recent = new Map(); // address -> timestamps of its recent messages
  function limited(address) {
    const now = Date.now();
    const times = (recent.get(address) || []).filter((time) => now - time < RATE.windowMs);
    if (times.length >= RATE.max) {
      recent.set(address, times);
      return true;
    }
    times.push(now);
    recent.set(address, times);
    if (recent.size > 5000) recent.clear();
    return false;
  }

  async function deliver({ name, email, message }, lang) {
    const mail = {
      from: env.CONTACT_FROM || env.CONTACT_TO,
      to: env.CONTACT_TO,
      replyTo: { name, address: email },
      subject: `[inkofpixel.com] Messaggio da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nLingua del sito: ${lang}\n\n${message}\n`,
    };
    if (!transport) {
      if (production) throw new Error('SMTP is not configured');
      console.log('contact form (not sent):', mail);
      return;
    }
    await transport.sendMail(mail);
  }

  return async function handleContact(req, res) {
    const wantsJson = (req.headers.accept || '').includes('application/json');
    let lang = 'en';
    // The form works without JavaScript too: then the answer is a redirect back to the
    // contacts page, where #sent or #not-sent shows the outcome.
    const reply = (status, error) => {
      if (wantsJson) {
        res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(error ? { ok: false, error } : { ok: true }));
      } else {
        res.writeHead(303, { Location: `${CONTACT_PAGE[lang]}#${error ? 'not-sent' : 'sent'}`, 'Cache-Control': 'no-store' });
        res.end();
      }
    };

    try {
      if (req.method !== 'POST') return reply(405, 'method');
      const origin = req.headers.origin;
      if (origin && !allowedHosts.includes(new URL(origin).hostname)) return reply(403, 'origin');

      const fields = parse(await readBody(req), req.headers['content-type']);
      if (fields.lang === 'it') lang = 'it';
      // The "website" field is hidden from people: only bots fill it. Answer as if it worked.
      if (clean(fields.website, 200)) return reply(200);

      const data = validate(fields);
      if (!data) return reply(422, 'invalid');

      const address = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
      if (limited(address)) return reply(429, 'rate');

      await deliver(data, lang);
      return reply(200);
    } catch (error) {
      console.error('contact form:', error.message);
      return reply(error.message === 'too large' ? 413 : 500, 'unavailable');
    }
  };
}
