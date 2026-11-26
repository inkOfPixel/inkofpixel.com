// Home page: ink hero, client marquee, services, featured clients, about.
import { ARROW, accent, esc, img, inkWords, tag } from '../lib/html.mjs';
import { heroInk } from '../lib/brand.mjs';
import { slugify, url } from '../lib/site.mjs';
import { document, header, inkRow, sectionTitle } from './layout.mjs';

function hero(ctx, home) {
  const { lang, t } = ctx;
  const lines = home.hero.titleLines
    .map((line, i) => `<span class="line"><span style="--d:${(0.05 + i * 0.11).toFixed(2)}s">${esc(line)}</span></span>`)
    .join('\n        ');
  const last = (0.05 + home.hero.titleLines.length * 0.11).toFixed(2);
  return `<div class="hero" data-pool>
  ${heroInk()}
  <div class="blend">
    <div class="dots dots--fade-bottom" aria-hidden="true"></div>
    <div class="dots-lit" aria-hidden="true"></div>
    ${header(ctx)}
    <div class="hero-in">
      <h1 class="hero-title">
        ${lines}
        <span class="line"><span style="--d:${last}s">${accent(home.hero.titleAccent, { now: true })}<i class="caret" aria-hidden="true"></i></span></span>
      </h1>
      <div class="hero-row in" style="--d:.45s">
        <p class="lead">${esc(home.hero.subtitle)}</p>
        <div class="hero-actions">
          <a class="pill pill--lg" href="#${t.tags.contacts}">${t.hero.cta}<span class="arrow">${ARROW}</span></a>
          <a class="link" href="${url(lang, 'projects')}">${t.hero.secondary}</a>
        </div>
      </div>
      <div class="hero-foot in" style="--d:.6s">
        <span class="scroll"><span class="drip-track" aria-hidden="true"><i class="drip"></i></span>${t.hero.scroll}</span>
        <span data-xy aria-hidden="true">x 0000 · y 0000</span>
      </div>
    </div>
  </div>
</div>`;
}

function marquee(ctx, names) {
  const item = (name, i, hidden) =>
    `<span class="marquee-item"${hidden ? ' aria-hidden="true"' : ''}>${i % 2 ? `<em>${esc(name)}</em>` : `<span>${esc(name)}</span>`}<i class="sep" aria-hidden="true"></i></span>`;
  // The list is repeated so the loop can slide by exactly half its width.
  const copies = names.length < 6 ? 4 : 2;
  const items = Array.from({ length: copies }, (_, copy) => names.map((name, i) => item(name, i, copy > 0)).join('')).join('');
  return `<div class="marquee" role="group" aria-label="${ctx.t.clientsLabel}"><div class="track">${items}</div></div>`;
}

function services(ctx, home) {
  const { lang, t } = ctx;
  const servicesUrl = url(lang, 'services');
  let n = 0;
  const groups = home.services
    .map((group, g) => {
      const heading = `<h3 class="group"><i class="ripple" aria-hidden="true"></i>${esc(group.groupTitle)}</h3>`;
      const intro = group.groupDescription
        ? `<div class="group-row rv">${heading}<p>${esc(group.groupDescription)}</p></div>`
        : `<div class="group-row rv">${heading}</div>`;
      const rows = group.serviceList
        .map((service) => {
          n += 1;
          const anchor = g === 0 ? slugify(service.title) : slugify(group.groupTitle);
          return inkRow({ num: String(n).padStart(2, '0'), title: service.title, text: service.description, href: `${servicesUrl}#${anchor}` });
        })
        .join('\n    ');
      return `${intro}\n    ${rows}`;
    })
    .join('\n    ');
  return `<section class="section" id="${t.tags.services}">
  <div class="section-head rv">
    <div class="section-head-main">${tag(t.tags.services)}${sectionTitle(t.servicesTitle, 1)}</div>
    <p class="section-lead">${esc(home.servicesLead)}</p>
  </div>
  <div class="rows">
    ${groups}
    <span class="tag tag--end rv">&lt;/${t.tags.services}&gt;</span>
  </div>
</section>`;
}

