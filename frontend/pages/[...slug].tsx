import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import { BlockData, BlockItemProps, PAGE_BLOCKS } from "@features/pageBlocks";
import { PageData, usePagePlugin } from "@features/plugins/usePagePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import { chakra, useColorMode } from "@chakra-ui/react";
import { STRAPI_URL } from "@config/env";

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
            color={colorMode == "light" ? "black" : "white"}
            name="blocks"
            blocks={PAGE_BLOCKS}
            itemProps={itemProps}
          />
          {/* <CardBlock /> */}
        </InlineForm>

        <p>SLUG</p>
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
    console.log("Slug array", slugArray);

    return {
      params: { slug: slugArray },
      locale: page.locale!,
    };
  });
  console.log("Paths", paths);

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

  const pageData = getPageData(localePages.pages, locale);

  if (pageData == null) {
    return {
      notFound: true,
    };
  }

  console.log("Page data", pageData);

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
    const blocks =
      page.blocks?.map<BlockData | null>((section) => {
        if (section == null) {
          return null;
        }
        switch (section.__typename) {
          case "ComponentBlocksHero": {
            return {
              _template: "hero",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
            };
          }
          case "ComponentBlocksCard": {
            return {
              _template: "card",
              id: section.id,
              title: section.title,
              description: section.description,
              imageUrl: STRAPI_URL + section.image?.url,
              projectLink: section.projectLink,
            };
          }
          case "ComponentBlocksSingleFeature": {
            return {
              _template: "feat",
              id: section.id,
              title: section.title,
              description: section.description,
              imageUrl: STRAPI_URL + section.image?.url,
              serviceLink: section.serviceLink,
            };
          }
          default:
            return null;
        }
      }) || [];
    return {
      id: page.id,
      blocks: filterListNullableItems(blocks),
      path: page.path ? page.path : undefined,
    };
  }
}
