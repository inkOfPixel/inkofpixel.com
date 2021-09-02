import { NavBlockData } from "@features/mainNavigation/blocks/NavigationBlock";
import { SectionBlockData } from "@features/page";
import {
  CreatePage,
  CreatePageInput,
  SaveChanges,
  UpdateGlobalInput,
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

export interface GlobalData {
  id: string;
  topbar: {
    id: string;
    menu: MenuData;
  };
  companyData: CompanyData;
  footer: {
    id: string;
    description: Nullable<string>;
  };
}

export interface MenuData {
  id: string;
  title: string;
  links: NavBlockData[];
}

export interface CompanyData {
  id: string;
  primaryEmail: Nullable<string>;
  companyName: Nullable<string>;
  copyright: Nullable<string>;
  vatId: Nullable<string>;
  capital: Nullable<number>;
  additionalLegalInfo: Nullable<string>;
  locations: LocationsData[];
}

export interface LocationsData {
  id: string;
  province: Nullable<string>;
  provinceInitials: Nullable<string>;
  type: Nullable<string>;
  street: Nullable<string>;
  city: Nullable<string>;
  cap: Nullable<number>;
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
    onSubmit: async (data) => {
      const pageInput = getPageInput(data.page);
      const globalInput = getGlobalSettingsInput(data.global);
      const topbarInput = getTopbarInput(data.global.topbar);

      try {
        const response = await cms.api.strapi.fetchGraphql(SaveChanges, {
          pageInput,
          globalInput,
          topbarInput,
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
    fields: [
      {
        name: "global",
        component: "group",
        label: "Footer",
        fields: [
          {
            name: "companyData.primaryEmail",
            component: "text",
            label: "Email",
          },
          {
            name: "footer.description",
            component: "textarea",
            label: "Description",
          },
          {
            name: "companyData.copyright",
            component: "textarea",
            label: "Copyright",
          },
          {
            name: "companyData.capital",
            component: "number",
            label: "Capital",
          },

          {
            name: "companyData.vatId",
            component: "text",
            label: "VAT",
          },
        ],
      },
    ],
  };

  const [formData, form] = useForm<Data>(formConfig, { values: data });
  usePlugin(form);

  const creatorPlugin = getPageCreatorPlugin({
    locales: router.locales || [],
  });
  usePlugin(creatorPlugin);

  return [formData, form];
}

function getPageInput(data: PageData): UpdatePageInput {
  return {
    where: { id: data.id },
    data: {
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
              sectionTitle: section.sectionTitle?.toUpperCase(),
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
              sectionTitle: section.sectionTitle?.toUpperCase(),
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
              sectionTitle: section.sectionTitle?.toUpperCase(),
              sectionTitleColor: section.sectionTitleColor,
              title: section.title,
              subtitle: section.subtitle,
            };
          }
          case "contactsSection": {
            return {
              __typename: "ComponentSectionContactsSection",
              id: section.id,
              title: section.title,
              email: section.email,
              subtitle: section.subtitle,
              sectionTitle: section.sectionTitle?.toUpperCase(),
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
      title: input.title || "Default",
      path: input.path,
      locale: input.locale,
    },
  };
}

function getGlobalSettingsInput(data: GlobalData): UpdateGlobalInput {
  return {
    data: {
      companyData: {
        id: data.id,
        companyName: data.companyData.companyName,
        primaryEmail: data.companyData.primaryEmail,
        copyright: data.companyData.copyright,
        capital: data.companyData.capital,
        vatId: data.companyData.vatId,
        additionalLegalInfo: data.companyData.additionalLegalInfo,
        locations: data.companyData.locations.map((location) => {
          return {
            id: location.id,
            cap: location.cap,
            street: location.street,
            city: location.city,
            provinceInitials: location.provinceInitials,
            type: location.type,
            province: location.province,
          };
        }),
      },
      footer: {
        id: data.footer.id,
        description: data.footer.description,
      },
    },
  };
}

function getTopbarInput(data: GlobalData["topbar"]): UpdateMenuInput {
  return {
    where: {
      id: data.id,
    },
    data: {
      title: data.menu.title,
      links: data.menu.links.map((link) => {
        return {
          id: link.id,
          label: link.label,
          url: link.url,
        };
      }),
    },
  };
}
