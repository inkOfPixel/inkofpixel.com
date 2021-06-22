import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Block, BlocksControls, InlineText } from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroBlockData = BlockTemplateData<
  "hero",
  {
    id: string;
    title: string;
    subtitle: string;
  }
>;

interface HeroBlockProps {
  imageUrl?: string;
  title?: string;
  description: string;
  projectLink?: string;
}

export function HeroBlock({}: HeroBlockProps) {
  return (
    <Box as="section">
      <Flex flexDirection="column">
        <Box p={3} m={3}>
          <InlineText name="title" />
        </Box>
        <Box p={3} m={3}>
          <InlineText name="subtitle" />
        </Box>
      </Flex>
    </Box>
  );
}

export const heroBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <HeroBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "hero",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
    },
    fields: [],
  },
};
