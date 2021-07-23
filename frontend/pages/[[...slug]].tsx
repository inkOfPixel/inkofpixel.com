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
import {
  GlobalData,
  PageData,
  usePagePlugin,
} from "@features/plugins/useSitePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import { Box, chakra, useColorMode } from "@chakra-ui/react";
import {
  BlockItemProps,
  PageSectionBlockData,
  PAGE_SECTION_BLOCKS,
} from "@features/pageBlocks";
import { assertNever, filterListNullableItems } from "utils";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import { FooterBlockData } from "@features/defaultBlocks/FooterBlock";

import Logo from "@components/Logo";
import { Footer } from "@components/Footer/Footer";
import { LowerFooter } from "@components/Footer/LowerFooter";
import {
  UpperFooter,
  BlocksContainer,
  FooterDescription,
  FooterEmail,
  FooterBlocks,
} from "@components/Footer/UpperFooter";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  allData: {
    global: GlobalData;
    page: PageData;
  };
}

export default function DynamicPage({ allData, preview }: DynamicPageProps) {
  const { colorMode } = useColorMode();
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  const [_, form] = usePagePlugin(allData);

  return (
    <DefaultLayout title="InkOfPixel">
      <InlineForm form={form}>
        <StyledInlineBlocks
          color={colorMode == "light" ? "dark" : "white"}
          name="page.sections"
          itemProps={itemProps}
          blocks={PAGE_SECTION_BLOCKS}
        />
        <Footer>
          <UpperFooter>
            <Box
              color="white"
              as="a"
              width={{
                base: "36",
                sm: "52",
              }}
              height="54px">
              <Logo width="100%" height="100%" color="white" />
            </Box>
            <BlocksContainer>
              <FooterDescription />
              <FooterEmail email={allData.global.bottomBar.footer.email} />
              <FooterBlocks />
            </BlocksContainer>
          </UpperFooter>
          <LowerFooter data={allData.global.bottomBar.footer}></LowerFooter>
        </Footer>
      </InlineForm>
    </DefaultLayout>
  );
}

const StyledInlineBlocks = chakra(InlineBlocks);

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

  const availableGlobal = await fetchGraphQL<
    GetGlobalQuery,
    GetGlobalQueryVariables
  >(GetGlobal);

  const globalData = getGlobalData(availableGlobal.global);

  const pageData = getPageData(availablePages.pages, locale);

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
        allData: {
          global: globalData,
          page: pageData,
        },
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      allData: {
        global: globalData,
        page: pageData,
      },
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
  if (page?.sections) {
    let filteredSections = filterListNullableItems(page.sections);
    const sections =
      filteredSections.map<PageSectionBlockData>((section) => {
        switch (section.__typename) {
          case "ComponentSectionHeroSection": {
            return {
              _template: "heroSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
            };
          }
          case "ComponentSectionSingleFeatureSection": {
            return {
              _template: "featureSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              sectionTitle: section.sectionTitle || null,
              blocks: section.sections
                ? filterListNullableItems(
                    section.sections
                  ).map<FeatureBlockData>((feature) => {
                    return {
                      id: feature.id,
                      title: feature.title || null,
                      description: feature.description || null,
                      image:
                        feature.image == null
                          ? null
                          : {
                              id: feature.image.id,
                              url: feature.image.url,
                              altText: feature.image.alternativeText || null,
                            },
                      url: feature.url || null,
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
                        image: card.image
                          ? {
                              id: card.image.id,
                              url: card.image.url,
                              altText: card.image.alternativeText || null,
                            }
                          : null,
                        url: card.url || null,
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
      title: page.title,
      sections: sections,
      path: page.path || undefined,
    };
  }
}

function getGlobalData(
  global: GetGlobalQuery["global"]
): GlobalData | undefined {
  if (global == null) {
    return undefined;
  }
  if (global.bottomBar?.footer?.blocks) {
    let filteredBlocks = filterListNullableItems(
      global.bottomBar.footer.blocks
    );
    return {
      id: global.id,
      bottomBar: {
        id: global.bottomBar.id,
        footer: {
          id: global.bottomBar.footer.id,
          cap: global.bottomBar.footer.cap || null,
          city: global.bottomBar.footer.city || null,
          email: global.bottomBar.footer.email || null,
          description: global.bottomBar.footer.description || null,
          sharedCapital: global.bottomBar.footer.sharedCapital || null,
          copyright: global.bottomBar.footer.copyright || null,
          street: global.bottomBar.footer.street || null,
          vatNumber: global.bottomBar.footer.vatNumber || null,
          blocks: filteredBlocks.map<FooterBlockData>((block) => {
            return {
              _template: "ComponentBlocksFooterBlock",
              id: block.id,
              cap: block.cap || null,
              street: block.street || null,
              city: block.city || null,
              initials: block.initials || null,
              type: block.type || null,
              province: block.province || null,
            };
          }),
        },
      },
    };
  }
}
