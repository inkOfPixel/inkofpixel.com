import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
} from "react-tinacms-inline";

import { Box, Text } from "@chakra-ui/react";

export type ParagraphBlockData = BlockTemplateData<
  "paragraphBlock",
  {
    id: string;
    text: Nullable<string>;
  }
>;

export default function ParagraphBlock() {
  return (
    <Box w={{ base: "full", md: "container.md" }}>
      <Text
        as="h2"
        mt="12"
        mx="auto"
        mb="0"
        fontSize="2xl"
        fontFamily="Europa, sans-serif"
        boxSizing="border-box"
      >
        Title
      </Text>
      <Text as="p" lineHeight="1.8em" my="8" mx="auto">
        Text
      </Text>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ParagraphBlock {...data} />
    </BlocksControls>
  );
}

export const paragraphBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Paragraph block",
    defaultItem: {
      title: "Default title",
      text: "Default paragraph text",
      blocks: [],
    },
    fields: [],
  },
};
