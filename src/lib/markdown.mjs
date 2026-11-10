// Markdown rendering for projects, posts and legal pages.
import { Marked } from 'marked';
import { sizeOf } from './content.mjs';
import { esc, img } from './html.mjs';
import { slugify } from './site.mjs';

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(html.replace(/<[^>]+>/g, ''));
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const external = /^https?:\/\//.test(href) ? ' rel="noopener"' : '';
      const titleAttr = title ? ` title="${esc(title)}"` : '';
      return `<a href="${esc(href)}"${titleAttr}${external}>${this.parser.parseInline(tokens)}</a>`;
    },
  },
});

// Short clips (the old animated GIFs, converted by `npm run images`) are silent looping
// videos. They start with controls so they work without JavaScript; site.js removes the
// controls and plays each clip only while it is on screen.
function clip(src, alt) {
  const poster = src.replace(/\.mp4$/, '.poster.jpg');
  const size = sizeOf(poster);
  const dims = size ? ` width="${size.width}" height="${size.height}"` : '';
  return `<video src="${esc(src)}" poster="${esc(poster)}"${dims} muted loop playsinline controls preload="none" aria-label="${esc(alt)}" data-clip></video>`;
}

function figure(src, alt, caption) {
  const text = (caption || alt || '').trim();
  const figcaption = text ? `<figcaption>// ${esc(text)}</figcaption>` : '';
  const file = src.trim();
  const media = /\.mp4$/.test(file) ? clip(file, (alt || '').trim()) : img(file, (alt || '').trim());
  // Tall pictures (phone screenshots, vertical clips) keep a narrow column instead of filling it.
  const size = sizeOf(file.replace(/\.mp4$/, '.poster.jpg'));
  const portrait = size && size.height > size.width * 1.15 ? ' figure--portrait' : '';
  return `\n\n<figure class="figure${portrait}"><span class="shot">${media}</span>${figcaption}</figure>\n\n`;
}

// Posts written with the old CMS use two shortcodes:
//   start-custom-image(src:/assets/x.png|alt:...|description:...)end-custom-image
//   start-important-text(text:...|align:center)end-important-text
function shortcodeAttrs(text) {
  const attrs = {};
  for (const part of text.split('|')) {
    const at = part.indexOf(':');
    if (at > 0) attrs[part.slice(0, at).trim()] = part.slice(at + 1).replace(/\s+/g, ' ').trim();
  }
  return attrs;
}

function prepare(source) {
  return source
    .replace(/start-custom-image\(([\s\S]*?)\)end-custom-image/g, (_, body) => {
      const a = shortcodeAttrs(body);
      return a.src ? figure(a.src, a.alt, a.description) : '';
    })
    .replace(/start-important-text\(([\s\S]*?)\)end-important-text/g, (_, body) => {
      const a = shortcodeAttrs(body);
      return `\n\n<blockquote class="pull"><span class="sep" aria-hidden="true"></span><p>${esc(a.text)}</p></blockquote>\n\n`;
    })
    .replace(/^!\\?\[([^\]]*)\]\(([^)\s]+)\)\s*$/gm, (_, alt, src) => figure(src, alt));
}

export function renderMarkdown(source) {
  return marked.parse(prepare(source || ''));
}

export function readingMinutes(source) {
  const words = (source || '').replace(/[#>*_`[\]()!|-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// A case study is laid out in chapters: the text before the first "## " is the intro
// (its first quote becomes the pull quote), then every "## " heading opens a chapter.
export function projectParts(source) {
  const tokens = marked.lexer(prepare(source || ''));
  const parse = (list) => marked.parser(Object.assign(list, { links: tokens.links }));
  const intro = [];
  const introMedia = [];
  const chapters = [];
  let quote = null;
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 2) {
      chapters.push({ title: marked.parseInline(token.text), tokens: [] });
    } else if (chapters.length) {
      chapters.at(-1).tokens.push(token);
    } else if (token.type === 'blockquote' && !quote) {
      quote = token;
    } else if (token.type === 'html') {
      introMedia.push(token);
    } else {
      intro.push(token);
    }
  }
  return {
    intro: parse(intro),
    introMedia: parse(introMedia),
    quote: quote ? parse(quote.tokens) : '',
    chapters: chapters.map((chapter) => ({ title: chapter.title, html: parse(chapter.tokens) })),
  };
}
