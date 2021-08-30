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
import { projectListSectionBlock } from "./sections/ProjectsListSection/ProjectsListSectionBlock";

export const SECTION_PAGE_BLOCKS = {
  heroSection: heroSectionBlock,
  featureListSection: featureSectionBlock,
  cardListSection: cardSectionBlock,
  simpleSection: simpleSectionBlock,
};

export const PROJECTS_LIST_BLOCK = {
  projectsSection: projectListSectionBlock,
};

export type SectionBlockData =
  | HeroSectionBlockData
  | FeatureListSectionBlockData
  | CardSectionBlockData
  | SimpleSectionBlockData;
