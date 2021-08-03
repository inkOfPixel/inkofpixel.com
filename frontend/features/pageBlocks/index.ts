import {
  cardSectionBlock,
  CardSectionBlockData,
} from "@features/page/sections/CardListSection/CardListSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "@features/page/sections/FeatureListSection/FeatureListSectionBlock";
import {
  heroSectionBlock,
  HeroSectionBlockData,
} from "@features/page/sections/HeroSection/HeroSectionBlock";
import {
  aboutUsSectionBlock,
  AboutUsSectionBlockData,
} from "../page/sections/AboutUsSection/blocks/AboutUsSectionBlock";

export const PAGE_SECTION_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
  aboutUsSection: aboutUsSectionBlock,
};

export type PageSectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | AboutUsSectionBlockData;
