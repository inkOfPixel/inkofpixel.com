import { BlockTemplateData, Nullable } from "@types";

export type MultiFeatureSectionBlockData = BlockTemplateData<
  "multifeaturesection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subTitle: Nullable<string>;
    areBubblesActive: Nullable<boolean>;
  }
>;
