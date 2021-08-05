import {
  GetProjects,
  GetProjectsQuery,
  GetProjectsQueryVariables,
} from "@graphql/generated";
import { fetchGraphQL } from "@graphql/utils";
import { GetStaticProps } from "next";
import React from "react";
import { ProjectData } from "./[handle]";

interface ProjectsListProps {
  locale: string;
  preview: boolean;
  projects: ProjectData[];
}

export default function Index() {
  return <div>aaa</div>;
}

export const getStaticProps: GetStaticProps<
  ProjectsListProps | { notFound: boolean }
> = async (context) => {
  const locale = context.locale;
  if (locale == null) {
    throw new Error(`This page has no locale!`);
  }
  const preview = context.preview === true;

  const allProjects = await fetchGraphQL<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >(GetProjects, { locale });

  if (allProjects.projects == null) {
    return {
      notFound: true,
    };
  }

  const projectsData = getProjectsData(allProjects.projects, locale);

  console.log("projectsData", JSON.stringify(projectsData, null, " "));

  if (projectsData == null) {
    throw new Error("ProjectData is null");
  }

  if (preview) {
    return {
      props: {
        projects: projectsData,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      projects: projectsData,
      locale,
      preview,
    },
  };
};

function getProjectsData(
  projects: GetProjectsQuery["projects"],
  locale: string
): ProjectData[] | undefined {
  console.log("projects", JSON.stringify(projects, null, " "));

  if (projects) {
    console.log("dentro");

    const progetti = projects.map((project) => {
      console.log("dentro 2");

      if (project) {
        return {
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
                alternativeText: project.image.alternativeText || null,
              }
            : null,
        };
      }

      return undefined;
    });

    console.log("Progetti", JSON.stringify(progetti, null, " "));

    return {
      progetti,
    };
  }
  return undefined;
}
