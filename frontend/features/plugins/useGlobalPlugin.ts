import { NavBlockData } from "@features/sectionBlocks/NavigationBlock";
import { UpdateGlobal, UpdateGlobalInput } from "@graphql/generated";
import { Form, FormOptions, useCMS, useForm, usePlugin } from "tinacms";

export interface GlobalData {
  id: string;
  links?: NavBlockData[];
}

export function useGlobalPlugin(globalData: GlobalData): [GlobalData, Form] {
  const cms = useCMS();
  const formConfig: FormOptions<GlobalData> = {
    id: globalData,
    label: "aa",
    initialValues: globalData,
    onSubmit: async (values) => {
      const input = getGlobalInput(values);
      try {
        const response = await cms.api.strapi.fetchGraphql(UpdateGlobal, {
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
  const [page, form] = useForm<GlobalData>(formConfig);
  usePlugin(form);

  return [page, form];
}

function getGlobalInput(data: GlobalData): UpdateGlobalInput {
  console.log("GLOBAL", data);

  return {
    data: {
      topbar: {
        id: data.id,
        menu: data.links?.map((link) => {
          return {
            id: link.id,
            pageName: link.pageName || null,
            path: link.path || null,
          };
        }),
      },
    },
  };
}
