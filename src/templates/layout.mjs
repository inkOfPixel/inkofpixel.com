// The page shell and the pieces every page shares: header, mobile menu, contact section, footer.
import { ARROW, accent, esc, tag } from '../lib/html.mjs';
import { contactInk, logo } from '../lib/brand.mjs';
import { LANGS, SITE_URL, T, url } from '../lib/site.mjs';

const absolute = (path) => SITE_URL + path;

const THEME_ICON =
  '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>';

function head(ctx) {
  const { page, lang, assets } = ctx;
  const canonical = absolute(page.path);
  const alternates = LANGS.filter((l) => page.alternates[l])
    .map((l) => `<link rel="alternate" hreflang="${l}" href="${absolute(page.alternates[l])}">`)
    .concat(page.alternates.en ? [`<link rel="alternate" hreflang="x-default" href="${absolute(page.alternates.en)}">`] : [])
    .join('\n');
  const image = absolute(encodeURI(page.image || '/assets/inkofpixel-featured-image.jpg'));
  const jsonLd = (page.jsonLd || [])
    .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
    .join('\n');
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
${alternates}
<meta property="og:type" content="${page.type || 'website'}">
<meta property="og:site_name" content="inkOfPixel">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="${lang === 'it' ? 'it_IT' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff">
<link rel="icon" type="image/png" href="/favicon.png">
${assets.fonts.map((font) => `<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin>`).join('\n')}
<script>try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}</script>
<link rel="stylesheet" href="${assets.css}">
<script src="${assets.js}" defer></script>
${jsonLd}`;
}

function navLinks(ctx) {
  const { lang, t, page } = ctx;
  return [
    ['services', url(lang, 'services')],
    ['projects', url(lang, 'projects')],
    ['about', `${url(lang)}#${t.tags.about}`],
    ['blog', url(lang, 'blog')],
  ].map(([key, href]) => ({ key, href, label: t.nav[key], current: page.active === key }));
}

function langSwitch(ctx, className) {
  const other = LANGS.find((l) => l !== ctx.lang);
  const href = ctx.page.alternates[other] || url(other);
  return `<a class="${className}" href="${href}" lang="${other}" hreflang="${other}" aria-label="${ctx.t.otherLang.label}">${ctx.t.otherLang.code}</a>`;
}

export function header(ctx) {
  const { lang, t } = ctx;
  const links = navLinks(ctx)
    .map((l) => `<a class="link" href="${l.href}"${l.current ? ' aria-current="page"' : ''}>${l.label}</a>`)
    .join('\n      ');
  return `<header class="header">
    <a class="logo" href="${url(lang)}" aria-label="${t.homeLabel}">${logo(30)}</a>
    <nav class="nav" aria-label="${t.navLabel}">
      ${links}
      ${langSwitch(ctx, 'link')}
    </nav>
    <div class="header-actions">
      <button class="theme-btn" type="button" data-theme-toggle aria-pressed="false" aria-label="${t.theme}">${THEME_ICON}</button>
      <a class="pill pill--sm nav-cta" href="${url(lang, 'contacts')}">${t.nav.contacts}</a>
      <button class="pill pill--sm menu-btn" type="button" data-menu-open aria-haspopup="dialog" aria-controls="menu" aria-expanded="false" aria-label="${t.openMenu}">${t.menu}<span class="burger" aria-hidden="true"><i></i><i></i></span></button>
    </div>
  </header>`;
}

function menu(ctx) {
  const { lang, t, site } = ctx;
  const entries = [...navLinks(ctx), { href: url(lang, 'contacts'), label: t.nav.contacts }];
  const links = entries
    .map((l, i) => `<a class="menu-link" href="${l.href}"><em>${String(i + 1).padStart(2, '0')}</em>${l.label}</a>`)
    .join('\n      ');
  return `<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="${t.menu}" hidden>
    <div class="menu-top">
      <a class="logo" href="${url(lang)}" aria-label="${t.homeLabel}">${logo(30)}</a>
      <button class="pill pill--sm" type="button" data-menu-close>${t.close}</button>
    </div>
    ${tag(t.tags.menu)}
    <nav class="menu-nav" aria-label="${t.menu}">
      ${links}
    </nav>
    <div class="menu-foot">
      <a class="pill" href="mailto:${site.email}">${site.email}</a>
      <span class="tag">${langSwitch(ctx, 'link')} · &lt;/${t.tags.menu}&gt;</span>
    </div>
  </div>`;
}

