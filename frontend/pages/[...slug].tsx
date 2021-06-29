import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetNavItems,
  GetNavItemsQuery,
  GetNavItemsQueryVariables,
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
} from "@features/sectionBlocks";
import { assertNever } from "utils";
import { HeroBlockData } from "@features/pageBlocks/HeroBlock";
import { FeatureBlockData } from "@features/pageBlocks/FeatureBlock";
import { CardBlockData } from "@features/pageBlocks/CardBlock";
import { NavBlocksData } from "@features/navigation";
import { NavData } from "@features/plugins/useNavPlugin";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  pageData: PageData;
  navData: NavData;
}

export default function DynamicPage({
  navData,
  pageData,
  preview,
}: DynamicPageProps) {
  if (pageData == null) {
    return null;
  }

  const { colorMode } = useColorMode();

  const [_, form] = usePagePlugin(pageData);

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <div>
      <DefaultLayout data={navData} title="InkOfPixel">
        <InlineForm form={form}>
          <StyledInlineBlocks
            color={colorMode == "light" ? "dark" : "white"}
            name="sections"
            itemProps={itemProps}
            blocks={SECTION_PAGE_BLOCKS}
          />
          {/* <CardBlock /> */}
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

  const availableNavBlocks = await fetchGraphQL<
    GetNavItemsQuery,
    GetNavItemsQueryVariables
  >(GetNavItems, {
    locale,
  });

  const navData = getNavData(availableNavBlocks.navigations, locale);
  const pageData = getPageData(availablePages.pages, locale);

  

  if (navData == null) {
    return {
      notFound: true,
    };
  }

  if (pageData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        pageData,
        navData,
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
      navData,
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
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.hero?.map<HeroBlockData | undefined>((hero) => {
                if (hero != null) {
                  return {
                    id: hero.id,
                    title: hero.title,
                    subtitle: hero.subtitle,
                    _template: "ComponentBlocksHero",
                  };
                }
              }),
            };
          }
          case "ComponentSectionSingleFeatureSection": {
            return {
              _template: "featureSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.singleFeature?.map<FeatureBlockData | undefined>(
                (feature) => {
                  if (feature != null) {
                    return {
                      id: feature.id,
                      title: feature.title,
                      description: feature.description,
                      imageUrl: feature.image?.url ? feature.image.url : null,
                      serviceLink: feature.serviceLink,
                      _template: "ComponentBlocksSingleFeature",
                    };
                  }
                }
              ),
            };
          }
          case "ComponentSectionCardSection": {
            return {
              _template: "cardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.card?.map<CardBlockData | undefined>((card) => {
                if (card != null) {
                  return {
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    imageUrl: card.image?.url,
                    projectLink: card.projectLink,
                    _template: "ComponentBlocksCard",
                  };
                }
              }),
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

function getNavData(
  navigations: GetNavItemsQuery["navigations"],
  locale: string
): NavData | undefined {
  const nav = navigations?.find((nav) => nav?.locale === locale);

  if (nav) {
    const items =
      nav.items?.map<NavBlocksData | null>((navItem) => {
        if (navItem == null) {
          return null;
        }
        return {
          id: navItem.id,
          linkName: navItem.path?.pageName,
          path: navItem.path?.path,
          _template: "ComponentMenuLink",
        };
      }) || [];

    return {
      id: nav.id,
      sections: filterListNullableItems(items),
    };
  }
}
