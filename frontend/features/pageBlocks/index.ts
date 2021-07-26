import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardListSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData;
