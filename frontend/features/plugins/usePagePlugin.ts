import { BlockData } from "@features/pageBlocks";
import {
  CreatePage,
  CreatePageInput,
  UpdatePage,
  UpdatePageInput,
} from "@graphql/generated";
import { useRouter } from "next/dist/client/router";
import {
  ContentCreatorPlugin,
  Form,
  FormOptions,
  useCMS,
  useForm,
  usePlugin,
} from "tinacms";

export interface PageData {
  id: string;
  title?: string;
  path: string;
  blocks: BlockData[];
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
  /*
  const creatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });
  usePlugin(creatorPlugin);*/

  return [page, form];
}

function getPageInput(data: PageData): UpdatePageInput {
  return {
    where: { id: data.id },
    data: {
      pageName: data.title,
      path: data.path,
      blocks: data.blocks.map((block) => {
        console.log("Blocks", data.blocks);

        switch (block._template) {
          case "hero": {
            return {
              __typename: "ComponentBlocksHero",
              id: block.id,
              title: block.title,
            };
          }
          case "card": {
            return {
              __typename: "ComponentBlocksCard",
              id: block.id,
              title: block.title,
            };
          }
          default:
            throw new Error(`Unknown block type "${block._template}"`);
        }
      }),
    },
  };
}

function getPageCreatorPlugin(
  options: Plugin
): ContentCreatorPlugin<CreatePageInput> {
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
          window.location.href = `/${values.data?.locale}${values.data?.path}`;
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

function getPageCreateInput(input: CreatePageInput): CreatePageInput {
  return {
    data: {
      pageName: input.data?.pageName ? input.data?.pageName : "Default",
      path: input.data?.path,
      locale: input.data?.locale,
    },
  };
}
