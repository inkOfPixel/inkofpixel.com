import { fetchGraphQL, filterListNullableItems } from "@graphql/utils";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import {
  GetPages,
  GetPagesQuery,
  GetPagesQueryVariables,
} from "@graphql/generated";
import {
  BlockData,
  BlockItemProps,
  CARD_BLOCK,
  FEAT_BLOCK,
  HERO_BLOCK,
} from "@features/pageBlocks";
import { PageData, usePagePlugin } from "@features/plugins/usePagePlugin";
import { DefaultLayout } from "@layouts/defaultLayout";
import {
  Box,
  chakra,
  Flex,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
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

  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isSmallerThan1260] = useMediaQuery("(max-width: 1260px)");
  const [isSmallerThan700] = useMediaQuery("(max-width: 700px)");
  const [isSmallerThan1020] = useMediaQuery("(max-width: 1020px)");
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  return (
    <div>
      <DefaultLayout title="InkOfPixel">
        <InlineForm form={form}>
          <StyledComponent
            color={colorMode == "light" ? "dark" : "white"}
            name="blocks"
            blocks={HERO_BLOCK}
            itemProps={itemProps}
          />

          <Box as="section" pb={"150px"}>
            SERVICES
            <Flex
              flexDirection={isSmallerThan750 ? "column" : "row"} //Doesn't work
              w={
                isSmallerThan1020
                  ? "100%"
                  : isSmallerThan1260
                  ? "100%"
                  : "1200px"
              }
              p={
                isSmallerThan700
                  ? "0px 26px"
                  : isSmallerThan1260
                  ? "0px 40px"
                  : "0px"
              }
              m={"0px auto"}
            >
              <Flex flexDirection={"column"}>
                <Flex
                  flexDirection={"column"}
                  w={
                    isSmallerThan700
                      ? "auto"
                      : isSmallerThan1020
                      ? "300px"
                      : "400px"
                  }
                  marginRight={
                    isSmallerThan700
                      ? "0px"
                      : isSmallerThan1020
                      ? "80px"
                      : "150px"
                  }
                >
                  <Box
                    fontSize={
                      isSmallerThan600
                        ? "3xl"
                        : isSmallerThan900
                        ? "4xl"
                        : "5xl"
                    }
                    p={0}
                    m={0}
                    fontWeight={"bold"}
                    lineHeight={"hero"}
                    fontFamily={"Monospace"}
                    letterSpacing={"0.02em"}
                  >
                    <p>New e-commerces, replatforming, consulting</p>
                  </Box>
                  <Box
                    fontSize={"sm"}
                    p={0}
                    m={0}
                    paddingTop={5}
                    fontWeight={"subtitle"}
                    lineHeight={"subtitle"}
                    fontFamily={"Monospace"}
                    letterSpacing={"0.02em"}
                  >
                    <p>
                      We are Shopify partners that help ambitious entrepreneurs
                      selling more using Shopify. We can help you create a brand
                      new site, boost your e-commerce performances and user
                      experience, develop custom integrations with your supply
                      chain and improve your workflow.
                    </p>
                  </Box>
                </Flex>
              </Flex>
              <Flex m={0} p={0} justifyContent={"center"}>
                <StyledComponent
                  color={colorMode == "light" ? "dark" : "white"}
                  name="blocks"
                  blocks={FEAT_BLOCK}
                  itemProps={itemProps}
                />
              </Flex>
            </Flex>
          </Box>

          <StyledComponent
            color={colorMode == "light" ? "dark" : "white"}
            name="blocks"
            blocks={CARD_BLOCK}
            itemProps={itemProps}
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
