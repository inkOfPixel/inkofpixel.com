import { NavBlockData } from "@features/mainNavigation/blocks/NavigationBlock";
import { SectionBlockData } from "@features/page";
import {
  CreatePage,
  CreatePageInput,
  CreateProject,
  CreateProjectInput,
  SaveChanges,
  UpdateMenuInput,
  UpdatePageInput,
} from "@graphql/generated";
import { useRouter } from "next/router";
import {
  ContentCreatorPlugin,
  Form,
  FormOptions,
  useCMS,
  useForm,
  usePlugin,
} from "tinacms";
import { assertNever } from "@utils";
import { PreviewImageProps } from "pages/projects";

export interface PageData {
  id: string;
  title?: string;
  path?: string;
  sections: SectionBlockData[];
  localizations?: LocalizationsData[];
}

export interface LocalizationsData {
  id?: Nullable<string>;
  path?: Nullable<string>;
  locale?: Nullable<string>;
}

export interface PageDataCreateInput {
  title: string;
  path: string;
  locale: string;
}

export interface ProjectDataCreateInput {
  companyName: string;
  projectType: string;
  description: string;
  linkPath: string;
  linkLabel: string;
  path: string;
  image: ImageProps;
  locale: string;
}

interface ImageProps {
  id: string;
  url: string;
  alternativeText: string;
}

export interface GlobalData {
  id: string;
  topbar: {
    id: string;
    menu: MenuData;
  };
}

export interface MenuData {
  id: string;
  title: string;
  links: NavBlockData[];
}

export interface Data {
  global: GlobalData;
  page: PageData;
}

export function usePagePlugin(data: Data): [Data, Form] {
  const cms = useCMS();
  const router = useRouter();

  const formConfig: FormOptions<Data> = {
    id: data.page.id,
    label: "Page settings",
    initialValues: data,
    onSubmit: async (allData) => {
      const pageInput = getPageInput(allData.page);
      const menuInput = getMenuInput(allData.global.topbar.menu);

      try {
        const response = await cms.api.strapi.fetchGraphql(SaveChanges, {
          pageInput,
          menuInput,
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

  const pageCreatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });

  const projectCreatorPlugin = getProjectCreatorPlugin({
    locales: router.locales || [],
  });

  usePlugin(pageCreatorPlugin);
  usePlugin(projectCreatorPlugin);

  return [formData, form];
}

function getPageInput(data: PageData): UpdatePageInput {
  return {
    where: { id: data.id },
    data: {
      title: data.title,
      path: data.path,
      sections: data.sections.map((section) => {
        switch (section._template) {
          case "heroSection": {
            return {
              __typename: "ComponentSectionHeroSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              areBubblesActive: section.areBubblesActive,
            };
          }

          case "cardListSection": {
            return {
              __typename: "ComponentSectionCardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle,
              sections: section.blocks?.map((card) => {
                return {
                  id: card.id,
                  title: card.title,
                  description: card.description,

                  image: card.image
                    ? {
                        id: card.image.id,
                        altText: card.image.altText || null,
                        url: card.image.url,
                      }
                    : null,

                  label: card.link.label,
                  url: card.link.url,
                };
              }),
            };
          }
          case "featureListSection": {
            return {
              __typename: "ComponentSectionSingleFeatureSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle || null,
              sections: section.blocks?.map((feature) => {
                return {
                  id: feature.id,
                  title: feature.title,
                  description: feature.description,
                  image: feature.image
                    ? {
                        id: feature.image.id,
                        altText: feature.image.altText || null,
                        url: feature.image.url,
                      }
                    : null,

                  label: feature.link.label,
                  url: feature.link.url,

                  bubbleColor: feature.bubbleColor,
                };
              }),
            };
          }
          case "simpleSection": {
            return {
              __typename: "ComponentSectionSimpleSection",
              id: section.id,
              sectionTitle: section.sectionTitle,
              sectionTitleColor: section.sectionTitleColor,
              title: section.title,
              subtitle: section.subtitle,
            };
          }

          default:
            return assertNever(section);
        }
      }),
    },
  };
}

interface PageCreatorPluginOptions {
  locales: string[];
}

export function getPageCreatorPlugin(
  options: PageCreatorPluginOptions
): ContentCreatorPlugin<PageDataCreateInput> {
  return {
    __type: "content-creator",
    name: "Add new page",
    fields: [
      {
        label: "Title",
        name: "title",
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
        defaultValue: "en",
        description: "Select a locale for this page",
        // @ts-ignore
        options: options.locales,
      },
    ],
    onSubmit: async (values, cms) => {
      const input = getPageCreateInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(CreatePage, {
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

interface ProjectCreatorPluginOptions {
  locales: string[];
}

export function getProjectCreatorPlugin(
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
        validate(name: string) {
          if (!name) return "Required.";
        },
      },
      {
        label: "Path",
        name: "path",
        component: "text",
        defaultValue: "/projects/",
        description: "The path to the page ( e.g. /projects/something )",
        validate(path: string) {
          if (!path) {
            return "Required.";
          }
          if (!path.startsWith("/projects")) {
            return "Path must start with /projects";
          }
        },
      },
      {
        label: "Project type",
        name: "projectType",
        component: "text",
        validate(type: string) {
          if (!type) return "Required.";
        },
      },
      {
        label: "Description",
        name: "description",
        component: "textarea",
        validate(description: string) {
          if (!description) return "Required.";
        },
      },
      {
        label: "Locale",
        name: "locale",
        component: "select",
        defaultValue: "en",
        description: "Select a locale for this page",
        // @ts-ignore
        options: options.locales,
      },
      {
        label: "Link path",
        name: "linkPath",
        component: "text",
        validate(linkPath: string) {
          if (!linkPath) return "Required.";
          if (!linkPath.startsWith("/")) {
            return "Path should start with /";
          }
        },
      },
      {
        label: "Link label",
        name: "linkLabel",
        component: "text",
      },
      {
        label: "Image",
        name: "image",
        component: "image",
        parse: (media) => media,
        // @ts-ignore
        uploadDir: () => "/",
        previewSrc: (imageSrc: PreviewImageProps) => {
          if (imageSrc.previewSrc === "") {
            return "/images/default-image.png";
          }
          return imageSrc.previewSrc;
        },
        /*uploadDir={() => "/"}
          previewSrc={(imageSrc) => {
            if (imageSrc === "") {
              return "/images/default-image.png";
            }

            return imageSrc;
          }}
          parse={(media) => {
            return media as any;
          }}*/
      },
    ],
    onSubmit: async (values, cms) => {
      const input = getProjectCreateInput(values);

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

export function getPageCreateInput(
  input: PageDataCreateInput
): CreatePageInput {
  return {
    data: {
      title: input.title || "Default",
      path: input.path,
      locale: input.locale,
    },
  };
}

export function getProjectCreateInput(
  input: ProjectDataCreateInput
): CreateProjectInput {
  return {
    data: {
      companyName: input.companyName,
      projectType: input.projectType,
      linkLabel: input.linkLabel || "Discover more",
      linkPath: input.linkPath,
      description: input.description,
      path: input.path,
    },
  };
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
