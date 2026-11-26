// About page: who we are, how we work, how long clients stay, where we are.
import { accent, esc, inkWords, tag } from '../lib/html.mjs';
import { url } from '../lib/site.mjs';
import { document, inkRow, pageTop, sectionTitle } from './layout.mjs';

// The clients we have worked with the longest: just their names, linked to the case studies.
function spans(ctx, page) {
  const { lang, t } = ctx;
  const names = page.spans
    .map((s) => `<li class="span">${s.project ? `<a class="link" href="${url(lang, 'projects', s.project)}">${esc(s.name)}</a>` : esc(s.name)}<i class="sep" aria-hidden="true"></i></li>`)
    .join('\n      ');
  return `<section class="block">
    <div class="section-head rv">
      <div class="section-head-main">${tag(t.tags.clients)}${sectionTitle(page.spansTitle, 2)}</div>
      <p class="section-lead">${esc(page.spansLead)}</p>
    </div>
    <ul class="spans rv">
      ${names}
    </ul>
  </section>`;
}

function places(ctx, page) {
  const { t, site } = ctx;
  const cards = site.company.offices
    .map(
      (office) => `<div class="row place rv" data-ink-origin>
        <div class="row-in place-in">
          <span class="place-top"><span class="tag"><i class="pin" aria-hidden="true"></i>${t.footer.offices[office.kind]}</span>${office.coords ? `<span class="tag">${esc(office.coords)}</span>` : ''}</span>
          <span class="place-city">${esc(office.city)}</span>
          <address>${office.lines.map((line) => `<span>${esc(line)}</span>`).join('')}</address>
        </div>
      </div>`
    )
    .join('\n      ');
  return `<section class="block" id="${t.tags.places}">
    <div class="section-head rv">
      <div class="section-head-main">${tag(t.tags.places)}${sectionTitle(page.placesTitle, 1)}</div>
      <p class="section-lead">${esc(page.placesLead)}</p>
    </div>
    <div class="places">
      ${cards}
    </div>
  </section>`;
}

export function aboutPage(ctx, page) {
  const { lang, t } = ctx;
  const [first, prefix, word] = page.headline;
  const top = pageTop(ctx, {
    label: tag(t.tags.about),
    body: `<h1 class="mega mega--long">
      <span class="line"><span>${esc(first)}</span></span>
      <span class="line"><span style="--d:.16s">${esc(prefix)} ${accent(word, { now: true })}<i class="caret" aria-hidden="true"></i></span></span>
    </h1>
    <p class="lead lead--lg in" style="--d:.4s">${esc(page.lead)}</p>`,
  });
  // Short numbered statements, one per row: the number sits on an ink drop on hover.
  const principles = page.principles
    .map(
      (p, i) => `<li class="tenet rv">
        <span class="tenet-num"><i class="tenet-drop" aria-hidden="true"></i><em>${String(i + 1).padStart(2, '0')}</em></span>
        <h3 class="tenet-title">${esc(p.title)}</h3>
        <p class="tenet-text">${esc(p.text)}</p>
      </li>`
    )
    .join('\n      ');
  const team = page.team && page.team.length
    ? `<section class="block">
    <div class="section-head rv"><div class="section-head-main">${tag(t.tags.team)}${sectionTitle(page.teamTitle, 0)}</div></div>
    <ul class="points points--lg rv">
      ${page.team.map((person) => `<li class="point"><span class="point-text"><strong>${esc(person.name)}</strong><span>${esc(person.role)}</span></span></li>`).join('\n      ')}
    </ul>
  </section>`
    : '';
  const main = `<div class="page-body">
  <p class="statement">${inkWords(page.statement)}</p>
  <div class="ruler-row rv" aria-hidden="true"><span class="tag">// ${esc(page.rulerLabel)}</span><span class="ruler"><i class="ruler-mark"></i></span></div>
  <section class="block">
    <div class="section-head rv"><div class="section-head-main">${tag(t.tags.method)}${sectionTitle(page.principlesTitle, 0)}</div></div>
    <ol class="manifesto">
      ${principles}
    </ol>
  </section>
  ${spans(ctx, page)}
  ${team}
  ${places(ctx, page)}
  <nav class="next" aria-label="${esc(page.productsRow.title)}">
    ${inkRow({ num: '→', title: page.productsRow.title, text: page.productsRow.text, href: `${url(lang)}#${t.tags.products}` })}
  </nav>
</div>`;
  return document(ctx, { top, main });
}
