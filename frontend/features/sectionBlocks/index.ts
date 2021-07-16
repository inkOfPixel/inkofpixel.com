export * from "./types";

import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";

export const FEATURE_BLOCK = {
  ComponentBlocksSingleFeature: featureBlock,
};

export const CARD_BLOCK = {
  ComponentBlocksCard: cardBlock,
};



export type BlockData = CardBlockData | FeatureBlockData;