function clients(ctx, home) {
  const { lang, t } = ctx;
  const cards = home.clients.featured
    .map((client) => {
      const inner = `<span class="card-img">${img(client.image, client.alt)}${client.project ? `<span class="bubble" aria-hidden="true">${t.view}</span>` : ''}</span>
      <span class="card-meta"><span class="name">${esc(client.name)}</span><em>${esc(client.type)}</em></span>
      <span class="card-text">${esc(client.description)}</span>`;
      return client.project
        ? `<a class="card rv" href="${url(lang, 'projects', client.project)}" data-ink-origin>
      ${inner}
    </a>`
        : `<div class="card rv">
      ${inner}
    </div>`;
    })
    .join('\n    ');
  return `<section class="section" id="${t.tags.clients}">
  <div class="section-head rv">
    <div class="section-head-main">${tag(t.tags.clients)}${sectionTitle(t.clientsTitle, 2)}</div>
    <a class="link" href="${url(lang, 'projects')}">${t.allProjects}</a>
  </div>
  <div class="cards cards--stagger">
    ${cards}
  </div>
  <span class="tag tag--end rv">&lt;/${t.tags.clients}&gt;</span>
</section>`;
}

// Software we build and run ourselves. Each tile fills with ink like the service rows.
function products(ctx, home) {
  const { t } = ctx;
  const tiles = home.products.items
    .map(
      (product) => `<a class="row product${product.stats ? ' product--wide' : ''} rv" href="${esc(product.url)}" rel="noopener" data-ink-origin>
      <span class="row-in product-in">
        <span class="product-top"><span class="tag">// ${esc(product.kind)}</span><span class="tag">${t.since} ${esc(product.since)}</span></span>
        <span class="product-name">${esc(product.name)}</span>
        <span class="row-text">${esc(product.description)}</span>
        ${product.stats ? `<span class="product-stats">${product.stats.map((s) => `<span class="product-stat"><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></span>`).join('')}</span>` : ''}
        <span class="product-foot"><span class="product-url">${esc(product.urlLabel || product.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</span><span class="go" aria-hidden="true">${ARROW}</span></span>
      </span>
    </a>`
    )
    .join('\n    ');
  return `<section class="section" id="${t.tags.products}">
  <div class="section-head rv">
    <div class="section-head-main">${tag(t.tags.products)}${sectionTitle(t.productsTitle, 0)}</div>
    <p class="section-lead">${esc(home.products.lead)}</p>
  </div>
  <div class="products">
    ${tiles}
  </div>
  <span class="tag tag--end rv">&lt;/${t.tags.products}&gt;</span>
</section>`;
}

function about(ctx, home) {
  const { lang, t } = ctx;
  const a = home.about;
  const words = inkWords(a.statement);
  const principles = a.principles
    .map(
      (p, i) => `<li class="point">
        <em>${String(i + 1).padStart(2, '0')}</em>
        <span class="point-text"><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></span>
      </li>`
    )
    .join('\n      ');
  const facts = a.facts.map((f) => `<div class="fact"><dt>// ${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('\n    ');
  const photo = a.image ? `<div class="card about-photo rv"><span class="card-img">${img(a.image, a.imageAlt || '')}</span></div>` : '';
  return `<section class="section about" id="${t.tags.about}">
  ${tag(t.tags.about)}
  <p class="statement">${words}</p>
  <div class="about-grid">
    ${photo}
    <ul class="points rv">
      ${principles}
    </ul>
  </div>
  <dl class="facts rv">
    ${facts}
  </dl>
  <div class="about-foot rv">
    <a class="pill pill--lg" href="${url(lang, 'about')}">${t.aboutMore}<span class="arrow">${ARROW}</span></a>
    <span class="tag">&lt;/${t.tags.about}&gt;</span>
  </div>
</section>`;
}

export function homePage(ctx, home) {
  const main = `${hero(ctx, home)}
${marquee(ctx, home.clients.marquee)}
<div class="band">
  <div class="dots-soft dots--fade-both" aria-hidden="true"></div>
  ${services(ctx, home)}
  ${clients(ctx, home)}
  ${home.products ? products(ctx, home) : ''}
  ${about(ctx, home)}
</div>`;
  return document(ctx, { main });
}
