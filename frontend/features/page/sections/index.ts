import { cardBlock, CardBlockData } from "./CardListSection/blocks/CardBlock";
import {
  socialBlock,
  SocialBubbleBlockData,
} from "./ContactsSection/blocks/SocialBubbleBlock";
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

export const SOCIAL_BLOCK = {
  socialBubble: socialBlock,
};

export type BlockData =
  | CardBlockData
  | FeatureBlockData
  | SocialBubbleBlockData;
