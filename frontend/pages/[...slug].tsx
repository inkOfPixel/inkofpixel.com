import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
  GetSections,
  GetSectionsQuery,
  GetSectionsQueryVariables,
} from "@graphql/generated";
import { BlockItemProps } from "@features/pageBlocks";
import { SectionData, useSectionPlugin } from "@features/plugins/usePagePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import { chakra, useColorMode } from "@chakra-ui/react";
import { SectionBlockData, SECTION_PAGE_BLOCKS } from "@features/sectionBlocks";
import { assertNever } from "utils";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  sectionData: SectionData;
}

export default function DynamicPage({
  sectionData,
  preview,
}: DynamicPageProps) {
  if (sectionData == null) {
    return null;
  }

  const { colorMode } = useColorMode();

  const [_, form] = useSectionPlugin(sectionData);

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <div>
      <DefaultLayout title="InkOfPixel">
        <InlineForm form={form}>
          <StyledComponent
            color={colorMode == "light" ? "dark" : "white"}
            name="blocks"
            blocks={SECTION_PAGE_BLOCKS}
            itemProps={itemProps}
            className={"aaa"}
          />
          {/* <CardBlock /> */}
        </InlineForm>
      </DefaultLayout>
    </div>
  );
}

const StyledComponent = chakra(InlineBlocks);

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
  const localeSection = await fetchGraphQL<
    GetSectionsQuery,
    GetSectionsQueryVariables
  >(GetSections, {
    locale,
    where: {
      path,
    },
  });

  const localePages = await fetchGraphQL<GetPagesQuery, GetPagesQueryVariables>(
    GetPages,
    {
      locale,
      where: {
        path,
      },
    }
  );

  if (localePages.pages == null) {
    return {
      notFound: true,
    };
  }

  if (localeSection.sections == null) {
    return {
      notFound: true,
    };
  }

  const sectionData = getSectionData(localeSection.sections, locale);
  console.log(
    "localeSection.section",
    JSON.stringify(localeSection.sections, null, " ")
  );
  console.log("Section data", JSON.stringify(sectionData?.blocks, null, " "));

  if (sectionData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        sectionData,
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      sectionData,
      path: pathParts,
      locale,
      preview,
    },
  };
};
/*
function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageData | undefined {
  const page = pages?.find((page) => page?.locale === locale);
  console.log("Page", page);

  if (page) {
    const sections =
      page.sections?.map<BlockData | null>((section) => {
        if (section == null) {
          return null;
        }
        return {
          title: section.title,
          subtitle: section.subtitle,
          blocks: section.blocks,
        };
      }) || [];

    return {
      id: page.id,
      sections: filterListNullableItems(sections),
      path: page.path ? page.path : undefined,
    };
  }
}
*/

function getSectionData(
  sections: GetSectionsQuery["sections"],
  locale: string
): SectionData | undefined {
  const section = sections?.find((section) => section?.locale === locale);
  if (section) {
    const sections =
      section.blocks?.map<SectionBlockData | null>((block) => {
        if (block == null) return null;
        switch (block.__typename) {
          case "ComponentBlocksHero": {
            return {
              id: block.id,
              title: block.title,
              subtitle: block.subtitle,
            };
          }
          case "ComponentBlocksCard": {
            return {
              id: block.id,
              title: block.id,
              subtitle: block.id,
              projectLink: block.projectLink,
              imageUrl: block.image?.url,
            };
          }
          case "ComponentBlocksSingleFeature": {
            return {
              id: block.id,
              title: block.id,
              subtitle: block.id,
              serviceLink: block.serviceLink,
              imageUrl: block.image?.url,
            };
          }

          default:
            return assertNever(block);
        }
      }) || [];
    return {
      id: section.id,
      title: section.title ? section.title : undefined,
      subtitle: section.subtitle ? section.subtitle : undefined,
      blocks: filterListNullableItems(sections),
    };
  }
  return undefined;
}
