import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineText,
} from "react-tinacms-inline";

import { Box } from "@chakra-ui/react";

export type ListItemBlockData = BlockTemplateData<
  "listItemBlock",
  {
    id: string;
    text: string;
  }
>;

export default function ListItemBlock() {
  return (
    <Box as="li" mb="1">
      <InlineText name="text" />
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ListItemBlock {...data} />
    </BlocksControls>
  );
}

export const listItemBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "List item block",
    defaultItem: {
      text: "Default item text",
    },
    fields: [],
  },
};
