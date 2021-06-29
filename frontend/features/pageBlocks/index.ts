export * from "./types";

import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { heroBlock, HeroBlockData } from "./HeroBlock";
import { NavBlockData, navigationBlock } from "./NavigationBlock";

export const HERO_BLOCK = {
  ComponentBlocksHero: heroBlock,
};

export const FEAT_BLOCK = {
  ComponentBlocksSingleFeature: featureBlock,
};

export const CARD_BLOCK = {
  ComponentBlocksCard: cardBlock,
};

export const NAV_BLOCK = {
  ComponentBlocksNavigation: navigationBlock,
};

export type BlockData =
  | HeroBlockData
  | CardBlockData
  | FeatureBlockData
  | NavBlockData;
