export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureSectionBlockData,
} from "./FeatureSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardSectionBlock";
import {
  navigationSectionBlock,
  NavigationSectionBlockData,
} from "./NavigationSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
  navigationSection: navigationSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureSectionBlockData
  | CardSectionBlockData
  | NavigationSectionBlockData;
