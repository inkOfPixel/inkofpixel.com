export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { heroBlock, HeroBlockData } from "./HeroBlock";

export const HERO_BLOCK = {
  hero: heroBlock,
};

export const FEAT_BLOCK = {
  feat: featureBlock,
};

export const CARD_BLOCK = {
  card: cardBlock,
};

export type BlockData = HeroBlockData | CardBlockData | FeatureBlockData;
