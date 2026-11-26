// Projects: the index of case studies and the case study page.
import { esc, img, tag } from '../lib/html.mjs';
import { projectParts } from '../lib/markdown.mjs';
import { url } from '../lib/site.mjs';
import { document, inkRow, pageTop } from './layout.mjs';

// A case study without pictures yet shows its name on a dotted card.
const cover = (project) =>
  project.featuredImage ? img(project.featuredImage, project.title) : `<span class="card-blank dots-soft" aria-hidden="true"></span><em class="card-blank-name" aria-hidden="true">${esc(project.title)}</em>`;

export function projectCard(ctx, project) {
  return `<a class="card rv" href="${url(ctx.lang, 'projects', project.slug)}" data-ink-origin>
      <span class="card-img">${cover(project)}<span class="bubble" aria-hidden="true">${ctx.t.view}</span></span>
      <span class="card-meta"><span class="name">${esc(project.title)}</span><em>${esc(project.type || '')}</em></span>
      <span class="card-text">${esc(project.excerpt || '')}</span>
    </a>`;
}

export function projectsPage(ctx, page, projects) {
  const { t } = ctx;
  const top = pageTop(ctx, {
    label: tag(t.tags.projects),
    body: `<h1 class="mega"><span class="line"><span>${esc(page.title)}<i class="caret" aria-hidden="true"></i></span></span></h1>
    <p class="lead in" style="--d:.3s">${esc(page.seo.description)}</p>`,
  });
  const main = `<div class="page-body">
  <div class="cards">
    ${projects.map((project) => projectCard(ctx, project)).join('\n    ')}
  </div>
  <span class="tag tag--end rv">&lt;/${t.tags.projects}&gt;</span>
</div>`;
  return document(ctx, { top, main });
}

export function projectPage(ctx, project, next) {
  const { lang, t } = ctx;
  const parts = projectParts(project.body);
  const top = pageTop(ctx, {
    label: `<span class="tag"><a class="link" href="${url(lang, 'projects')}">&lt;${t.tags.projects}&gt;</a> / ${esc(project.slug)}</span>`,
    body: `<h1 class="mega${project.title.length > 9 ? ' mega--long' : ''}"><span class="line"><span>${esc(project.title)}<i class="caret" aria-hidden="true"></i></span></span></h1>
    <div class="project-row in" style="--d:.3s">
      <p class="lead lead--lg">${esc(project.excerpt || '')}</p>
      <em class="project-type">${esc(project.type || '')}</em>
    </div>
    <dl class="facts facts--sm in" style="--d:.45s">
      <div class="fact"><dt>// ${t.project.client}</dt><dd>${esc(project.title)}</dd></div>
      <div class="fact"><dt>// ${t.project.services}</dt><dd>${esc(project.type || '')}</dd></div>
    </dl>`,
  });
  const isResults = (title) => /risultat|result/i.test(title);
  const chapters = parts.chapters
    .map((chapter, i) =>
      isResults(chapter.title) && i === parts.chapters.length - 1
        ? `<section class="results rv">
    <div class="chapter-head">${tag(t.tags.results)}<h2 class="h3">${chapter.title}</h2></div>
    <div class="results-body">${chapter.html}</div>
  </section>`
        : `<section class="chapter rv">
    <div class="chapter-head"><em>${String(i + 1).padStart(2, '0')}</em><h2 class="h3">${chapter.title}</h2></div>
    <div class="chapter-body prose">${chapter.html}</div>
  </section>`
    )
    .join('\n  ');
  const intro = parts.intro || parts.quote
    ? `<section class="intro rv">
    <div class="intro-text">${parts.intro}</div>
    ${parts.quote ? `<blockquote class="quote"><i class="sep" aria-hidden="true"></i>${parts.quote}</blockquote>` : ''}
  </section>`
    : '';
  const hero = project.heroImage || project.featuredImage;
  const main = `<article class="page-body">
  ${hero ? `<figure class="shot shot--hero rv">${img(hero, project.title, { eager: true })}</figure>` : ''}
  ${intro}
  ${parts.introMedia ? `<div class="prose prose--wide rv">${parts.introMedia}</div>` : ''}
  ${chapters}
  ${
    next
      ? `<nav class="next" aria-label="${t.project.other}">
    <span class="tag rv">// ${t.project.next}</span>
    ${inkRow({ num: '→', title: next.title, text: next.excerpt || '', href: url(lang, 'projects', next.slug) })}
  </nav>`
      : ''
  }
</article>`;
  return document(ctx, { top, main });
}
