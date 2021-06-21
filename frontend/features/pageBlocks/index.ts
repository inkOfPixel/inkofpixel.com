export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { heroBlock, HeroBlockData } from "./HeroBlock";

export const PAGE_BLOCKS = {
  /** We will define blocks here later */
  hero: heroBlock,
  card: cardBlock,
  feat: featureBlock,
};

export type BlockData = HeroBlockData | CardBlockData | FeatureBlockData;
