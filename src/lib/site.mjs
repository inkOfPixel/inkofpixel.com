// Site-wide settings: languages, URL structure and interface copy.
// Page content lives in /content; only short interface labels live here.

export const SITE_URL = 'https://inkofpixel.com';
export const LANGS = ['en', 'it'];
export const DEFAULT_LANG = 'en';

// The URLs match the previous site, so existing links and search results keep working.
const SEGMENTS = {
  services: { en: 'services', it: 'servizi' },
  projects: { en: 'projects', it: 'progetti' },
  blog: { en: 'blog', it: 'blog' },
  contacts: { en: 'contacts', it: 'contatti' },
  privacy: { en: 'privacy', it: 'privacy' },
  cookies: { en: 'cookie-policy', it: 'cookie-policy' },
};

export function url(lang, page = 'home', slug = '') {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  if (page === 'home') return `${prefix}/`;
  return `${prefix}/${SEGMENTS[page][lang]}${slug ? `/${slug}` : ''}`;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export const T = {
  en: {
    skip: 'Skip to content',
    homeLabel: 'inkOfPixel, home',
    nav: { services: 'Services', projects: 'Projects', products: 'Products', about: 'About', blog: 'Blog', contacts: 'Contacts' },
    navLabel: 'Main',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open the menu',
    theme: 'Switch between light and dark theme',
    otherLang: { code: 'IT', label: 'Italiano' },
    tags: { services: 'services', clients: 'clients', products: 'products', about: 'about', contacts: 'contacts', blog: 'blog', projects: 'projects', results: 'results', menu: 'menu', legal: 'legal' },
    hero: { cta: 'Start a project', secondary: 'See the projects', scroll: 'scroll' },
    servicesTitle: ['Our', 'services'],
    clientsTitle: ['Some of our', 'clients'],
    productsTitle: ['Our own', 'products'],
    since: 'since',
    clientsLabel: 'Some of our clients',
    contactTitle: ['How can we', 'help?'],
    allProjects: 'All projects',
    allServices: 'All services',
    view: 'View',
    read: 'Read',
    servicesOnPage: 'Services on this page',
    more: { title: '...and more' },
    project: { client: 'client', services: 'services', next: 'next project', other: 'Other projects' },
    blog: { latest: 'latest posts', featured: 'featured', minutes: 'min read', back: 'back to the articles', keepReading: ['Keep', 'reading'], otherPosts: 'Other articles', by: 'by' },
    form: {
      name: 'name',
      email: 'email',
      message: 'message',
      send: 'Send the message',
      note: 'We only use your details to reply to you.',
      or: 'or write to us directly:',
      sent: 'Thank you, your message is on its way. We will get back to you soon.',
      failed: 'We could not send your message. Please write to us at',
    },
    notFound: { title: ['Page not', 'found'], text: 'The page you are looking for does not exist or has been moved.', cta: 'Back to the home' },
    footer: {
      tagline: 'Great websites for great entrepreneurs.',
      site: 'site',
      social: 'social',
      legal: 'legal',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      officesTitle: 'offices',
      offices: { operating: 'operating office', legal: 'registered office' },
      vat: 'Tax code and VAT no.',
      registry: 'REA',
      capital: 'Share capital',
      paidUp: 'fully paid-up',
      rights: 'All rights reserved.',
    },
  },
  it: {
    skip: 'Salta al contenuto',
    homeLabel: 'inkOfPixel, home',
    nav: { services: 'Servizi', projects: 'Progetti', products: 'Prodotti', about: 'Chi siamo', blog: 'Blog', contacts: 'Contatti' },
    navLabel: 'Principale',
    menu: 'Menu',
    close: 'Chiudi',
    openMenu: 'Apri il menu',
    theme: 'Passa dal tema chiaro al tema scuro',
    otherLang: { code: 'EN', label: 'English' },
    tags: { services: 'servizi', clients: 'clienti', products: 'prodotti', about: 'chi-siamo', contacts: 'contatti', blog: 'blog', projects: 'progetti', results: 'risultati', menu: 'menu', legal: 'legale' },
    hero: { cta: 'Inizia un progetto', secondary: 'Guarda i progetti', scroll: 'scroll' },
    servicesTitle: ['I nostri', 'servizi'],
    clientsTitle: ['Alcuni dei nostri', 'clienti'],
    productsTitle: ['I nostri', 'prodotti'],
    since: 'dal',
    clientsLabel: 'Alcuni dei nostri clienti',
    contactTitle: ['Come possiamo', 'aiutarti?'],
    allProjects: 'Tutti i progetti',
    allServices: 'Tutti i servizi',
    view: 'Vedi',
    read: 'Leggi',
    servicesOnPage: 'Servizi in questa pagina',
    more: { title: '...e molto altro' },
    project: { client: 'cliente', services: 'servizi', next: 'prossimo progetto', other: 'Altri progetti' },
    blog: { latest: 'ultimi post', featured: 'in evidenza', minutes: 'min di lettura', back: 'torna agli articoli', keepReading: ['Continua a', 'leggere'], otherPosts: 'Altri articoli', by: 'di' },
    form: {
      name: 'nome',
      email: 'email',
      message: 'messaggio',
      send: 'Invia il messaggio',
      note: 'Usiamo i tuoi dati solo per risponderti.',
      or: 'oppure scrivici direttamente:',
      sent: 'Grazie, il tuo messaggio è partito. Ti rispondiamo presto.',
      failed: 'Non siamo riusciti a inviare il messaggio. Scrivici a',
    },
    notFound: { title: ['Pagina non', 'trovata'], text: 'La pagina che cerchi non esiste o è stata spostata.', cta: 'Torna alla home' },
    footer: {
      tagline: 'E-commerce per imprenditori ambiziosi.',
      site: 'sito',
      social: 'social',
      legal: 'legale',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      officesTitle: 'sedi',
      offices: { operating: 'sede operativa', legal: 'sede legale' },
      vat: 'C.F. e P.IVA',
      registry: 'REA',
      capital: 'Capitale sociale',
      paidUp: 'i.v.',
      rights: 'Tutti i diritti riservati.',
    },
  },
};
