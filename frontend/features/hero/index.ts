export * from "./types";
import { heroBlock, HeroBlockData } from "./HeroBlock";

export const PAGE_BLOCKS = {
  /** We will define blocks here later */
  hero: heroBlock,
};

export type BlockData = HeroBlockData;
