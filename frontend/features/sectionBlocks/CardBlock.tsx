import { AspectRatio, Box, Link, Stack } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineImage,
  InlineText,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type CardBlockData = BlockTemplateData<
  "ComponentBlocksCard",
  {
    id: string;
    image?: Nullable<CardImage>;
    title: string;
    description: string;
    projectLink?: Nullable<string>;
  }
>;

type CardImage = {
  id: string;
  altText: Nullable<string>;
  url: string;
};

export function CardBlock(projectLink: string) {
  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      flexDirection={"column"}
      maxWidth="32rem"
      borderWidth={1}
      margin={2}>
      <AspectRatio ratio={1 / 1}>
        <InlineImage name="imageUrl" parse={(media) => media.id} />
      </AspectRatio>
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}>
        <InlineText name="title" />

        <InlineText name="description" />

        <Link href={projectLink} maxWidth="100px">
          Discover more
        </Link>
      </Stack>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardBlock {...data} />
    </BlocksControls>
  );
}

export const cardBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "card",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      projectLink: "Default link",
    },
    fields: [],
  },
};
