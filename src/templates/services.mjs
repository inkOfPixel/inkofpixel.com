// Services page: one block per service with its checklist, then the "and more" rows.
import { accent, esc, inline, tag } from '../lib/html.mjs';
import { slugify, url } from '../lib/site.mjs';
import { document, inkRow, pageTop } from './layout.mjs';

// The intro sentence can underline one of its words (`introAccent` in the content).
function introTitle(page) {
  const word = page.introAccent;
  const at = word ? page.intro.indexOf(word) : -1;
  if (at < 0) return esc(page.intro);
  return `${esc(page.intro.slice(0, at))}${accent(word, { now: true })}${esc(page.intro.slice(at + word.length))}`;
}

function block(service, i) {
  const paragraphs = service.description
    .split(/\n\s*\n/)
    .map((p) => `<p>${inline(p)}</p>`)
    .join('\n      ');
  const points = service.points
    .map((point) => `<li class="check"><i class="check-dot" aria-hidden="true"></i><span>${inline(point.title)}</span></li>`)
    .join('\n      ');
  return `<section class="service rv" id="${slugify(service.title)}">
    <div class="service-main">
      <em class="service-num">${String(i + 1).padStart(2, '0')}</em>
      <h2 class="h3">${esc(service.title)}</h2>
      ${paragraphs}
    </div>
    <ul class="checks">
      ${points}
    </ul>
  </section>`;
}

export function servicesPage(ctx, page, more) {
  const { lang, t } = ctx;
  const list = page.servicesList;
  const moreId = slugify(more.groupTitle);
  const chips = [...list.map((s) => [slugify(s.title), s.title]), [moreId, more.serviceList.map((s) => s.title).join(', ')]]
    .map(([id, label], i) => `<a class="chip" href="#${id}"><em>${String(i + 1).padStart(2, '0')}</em>${esc(label)}</a>`)
    .join('\n      ');
  const top = pageTop(ctx, {
    label: tag(t.tags.services),
    body: `<h1 class="page-title in">${introTitle(page)}</h1>
    <p class="lead in" style="--d:.25s">${esc(page.subtitle)}</p>
    <nav class="chips in" style="--d:.4s" aria-label="${t.servicesOnPage}">
      ${chips}
    </nav>`,
  });
  const moreRows = more.serviceList
    .map((s, i) => inkRow({ num: String(list.length + i + 1).padStart(2, '0'), title: s.title, text: s.description, href: url(lang, 'contacts') }))
    .join('\n    ');
  const main = `<div class="page-body">
  ${list.map(block).join('\n  ')}
  <section class="service-more" id="${moreId}">
    <div class="group-row rv">
      <h2 class="h3"><i class="ripple" aria-hidden="true"></i>${esc(more.groupTitle)}</h2>
      <p>${esc(more.groupDescription)}</p>
    </div>
    ${moreRows}
    <span class="tag tag--end rv">&lt;/${t.tags.services}&gt;</span>
  </section>
</div>`;
  return document(ctx, { top, main });
}
