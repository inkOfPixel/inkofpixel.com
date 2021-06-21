import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineImage,
  InlineText,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type FeatureBlockData = BlockTemplateData<{
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  serviceLink: string;
}>;

interface FeatureBlockProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  serviceLink?: string;
}

export function FeatureBlock({}: FeatureBlockProps) {
  return (
    <Box as="section">
      <Flex flexDirection="column">
        <InlineImage name="imageUrl" parse={(media) => media.id} />
        <InlineText name="title" />
        <InlineText name="description" />
        <Link>
          <InlineText name="serviceLink" />
        </Link>
      </Flex>
    </Box>
  );
}

export const featureBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <FeatureBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "Feature",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "Default link",
    },
    fields: [],
  },
};
