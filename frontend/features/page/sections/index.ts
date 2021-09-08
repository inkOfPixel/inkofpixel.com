import { cardBlock, CardBlockData } from "./CardListSection/blocks/CardBlock";

import {
  projectBlock,
  ProjectBlockData,
} from "./ProjectsListSection/block/ProjectBlock";
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

export const PROJECT_BLOCK = {
  project: projectBlock,
};

export type BlockData = CardBlockData | FeatureBlockData | ProjectBlockData;
