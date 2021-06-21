import DarkModeSwitch from "@components/DarkModeSwitch";
import { HeroBlock } from "@features/pageBlocks/HeroBlock";
import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineForm } from "react-tinacms-inline";
import {
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import { BlockData } from "@features/pageBlocks";
import { PageData } from "@features/plugins/usePagePlugin";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  pageData: PageData;
}

export default function DynamicPage({ pageData, preview }: DynamicPageProps) {
  return (
    <div>
      <DarkModeSwitch />
      <InlineForm form={}>
        <HeroBlock />
        {/* <CardBlock /> */}
      </InlineForm>

      <p>SLUG</p>
    </div>
  );
}

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
      page.blocks?.map<BlockData>((section) => {
        if (section == null) {
          return null;
        }
        switch (section.__typename) {
          case "ComponentBlocksHero": {
            return {
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
            };
          }
          case "ComponentBlocksCard": {
            return {
              id: section.id,
              title: section.title,
              description: section.description,
              imageUrl: section.image?.url,
              projectLink: section.projectLink?.path?.path,
            };
          }
          case "ComponentBlocksSingleFeature": {
            return {
              id: section.id,
              title: section.title,
              description: section.description,
              imageUrl: section.image?.url,
              serviceLink: section.serviceLink,
            };
          }
          default:
            return null;
        }
      }) || [];
    return {
      id: page.id,
      blocks : filterListNullableItems(blocks),
      path: page.path?
    };
  }
}
