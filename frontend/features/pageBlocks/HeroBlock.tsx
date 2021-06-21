import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Block, BlocksControls, InlineText } from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroBlockData = BlockTemplateData<{
  id: string;
  title: string;
  subtitle: string;
}>;

export function HeroBlock() {
  return (
    <Box as="section">
      <Flex flexDirection="column">
        <InlineText name="title" />
        <InlineText name="subtitle" />
      </Flex>
    </Box>
  );
}

export const heroBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <HeroBlock />
      </BlocksControls>
    );
  },
  template: {
    label: "Hero",
    defaultItem: {
      title: "Hero title",
    },
    fields: [],
  },
};
