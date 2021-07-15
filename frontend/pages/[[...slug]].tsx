import { fetchGraphQL } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetGlobal,
  GetGlobalQuery,
  GetGlobalQueryVariables,
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import { PageData, usePagePlugin } from "@features/plugins/usePagePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import { chakra, useColorMode } from "@chakra-ui/react";
import {
  BlockItemProps,
  SectionBlockData,
  SECTION_PAGE_BLOCKS,
} from "@features/pageBlocks";
import { assertNever, filterListNullableItems } from "@utils";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import { GlobalData, useGlobalPlugin } from "@features/plugins/useGlobalPlugin";
import { NavBlockData } from "@features/sectionBlocks/NavigationBlock";
import { NavigationSectionBlock } from "@features/defaultBlocks/NavigationSectionBlock";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  pageData: PageData;
  globalData: GlobalData;
}

export default function DynamicPage({
  pageData,
  globalData,
  preview,
}: DynamicPageProps) {
  const { colorMode } = useColorMode();
  const [_, form] = usePagePlugin(pageData);
  const [__, form2] = useGlobalPlugin(globalData);

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  if (pageData == null) {
    return {
      notFound: true,
    };
  }

  const StyledInlineBlocks = chakra(InlineBlocks);

  return (
    <div>
      <DefaultLayout title="inkOfPixel">
        <InlineForm form={form2}>
          <NavigationSectionBlock
            _template="navigationSection"
            id="12"
            blocks={globalData.links}
          />
        </InlineForm>
        <InlineForm form={form}>
          <StyledInlineBlocks
            color={colorMode == "light" ? "dark" : "white"}
            name="sections"
            itemProps={itemProps}
            blocks={SECTION_PAGE_BLOCKS}
          />
        </InlineForm>
      </DefaultLayout>
    </div>
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
    const slugArray: any = pagePath.length > 0 ? pagePath.split("/") : false;
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

  const global = await fetchGraphQL<GetGlobalQuery, GetGlobalQueryVariables>(
    GetGlobal
  );

  console.log("Global data", JSON.stringify(global, null, " "));

  const pageData = getPageData(availablePages.pages, locale);

  const globalData = getGlobalData(global.global);

  if (pageData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        pageData,
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
        globalData,
      },
    };
  }

  return {
    props: {
      pageData,
      path: pathParts,
      locale,
      preview,
      globalData,
    },
  };
};

function getGlobalData(
  global: GetGlobalQuery["global"]
): GlobalData | undefined {
  if (global == null) return undefined;

  return {
    id: global.id,
    links: global.topbar?.menu?.links?.map<NavBlockData>((link) => {
      return {
        _template: "ComponentBlocksNavigation",
        id: link?.id,
        pageName: link?.pageName,
        path: link?.path,
      };
    }),
  };
}

function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageData | undefined {
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
                        _template: "ComponentBlocksCard",
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
      title: page.pageName,
      sections: filterListNullableItems(sections),
      path: page.path ? page.path : undefined,
    };
  }
}
