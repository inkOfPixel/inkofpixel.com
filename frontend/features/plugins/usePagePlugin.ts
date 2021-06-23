import { BlockData } from "@features/pageBlocks";
import { SectionBlockData } from "@features/sectionBlocks";
import {
  CreatePage,
  CreatePageInput,
  UpdatePage,
  UpdateSection,
  UpdateSectionInput,
} from "@graphql/generated";
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

export interface SectionData {
  id: string;
  title?: string;
  subtitle?: string;
  blocks?: BlockData[];
}

export interface PageDataCreateInput {
  title: string;
  path: string;
  locale: string;
}

export function useSectionPlugin(
  sectionData: SectionData
): [SectionData, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<SectionData> = {
    id: sectionData,
    label: "aa",
    initialValues: sectionData,
    onSubmit: async (values) => {
      const input = getSectionInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateSection, {
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
  const [section, form] = useForm<SectionData>(formConfig);
  usePlugin(form);

  return [section, form];
}

function getSectionInput(data: SectionData): UpdateSectionInput {
  return {
    where: { id: data.id },
    data: {
      title: data.title,
      subtitle: data.subtitle,
      blocks: data.blocks?.map((section) => {
        switch (section._template) {
          case "hero": {
            return {
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
            };
          }
          case "feat": {
            return {
              id: section.id,
              title: section.title,
              subtitle: section.description,
              serviceLink: section.serviceLink,
              imageUrl: section.imageUrl,
            };
          }
          case "card": {
            return {
              id: section.id,
              title: section.title,
              subtitle: section.description,
              projectLink: section.projectLink,
              imageUrl: section.imageUrl,
            };
          }

          default:
            return assertNever(section);
        }
      }),
    },
  };
}

/*
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
*/

/*
function getPageInput(data: PageData): UpdatePageInput {
  return {
    where: { id: data.id },
    data: {
      pageName: data.title,
      path: data.path,
      sections: data.sections.map((block) => {
        switch (block._template) {
          case "heroSection": {
            return {
              __typename: "",
              id: block.id,
              title: block.title,
              subtitle: block.subtitle,
              blocks: block.blocks,
            };
          }
          case "cardSection": {
            return {
              __typename: "ComponentBlocksCard",
              id: block.id,
              title: block.title,
              subtitle: block.subtitle,
              blocks: block.blocks,
            };
          }
          case "featureSection": {
            return {
              __typename: "ComponentBlocksSingleFeature",
              id: block.id,
              title: block.title,
              subtitle: block.subtitle,
              blocks: block.blocks,
            };
          }
          default:
            return assertNever(block);
        }
      }),
    },
  };
}
*/

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
        // @ts-ignore
        options: options.locales,
      },
    ],
    onSubmit: async (values, cms) => {
      console.log(values);
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
