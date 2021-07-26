import { fetchGraphQL } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import * as React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetGlobal,
  GetGlobalQuery,
  GetGlobalQueryVariables,
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import {
  LocalizationsData,
  PageDataLocalizations,
  usePagePlugin,
} from "@features/plugins/useSitePlugin";
import { DefaultLayout as SiteLayout } from "@layouts/siteLayout";
import { chakra, useColorMode } from "@chakra-ui/react";
import { SectionBlockData, SECTION_PAGE_BLOCKS } from "@features/pageBlocks";
import { assertNever, filterListNullableItems } from "@utils";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import { GlobalData } from "@features/plugins/useSitePlugin";
import { NavBlockData } from "@features/navigationMenu/NavigationBlock";

import { MobileNavDrawer } from "@components/MobileNavDrawer";
import { NavBar, NavMenuDesktop, NavMenuMobile } from "@components/NavBar";
import { Main } from "@components/Main";
import { WordmarkLogo, WordmarkLogoLink } from "@components/WordmarkLogo";
import { useRouter } from "next/router";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuList,
  LocaleMenuLink,
} from "@components/LocaleMenu";

import { BlockItemProps } from "@types";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  allData: {
    global: GlobalData;
    page: PageDataLocalizations;
  };
}

const StyledInlineBlocks = chakra(InlineBlocks);

export default function DynamicPage({ allData, preview }: DynamicPageProps) {
  const { colorMode } = useColorMode();

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  const [_, form] = usePagePlugin(allData);

  const router = useRouter();

  return (
    <SiteLayout title="inkOfPixel">
      <InlineForm form={form}>
        <NavBar>
          <MobileNavDrawer>
            <NavMenuMobile />
          </MobileNavDrawer>
          <WordmarkLogoLink url="/">
            <WordmarkLogo color="rgb(19,22,57)" width="200px" height="150px" />
          </WordmarkLogoLink>
          <NavMenuDesktop />
          <LocaleMenu>
            <LocaleMenuButton>{router.locale!.toUpperCase()}</LocaleMenuButton>
            <LocaleMenuList>
              <LocaleMenuLink href={router.asPath} locale={router.locale!}>
                {router.locale?.toUpperCase()}
              </LocaleMenuLink>
              {allData ? (
                allData.page.localizations?.map((pageLocale) => {
                  return (
                    <LocaleMenuLink
                      key={pageLocale.locale}
                      href={pageLocale.path!}
                      locale={pageLocale.locale!}>
                      {pageLocale.locale?.toUpperCase()}
                    </LocaleMenuLink>
                  );
                })
              ) : (
                <LocaleMenuLink
                  key="1"
                  href={router.pathname}
                  locale={router.locale!}></LocaleMenuLink>
              )}
            </LocaleMenuList>
          </LocaleMenu>
        </NavBar>
        <Main>
          <StyledInlineBlocks
            color={colorMode == "light" ? "dark" : "white"}
            name="page.sections"
            itemProps={itemProps}
            blocks={SECTION_PAGE_BLOCKS}
          />
        </Main>
      </InlineForm>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (context.locales == null) {
    throw new Error("No locale has been defined!");
  }
  const allPagesRequests = context.locales.map(async (locale) => {
    const localePages = await fetchGraphQL<
      GetPagesQuery,
      GetPagesQueryVariables
    >(GetPages, {
      locale,
    });

    if (localePages.pages) {
      return filterListNullableItems(localePages.pages);
    }
    return [];
  });

  const allPages = await Promise.all(allPagesRequests);
  const pages = allPages.flat();

  const paths = pages.map((page) => {
    const pagePath = page.path?.replace(/^\/+/, "") || "";

    const slugArray: any =
      pagePath.length > 0 ? pagePath.split("/") : undefined;
    return {
      params: { slug: slugArray },
      locale: page.locale!,
    };
  });

  return { paths, fallback: true };
};

function wrap<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export const getStaticProps: GetStaticProps<
  DynamicPageProps | { notFound: boolean }
> = async (context) => {
  const pathParts = wrap(context.params?.slug || []);
  const path = `/${pathParts.join("/")}`;
  const locale = context.locale;
  if (locale == null) {
    throw new Error(`Path "${pathParts.join("/")}" has no locale!`);
  }
  const preview = context.preview === true;

  const localePages = await fetchGraphQL<GetPagesQuery, GetPagesQueryVariables>(
    GetPages,
    {
      locale,
    }
  );

  if (localePages.pages == null) {
    return {
      notFound: true,
    };
  }

  const availablePages = await fetchGraphQL<
    GetPagesQuery,
    GetPagesQueryVariables
  >(GetPages, {
    locale,
    where: {
      path,
    },
  });

  const availableGlobal = await fetchGraphQL<
    GetGlobalQuery,
    GetGlobalQueryVariables
  >(GetGlobal);

  const pageData = getPageData(availablePages.pages, locale);

  const globalData = getGlobalData(availableGlobal.global);

  if (pageData == null) {
    return {
      notFound: true,
    };
  }

  if (globalData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
        allData: {
          global: globalData,
          page: pageData,
        },
      },
    };
  }

  return {
    props: {
      path: pathParts,
      locale,
      preview,
      allData: {
        global: globalData,
        page: pageData,
      },
    },
  };
};

