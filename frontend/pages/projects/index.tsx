import { Box } from "@chakra-ui/react";
import { PROJECT_BLOCK } from "@features/sectionBlocks";
import {
  CreateProject,
  CreateProjectInput,
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
  UpdateProject,
  UpdateProjectInput,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { useRouter } from "next/router";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import { ContentCreatorPlugin, useForm, usePlugin } from "tinacms";
import { Form, FormOptions, useCMS } from "tinacms";
import { ProjectData } from "./[handle]";

export interface ProjectDataCreateInput {
  companyName: string;
  projectType: string;
  description: string;
  linkName: string;
  linkPath: string;
  path: string;
  locale: string;
}

export default async function Index() {
  const router = useRouter();
  const locale = router.locale;
  const path = router.asPath;

  const availableProjects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, {
    locale,
    where: {
      path,
    },
  });
  const projectData = getProjectData(availableProjects.projects, locale!);
  const [_, form] = useProjectPlugin(projectData);

  return (
    <Box color="black">
      <InlineForm form={form}>
        <InlineBlocks name="projects" blocks={PROJECT_BLOCK} />
      </InlineForm>
    </Box>
  );
}

function getProjectData(
  projects: GetProjectsQuery["projects"],
  locale: string
): ProjectData | undefined {
  const project = projects?.find((page) => page?.locale === locale);
  if (project != null) {
    return {
      _template: "project",
      id: project?.id,
      companyName: project?.companyName || null,
      projectType: project?.projectType || null,
      description: project?.description || null,
      linkName: project?.linkName || null,
      linkPath: project?.linkPath || null,
      image: project?.image
        ? {
            id: project.image.id,
            url: project.image.url,
            alternativeText: project.image.alternativeText || null,
          }
        : null,
    };
  }
  return undefined;
}

function useProjectPlugin(data: ProjectData): [ProjectData, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<ProjectData> = {
    id: data,
    label: "Page",
    initialValues: data,
    onSubmit: async (values) => {
      const input = getProjectInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateProject, {
          input,
        });
        if (response.data) {
          cms.alerts.success("Changes saved!");
        } else {
          cms.alerts.error("Error while saving changes");
        }
      } catch (error) {
        console.log(error);
        cms.alerts.error("Error while saving changes");
      }
    },
    fields: [],
  };
  const [projects, form] = useForm<ProjectData>(formConfig);
  usePlugin(form);

  return [projects, form];
}

function getProjectInput(data: ProjectData): UpdateProjectInput {
  return {
    where: { id: data.id },
    data: {
      companyName: data.companyName,
      description: data.description,
      linkName: data.linkName,
      linkPath: data.linkPath,
      projectType: data.projectType,
      image: data.image
        ? {
            id: data.image?.id,
            url: data.image.url,
            alternativeText: data.image.alternativeText,
          }
        : null,
    },
  };
}

interface ProjectCreatorPluginOptions {
  locales: string[];
}

function getProjectCreatorPlugin(
  options: ProjectCreatorPluginOptions
): ContentCreatorPlugin<ProjectDataCreateInput> {
  return {
    __type: "content-creator",
    name: "Add new project",
    fields: [
      {
        label: "Company name",
        name: "companyName",
        component: "text",
        validate(title: string) {
          if (!title) return "Required.";
        },
      },
      {
        label: "Path",
        name: "path",
        component: "text",
        description: "The path to the page ( e.g. /about )",
        validate(path: string) {
          if (!path) {
            return "Required.";
          }
          if (!path.startsWith("/")) {
            return "Path should start with /";
          }
        },
      },
      {
        label: "Locale",
        name: "locale",
        component: "select",
        description: "Select a locale for this page",
        defaultValue: "en",
        // @ts-ignore
        options: options.locales,
      },
    ],
    onSubmit: async (values, cms) => {
      const input = getPageCreateInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(CreateProject, {
          input,
        });
        if (response.data) {
          // @ts-ignore
          cms.alerts.success("Changes saved!");
          window.location.href = `/${values.locale}${values.path}`;
        } else {
          // @ts-ignore
          cms.alerts.error("Error while saving changes");
        }
      } catch (error) {
        console.log(error);
        // @ts-ignore
        cms.alerts.error("Error while saving changes");
      }
    },
  };
}

function getPageCreateInput(input: ProjectDataCreateInput): CreateProjectInput {
  return {
    data: {
      companyName: input.companyName,
      description: input.description,
      projectType: input.projectType,
      linkName: input.linkName,
      linkPath: input.linkPath,
      path: input.path,
      locale: input.locale,
    },
  };
}

/* import { Box } from "@chakra-ui/react";
import { BlockTemplateData } from "@features/pageBlocks";
import {
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { filterListNullableItems } from "@utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  Project: ProjectBlockData;
}

export type ProjectBlockData = BlockTemplateData<
  "project",
  {
    id: string;
    path: string;
    companyName: Nullable<string>;
    projectType: Nullable<string>;
    description: Nullable<string>;
    linkName: Nullable<string>;
    linkPath: Nullable<string>;
    image: Nullable<ProjectImage>;
  }
>;

interface ProjectImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

export default function DynamicPage({ Project }: DynamicPageProps) {
  return <Box color="black">{Project}</Box>;
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

  const paths = projects.map((project) => {
    const pagePath = project.path?.replace(/^\/+/, "") || "";
    const slugArray: any = pagePath.length > 0 ? pagePath.split("/") : false;
    return {
      params: { slug: slugArray },
      locale: project.locale!,
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

  const localeProjects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, {
    locale,
  });

  if (localeProjects.projects == null) {
    return {
      notFound: true,
    };
  }

  const ProjectsList = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, {
    locale,
    where: {
      path,
    },
  });

  if (ProjectsList.projects == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        ProjectsList,
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      ProjectsList,
      path: pathParts,
      locale,
      preview,
    },
  };
};

/*
case "ComponentSectionProjectsSection": {
            return {
              _template: "projectListSection",
              id: section.id,
              sectionTitle: section.sectionTitle || null,
              sectionTitleColor: section.sectionTitleColor || null,
              projects: section.projects
                ? filterListNullableItems(
                    section.projects
                  ).map<ProjectBlockData>((project) => {
                    return {
                      _template: "project",
                      id: project.id,
                      companyName: project.companyName || null,
                      projectType: project.projectType || null,
                      description: project.description || null,
                      linkName: project.linkName || null,
                      linkPath: project.linkPath || null,
                      image: project.image
                        ? {
                            id: project.image.id,
                            url: project.image.url,
                            alternativeText:
                              project.image.alternativeText || null,
                          }
                        : null,
                    };
                  })
                : [],
            };
          }



          case "projectListSection": {
            return {
              __typename: "ComponentSectionProjectsSection",
              id: section.id,
              sectionTitle: section.sectionTitle,
              sectionTitleColor: section.sectionTitleColor,
              projects: section.projects
                ? filterListNullableItems(
                    section.projects
                  ).map<ProjectBlockData>((project) => {
                    return {
                      _template: "project",
                      id: project.id,
                      companyName: project.companyName || null,
                      projectType: project.projectType || null,
                      description: project.description || null,
                      linkName: project.linkName || null,
                      linkPath: project.linkPath || null,
                      image: project.image
                        ? {
                            id: project.image.id,
                            url: project.image.url,
                            alternativeText:
                              project.image.alternativeText || null,
                          }
                        : null,
                    };
                  })
                : [],
            };
          }

*/
