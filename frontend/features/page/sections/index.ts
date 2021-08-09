import { cardBlock, CardBlockData } from "./CardListSection/blocks/CardBlock";

import {
  multiFeatureDescriptionBlock,
  MultiFeatureDescriptionBlockData,
} from "./CardListSection/blocks/MultiFeatureDescritpionBlock";
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

export const MULTI_FEATURE_BLOCK = {
  multiFeature: multiFeatureDescriptionBlock,
};

export type BlockData =
  | CardBlockData
  | FeatureBlockData
  | MultiFeatureDescriptionBlockData;
