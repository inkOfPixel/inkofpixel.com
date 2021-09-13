import { Box, chakra, Flex, Img, Text } from "@chakra-ui/react";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuLink,
  LocaleMenuList,
} from "@components/LocaleMenu";
import { MobileNavDrawer } from "@components/MobileNavDrawer";
import { WordmarkLogo } from "@components/WordmarkLogo";
import { STRAPI_URL } from "@config/env";
import { NavBar, NavMenuMobile } from "@features/mainNavigation";
import { NAV_BLOCK } from "@features/mainNavigation/blocks";
import { NavBlockData } from "@features/mainNavigation/blocks/NavigationBlock";
import {
  GetGlobal,
  GetGlobalQuery,
  GetGlobalQueryVariables,
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  UpdateMenu,
  UpdateMenuInput,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { SiteLayout } from "@layouts/siteLayout";
import {
  getPageCreatorPlugin,
  GlobalData,
  LocalizationsData,
} from "@plugins/usePagePlugin";
import { filterListNullableItems } from "@utils";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import { Form, FormOptions, useCMS, useForm, usePlugin } from "tinacms";

interface Project {
  id: string;
  path: string;
  linkPath: Nullable<string>;
  linkLabel: Nullable<string>;
  description: Nullable<string>;
  locale: Nullable<string>;
  companyName: Nullable<string>;
  projectType: Nullable<string>;
  image: Nullable<ProjectImage>;
  localizations: Nullable<LocalizationsData>;
}

interface ProjectImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

export interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

interface DynamicPageProps {
  locale: string;
  preview: boolean;
  data: {
    global: GlobalData;
    projects: Project[];
    allProjects: Project[];
  };
}

function wrap<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

const NavigationInlineBlocks = chakra(InlineBlocks);

export default function Index({ data }: DynamicPageProps) {
  const router = useRouter();
  const [_, form] = useProjectPlugin(data.global);
  const cms = useCMS();

  const availableLocales: string[] = [];

  data.allProjects.forEach((project) => {
    if (project.locale != null) {
      if (!availableLocales.includes(project.locale)) {
        availableLocales.push(project.locale);
      }
    }
  });

  const index = availableLocales.indexOf(router.locale!);
  availableLocales.splice(index, 1);

  return (
    <SiteLayout
      title={
        router.locale === "it"
          ? "Progetti | inkOfPixel"
          : "Projects | inkOfPixel"
      }
    >
      <InlineForm form={form}>
        <NavBar>
          <MobileNavDrawer>
            <NavMenuMobile />
          </MobileNavDrawer>
          <Link href="/" passHref>
            <Box as="a">
              <WordmarkLogo color="rgb(19,22,57)" width="52" height="36" />
            </Box>
          </Link>
          <Flex
            alignItems="baseline"
            flex={{
              lg: "1 1 0%",
            }}
            mr="8"
            mb="1"
            display={{
              base: "none",
              lg: "block",
            }}
            textAlign={cms.enabled ? "right" : "left"}
          >
            <NavigationInlineBlocks
              sx={{
                "& > div": {
                  w: `${cms.enabled ? "36" : "auto"}`,
                },
              }}
              zIndex="1"
              display={{
                base: "none",
                lg: "flex",
              }}
              flex="1 1 0%"
              w="full"
              mr="8"
              justifyContent="flex-end"
              flexDir="row"
              name="topbar.menu.links"
              blocks={NAV_BLOCK}
              direction="horizontal"
              max={6}
            />
          </Flex>
          <LocaleMenu>
            <LocaleMenuButton>{router.locale!.toUpperCase()}</LocaleMenuButton>
            <LocaleMenuList>
              <LocaleMenuLink href={router.asPath} locale={router.locale!}>
                {router.locale?.toUpperCase()}
              </LocaleMenuLink>
              {data ? (
                availableLocales.map((locale) => {
                  if (locale != router.locale) {
                    return (
                      <LocaleMenuLink
                        key={locale}
                        href={`/${locale}/projects`}
                        locale={locale!}
                      >
                        {locale?.toUpperCase()}
                      </LocaleMenuLink>
                    );
                  }
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
      </InlineForm>
      <Box as="section" pt="44">
        <Box
          m={{
            base: "0px",
            xl: "0px auto",
          }}
          p={{
            base: "0px 26px",
            md: "0px 40px",
            xl: "0px",
          }}
          w={{
            base: "full",
            xl: "1200px",
          }}
        >
          <Box mt="5">
            <Box
              color="rgb(129, 82, 188)"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.1em"
              pos="relative"
              w="full"
              as="h2"
              fontFamily="Roboto Mono"
              lineHeight="1.15em"
              _before={{
                content: `""`,
                display: "block",
                h: "2px",
                w: "60px",
                pos: "absolute",
                top: "7px",
                left: "-68px",
                backgroundColor: "rgb(129, 82, 188)",
              }}
            >
              PROJECTS
            </Box>
          </Box>

          {data.projects.map((project) => {
            if (project.locale === router.locale) {
              return (
                <Flex
                  key={project.id}
                  pt="14"
                  flexDir={{
                    base: "column-reverse",
                    lg: "row",
                  }}
                >
                  <Box
                    w={{
                      base: "full",
                      lg: "40%",
                    }}
                    p={{
                      base: "5",
                    }}
                    mx="0"
                    pr={{
                      lg: "16",
                    }}
                    boxSizing="border-box"
                  >
                    <Box
                      fontWeight="bold"
                      fontFamily="Europa"
                      fontSize="xl"
                      pb="2.5"
                      letterSpacing="0.04em"
                      color="dark"
                      as="h3"
                    >
                      <Text>{project.companyName}</Text>
                    </Box>
                    <Box
                      fontSize="xs"
                      fontWeight="normal"
                      textTransform="uppercase"
                      letterSpacing="0.1em"
                      pos="relative"
                      w="full"
                      pb="5"
                      color="rgb(5,195,182)"
                    >
                      <Text>{project.projectType}</Text>
                    </Box>
                    <Box
                      fontSize="sm"
                      fontFamily="Roboto Mono"
                      color="description"
                      lineHeight="1.8em"
                    >
                      <Text>{project.description}</Text>
                    </Box>
                    <Box>
                      <Link
                        href={project.linkPath ? project.linkPath : "/"}
                        passHref
                      >
                        <Box
                          as="a"
                          color="dark"
                          display="inline-block"
                          textDecoration="none"
                          mt="5"
                          fontSize="sm"
                          transition="all 0.4s ease 0s"
                          _after={{
                            content: "'→'",
                            display: "inline-block",
                            fontSize: "md",
                            paddingLeft: "10px",
                            transition: "0.4s",
                            color: "dark",
                            fontWeight: "thin",
                          }}
                          _hover={{
                            color: " rgb(5, 195, 182)",
                            _after: {
                              paddingLeft: "20px",
                            },
                          }}
                        >
                          {project.linkLabel}
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                  <Box
                    w={{
                      base: "full",
                      lg: "60%",
                    }}
                    h="350px"
                  >
                    <Link
                      href={project.linkPath ? project.linkPath : "/"}
                      passHref
                    >
                      <Box as="a" pos="relative" overflow="hidden" height="90">
                        <Img
                          w={project.image ? "full" : "72"}
                          h={project.image ? "full" : "72"}
                          objectFit="cover"
                          objectPosition="center"
                          opacity="1"
                          transition="0.5s"
                          borderStyle="none"
                          src={
                            project.image
                              ? `${STRAPI_URL}${project.image.url}`
                              : "/images/default-image.png"
                          }
                        ></Img>
                      </Box>
                    </Link>
                  </Box>
                </Flex>
              );
            }
          })}
        </Box>
      </Box>
    </SiteLayout>
  );
}

export const getStaticProps: GetStaticProps<
  DynamicPageProps | { notFound: boolean }
> = async (context) => {
  const pathParts = wrap(context.params?.handle || []);

  const locale = context.locale;
  if (locale == null) {
    throw new Error(`Path "${pathParts.join("/")}" has no locale!`);
  }
  const preview = context.preview === true;

  const projects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, { locale });

  const allProjects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, { locale: "all" });

  if (projects == null) {
    return {
      notFound: true,
    };
  }

  const availableGlobal = await fetchGraphQL<
    GetGlobalQuery,
    GetGlobalQueryVariables
  >(GetGlobal);

  const globalData = getGlobalData(availableGlobal.global);

  const projectData = getProjectsData(projects.projects);

  const allProjectData = getProjectsData(allProjects.projects);

  if (globalData == null) {
    return {
      notFound: true,
    };
  }

  if (projectData == null) {
    return {
      notFound: true,
    };
  }

  if (allProjectData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        data: {
          projects: projectData,
          global: globalData,
          allProjects: allProjectData,
        },
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      data: {
        projects: projectData,
        global: globalData,
        allProjects: allProjectData,
      },
      locale,
      preview,
    },
  };
};

function useProjectPlugin(data: GlobalData): [GlobalData, Form] {
  const cms = useCMS();
  const router = useRouter();

  const formConfig: FormOptions<GlobalData> = {
    id: data.id,
    label: "Projects settings",
    initialValues: data,
    onSubmit: async (data) => {
      const input = getMenuInput(data);

      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateMenu, {
          input,
        });

        if (response.errors != null) {
          cms.alerts.error("Error while saving data", 10000);
        } else {
          if (response.data) {
            cms.alerts.success("Changes saved!");
          } else {
            cms.alerts.error("Error while saving changes");
          }
        }
      } catch (error) {
        console.log(error);
        cms.alerts.error("Error while saving changes");
      }
    },
    fields: [],
  };

  const [formData, form] = useForm<GlobalData>(formConfig, { values: data });
  usePlugin(form);

  const creatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });
  usePlugin(creatorPlugin);

  return [formData, form];
}

