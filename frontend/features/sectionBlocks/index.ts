export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureSectionBlockData,
} from "./FeatureSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardSectionBlock";

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
