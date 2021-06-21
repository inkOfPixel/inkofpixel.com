import { Box } from "@chakra-ui/react";
import React from "react";
import { Block, BlocksControls, InlineText } from "react-tinacms-inline";

export type HeroBlockData = {
  id: string;
  title: string;
};

export function HeroBlock() {
  return (
    <Box as="section">
      <InlineText name="title" />
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
