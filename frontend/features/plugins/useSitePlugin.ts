import { PageSectionBlockData } from "@features/pageBlocks";
import {
  CreatePage,
  CreatePageInput,
  SaveChanges,
  UpdateFooterInput,
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
import { assertNever, filterListNullableItems } from "@utils";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import { FooterBlockData } from "@features/defaultBlocks/FooterBlock";
import { FooterSectionBlockData } from "@features/defaultBlocks/FooterSectionBlock";
export interface PageData {
  id: string;
  title?: string;
  path?: string;
  sections: PageSectionBlockData[];
}

export interface PageDataCreateInput {
  title: string;
  path: string;
  locale: string;
}

export interface GlobalData {
  id: string;
  bottomBar: {
    id: string;
    footer: FooterSectionBlockData;
  };
}

export interface AllData {
  global: {
    id: string;
    bottomBar: {
      id: string;
      footer: {
        id: string;
        description: Nullable<string>;
        email: Nullable<string>;
        sharedCapital: Nullable<number>;
        street: Nullable<string>;
        cap: Nullable<number>;
        city: Nullable<string>;
        vatNumber: Nullable<number>;
        copyright: Nullable<string>;
        blocks: FooterBlockData[];
      };
    };
  };
  page: {
    id: string;
    title?: string;
    path?: string;
    sections: PageSectionBlockData[];
  };
}

export function usePagePlugin(allData: AllData): [AllData, Form] {
  const cms = useCMS();
  const router = useRouter();

  const formConfig: FormOptions<AllData> = {
    id: 1,
    label: "All",
    initialValues: allData,
    onSubmit: async (allData) => {
      const pageInput = getPageInput(allData.page);
      const footerInput = getFooterInput(allData.global.bottomBar.footer);

      try {
        const response = await cms.api.strapi.fetchGraphql(SaveChanges, {
          pageInput,
          footerInput,
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
            };
          }
          case "cardSection": {
            return {
              __typename: "ComponentSectionCardSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle,
              sections: section.blocks
                ? filterListNullableItems(section.blocks).map<CardBlockData>(
                    (card) => {
                      return {
                        id: card.id,
                        title: card.title,
                        description: card.description,
                        image:
                          card.image == null
                            ? null
                            : {
                                id: card.image.id,
                                url: card.image.url,
                                altText: card.image.altText || null,
                              },
                        url: card.url || null,
                        _template: "ComponentBlocksCard",
                      };
                    }
                  )
                : [],
            };
          }
          case "featureSection": {
            return {
              __typename: "ComponentSectionSingleFeatureSection",
              id: section.id,
              title: section.title,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle,
              sections: section.blocks
                ? filterListNullableItems(section.blocks).map<FeatureBlockData>(
                    (feature) => {
                      return {
                        id: feature.id,
                        title: feature.title,
                        description: feature.description,
                        image:
                          feature.image == null
                            ? null
                            : {
                                id: feature.image.id,
                                url: feature.image.url,
                                altText: feature.image.altText || null,
                              },
                        url: feature.url || null,
                        _template: "ComponentBlocksSingleFeature",
                      };
                    }
                  )
                : [],
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
      pageName: input.title || "Default",
      path: input.path,
      locale: input.locale,
    },
  };
}

function getFooterInput(data: FooterSectionBlockData): UpdateFooterInput {
  return {
    where: { id: data.id },
    data: {
      cap: data.cap,
      city: data.city,
      email: data.email,
      description: data.description,
      sharedCapital: data.sharedCapital,
      copyright: data.copyright,
      street: data.street,
      vatNumber: data.vatNumber,
      blocks: data.blocks.map<FooterBlockData>((block) => {
        return {
          id: block.id,
          cap: block.cap,
          street: block.street,
          city: block.city,
          initials: block.initials,
          type: block.type,
          province: block.province,
        };
      }),
    },
  };
}
