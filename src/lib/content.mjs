// Reads /content: JSON pages and settings, plus Markdown collections (projects, posts, pages).
import fs from 'node:fs';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';
import { imageSize } from 'image-size';

export const ROOT = path.resolve(import.meta.dirname, '../..');
const CONTENT = path.join(ROOT, 'content');
const STATIC = path.join(ROOT, 'static');

export function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(CONTENT, file), 'utf8'));
}

// A static page keeps one entry per language under `locales`.
export function readPage(name, lang) {
  return readJson(`static-pages/${name}.json`).locales.find((l) => l.language === lang);
}

// Markdown files keep everything in the front matter, one entry per language under
// `locales`, each with its own `body`. `localized()` flattens an entry for one language.
export function readCollection(dir) {
  const folder = path.join(CONTENT, dir);
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(folder, file), 'utf8');
      const frontMatter = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontMatter) throw new Error(`${dir}/${file}: missing front matter`);
      return { slug: file.replace(/\.md$/, ''), ...loadYaml(frontMatter[1]) };
    })
    .filter((entry) => entry.published !== false);
}

export function localized(entry, lang) {
  const locale = entry.locales.find((l) => l.language === lang);
  if (!locale) throw new Error(`${entry.slug}: missing "${lang}" locale`);
  const { locales, ...shared } = entry;
  return { ...shared, ...locale, title: locale.title || entry.title };
}

// Width and height of an image in /static, so the browser can reserve its space.
const sizes = new Map();
export function sizeOf(src) {
  if (!sizes.has(src)) {
    let size = null;
    try {
      const { width, height } = imageSize(fs.readFileSync(path.join(STATIC, decodeURI(src))));
      size = { width, height };
    } catch {
      console.warn(`  ! image not found or unreadable: ${src}`);
    }
    sizes.set(src, size);
  }
  return sizes.get(src);
}
