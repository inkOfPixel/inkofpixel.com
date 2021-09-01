import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineText,
} from "react-tinacms-inline";

import { Box, Text } from "@chakra-ui/react";

export type BlockquoteBlockData = BlockTemplateData<
  "blockquote",
  {
    id: string;
    text: string;
    author: string;
  }
>;

export default function BlockquoteBlock() {
  return (
    <Box
      as="blockquote"
      px="10"
      py="14"
      bgColor="rgb(234, 247, 247)"
      w={{ base: "full", md: "container.md" }}
      mx="auto"
      my="8"
      pos="relative"
    >
      <Text
        as="p"
        w="full"
        pos="relative"
        color="emerald.700"
        fontWeight="700"
        fontStyle="italic"
        _before={{
          display: "block",
          content: "“",
          top: "-10px",
          left: "-30px",
          pos: "absolute",
          color: "emerald.500",
          opacity: "0.4",
          fontSize: "8xl",
        }}
        _after={{
          display: "block",
          bottom: "-50px",
          content: "”",
          pos: "absolute",
          color: "emerald.500",
          opacity: "0.4",
          fontSize: "8xl",
        }}
      ></Text>
      <Box
        as="ul"
        listStyleType="none"
        pt="14"
        textAlign="right"
        lineHeight="1.8em"
        mx="auto"
        my="14"
        w={{ base: "full", md: "container.md" }}
        pl="5"
      >
        <Box as="li" color="emerald.700" mb="-5">
          <InlineText name="author" />
        </Box>
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <BlockquoteBlock {...data} />
    </BlocksControls>
  );
}

export const blockquoteBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Blockquote block",
    defaultItem: {
      blocks: [],
    },
    fields: [],
  },
};
