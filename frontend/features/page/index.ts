import {
  heroSectionBlock,
  HeroSectionBlockData,
} from "./sections/HeroSection/HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./sections/FeatureListSection/FeatureListSectionBlock";
import {
  cardSectionBlock,
  CardSectionBlockData,
} from "./sections/CardListSection/CardListSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureListSection: featureSectionBlock,
  cardListSection: cardSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData;
