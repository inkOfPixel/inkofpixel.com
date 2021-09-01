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
  PageData,
  usePagePlugin,
  GlobalData,
} from "@plugins/usePagePlugin";
import { DefaultLayout as SiteLayout } from "@layouts/siteLayout";
import {
  Box,
  chakra,
  Flex,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { SectionBlockData, SECTION_PAGE_BLOCKS } from "@features/page";
import { assertNever, filterListNullableItems } from "@utils";
import { FeatureBlockData } from "@features/page/sections/FeatureListSection/blocks/FeatureBlock";
import { CardBlockData } from "@features/page/sections/CardListSection/blocks/CardBlock";
import { NavBlockData } from "@features/mainNavigation/blocks/NavigationBlock";

import Link from "next/link";

import { MobileNavDrawer } from "@components/MobileNavDrawer";
import {
  NavBar,
  NavMenuDesktop,
  NavMenuMobile,
} from "@features/mainNavigation";
import { Main } from "@components/Main";
import { WordmarkLogo } from "@components/WordmarkLogo";
import { useRouter } from "next/router";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuList,
  LocaleMenuLink,
} from "@components/LocaleMenu";
import {
  Copyright,
  Footer,
  LocationsBlocks,
  FooterDescription,
  FooterEmail,
  FooterHomeLink,
} from "@features/footer";
import { LocationBlockData } from "@features/footer/blocks/LocationBlock";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  previewData?: PreviewData;
  data: {
    global: GlobalData;
    page: PageData;
  };
}

const StyledInlineBlocks = chakra(InlineBlocks);

export default function DynamicPage({ data, preview }: DynamicPageProps) {
  const { colorMode } = useColorMode();

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  const [values, form] = usePagePlugin(data);
  const router = useRouter();

  return (
    <SiteLayout title="inkOfPixel">
      <Box color="primaryText">
        <InlineForm form={form}>
          <NavBar>
            <MobileNavDrawer>
              <NavMenuMobile />
            </MobileNavDrawer>
            <Link href="/" passHref>
              <Box as="a">
                <WordmarkLogo fill="primaryText" width="52" height="36" />
              </Box>
            </Link>
            <NavMenuDesktop />
            <LocaleMenu>
              <LocaleMenuButton>
                {router.locale!.toUpperCase()}
              </LocaleMenuButton>
              <LocaleMenuList>
                <LocaleMenuLink href={router.asPath} locale={router.locale!}>
                  {router.locale?.toUpperCase()}
                </LocaleMenuLink>
                {data ? (
                  data.page.localizations?.map((pageLocale) => {
                    return (
                      <LocaleMenuLink
                        key={pageLocale.locale}
                        href={pageLocale.path!}
                        locale={pageLocale.locale!}
                      >
                        {pageLocale.locale?.toUpperCase()}
                      </LocaleMenuLink>
                    );
                  })
                ) : (
                  <LocaleMenuLink
                    key="1"
                    href={router.pathname}
                    locale={router.locale!}
                  ></LocaleMenuLink>
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
          <Footer>
            <Flex
              flexDirection={{
                base: "column",
                md: "row",
              }}
              alignItems="start"
            >
              <FooterHomeLink>
                <WordmarkLogo width="200px" height="100%" color="white" />
              </FooterHomeLink>
              <VStack align="flex-start" w="full" pl="24">
                <FooterDescription>
                  {values.global.footer.description}
                </FooterDescription>
                <FooterEmail>
                  {values.global.companyData.primaryEmail}
                </FooterEmail>
                <LocationsBlocks />
              </VStack>
            </Flex>
            <VStack
              align="flex-start"
              pt="12"
              fontSize="13px"
              lineHeight="1.4em"
            >
              <Copyright>{values.global.companyData.copyright}</Copyright>
              <Text>
                Capital € {data.global.companyData.capital} i.v •{" "}
                {data.global.companyData.locations[0].street} -{" "}
                {data.global.companyData.locations[0].cap}{" "}
                {data.global.companyData.locations[0].city} • VAT Number{" "}
                {data.global.companyData.vatId} •{" "}
                {data.global.companyData.additionalLegalInfo}
              </Text>
            </VStack>
          </Footer>
        </InlineForm>
      </Box>
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

  return { paths, fallback: false };
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
        data: {
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
      data: {
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

  if (global.topbar == null) {
    return undefined;
  }

  if (global.companyData == null) {
    return undefined;
  }

  if (global.footer == null) {
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
          title: global.topbar.menu.title,
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

      companyData: {
        id: global.companyData.id,
        companyName: global.companyData.companyName || null,
        primaryEmail: global.companyData.primaryEmail || null,
        copyright: global.companyData.copyright || null,
        capital: global.companyData.capital || null,
        vatId: global.companyData.vatId || null,
        additionalLegalInfo: global.companyData.additionalLegalInfo || null,
        locations: global.companyData.locations
          ? filterListNullableItems(
              global.companyData.locations
            ).map<LocationBlockData>((location) => {
              return {
                _template: "location",
                id: location.id,
                cap: location.cap || null,
                street: location.street || null,
                city: location.city || null,
                provinceInitials: location.provinceInitials || null,
                type: location.type || null,
                province: location.province || null,
              };
            })
          : [],
      },
      footer: {
        id: global.footer.id,
        description: global.footer.description || null,
      },
    };
  }
}

function getPageData(
  pages: GetPagesQuery["pages"],
  locale: string
): PageData | undefined {
  const page = pages?.find((page) => page?.locale === locale);

  if (page == null) {
    return undefined;
  }

  if (page.sections) {
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
              _template: "featureListSection",
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
                      link: {
                        url: feature.url,
                        label: feature.label,
                      },

                      bubbleColor: feature.bubbleColor || null,
                      _template: "feature",
                    };
                  })
                : [],
            };
          }
          case "ComponentSectionCardSection": {
            return {
              _template: "cardListSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              sectionTitle: section.sectionTitle || null,
              blocks: section.sections
                ? filterListNullableItems(section.sections).map<CardBlockData>(
                    (card) => {
                      return {
                        _template: "card",
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
                        link: {
                          url: card.url,
                          label: card.label,
                        },
                      };
                    }
                  )
                : [],
            };
          }
          case "ComponentSectionContactsSection": {
            return {
              _template: "contactsSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              email: section.email || null,
              sectionTitle: section.sectionTitle || null,
            };
          }

          case "ComponentSectionSimpleSection": {
            return {
              _template: "simpleSection",
              id: section.id,
              title: section.title || null,
              subtitle: section.subtitle || null,
              sectionTitle: section.sectionTitle || null,
              sectionTitleColor: section.sectionTitleColor || null,
            };
          }
          default:
            return assertNever(section);
        }
      }) || [];

    return {
      id: page.id,
      title: page.title == "" ? page.title : "Default title",
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
