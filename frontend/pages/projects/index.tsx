import { PROJECT_BLOCK } from "@features/sectionBlocks";
import {
  GetProjectsList,
  GetProjectsListQuery,
  GetProjectsListQueryVariables,
  UpdateProjectsList,
  UpdateProjectsListInput,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { DefaultLayout } from "@layouts/defaultLayout";
import { filterListNullableItems } from "@utils";
import { GetStaticProps } from "next";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
import { useForm, usePlugin } from "tinacms";
import { Form, FormOptions, useCMS } from "tinacms";
import { ProjectData, wrap } from "./[handle]";

export interface ProjectDataCreateInput {
  companyName: string;
  projectType: string;
  description: string;
  linkName: string;
  linkPath: string;
  path: string;
  locale: string;
}

type ProjectsListData = {
  id: string;
  projects?: ProjectData[];
};

interface DynamicPageProps {
  locale: string;
  preview: boolean;
  projects: ProjectsListData;
}

export default function Index({ projects }: DynamicPageProps) {
  const [_, form] = useProjectPlugin(projects);

  return (
    <DefaultLayout title="InkOfPixel">
      <InlineForm form={form}>
        <InlineBlocks name="projects" blocks={PROJECT_BLOCK} />
      </InlineForm>
    </DefaultLayout>
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

  const localeProjectsList = await fetchGraphQL<
    GetProjectsListQuery,
    GetProjectsListQueryVariables
  >(GetProjectsList);

  if (localeProjectsList.projectsList == null) {
    return {
      notFound: true,
    };
  }

  const projectData = getProjectsListData(localeProjectsList.projectsList);

  if (projectData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        projects: projectData,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      projects: projectData,
      locale,
      preview,
    },
  };
};

function getProjectsListData(
  projectsList: GetProjectsListQuery["projectsList"]
): ProjectsListData | undefined {
  if (projectsList == null) {
    return undefined;
  }
  return {
    id: projectsList.id,
    projects: projectsList.projects
      ? filterListNullableItems(projectsList.projects).map((project) => {
          return {
            _template: "project",
            id: project.id,
            companyName: project.companyName || null,
            projectType: project.projectType || null,
            linkName: project.linkName || null,
            linkPath: project.linkPath || null,
            description: project.description || null,
            image: project.image
              ? {
                  id: project.image.id,
                  url: project.image.url,
                  alternativeText: project.image.alternativeText || null,
                }
              : null,
            path: project.path || null,
          };
        })
      : [],
  };
}

function useProjectPlugin(data: ProjectsListData): [ProjectsListData, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<ProjectsListData> = {
    id: data,
    label: "Page",
    initialValues: data,
    onSubmit: async (values) => {
      const input = getProjectInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateProjectsList, {
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

function getProjectInput(data: ProjectsListData): UpdateProjectsListInput {
  return {
    where: { id: data.id },
    data: {
      projects: data.projects?.map((project) => {
        return {
          id: project.id,
          companyName: project.companyName,
          description: project.description,
          linkName: project.linkName,
          linkPath: project.linkPath,
          path: project.path,
          projectType: project.projectType,
          image: project.image ? project.image.id : null,
        };
      }),
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
