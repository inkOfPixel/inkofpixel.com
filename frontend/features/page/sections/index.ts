import { cardBlock, CardBlockData } from "./CardListSection/blocks/CardBlock";

import {
  featureBlock,
  FeatureBlockData,
} from "./FeatureListSection/blocks/FeatureBlock";

export const FEATURE_BLOCK = {
  feature: featureBlock,
};

export const CARD_BLOCK = {
  card: cardBlock,
};

export type BlockData = CardBlockData | FeatureBlockData;
