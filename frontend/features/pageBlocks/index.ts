export * from "./types";
import { heroSectionBlock, HeroSectionBlockData } from "./HeroSectionBlock";
import {
  featureSectionBlock,
  FeatureListSectionBlockData,
} from "./FeatureListSectionBlock";
import { cardSectionBlock, CardSectionBlockData } from "./CardListSectionBlock";
import {
  contactsSectionBlock,
  ContactsSectionBlockData,
} from "./ContactsSection";

export const PAGE_SECTION_BLOCKS = {
  heroSection: heroSectionBlock,
  featureSection: featureSectionBlock,
  cardSection: cardSectionBlock,
  contactsSection: contactsSectionBlock,
};

export type PageSectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | ContactsSectionBlockData;
