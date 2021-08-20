import { PROJECTS_LIST_BLOCK } from "@features/page";
import { ProjectBlockData } from "@features/page/sections/ProjectsListSection/block/ProjectBlock";
import { ProjectListSectionData } from "@features/page/sections/ProjectsListSection/ProjectsListSectionBlock";
import {
  GetProjectsCollection,
  GetProjectsCollectionQuery,
  GetProjectsCollectionQueryVariables,
  UpdateProjectsCollectionInput,
  UpdateProjectsList,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { DefaultLayout } from "@layouts/siteLayout";
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

type ProjectsListCollection = {
  id: string;
  locale?: Nullable<string>;
  projectsList: ProjectListSectionData[];
};

interface DynamicPageProps {
  locale: string;
  preview: boolean;
  projects: ProjectsListCollection;
}

export default function Index({ projects, preview }: DynamicPageProps) {
  const [_, form] = useProjectPlugin(projects);

  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <DefaultLayout title="InkOfPixel">
      <InlineForm form={form}>
        <InlineBlocks
          name="projectsList"
          blocks={PROJECTS_LIST_BLOCK}
          itemProps={itemProps}
        />
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
    GetProjectsCollectionQuery,
    GetProjectsCollectionQueryVariables
  >(GetProjectsCollection);

  if (localeProjectsList.projectsCollection == null) {
    return {
      notFound: true,
    };
  }

  const projectData = getProjectsListData(
    localeProjectsList.projectsCollection
  );

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
  projectsCollection: GetProjectsCollectionQuery["projectsCollection"]
): ProjectsListCollection | undefined {
  if (projectsCollection == null) {
    return undefined;
  }
  return {
    id: projectsCollection.id,
    locale: projectsCollection.locale,
    projectsList: projectsCollection.projectsList
      ? filterListNullableItems(
          projectsCollection.projectsList
        ).map<ProjectListSectionData>((project) => {
          return {
            _template: "projectsList",
            id: project.id,
            sectionTitle: project.sectionTitle || null,
            sectionTitleColor: project.sectionTitleColor || null,
            projects: project.projects
              ? filterListNullableItems(project.projects).map<ProjectBlockData>(
                  (project) => {
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
                            alternativeText:
                              project.image.alternativeText || null,
                          }
                        : null,
                      path: project.path || null,
                    };
                  }
                )
              : [],
          };
        })
      : [],
  };
}

function useProjectPlugin(
  data: ProjectsListCollection
): [ProjectsListCollection, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<ProjectsListCollection> = {
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

function getProjectInput(
  data: ProjectsListCollection
): UpdateProjectsCollectionInput {
  return {
    where: { id: data.id },
    data: {
      projectsList: data.projectsList.map((list) => {
        return {
          id: list.id,
          sectionTitle: list.sectionTitle,
          sectionTitleColor: list.sectionTitleColor,
          projects: list.projects.map((project) => {
            return {
              id: project.id,
              companyName: project.companyName,
              projectType: project.projectType,
              linkName: project.linkName,
              linkPath: project.linkPath,
              description: project.description,
              image: project.image?.id,
              path: project.path,
            };
          }),
        };
      }),
    },
  };
}
