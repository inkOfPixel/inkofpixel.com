// Blog: the list of posts and the article page.
import { ARROW, accent, esc, img, tag } from '../lib/html.mjs';
import { renderMarkdown } from '../lib/markdown.mjs';
import { formatDate, url } from '../lib/site.mjs';
import { document, pageTop } from './layout.mjs';

const meta = (ctx, post) => `${formatDate(post.date, ctx.lang)} · ${post.minutes} ${ctx.t.blog.minutes}`;

function author(name) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return `<span class="author"><i class="sep author-mark" aria-hidden="true">${esc(initials)}</i>${esc(name)}</span>`;
}

function postRow(ctx, post) {
  return `<a class="post rv" href="${post.url}">
      <span class="post-meta">${formatDate(post.date, ctx.lang)}<br>${post.minutes} ${ctx.t.blog.minutes}</span>
      <span class="post-title"><span class="name">${esc(post.title)}</span></span>
      <span class="post-text">${esc(post.excerpt)}</span>
      <span class="thumb">${img(post.featuredImage, '')}</span>
      <span class="go" aria-hidden="true">${ARROW}</span>
    </a>`;
}

export function blogPage(ctx, page, posts) {
  const { t } = ctx;
  const [first, ...rest] = posts;
  const top = pageTop(ctx, {
    label: tag(t.tags.blog),
    body: `<h1 class="mega mega--row"><span class="line"><span>${esc(page.title)}<i class="caret" aria-hidden="true"></i></span></span><em class="in" style="--d:.35s">${t.blog.latest}</em></h1>`,
  });
  const main = `<div class="page-body">
  <a class="card featured rv" href="${first.url}" data-ink-origin>
    <span class="card-img">${img(first.featuredImage, '', { eager: true })}<span class="bubble" aria-hidden="true">${t.read}</span></span>
    <span class="featured-text">
      <span class="tag">// ${t.blog.featured} · ${meta(ctx, first)}</span>
      <span class="featured-title"><span class="name">${esc(first.title)}</span></span>
      <span class="featured-excerpt">${esc(first.excerpt)}</span>
      ${author(first.author)}
    </span>
  </a>
  <div class="posts">
    ${rest.map((post) => postRow(ctx, post)).join('\n    ')}
  </div>
  <span class="tag tag--end rv">&lt;/${t.tags.blog}&gt;</span>
</div>`;
  return document(ctx, { top, main });
}

export function postPage(ctx, post, others) {
  const { lang, t } = ctx;
  const top = pageTop(ctx, {
    label: `<span class="tag"><a class="link" href="${url(lang, 'blog')}">&lt;${t.tags.blog}&gt; / ${t.blog.back}</a></span>`,
    body: `<span class="tag in">${meta(ctx, post)}</span>
    <h1 class="page-title page-title--post in" style="--d:.1s">${esc(post.title)}</h1>
    <p class="lead lead--lg in" style="--d:.25s">${esc(post.excerpt)}</p>
    <div class="in" style="--d:.4s">${author(post.author)}</div>`,
  });
  const [before, word] = t.blog.keepReading;
  const main = `<div class="progress" aria-hidden="true"></div>
<div class="page-body">
  <figure class="shot shot--hero rv">${img(post.heroImage || post.featuredImage, '', { eager: true })}</figure>
  <article class="prose prose--article">
    ${renderMarkdown(post.body)}
  </article>
  ${
    others.length
      ? `<nav class="more-posts" aria-label="${t.blog.otherPosts}">
    <h2 class="h3 rv">${before} ${accent(word, { variant: 2 })}</h2>
    <div class="posts">
      ${others.map((other) => postRow(ctx, other)).join('\n      ')}
    </div>
  </nav>`
      : ''
  }
</div>`;
  return document(ctx, { top, main });
}
