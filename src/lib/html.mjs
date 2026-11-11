// Small HTML helpers shared by the templates.
import { sizeOf } from './content.mjs';

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// **bold** is the only inline markup allowed in short content strings.
export function inline(text) {
  return esc(text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*\s*([^*]+?)\s*\*\*/g, ' <strong>$1</strong> ')
    .replace(/\s+([.,;:)])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// <img> with its real size, so the page does not jump while images load.
export function img(src, alt, { eager = false, className = '' } = {}) {
  const size = sizeOf(src);
  const dims = size ? ` width="${size.width}" height="${size.height}"` : '';
  const cls = className ? ` class="${className}"` : '';
  const loading = eager ? ' fetchpriority="high"' : ' loading="lazy"';
  return `<img${cls} src="${esc(encodeURI(decodeURI(src)))}" alt="${esc(alt)}"${dims}${loading} decoding="async">`;
}

// Each word turns from grey to ink as its paragraph (class "statement") scrolls through the viewport.
export function inkWords(text) {
  return text
    .split(/\s+/)
    .map((word, i, all) => {
      const step = Math.min(1.3, 50 / all.length);
      return `<span class="w" style="animation-range:cover ${(12 + i * step).toFixed(1)}% cover ${(22 + i * step).toFixed(1)}%">${esc(word)}</span>`;
    })
    .join(' ');
}

export const tag = (name, close = false) => `<span class="tag">&lt;${close ? '/' : ''}${esc(name)}&gt;</span>`;

export const ARROW =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// Hand-drawn ink line under an accent word. `now` draws it on load, otherwise on scroll.
const STROKES = [
  'M3 9 C 45 2, 85 13, 140 7 S 240 3, 297 8',
  'M3 8 C 50 13, 95 2, 150 8 S 245 12, 297 6',
  'M3 7 C 40 12, 100 3, 155 9 S 250 4, 297 9',
];
export function accent(word, { now = false, variant = 0 } = {}) {
  return `<em class="accent">${esc(word)}<svg class="stroke ${now ? 'draw' : 'draw-rv'}" viewBox="0 0 300 14" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="${STROKES[variant % STROKES.length]}"/></svg></em>`;
}
