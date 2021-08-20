import { Box, Flex, Img } from "@chakra-ui/react";
import Link from "next/link";
import { BlockTemplateData } from "@features/pageBlocks";

import { fetchGraphQL } from "@graphql/utils";
import { filterListNullableItems } from "@utils";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import {
  GetProjectsListQuery,
  GetProjectsListQueryVariables,
  GetProjectsList,
} from "@graphql/generated";

interface DynamicPageProps {
  path: string[];
  locale: string;
  preview: boolean;
  project: ProjectData;
}

export type ProjectData = BlockTemplateData<
  "project",
  {
    id: string;
    companyName: Nullable<string>;
    projectType: Nullable<string>;
    description: Nullable<string>;
    linkName: Nullable<string>;
    linkPath: Nullable<string>;
    image: Nullable<ProjectImage>;
    path: Nullable<string>;
  }
>;

interface ProjectImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

export default function DynamicPage({ project }: DynamicPageProps) {
  return (
    <Flex
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
          {project.companyName}
        </Box>
        <Box
          fontSize="xs"
          fontWeight="normal"
          textTransform="uppercase"
          letterSpacing="0.01em"
          pos="relative"
          w="full"
          pb="5"
          color="rgb(5,195,182)"
        >
          {project.projectType}
        </Box>
        <Box
          fontSize="sm"
          fontFamily="Roboto Mono"
          color="description"
          lineHeight="1.8em"
        >
          {project.description}
        </Box>
        <Box>
          <Link href={project.linkPath ? project.linkPath : "/"} passHref>
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
              {project.linkName}
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
        {project.image ? (
          <Img
            w={project.image ? "full" : "72"}
            h={project.image ? "full" : "72"}
            objectFit="cover"
            objectPosition="center"
            opacity="1"
            transition="0.5s"
            borderStyle="none"
            src={project.linkPath!}
            alt="Cover image"
          />
        ) : (
          <Img
            w={project.image ? "full" : "72"}
            h={project.image ? "full" : "72"}
            objectFit="cover"
            objectPosition="center"
            opacity="1"
            transition="0.5s"
            borderStyle="none"
            src="/images/default-image.png"
            alt="Cover image"
          />
        )}
      </Box>
    </Flex>
  );
}
export const getStaticPaths: GetStaticPaths = async (context) => {
  if (context.locales == null) {
    throw new Error("No locale has been defined!");
  }
  const allProjectsRequests = context.locales.map(async (locale) => {
    const localeProjects = await fetchGraphQL<
      GetProjectsListQuery,
      GetProjectsListQueryVariables
    >(GetProjectsList);

   
  });

  const allProjects = await Promise.all(allProjectsRequests);
  const projects = allProjects.flat();

  const paths = projects.map((project) => {
    const pagePath = project.path?.replace(/^\/+/, "") || "";

    return {
      params: { handle: pagePath },
      locale: project.locale!,
    };
  });
  console.log("paths", JSON.stringify(paths, null, " "));

  return { paths, fallback: false };
};

export function wrap<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
}

export const getStaticProps: GetStaticProps<
  DynamicPageProps | { notFound: boolean }
> = async (context) => {
  const pathParts = wrap(context.params?.handle || []);
  console.log("pathParts", pathParts);

  const path = `/${pathParts.join("/")}`;
  console.log("path", path);

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

  const projectData = getProjectData(availableProjects.projects, locale);

  if (projectData == null) {
    return {
      notFound: true,
    };
  }

  if (preview) {
    return {
      props: {
        project: projectData,
        path: pathParts,
        locale,
        preview,
        previewData: context.previewData,
      },
    };
  }

  return {
    props: {
      project: projectData,
      path: pathParts,
      locale,
      preview,
    },
  };
};
/*
function getProjectData(
  projects: GetProjectsQuery["projects"],
  locale: string
): ProjectData | undefined {
  const project = projects?.find((page) => page?.locale === locale);
  if (project != null) {
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
            alternativeText: project.image.alternativeText || null,
          }
        : null,
    };
  }
  return undefined;
}


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
