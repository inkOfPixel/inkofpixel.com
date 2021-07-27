import { cardBlock, CardBlockData } from "./CardListSection/blocks/CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureListSection/blocks/FeatureBlock";

export const FEATURE_BLOCK = {
  ComponentBlocksSingleFeature: featureBlock,
};

export const CARD_BLOCK = {
  ComponentBlocksCard: cardBlock,
};

export type BlockData = CardBlockData | FeatureBlockData;
