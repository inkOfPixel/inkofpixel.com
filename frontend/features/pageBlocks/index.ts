import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardListSectionBlock";

export const PAGE_SECTION_BLOCKS = {
  /** We will define blocks here later */
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
};

export type PageSectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData;