function getGlobalData(
  global: GetGlobalQuery["global"]
): GlobalData | undefined {
  if (global == null) {
    return undefined;
  }

  if (global.topbar?.menu?.links) {
    let filteredLinks = filterListNullableItems(global.topbar.menu.links);
    return {
      id: global.id,
      topbar: {
        id: global.topbar.id,
        menu: {
          id: global.topbar.menu.id,
          links: filteredLinks.map<NavBlockData>((link) => {
            return {
              _template: "navigationLink",
              id: link.id,
              label: link.label || null,
              url: link.url || null,
            };
          }),
        },
      },
    };
  }
}

function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageDataLocalizations | undefined {
  const page = pages?.find((page) => page?.locale === locale);

  if (page == null) {
    return undefined;
  }

  if (page?.sections) {
    let filteredSections = filterListNullableItems(page.sections);
    const sections =
      filteredSections.map<SectionBlockData>((section) => {
        switch (section.__typename) {
          case "ComponentSectionHeroSection": {
            return {
              _template: "heroSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              areBubblesActive: section.areBubblesActive || false,
            };
          }
          case "ComponentSectionSingleFeatureSection": {
            return {
              _template: "featureSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              sectionTitle: section.sectionTitle || null,
              paddingTop: section.paddingTop || 0,
              blocks: section.sections
                ? filterListNullableItems(
                    section.sections
                  ).map<FeatureBlockData>((feature) => {
                    return {
                      id: feature.id,
                      title: feature.title || null,
                      description: feature.description
                        ? feature.description
                        : null,
                      image:
                        feature.image == null
                          ? null
                          : {
                              id: feature.image.id,
                              url: feature.image.url,
                              altText: feature.image.alternativeText || null,
                            },
                      url: feature.url || null,
                      urlName: feature.urlName || null,
                      bubbleColor: feature.bubbleColor || null,
                      _template: "ComponentBlocksSingleFeature",
                    };
                  })
                : [],
            };
          }
          case "ComponentSectionCardSection": {
            return {
              _template: "cardSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              sectionTitle: section.sectionTitle || null,
              blocks: section.sections
                ? filterListNullableItems(section.sections).map<CardBlockData>(
                    (card) => {
                      return {
                        _template: "ComponentBlocksCard",
                        id: card.id,
                        title: card.title,
                        description: card.description,
                        image:
                          card.image == null
                            ? null
                            : {
                                id: card.image.id,
                                url: card.image.url,
                                altText: card.image.alternativeText || null,
                              },
                        url: card.url ? card.url : null,
                      };
                    }
                  )
                : [],
            };
          }
          default:
            return assertNever(section);
        }
      }) || [];

    return {
      id: page.id,
      title: page.title,
      sections: filterListNullableItems(sections),
      path: page.path ? page.path : undefined,
      localizations: page.localizations
        ? filterListNullableItems(
            page.localizations?.map<LocalizationsData>((localization) => {
              return {
                id: localization?.id,
                locale: localization?.locale,
                path: localization?.path,
              };
            })
          )
        : [],
    };
  }
}
