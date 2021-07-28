export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { projectBlock } from "./ProjectBlock";

export const FEATURE_BLOCK = {
  singleFeature: featureBlock,
};

export const CARD_BLOCK = {
  card: cardBlock,
};

export const PROJECT_BLOCK = {
  project: projectBlock,
};

export type BlockData = CardBlockData | FeatureBlockData;
