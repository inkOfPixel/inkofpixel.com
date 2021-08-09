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
  SimpleSectionBlockData,
  simpleSectionBlock,
} from "./sections/SimpleSection/blocks/SimpleSectionBlock";
import {
  multiFeatureBlock,
  MultiFeatureBlockData,
} from "./sections/CardListSection/blocks/MultiFeatureBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureListSection: featureSectionBlock,
  cardListSection: cardSectionBlock,
  simpleSection: simpleSectionBlock,
  multiFeatureBlock: multiFeatureBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | SimpleSectionBlockData
  | MultiFeatureBlockData;
