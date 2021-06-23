import { Box, chakra, Flex, Link } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineImage,
  InlineText,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type FeatureBlockData = BlockTemplateData<
  "feat",
  {
    id: string;
    imageUrl?: string;
    title: string;
    description: string;
    serviceLink: string;
  }
>;

interface FeatureBlockProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  serviceLink?: string;
}

export function FeatureBlock({}: FeatureBlockProps) {
  const StyledInlineText = chakra(InlineText);
  return (
    <Box as="div">
      <Flex flexDirection="column" pb={"60px"} m={2.5}>
        <InlineImage name="imageUrl" parse={(media) => media.id} />
        <Box
          fontSize={"xl"}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
          p={"20px 0px"}
        >
          <StyledInlineText name="title" />
        </Box>
        <Box
          fontSize={"sm"}
          fontWeight={"subtitle"}
          lineHeight={"subtitle"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <StyledInlineText name="description" />
        </Box>
        <Link mt={"20px"}>
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
    label: "feat",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "Default link",
    },
    fields: [],
  },
};
