import { NavBlockData } from "@features/defaultBlocks/NavigationBlock";
import { SectionBlockData } from "@features/pageBlocks";
import {
  CreatePage,
  CreatePageInput,
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

export interface GlobalData {
  id: string;
  topbar: {
    id: string;
    menu: MenuData;
  };
}

export interface MenuData {
  id: string;
  links: NavBlockData[];
}

export interface AllData {
  global: {
    id: string;
    topbar: {
      id: string;
      menu: {
        id: string;
        links: NavBlockData[];
      };
    };
  };
  page: {
    id: string;
    title?: string;
    path?: string;
    sections: SectionBlockData[];
  };
}

export function usePagePlugin(allData: AllData): [AllData, Form] {
  const cms = useCMS();
  const router = useRouter();
  console.log("Inizo funzione");

  const formConfig: FormOptions<AllData> = {
    id: allData.global.id,
    label: "All",
    initialValues: allData,
    onSubmit: async (allData) => {
      const pageInput = getPageInput(allData.page);
      const menuInput = getMenuInput(allData.global.topbar.menu);
      console.log("pageInput", JSON.stringify(pageInput, null, " "));
      console.log("menuInput", JSON.stringify(menuInput, null, " "));
      console.log("fuori dal try");

      try {
        console.log("dentro al try");

        const response = await cms.api.strapi.fetchGraphql(SaveChanges, {
          pageInput,
          menuInput,
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
  const [all, form] = useForm<AllData>(formConfig);
  usePlugin(form);

  const creatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });
  usePlugin(creatorPlugin);

  return [all, form];
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
              areBubblesActive: section.areBubblesActive,
            };
          }
          case "cardSection": {
            return {
              __typename: "ComponentSectionCardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle,
              sections: section.blocks?.map((card) => {
                if (card != null) {
                  return {
                    id: card.id,
                    title: card.title,
                    description: card.description,
                    urlName: card.urlName,
                    image: card.image
                      ? {
                          id: card.image.id,
                          altText: card.image.altText || null,
                          url: card.image.url,
                        }
                      : null,
                    url: card.url,
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
              sectionTitle: section.sectionTitle,
              paddingTop: section.paddingTop,
              sections: section.blocks?.map((feature) => {
                return {
                  id: feature.id,
                  title: feature.title,
                  description: feature.description,
                  urlName: feature.urlName,
                  image: feature.image
                    ? {
                        id: feature.image.id,
                        altText: feature.image.altText || null,
                        url: feature.image.url,
                      }
                    : null,
                  url: feature.url,
                  bubbleColor: feature.bubbleColor,
                };
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

function getPageCreateInput(input: PageDataCreateInput): CreatePageInput {
  return {
    data: {
      pageName: input.title ? input.title : "Default",
      path: input.path,
      locale: input.locale,
    },
  };
}

function getMenuInput(data: MenuData): UpdateMenuInput {
  return {
    where: { id: data.id },
    data: {
      links: data.links.map<NavBlockData>((link) => {
        return {
          id: link.id,
          pageName: link.pageName || null,
          path: link.path || null,
        };
      }),
    },
  };
}