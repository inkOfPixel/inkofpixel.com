import { heroSectionBlock, HeroSectionBlockData } from "./sections/HeroSection/HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./sections/FeatureListSection/FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./sections/CardListSection/CardListSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData;
