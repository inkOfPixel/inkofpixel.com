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
import {
  AboutUsSectionBlockData,
  aboutUsSectionBlock,
} from "./sections/AboutUsSection/blocks/AboutUsSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureListSection: featureSectionBlock,
  cardListSection: cardSectionBlock,
  aboutUsSection: aboutUsSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | AboutUsSectionBlockData;
