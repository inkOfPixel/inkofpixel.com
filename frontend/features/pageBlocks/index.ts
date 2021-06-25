export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { heroBlock, HeroBlockData } from "./HeroBlock";

export const HERO_BLOCK = {
  ComponentBlocksHero: heroBlock,
};

export const FEAT_BLOCK = {
  ComponentBlocksSingleFeature: featureBlock,
};

export const CARD_BLOCK = {
  ComponentBlocksCard: cardBlock,
};

export type BlockData = HeroBlockData | CardBlockData | FeatureBlockData;
