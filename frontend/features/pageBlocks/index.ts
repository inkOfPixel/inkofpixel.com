export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { heroBlock, HeroBlockData } from "./HeroBlock";

export const HERO_BLOCK = {
  /** We will define blocks here later */
  hero: heroBlock,
};

export const FEAT_BLOCK = {
  /** We will define blocks here later */
  feat: featureBlock,
};

export const CARD_BLOCK = {
  /** We will define blocks here later */
  card: cardBlock,
};

export type BlockData = HeroBlockData | CardBlockData | FeatureBlockData;