function footer(ctx) {
  const { lang, t, site } = ctx;
  const f = t.footer;
  const c = site.company;
  const capital = c.shareCapital
    ? `${f.capital} € ${new Intl.NumberFormat(lang === 'it' ? 'it-IT' : 'en-GB', { useGrouping: 'always' }).format(c.shareCapital)} ${f.paidUp}`
    : null;
  const legal = [c.name, `${f.vat} ${c.vat}`, `${f.registry} ${c.registry}`, capital].filter(Boolean);
  const offices = c.offices
    .map((office) => `<address class="office"><strong>${esc(office.city)} <em>${f.offices[office.kind]}</em></strong>${office.lines.map((line) => `<span>${esc(line)}</span>`).join('')}</address>`)
    .join('\n        ');
  const siteLinks = navLinks(ctx)
    .map((l) => `<a class="link" href="${l.href}">${l.label}</a>`)
    .join('\n        ');
  const socials = site.socials
    .map((s) => `<a class="link" href="${esc(s.link)}" rel="noopener">${esc(s.title)}</a>`)
    .join('\n        ');
  return `<footer class="footer">
    <div class="footer-cols">
      <div class="footer-col footer-brand">
        <a class="logo" href="${url(lang)}" aria-label="${t.homeLabel}">${logo(30)}</a>
        <p>${f.tagline}</p>
      </div>
      <div class="footer-col footer-offices">
        <span class="tag">// ${f.officesTitle}</span>
        ${offices}
      </div>
      <nav class="footer-col" aria-label="${f.site}">
        <span class="tag">// ${f.site}</span>
        ${siteLinks}
        <a class="link" href="${url(lang, 'contacts')}">${t.nav.contacts}</a>
      </nav>
      <nav class="footer-col" aria-label="${f.social}">
        <span class="tag">// ${f.social}</span>
        ${socials}
      </nav>
      <nav class="footer-col" aria-label="${f.legal}">
        <span class="tag">// ${f.legal}</span>
        <a class="link" href="${url(lang, 'privacy')}">${f.privacy}</a>
        <a class="link" href="${url(lang, 'cookies')}">${f.cookies}</a>
      </nav>
    </div>
    <div class="footer-legal">
      <p>${legal.map(esc).join(' · ')}<br>© ${new Date().getFullYear()} ${esc(c.name)}. ${f.rights}</p>
    </div>
  </footer>`;
}

// The contact form posts to /api/contact (server/contact.mjs). Without JavaScript the
// server redirects back to #sent or #not-sent, which show the outcome through :target.
function contactForm(ctx) {
  const { lang, t, site } = ctx;
  const f = t.form;
  return `<div class="form-wrap">
      <p class="form-done" id="sent" tabindex="-1" role="status">${f.sent}</p>
      <p class="form-fail" id="not-sent" role="alert">${f.failed} <a class="link" href="mailto:${site.email}">${site.email}</a>.</p>
      <form class="form" method="post" action="/api/contact" data-contact-form>
        <input type="hidden" name="lang" value="${lang}">
        <div class="field"><label for="contact-name">// ${f.name}</label><input id="contact-name" name="name" type="text" autocomplete="name" maxlength="120" required></div>
        <div class="field"><label for="contact-email">// ${f.email}</label><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="200" required></div>
        <div class="field field--wide"><label for="contact-message">// ${f.message}</label><textarea id="contact-message" name="message" rows="4" minlength="10" maxlength="5000" required></textarea></div>
        <div class="field field--trap" aria-hidden="true"><label for="contact-website">Website</label><input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <div class="form-foot">
          <button class="pill pill--lg" type="submit">${f.send}<span class="arrow">${ARROW}</span></button>
          <p class="form-note">${f.note} <a class="link" href="${url(lang, 'privacy')}">${t.footer.privacy}</a></p>
        </div>
      </form>
      <p class="form-alt">${f.or} <a class="link" href="mailto:${site.email}">${site.email}</a></p>
    </div>`;
}

// The closing black section: the call to get in touch, with the footer inside.
// On the contacts page it carries the page's <h1>.
export function contact(ctx, { asPage = false, text } = {}) {
  const { t, site } = ctx;
  const [before, word] = t.contactTitle;
  const h = asPage ? 'h1' : 'h2';
  return `<section class="contact${asPage ? ' contact--page' : ''}" id="${t.tags.contacts}" data-pool>
  ${contactInk()}
  <div class="dots dots--fade-top" aria-hidden="true"></div>
  <div class="dots-lit" aria-hidden="true"></div>
  <div class="blend contact-in">
    ${asPage ? header(ctx) : ''}
    <div class="contact-main${asPage ? '' : ' rv'}">
      ${tag(t.tags.contacts)}
      <${h} class="display">${before}<br>${accent(word, { now: asPage })}</${h}>
      <p class="lead">${esc(text || site.contactText[ctx.lang])}</p>
      ${asPage ? contactForm(ctx) : `<a class="pill pill--xl" href="mailto:${site.email}">${site.email}<span class="arrow">${ARROW}</span></a>`}
    </div>
    ${footer(ctx)}
  </div>
</section>`;
}

// Light top of an inner page: navigation, a code tag with a floating ink drop, then the title block.
export function pageTop(ctx, { label, body }) {
  return `<div class="page-top">
  <div class="dots-soft dots--fade-bottom" aria-hidden="true"></div>
  ${header(ctx)}
  <div class="page-head">
    <div class="page-head-row in">${label}<i class="blob" aria-hidden="true"></i></div>
    ${body}
  </div>
</div>`;
}

// A full-width row that fills with ink from the cursor.
export function inkRow({ num, title, text, href }) {
  return `<a class="row rv" href="${href}" data-ink-origin>
      <span class="row-in">
        <em class="row-num">${num}</em>
        <span class="row-title">${esc(title)}</span>
        <span class="row-text">${esc(text)}</span>
        <span class="go" aria-hidden="true">${ARROW}</span>
      </span>
    </a>`;
}

export function sectionTitle(parts, variant = 0) {
  return `<h2 class="h2">${esc(parts[0])} ${accent(parts[1], { variant })}</h2>`;
}

export function document(ctx, { top = '', main, withContact = true }) {
  return `<!doctype html>
<html lang="${ctx.lang}">
<head>
${head(ctx)}
</head>
<body>
<a class="skip" href="#main">${ctx.t.skip}</a>
<div class="site" id="top">
${top}
<main id="main">
${main}
</main>
${withContact ? contact(ctx) : ''}
${menu(ctx)}
</div>
</body>
</html>
`;
}

export function context(lang, site, assets, page) {
  return { lang, t: T[lang], site, assets, page };
}
