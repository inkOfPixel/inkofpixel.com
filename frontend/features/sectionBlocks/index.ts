export * from "./types";
import { cardBlock, CardBlockData } from "./CardBlock";
import { featureBlock, FeatureBlockData } from "./FeatureBlock";
import { footerBlock, FooterBlockData } from "./FooterBlock";

export const FEATURE_BLOCK = {
  ComponentBlocksSingleFeature: featureBlock,
};

export const CARD_BLOCK = {
  ComponentBlocksCard: cardBlock,
};

export const FOOTER_BLOCK = {
  ComponentBlocksFooter: footerBlock,
};

export type BlockData = CardBlockData | FeatureBlockData | FooterBlockData;
