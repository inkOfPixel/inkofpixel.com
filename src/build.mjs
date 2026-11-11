// Builds the whole site into /dist as plain HTML, CSS and JS.
//   node src/build.mjs            full build (refreshes the privacy policy from iubenda)
//   SKIP_REMOTE=1 node src/build.mjs   offline build, uses the cached privacy policy
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, localized, readCollection, readJson, readPage } from './lib/content.mjs';
import { readingMinutes, renderMarkdown } from './lib/markdown.mjs';
import { DEFAULT_LANG, LANGS, SITE_URL, T, slugify, url } from './lib/site.mjs';
import { aboutPage } from './templates/about.mjs';
import { blogPage, postPage } from './templates/blog.mjs';
import { homePage } from './templates/home.mjs';
import { context } from './templates/layout.mjs';
import { contactsPage, legalPage, notFoundPage } from './templates/pages.mjs';
import { projectPage, projectsPage } from './templates/projects.mjs';
import { servicesPage } from './templates/services.mjs';

const OUT = path.join(ROOT, 'dist');
// The site is built in a scratch folder and swapped in at the end, so a half-built site is
// never served and two builds running at once (dev server and a manual build) cannot clash.
const DIST = path.join(ROOT, `.build/dist-${process.pid}`);
const IUBENDA_POLICY_ID = '57888804';
const started = Date.now();

function write(file, content) {
  const target = path.join(DIST, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

// '/' -> index.html, '/it/' -> it/index.html, '/it/servizi' -> it/servizi.html
const fileFor = (urlPath) => (urlPath.endsWith('/') ? `${urlPath}index.html` : `${urlPath}.html`).slice(1);

const hash = (content) => crypto.createHash('sha256').update(content).digest('hex').slice(0, 10);

// ---------------------------------------------------------------- assets
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.cpSync(path.join(ROOT, 'static'), DIST, { recursive: true });

// Fonts are served from our own domain: no third-party request, no cookie banner needed.
const FONTS = [
  { family: 'Bricolage Grotesque', style: 'normal', weight: '400 700', pkg: '@fontsource-variable/bricolage-grotesque', file: 'bricolage-grotesque-latin-opsz-normal.woff2', range: 'latin', preload: true },
  { family: 'Bricolage Grotesque', style: 'normal', weight: '400 700', pkg: '@fontsource-variable/bricolage-grotesque', file: 'bricolage-grotesque-latin-ext-opsz-normal.woff2', range: 'latin-ext' },
  { family: 'Instrument Serif', style: 'italic', weight: '400', pkg: '@fontsource/instrument-serif', file: 'instrument-serif-latin-400-italic.woff2', range: 'latin', preload: true },
  { family: 'Instrument Serif', style: 'italic', weight: '400', pkg: '@fontsource/instrument-serif', file: 'instrument-serif-latin-ext-400-italic.woff2', range: 'latin-ext' },
];
const RANGES = {
  latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  'latin-ext': 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
};
const preloadFonts = [];
const fontFaces = FONTS.map((font) => {
  const data = fs.readFileSync(path.join(ROOT, 'node_modules', font.pkg, 'files', font.file));
  const href = `/_/${font.file.replace('.woff2', `.${hash(data)}.woff2`)}`;
  write(href.slice(1), data);
  if (font.preload) preloadFonts.push(href);
  return `@font-face{font-family:'${font.family}';font-style:${font.style};font-weight:${font.weight};font-display:swap;src:url(${href}) format('woff2');unicode-range:${RANGES[font.range]}}`;
}).join('\n');

const css = `${fontFaces}\n${fs.readFileSync(path.join(ROOT, 'src/assets/site.css'), 'utf8')}`;
const js = fs.readFileSync(path.join(ROOT, 'src/assets/site.js'), 'utf8');
const assets = { css: `/_/site.${hash(css)}.css`, js: `/_/site.${hash(js)}.js`, fonts: preloadFonts };
write(assets.css.slice(1), css);
write(assets.js.slice(1), js);

// ---------------------------------------------------------------- content
const contacts = readJson('settings/contacts.json');
const site = {
  email: contacts.email,
  socials: contacts.socials,
  company: readJson('settings/company.json'),
  contactText: Object.fromEntries(LANGS.map((lang) => [lang, readPage('home', lang).contacts.description])),
};

const projects = readCollection('projects').sort((a, b) => Number(a.priority ?? 99) - Number(b.priority ?? 99) || a.title.localeCompare(b.title));
const posts = readCollection('posts').sort((a, b) => String(b.date).localeCompare(String(a.date)));
const cookies = readCollection('pages').find((page) => page.slug === 'cookies');

// The privacy policy is written and kept up to date on iubenda. A copy is cached in the
// repository so the site still builds when iubenda cannot be reached.
async function privacyPolicy() {
  const cache = path.join(ROOT, 'content/legal/privacy.html');
  if (!process.env.SKIP_REMOTE) {
    try {
      const response = await fetch(`https://www.iubenda.com/api/privacy-policy/${IUBENDA_POLICY_ID}/no-markup`, { signal: AbortSignal.timeout(15000) });
      const data = await response.json();
      if (!data.success || !data.content) throw new Error('unexpected response');
      fs.mkdirSync(path.dirname(cache), { recursive: true });
      fs.writeFileSync(cache, data.content.trim() + '\n');
    } catch (error) {
      console.warn(`  ! could not refresh the privacy policy from iubenda (${error.message}), using the cached copy`);
    }
  }
  // The page template prints its own <h1>.
  return fs.readFileSync(cache, 'utf8').replace(/<h1[\s\S]*?<\/h1>/, '');
}
const privacyHtml = await privacyPolicy();

// ---------------------------------------------------------------- pages
const crumbs = (lang, items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['inkOfPixel', url(lang)], ...items].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + item })),
});
const registeredOffice = site.company.offices.find((office) => office.kind === 'legal');
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'inkOfPixel',
  legalName: site.company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: site.email,
  vatID: `IT${site.company.vat}`,
  address: { '@type': 'PostalAddress', streetAddress: registeredOffice.lines[0], addressLocality: registeredOffice.city, addressCountry: 'IT' },
  sameAs: site.socials.map((s) => s.link),
};

