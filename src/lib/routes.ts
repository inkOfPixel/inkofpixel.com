import { getContent, getCookiePolicyByLocale, MarkdownNode } from "./content";
import { SITE } from "./site";
import { IPageLocale } from "types";

export interface RouteShell {
  locale: string;
  defaultLocale: string;
  pageLocales: IPageLocale[];
  navigationLinks: Array<{ label: string; url: string }>;
  cookiePolicyPath?: string;
}

export interface RouteMeta {
  title: string;
  description?: string;
  image?: string;
}

export interface RouteDefinition {
  path: string;
  template: string;
  locale: string;
  pageLocales: IPageLocale[];
  shell: RouteShell;
  meta: RouteMeta;
  data: Record<string, any>;
}

const buildPageLocales = (locales: Array<{ language: string; path: string }>) =>
  locales.map((locale) => ({
    code: locale.language,
    url: locale.path
  }));

const normalizeMeta = (meta: RouteMeta): RouteMeta => ({
  title: meta.title,
  description: meta.description || SITE.description,
  image: meta.image
});

const findLocaleData = <T extends { language: string }>(
  locales: T[],
  locale: string
) => locales.find((entry) => entry.language === locale);

export const getAllRoutes = async (): Promise<RouteDefinition[]> => {
  const content = await getContent();
  const cookiePolicyByLocale = await getCookiePolicyByLocale();
  const defaultLocale = content.settings.general.defaultLanguage;
  const navigationByLocale = new Map(
    content.settings.navigation.locales.map((locale) => [
      locale.language,
      locale.main?.links || []
    ])
  );

  const routes: RouteDefinition[] = [];

  const createShell = (
    locale: string,
    pageLocales: IPageLocale[]
  ): RouteShell => ({
    locale,
    defaultLocale,
    pageLocales,
    navigationLinks: navigationByLocale.get(locale) || [],
    cookiePolicyPath: cookiePolicyByLocale.get(locale)
  });

  const addRoute = (route: RouteDefinition) => {
    routes.push({
      ...route,
      meta: normalizeMeta(route.meta)
    });
  };

  const contactsPage = content.staticPages.find(
    (page) => page.name === "contacts"
  );

  for (const page of content.staticPages) {
    const pageLocales = buildPageLocales(page.locales);
    for (const locale of page.locales) {
      const shell = createShell(locale.language, pageLocales);
      const base = {
        path: locale.path,
        template: page.template,
        locale: locale.language,
        pageLocales,
        shell
      };
      const meta = {
        title: locale.title,
        description: locale.seo?.description,
        image: locale.seo?.image
      } as RouteMeta;

      if (page.template === "home") {
        const featuredTitles =
          locale.projects?.featuredProjects?.map((item: any) => item.project) ||
          [];
        const featuredProjects = featuredTitles
          .map((title: string) =>
            content.projects.find(
              (project) => project.fields.frontmatter.title === title
            )
          )
          .filter(Boolean);

        addRoute({
          ...base,
          meta,
          data: {
            page,
            featuredProjects
          }
        });
        continue;
      }

      if (page.template === "services") {
        addRoute({
          ...base,
          meta,
          data: {
            page,
            contacts: content.settings.contacts,
            contactsPage
          }
        });
        continue;
      }

      if (page.template === "projects") {
        addRoute({
          ...base,
          meta,
          data: {
            page,
            projects: content.projects
          }
        });
        continue;
      }

      if (page.template === "blog") {
        addRoute({
          ...base,
          meta,
          data: {
            page,
            posts: content.posts
          }
        });
        continue;
      }

      if (page.template === "contacts") {
        addRoute({
          ...base,
          meta,
          data: {
            page,
            contacts: content.settings.contacts
          }
        });
        continue;
      }

      addRoute({
        ...base,
        meta,
        data: {
          page
        }
      });
    }
  }

  const addMarkdownRoutes = (
    nodes: MarkdownNode[],
    template: string,
    buildMeta: (locale: any, node: MarkdownNode) => RouteMeta
  ) => {
    for (const node of nodes) {
      const locales = node.fields.frontmatter.locales as Array<{
        language: string;
        path: string;
      }>;
      const pageLocales = buildPageLocales(locales);
      for (const locale of locales) {
        const shell = createShell(locale.language, pageLocales);
        addRoute({
          path: locale.path,
          template,
          locale: locale.language,
          pageLocales,
          shell,
          meta: buildMeta(locale, node),
          data: {
            [template]: node
          }
        });
      }
    }
  };

  addMarkdownRoutes(content.projects, "project", (locale) => ({
    title: locale.seoTitle || locale.title || SITE.title,
    description: locale.seoDescription || locale.excerpt,
    image: locale.heroImage || locale.featuredImage
  }));

  addMarkdownRoutes(content.posts, "post", (locale) => ({
    title: locale.seoTitle || locale.title || SITE.title,
    description: locale.seoDescription || locale.excerpt,
    image: locale.featuredImage || locale.heroImage
  }));

  addMarkdownRoutes(content.pages, "page", (locale, node) => ({
    title:
      locale.seo?.title ||
      locale.title ||
      node.fields.frontmatter.title ||
      SITE.title,
    description: locale.seo?.description,
    image: locale.seo?.image
  }));

  return routes;
};
