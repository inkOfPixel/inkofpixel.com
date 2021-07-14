export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardListSectionBlock";
import {
  footerSectionBlock,
  FooterSectionBlockData,
} from "./FooterSectionBlock";

export const PAGE_SECTION_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
  footerSection: footerSectionBlock,
};

export type PageSectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | FooterSectionBlockData;
