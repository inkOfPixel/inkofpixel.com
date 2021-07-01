import { SectionBlockData } from "@features/sectionBlocks";
import {
  CreatePage,
  CreatePageInput,
  UpdatePage,
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
import { assertNever } from "utils";

export interface PageData {
  id: string;
  title?: string;
  path?: string;
  sections: SectionBlockData[];
}

export interface PageDataCreateInput {
  title: string;
  path: string;
  locale: string;
}

export function usePagePlugin(pageData: PageData): [PageData, Form] {
  const cms = useCMS();
  const router = useRouter();
  const formConfig: FormOptions<PageData> = {
    id: pageData,
    label: "aa",
    initialValues: pageData,
    onSubmit: async (values) => {
      const input = getPageInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdatePage, {
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
  const [page, form] = useForm<PageData>(formConfig);
  usePlugin(form);

  const creatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });
  usePlugin(creatorPlugin);

  return [page, form];
}

function getPageInput(data: PageData): UpdatePageInput {
  return {
    where: { id: data.id },
    data: {
      pageName: data.title,
      path: data.path,
      sections: data.sections.map((section) => {
        switch (section._template) {
          case "heroSection": {
            return {
              __typename: "ComponentSectionHeroSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
            };
          }
          case "cardSection": {
            return {
              __typename: "ComponentSectionCardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sections: section.blocks?.map((card) => {
                if (card != null) {
                  return {
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    imageUrl: card.imageUrl,
                    projectLink: card.projectLink,
                  };
                }
              }),
            };
          }
          case "featureSection": {
            return {
              __typename: "ComponentSectionSingleFeatureSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sections: section.blocks?.map((feature) => {
                if (feature != null) {
                  return {
                    id: feature.id,
                    title: feature.title,
                    description: feature.description,
                    imageUrl: feature.imageUrl,
                    serviceLink: feature.serviceLink,
                  };
                }
              }),
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

function getPageCreatorPlugin(
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
        description: "Select a locale for this page",
        defaultValue: "en",
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

function getPageCreateInput(input: PageDataCreateInput): CreatePageInput {
  return {
    data: {
      pageName: input.title ? input.title : "Default",
      path: input.path,
      locale: input.locale,
    },
  };
}
