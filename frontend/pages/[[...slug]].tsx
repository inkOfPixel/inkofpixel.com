import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
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
import { assertNever } from "utils";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import { NavBlockData } from "@features/sectionBlocks/NavigationBlock";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  pageData: PageData;
}

export default function DynamicPage({ pageData, preview }: DynamicPageProps) {
  const { colorMode } = useColorMode();

  const [_, form] = usePagePlugin(pageData);

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  if (pageData == null) {
    return null;
  }

  return (
    <div>
      <DefaultLayout title="InkOfPixel">
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

const StyledInlineBlocks = chakra(InlineBlocks);

export const getStaticPaths: GetStaticPaths = async (context) => {
  // Get all pages from Strapi
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
    // Decompose the slug that was saved in Strapi
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

  const pageData = getPageData(availablePages.pages, locale);

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
      },
    };
  }

  return {
    props: {
      pageData,
      path: pathParts,
      locale,
      preview,
    },
  };
};

function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageData | undefined {
  const page = pages?.find((page) => page?.locale === locale);

  if (page) {
    const sections =
      page.sections?.map<SectionBlockData | null>((section) => {
        if (section == null) {
          return null;
        }
        switch (section.__typename) {
          case "ComponentSectionHeroSection": {
            return {
              _template: "heroSection",
              id: section.id,
              title: section.title ? section.title : null,
              subtitle: section.subtitle ? section.subtitle : null,
              areBubblesActive: section.areBubblesActive
                ? section.areBubblesActive
                : false,
            };
          }
          case "ComponentSectionSingleFeatureSection": {
            return {
              _template: "featureSection",
              id: section.id,
              title: section.title ? section.title : null,
              subtitle: section.subtitle ? section.subtitle : null,
              sectionTitle: section.sectionTitle ? section.sectionTitle : null,
              blocks: section.singleFeature
                ? filterListNullableItems(
                    section.singleFeature
                  ).map<FeatureBlockData>((feature) => {
                    return {
                      id: feature.id ? feature.id : null,
                      title: feature.title ? feature.title : null,
                      description: feature.description
                        ? feature.description
                        : null,
                      bubbleColor: feature.bubbleColor
                        ? feature.bubbleColor
                        : null,
                      image:
                        feature.image == null
                          ? null
                          : {
                              id: feature.image.id,
                              url: feature.image.url,
                              altText: feature.image.alternativeText || null,
                            },
                      serviceLink: feature.serviceLink
                        ? feature.serviceLink
                        : null,
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
              title: section.title ? section.title : null,
              subtitle: section.subtitle ? section.subtitle : null,
              sectionTitle: section.sectionTitle ? section.sectionTitle : null,
              blocks: section.card
                ? filterListNullableItems(section.card).map<CardBlockData>(
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
                        projectLink: card.projectLink ? card.projectLink : null,
                        _template: "ComponentBlocksCard",
                      };
                    }
                  )
                : [],
            };
          }
          case "ComponentSectionNavigationSection": {
            return {
              _template: "navigationSection",
              id: section.id,
              blocks: section.nav
                ? filterListNullableItems(section.nav).map<NavBlockData>(
                    (nav) => {
                      return {
                        id: nav.id,
                        pageName: nav.pageName ? nav.pageName : null,
                        path: nav.path ? nav.path : null,
                        _template: "ComponentBlocksNavigation",
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
