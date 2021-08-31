import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
} from "react-tinacms-inline";

import { Box } from "@chakra-ui/react";
import { listItemBlock } from "./ListItemBlock";

export type ListBlockData = BlockTemplateData<
  "listBlock",
  {
    id: string;
    items: {
      text: Nullable<string>[];
    };
  }
>;

export default function ListBlock() {
  return (
    <Box
      as="ul"
      w={{ base: "full", md: "container.md" }}
      lineHeight="1.8em"
      mt="12"
      mx="auto"
      mb="0"
      pl="5"
      fontFamily="Europa, sans-serif"
      boxSizing="border-box"
    >
      <InlineBlocks name="items" blocks={{ listItem: listItemBlock }} />
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ListBlock {...data} />
    </BlocksControls>
  );
}

export const listBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "List block",
    defaultItem: {
      blocks: [],
    },
    fields: [],
  },
};
