import { Box, Img, Text } from "@chakra-ui/react";
import {
  LocaleMenu,
  LocaleMenuButton,
  LocaleMenuList,
  LocaleMenuLink,
} from "@components/LocaleMenu";
import { MobileNavDrawer } from "@components/MobileNavDrawer";
import { WordmarkLogo } from "@components/WordmarkLogo";
import {
  NavBar,
  NavMenuMobile,
  NavMenuDesktop,
} from "@features/mainNavigation";
import {
  GetGlobal,
  GetGlobalQuery,
  GetGlobalQueryVariables,
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  UpdateMenuInput,
  UpdateProject,
  UpdateProjectInput,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { SiteLayout } from "@layouts/siteLayout";
import {
  GlobalData,
  LocalizationsData,
  MenuData,
} from "@plugins/usePagePlugin";
import { filterListNullableItems } from "@utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { wrap } from "pages/[[...slug]]";
import React from "react";
import { InlineForm, InlineText } from "react-tinacms-inline";
import { useCMS, useForm, usePlugin } from "tinacms";
import { FormOptions } from "tinacms";
import { Form } from "tinacms";
import { getGlobalData } from ".";
import NextLink from "next/link";
import { STRAPI_URL } from "@config/env";

interface ProjectData {
  id: string;
  path: string;
  linkPath: Nullable<string>;
  linkLabel: Nullable<string>;
  description: Nullable<string>;
  locale: Nullable<string>;
  companyName: Nullable<string>;
  projectType: Nullable<string>;
  image: Nullable<ProjectImage>;
  localizations?: LocalizationsData[];
  blocks: string;
}

interface ProjectImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

interface DynamicPageProps {
  locale: string;
  preview: boolean;
  data: {
    global: GlobalData;
    project: ProjectData;
  };
}

export default function DynamicPage({ data: data }: DynamicPageProps) {
  const [_, form] = useProjectPlugin(data);
  const router = useRouter();

  return (
    <SiteLayout title={`${data.project.companyName} | inkOfPixel`}>
      <Box color="white">
        <InlineForm form={form}>
          <NavBar>
            <MobileNavDrawer>
              <NavMenuMobile />
            </MobileNavDrawer>
            <NextLink href="/" passHref>
              <Box as="a">
                <WordmarkLogo color="white" width="52" height="36" />
              </Box>
            </NextLink>
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
                  data.project.localizations?.map((pageLocale) => {
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
          <Box
            h="480px"
            w="full"
            backgroundSize="cover"
            backgroundPosition="center center"
            pos="relative"
          >
            <Box pos="relative" overflow="hidden" h="full">
              <Img
                pos="absolute"
                top="0"
                left="0"
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="center center"
                src={`${STRAPI_URL}${data.project.image?.url}`}
                transition="opacity 0.5s ease 0.5s"
              />
            </Box>
            <Box pos="absolute" top="0" w="full" h="full">
              <Box
                w={{
                  base: "full",
                  xl: "1200px",
                }}
                py="0"
                px={{
                  base: "6",
                  sm: "10",
                  xl: "0",
                }}
                m="0 auto"
              >
                <Box pos="absolute" top="50%" transform="translateY(-50%)">
                  <Text
                    as="p"
                    letterSpacing="0.1em"
                    w="full"
                    pos="relative"
                    _before={{
                      content: `""`,
                      display: "block",
                      h: "2px",
                      w: "60px",
                      pos: "absolute",
                      top: "9px",
                      left: "-68px",
                      backgroundColor: "white",
                    }}
                  >
                    <InlineText name="project.projectType" />
                  </Text>
                  <Text
                    as="h1"
                    fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                    fontWeight="700"
                    fontFamily="Europa, sans-serif"
                  >
                    <InlineText name="project.companyName" />
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            w={{
              base: "full",
              xl: "1200px",
            }}
            py="0"
            px={{
              base: "6",
              sm: "10",
              xl: "0",
            }}
            m="0 auto"
            pos="relative"
          >
            <Box py="12" color="dark">
              Blocchi
            </Box>
          </Box>
        </InlineForm>
      </Box>
    </SiteLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (context.locales == null) {
    throw new Error("No locale has been defined!");
  }
  const allProjectsRequests = context.locales.map(async (locale) => {
    const localeProjects = await fetchGraphQL<
      GetProjectsQuery,
      GetProjectsQueryVariables
    >(GetProjects, {
      locale,
    });

    if (localeProjects.projects) {
      return filterListNullableItems(localeProjects.projects);
    }
    return [];
  });

  const allProjects = await Promise.all(allProjectsRequests);
  const projects = allProjects.flat();

  const paths = projects.map((page) => {
    const pagePath = page.path?.replace(/^\/+/, "") || "";

    const slugArray: any =
      pagePath.length > 0 ? pagePath.split("/") : undefined;

    return {
      params: { handle: slugArray },
      locale: page.locale!,
    };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  DynamicPageProps | { notFound: boolean }
> = async (context) => {
  const pathParts = wrap(context.params?.handle || []);
  const path = `/projects/${pathParts.join("/")}`;
  const locale = context.locale;
  if (locale == null) {
    throw new Error(`Path "${pathParts.join("/")}" has no locale!`);
  }
  const preview = context.preview === true;

  const availableProjects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, {
    locale,
    where: {
      path,
    },
  });

  if (availableProjects.projects == null) {
    return {
      notFound: true,
    };
  }

  const availableGlobal = await fetchGraphQL<
    GetGlobalQuery,
    GetGlobalQueryVariables
  >(GetGlobal);

  if (availableGlobal.global == null) {
    return {
      notFound: true,
    };
  }

  const projectData = getProjectData(availableProjects.projects, locale);

  const globalData = getGlobalData(availableGlobal.global);

  if (projectData == null) {
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
          project: projectData,
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
        project: projectData,
      },
    },
  };
};

function getProjectData(
  projects: GetProjectsQuery["projects"],
  locale: string
): ProjectData | undefined {
  const project = projects?.find((project) => project?.locale === locale);
  if (project == null) {
    return undefined;
  }
  return {
    id: project.id,
    companyName: project.companyName || null,
    description: project.description || null,
    projectType: project.projectType || null,
    linkLabel: project.linkLabel || null,
    linkPath: project.linkPath || null,
    path: project.path,
    locale: project.locale || null,
    blocks: "aa",
    image: project.image
      ? {
          id: project.image.id,
          url: project.image.url,
          alternativeText: project.image.alternativeText || null,
        }
      : null,
    localizations: project.localizations
      ? filterListNullableItems(project.localizations).map<LocalizationsData>(
          (localization) => {
            return {
              id: localization.id,
              locale: localization.locale || null,
              path: localization.path || null,
            };
          }
        )
      : [],
  };
}

function getProjectInput(data: ProjectData): UpdateProjectInput {
  return {
    where: { id: data.id },
    data: {
      companyName: data.companyName,
      description: data.description,
      projectType: data.projectType?.toUpperCase(),
      linkLabel: data.linkLabel,
      linkPath: data.linkPath,
      path: data.path,
      locale: data.locale,
      blocks: undefined,
      image: data.image ? data.image.id : null,
    },
  };
}

interface Data {
  project: ProjectData;
  global: GlobalData;
}

function useProjectPlugin(data: Data): [Data, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<Data> = {
    id: data.project.id,
    label: "Project settings",
    initialValues: data,
    onSubmit: async (data) => {
      const projectInput = getProjectInput(data.project);
      const menuInput = getMenuInput(data.global.topbar.menu);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateProject, {
          projectInput: projectInput,
          menuInput: menuInput,
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

  const [formData, form] = useForm<Data>(formConfig, { values: data });
  usePlugin(form);

  return [formData, form];
}

function getMenuInput(data: MenuData): UpdateMenuInput {
  return {
    where: { id: data.id },
    data: {
      title: data.title,
      links: data.links.map((link) => {
        return {
          id: link.id,
          label: link.label || null,
          url: link.url || null,
        };
      }),
    },
  };
}
