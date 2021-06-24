import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import { BlockItemProps } from "@features/pageBlocks";
import { PageData, usePagePlugin } from "@features/plugins/usePagePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import { chakra, useColorMode } from "@chakra-ui/react";
import { SectionBlockData, SECTION_PAGE_BLOCKS } from "@features/sectionBlocks";
import { assertNever } from "utils";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  pageData: PageData;
}

export default function DynamicPage({ pageData, preview }: DynamicPageProps) {
  if (pageData == null) {
    return null;
  }

  const { colorMode } = useColorMode();

  const [_, form] = usePagePlugin(pageData);

  console.log("pageData", JSON.stringify(pageData, null, " "));

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <div>
      <DefaultLayout title="InkOfPixel">
        <InlineForm form={form}>
          <StyledInlineBlocks
            color={colorMode == "light" ? "dark" : "white"}
            name="sections"
            blocks={SECTION_PAGE_BLOCKS}
            itemProps={itemProps}
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
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.hero?.map((hero) => {
                if (hero != null) {
                  return {
                    id: hero.id,
                    title: hero.title,
                    subtitle: hero.subtitle,
                  };
                }
              }),
            };
          }
          case "ComponentSectionSingleFeatureSection": {
            console.log(
              "features",
              JSON.stringify(section.singleFeature, null, " ")
            );
            return {
              _template: "featureSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.singleFeature?.map((feature) => {
                if (feature != null) {
                  return {
                    id: feature.id,
                    title: feature.title,
                    description: feature.description,
                    imageUrl: feature.image?.url,
                    serviceLink: feature.serviceLink,
                  };
                }
              }),
            };
          }
          case "ComponentSectionCardSection": {
            return {
              _template: "cardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              blocks: section.card?.map((card) => {
                if (card != null) {
                  return {
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    imageUrl: card.image?.url,
                    projectLink: card.projectLink,
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

/*
function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageData | undefined {
  //const section = sections?.find((section) => section?.locale == locale); // == first section
  //if (section) {
  const aa: SectionBlockData =
    pages?.map<PageData | null>((page) => {
      if (page == null) {
        return null;
      }

      let blocks =
        section?.blocks?.map<BlockData | null>((block) => {
          console.log("block", JSON.stringify(block, null, " "));
          if (block == null) {
            return null;
          }
          switch (block?.__typename) {
            case "ComponentBlocksHero": {
              return {
                _template: "ComponentBlocksHero",
                id: block.id,
                title: block.title,
                subtitle: block.subtitle,
              };
            }
            case "ComponentBlocksCard": {
              return {
                _template: "ComponentBlocksCard",
                id: block.id,
                title: block.title,
                subtitle: block.description,
                projectLink: block.projectLink,
                imageUrl: block.image?.url,
              };
            }
            case "ComponentBlocksSingleFeature": {
              return {
                _template: "ComponentBlocksSingleFeature",
                id: block.id,
                title: block.title,
                subtitle: block.description,
                serviceLink: block.serviceLink,
                imageUrl: block.image?.url,
              };
            }

            default:
              return assertNever(block);
          }
        }) || [];
      switch (sezioni._template) {
        case "heroSection": {
          return {
            id: section.id,
            title: section.title,
            subtitle: section.subtitle,
            blocks: filterListNullableItems(blocks),
          };
        }
        case "featureSection": {
          return {
            id: section.id,
            title: section.title,
            subtitle: section.subtitle,
            blocks: filterListNullableItems(blocks),
          };
        }
      }
    }) || [];
  return {
    id: sezioni.id,
    title: sezioni.title,
    sections: filterListNullableItems(sezioni),
  };
}
*/
