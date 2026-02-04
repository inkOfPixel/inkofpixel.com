import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = path.resolve(process.cwd(), "_site");

const readJson = async <T>(filePath: string): Promise<T> => {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

const safeArray = <T>(value: T[] | undefined | null): T[] =>
  Array.isArray(value) ? value : [];

const joinPath = (...parts: string[]) => path.posix.join(...parts);

const buildLocalizedPath = (
  defaultLocale: string,
  locale: string,
  rawPath: string
) => {
  const normalized = rawPath === "/" ? "" : rawPath || "";
  return locale === defaultLocale
    ? joinPath("/", normalized)
    : joinPath("/", locale, normalized);
};

const buildCollectionPath = (
  defaultLocale: string,
  locale: string,
  basePath: string,
  slug: string
) => {
  return locale === defaultLocale
    ? joinPath("/", basePath, slug)
    : joinPath("/", locale, basePath, slug);
};

const slugifyTitle = (title: string) =>
  title.toLowerCase().split(" ").join("-");

export interface StaticPageLocale {
  language: string;
  path: string;
  title: string;
  seo?: {
    description?: string;
    image?: string;
  };
  [key: string]: any;
}

export interface StaticPage {
  name: string;
  template: string;
  locales: StaticPageLocale[];
}

export interface MarkdownLocale {
  language: string;
  path: string;
  title?: string;
  excerpt?: string;
  featuredImage?: string;
  heroImage?: string;
  body?: string;
  seoTitle?: string;
  seoDescription?: string;
  seo?: {
    title?: string;
    description?: string;
  };
  handle?: string;
  [key: string]: any;
}

export interface MarkdownNode {
  slug: string;
  fields: {
    frontmatter: {
      [key: string]: any;
      locales: MarkdownLocale[];
    };
  };
}

interface SettingsGeneral {
  defaultLanguage: string;
}

interface SettingsNavigation {
  locales: Array<{
    language: string;
    main: { links: Array<{ label: string; url: string }> };
  }>;
}

interface SettingsContacts {
  email: string;
  socials: Array<{ title: string; link: string; iconHandle: string }>;
}

export interface ContentData {
  settings: {
    general: SettingsGeneral;
    navigation: SettingsNavigation;
    contacts: SettingsContacts;
  };
  staticPages: StaticPage[];
  projects: MarkdownNode[];
  posts: MarkdownNode[];
  pages: MarkdownNode[];
}

const loadStaticPages = async (defaultLocale: string): Promise<StaticPage[]> => {
  const dir = path.join(CONTENT_ROOT, "static-pages");
  const entries = await fs.readdir(dir);
  const pages = await Promise.all(
    entries
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const pageData = await readJson<any>(path.join(dir, file));
        const name = path.basename(file, ".json");
        const locales = safeArray(pageData.locales).map((locale) => ({
          ...locale,
          path: buildLocalizedPath(
            defaultLocale,
            locale.language,
            locale.path || ""
          )
        }));
        return {
          name,
          template: pageData.template,
          locales
        } as StaticPage;
      })
  );
  return pages;
};

const loadMarkdownCollection = async (
  subdir: string,
  defaultLocale: string,
  buildLocalePath: (locale: any, slug: string) => string
): Promise<MarkdownNode[]> => {
  const dir = path.join(CONTENT_ROOT, subdir);
  const entries = await fs.readdir(dir);
  const nodes = await Promise.all(
    entries
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(dir, file), "utf-8");
        const { data } = matter(raw);
        const slug = path.basename(file, ".md");
        const locales = safeArray<any>(data.locales).map((locale) => ({
          ...locale,
          title: locale.title || data.title,
          path: buildLocalePath(locale, slug)
        }));
        const frontmatter = {
          ...data,
          locales
        };
        return {
          slug,
          fields: {
            frontmatter
          }
        } as MarkdownNode;
      })
  );
  return nodes;
};

const loadProjects = async (defaultLocale: string) => {
  const basePathByLocale: Record<string, string> = {
    en: "/projects",
    it: "/progetti"
  };
  const nodes = await loadMarkdownCollection(
    "projects",
    defaultLocale,
    (locale, slug) =>
      buildCollectionPath(
        defaultLocale,
        locale.language,
        basePathByLocale[locale.language] || "/projects",
        slug
      )
  );

  return nodes
    .map((node) => {
      const frontmatter = node.fields.frontmatter;
      const priority = Number(frontmatter.priority ?? 0);
      const published =
        frontmatter.published === true || frontmatter.published === "true";
      return {
        ...node,
        fields: {
          frontmatter: {
            ...frontmatter,
            priority,
            published
          }
        }
      } as MarkdownNode;
    })
    .filter((node) => node.fields.frontmatter.published)
    .sort(
      (a, b) =>
        Number(a.fields.frontmatter.priority ?? 0) -
        Number(b.fields.frontmatter.priority ?? 0)
    );
};

const loadPosts = async (defaultLocale: string) => {
  const basePathByLocale: Record<string, string> = {
    en: "/blog",
    it: "/blog"
  };
  const nodes = await loadMarkdownCollection(
    "posts",
    defaultLocale,
    (locale) => {
      const localizedTitle = locale.title || "";
      const slug = slugifyTitle(localizedTitle);
      return buildCollectionPath(
        defaultLocale,
        locale.language,
        basePathByLocale[locale.language] || "/blog",
        slug
      );
    }
  );

  return nodes
    .map((node) => {
      const frontmatter = node.fields.frontmatter;
      const published =
        frontmatter.published === true || frontmatter.published === "true";
      return {
        ...node,
        fields: {
          frontmatter: {
            ...frontmatter,
            published
          }
        }
      } as MarkdownNode;
    })
    .filter((node) => node.fields.frontmatter.published)
    .sort((a, b) => {
      const aDate = new Date(a.fields.frontmatter.date || 0).getTime();
      const bDate = new Date(b.fields.frontmatter.date || 0).getTime();
      return bDate - aDate;
    });
};

const loadPages = async (defaultLocale: string) => {
  return loadMarkdownCollection("pages", defaultLocale, (locale, slug) => {
    const handle = locale.handle || slug;
    return buildLocalizedPath(defaultLocale, locale.language, handle);
  });
};

const loadSettings = async () => {
  const settingsDir = path.join(CONTENT_ROOT, "settings");
  const [general, navigation, contacts] = await Promise.all([
    readJson<SettingsGeneral>(path.join(settingsDir, "general.json")),
    readJson<SettingsNavigation>(path.join(settingsDir, "navigation.json")),
    readJson<SettingsContacts>(path.join(settingsDir, "contacts.json"))
  ]);
  return { general, navigation, contacts };
};

let cached: Promise<ContentData> | null = null;

export const getContent = () => {
  if (!cached) {
    cached = (async () => {
      const settings = await loadSettings();
      const defaultLocale = settings.general.defaultLanguage;
      const [staticPages, projects, posts, pages] = await Promise.all([
        loadStaticPages(defaultLocale),
        loadProjects(defaultLocale),
        loadPosts(defaultLocale),
        loadPages(defaultLocale)
      ]);
      return { settings, staticPages, projects, posts, pages } as ContentData;
    })();
  }
  return cached;
};

export const getCookiePolicyByLocale = async () => {
  const content = await getContent();
  const cookiePage = content.pages.find((page) => page.slug === "cookies");
  if (!cookiePage) {
    return new Map<string, string>();
  }
  return new Map(
    cookiePage.fields.frontmatter.locales.map((locale: MarkdownLocale) => [
      locale.language,
      locale.path
    ])
  );
};
