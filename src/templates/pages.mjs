// Simple pages: contacts, legal documents and the 404.
import { ARROW, accent, esc, tag } from '../lib/html.mjs';
import { url } from '../lib/site.mjs';
import { contact, document, pageTop } from './layout.mjs';

// The contacts page is the closing contact section used as the whole page.
export function contactsPage(ctx, page) {
  return document(ctx, { main: contact(ctx, { asPage: true, text: page.subtitle }), withContact: false });
}

export function legalPage(ctx, { title, html }) {
  const { t } = ctx;
  const top = pageTop(ctx, {
    label: tag(t.tags.legal),
    body: `<h1 class="page-title in">${esc(title)}</h1>`,
  });
  const main = `<div class="page-body">
  <article class="prose prose--article prose--legal">
    ${html}
  </article>
</div>`;
  return document(ctx, { top, main });
}

export function notFoundPage(ctx) {
  const { lang, t } = ctx;
  const [before, word] = t.notFound.title;
  const top = pageTop(ctx, {
    label: '<span class="tag">&lt;404&gt;</span>',
    body: `<h1 class="page-title in">${before} ${accent(word, { now: true })}</h1>
    <p class="lead in" style="--d:.25s">${t.notFound.text}</p>
    <div class="in" style="--d:.4s"><a class="pill pill--lg" href="${url(lang)}">${t.notFound.cta}<span class="arrow">${ARROW}</span></a></div>`,
  });
  return document(ctx, { top, main: '' });
}
