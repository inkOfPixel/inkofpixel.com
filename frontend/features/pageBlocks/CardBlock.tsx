import { AspectRatio, Box, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineImage,
  InlineText,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type CardBlockData = BlockTemplateData<{
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  projectLink: string;
}>;

interface CardBlockProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  projectLink?: string;
}

export function CardBlock({ imageUrl }: CardBlockProps) {
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}
    >
      <AspectRatio ratio={1 / 1}>
        <InlineImage name="imageUrl" parse={(media) => media.id} />
      </AspectRatio>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="black.600"
        >
          <InlineText name="title" />
        </Text>
        <Text
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
          href="#"
        >
          <InlineText name="description" />
        </Text>

        <Link maxWidth="100px" my={2}>
          <InlineText name="projectLink" />
        </Link>
      </Stack>
    </Box>
  );
}

export const cardBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <CardBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "Card",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      projectLink: "Default link",
    },
    fields: [],
  },
};