function getMenuInput(data: GlobalData): UpdateMenuInput {
  return {
    where: { id: data.id },
    data: {
      title: data.topbar.menu.title,
      links: data.topbar.menu.links.map((link) => {
        return {
          id: link.id,
          label: link.label || null,
          url: link.url || null,
        };
      }),
    },
  };
}

function getGlobalData(
  global: GetGlobalQuery["global"]
): GlobalData | undefined {
  if (global == null) {
    return undefined;
  }

  if (global.topbar == null) {
    return undefined;
  }

  if (global.footer == null) {
    return undefined;
  }

  if (global.companyData == null) {
    return undefined;
  }

  if (global.topbar.menu?.links == null) {
    return undefined;
  }

  let filteredLinks = filterListNullableItems(global.topbar.menu.links);
  return {
    id: global.id,
    topbar: {
      id: global.topbar.id,
      menu: {
        id: global.topbar.menu?.id,
        title: global.topbar.menu?.title,
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
    footer: {
      id: global.footer?.id,
      description: global.footer?.description || null,
    },
    companyData: {
      id: global.companyData.id,
      companyName: global.companyData.companyName || null,
      additionalLegalInfo: global.companyData.additionalLegalInfo || null,
      vatId: global.companyData.vatId || null,
      capital: global.companyData.capital || null,
      copyright: global.companyData.copyright || null,
      primaryEmail: global.companyData.primaryEmail || null,
      locations: global.companyData.locations
        ? filterListNullableItems(global.companyData.locations).map(
            (location) => {
              return {
                id: location.id,
                province: location.province || null,
                provinceInitials: location.provinceInitials || null,
                type: location.type || null,
                street: location.street || null,
                city: location.city || null,
                cap: location.cap || null,
              };
            }
          )
        : [],
    },
  };
}

function getProjectsData(
  projects: GetProjectsQuery["projects"]
): Project[] | undefined {
  return projects as Project[];
}
