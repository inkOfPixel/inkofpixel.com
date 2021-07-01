import { Box } from "@chakra-ui/react";
import { CARD_BLOCK } from "@features/pageBlocks";
import { CardBlockData } from "@features/pageBlocks/CardBlock";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
} from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type CardSectionBlockData = SectionBlockTemplateData<
  "cardSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks?: CardBlockData[];
  }
>;

export function CardSectionBlock() {
  return (
    <Box>
      <InlineBlocks
        name="blocks"
        blocks={CARD_BLOCK}
        direction={"horizontal"}
      />
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardSectionBlock {...data} />
    </BlocksControls>
  );
}

export const cardSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "cardSection",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      blocks: [],
    },
    fields: [],
  },
};
