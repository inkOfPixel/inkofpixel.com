import { Box } from "@chakra-ui/react";
import { CARD_BLOCK } from "@features/pageBlocks";
import { CardBlockData } from "@features/pageBlocks/CardBlock";
import React from "react";
import { Block, BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type CardSectionBlockData = SectionBlockTemplateData<
  "cardSection",
  {
    id: string;
    title?: string;
    subtitle?: string;
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

export const cardSectionBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <CardSectionBlock {...data} />
      </BlocksControls>
    );
  },
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
