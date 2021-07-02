export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./heroSectionBlock";
import {
  featureSectionBlock,
  FeatureSectionBlockData,
} from "./featureSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./cardSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  /** We will define blocks here later */
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureSectionBlockData
  | CardSectionBlockData;