const pages = []; // { lang, path, alternates, html }
const redirects = [];
const both = (fn) => Object.fromEntries(LANGS.map((lang) => [lang, fn(lang)]));

function add(lang, page, render) {
  const ctx = context(lang, site, assets, { ...page, title: page.title.includes('inkOfPixel') ? page.title : `${page.title} | inkOfPixel` });
  pages.push({ lang, path: page.path, alternates: page.alternates, noindex: page.noindex, html: render(ctx) });
}

for (const lang of LANGS) {
  const t = T[lang];

  const home = readPage('home', lang);
  add(lang, {
    path: url(lang), alternates: both((l) => url(l)),
    title: `inkOfPixel | ${[...home.hero.titleLines, home.hero.titleAccent].join(' ')}`,
    description: home.seo.description, image: home.seo.image, jsonLd: [organization],
  }, (ctx) => homePage(ctx, home));

  const services = readPage('services', lang);
  add(lang, {
    path: url(lang, 'services'), alternates: both((l) => url(l, 'services')), active: 'services',
    title: services.title, description: services.seo.description, image: services.seo.image,
    jsonLd: [crumbs(lang, [[services.title, url(lang, 'services')]])],
  }, (ctx) => servicesPage(ctx, services, home.services[1]));

  const about = readPage('about', lang);
  add(lang, {
    path: url(lang, 'about'), alternates: both((l) => url(l, 'about')), active: 'about',
    title: about.title, description: about.seo.description, image: about.seo.image,
    jsonLd: [crumbs(lang, [[about.title, url(lang, 'about')]]), { '@context': 'https://schema.org', '@type': 'AboutPage', name: about.title, url: SITE_URL + url(lang, 'about'), about: { '@type': 'Organization', name: 'inkOfPixel', url: SITE_URL } }],
  }, (ctx) => aboutPage(ctx, about));

  const projectsIndex = readPage('projects', lang);
  const localProjects = projects.map((project) => localized(project, lang));
  add(lang, {
    path: url(lang, 'projects'), alternates: both((l) => url(l, 'projects')), active: 'projects',
    title: projectsIndex.title, description: projectsIndex.seo.description, image: projectsIndex.seo.image,
    jsonLd: [crumbs(lang, [[projectsIndex.title, url(lang, 'projects')]])],
  }, (ctx) => projectsPage(ctx, projectsIndex, localProjects));

  localProjects.forEach((project, i) => {
    const next = localProjects.length > 1 ? localProjects[(i + 1) % localProjects.length] : null;
    add(lang, {
      path: url(lang, 'projects', project.slug), alternates: both((l) => url(l, 'projects', project.slug)), active: 'projects',
      title: project.seoTitle || project.title, description: project.seoDescription || project.excerpt, image: project.featuredImage, type: 'article',
      jsonLd: [crumbs(lang, [[projectsIndex.title, url(lang, 'projects')], [project.title, url(lang, 'projects', project.slug)]])],
    }, (ctx) => projectPage(ctx, project, next));
  });

  const blog = readPage('blog', lang);
  const localPosts = posts.map((post) => {
    const local = localized(post, lang);
    return { ...local, url: url(lang, 'blog', slugify(local.title)), minutes: readingMinutes(local.body) };
  });
  add(lang, {
    path: url(lang, 'blog'), alternates: both((l) => url(l, 'blog')), active: 'blog',
    title: blog.title, description: blog.seo.description, image: blog.seo.image,
    jsonLd: [crumbs(lang, [[blog.title, url(lang, 'blog')]])],
  }, (ctx) => blogPage(ctx, blog, localPosts));

  localPosts.forEach((post, i) => {
    // The old site built post URLs from the raw title, apostrophes and accents included.
    const legacy = url(lang, 'blog', post.title.toLowerCase().split(' ').join('-'));
    if (legacy !== post.url) redirects.push([legacy, post.url]);
    add(lang, {
      path: post.url, alternates: both((l) => url(l, 'blog', slugify(localized(posts[i], l).title))), active: 'blog',
      title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt, image: post.featuredImage, type: 'article',
      jsonLd: [
        crumbs(lang, [[blog.title, url(lang, 'blog')], [post.title, post.url]]),
        {
          '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt, inLanguage: lang,
          datePublished: post.date, image: SITE_URL + encodeURI(post.featuredImage),
          author: { '@type': 'Person', name: post.author },
          publisher: { '@type': 'Organization', name: 'inkOfPixel', url: SITE_URL },
          mainEntityOfPage: SITE_URL + post.url,
        },
      ],
    }, (ctx) => postPage(ctx, post, localPosts.filter((other) => other !== post).slice(0, 2)));
  });

  const contactsCopy = readPage('contacts', lang);
  add(lang, {
    path: url(lang, 'contacts'), alternates: both((l) => url(l, 'contacts')),
    title: contactsCopy.title, description: contactsCopy.seo.description, image: contactsCopy.seo.image,
    jsonLd: [crumbs(lang, [[contactsCopy.title, url(lang, 'contacts')]])],
  }, (ctx) => contactsPage(ctx, contactsCopy));

  add(lang, {
    path: url(lang, 'privacy'), alternates: both((l) => url(l, 'privacy')),
    title: t.footer.privacy, description: `${t.footer.privacy}, inkOfPixel.`,
  }, (ctx) => legalPage(ctx, { title: t.footer.privacy, html: privacyHtml }));

  const cookiePage = localized(cookies, lang);
  add(lang, {
    path: url(lang, 'cookies'), alternates: both((l) => url(l, 'cookies')),
    title: t.footer.cookies, description: `${t.footer.cookies}, inkOfPixel.`,
  }, (ctx) => legalPage(ctx, { title: t.footer.cookies, html: renderMarkdown(cookiePage.body) }));

  add(lang, {
    path: lang === DEFAULT_LANG ? '/404' : `/${lang}/404`, alternates: {}, noindex: true,
    title: t.notFound.title.join(' '), description: t.notFound.text,
  }, (ctx) => notFoundPage(ctx));
}

for (const page of pages) write(fileFor(page.path), page.html);

// ---------------------------------------------------------------- sitemap, robots, redirects
const indexed = pages.filter((page) => !page.noindex);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexed
  .map((page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${page.alternates[l]}"/>`).join('\n')}
  </url>`)
  .join('\n')}
</urlset>
`);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

// Old addresses that changed. The web server (Caddyfile) imports this file.
fs.mkdirSync(path.join(ROOT, '.build'), { recursive: true });
fs.writeFileSync(path.join(ROOT, '.build/redirects.caddy'), redirects.map(([from, to]) => `redir "${from}" ${to} 301`).join('\n') + '\n');

// Swap the finished build in. If another build swaps at the same moment, try again.
for (let attempt = 1; ; attempt += 1) {
  try {
    fs.rmSync(OUT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.renameSync(DIST, OUT);
    break;
  } catch (error) {
    if (attempt === 5) {
      fs.rmSync(DIST, { recursive: true, force: true });
      throw error;
    }
  }
}

console.log(`Built ${pages.length} pages in ${Date.now() - started} ms -> dist/`);
