export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardListSectionBlock";

export const PAGE_SECTION_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
};

export type PageSectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData;
