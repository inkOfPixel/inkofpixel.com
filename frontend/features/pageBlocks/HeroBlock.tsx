import { Flex, Box, chakra } from "@chakra-ui/react";

import React from "react";
import { Block, BlocksControls, InlineTextarea } from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroBlockData = BlockTemplateData<
  "ComponentBlocksHero",
  {
    id: string;
    title?: Nullable<string>;
    subtitle?: Nullable<string>;
  }
>;

interface HeroBlockProps {
  imageUrl?: string;
  title?: string;
  description: string;
  projectLink?: string;
}

export function HeroBlock({}: HeroBlockProps) {
  const StyledInlineTextarea = chakra(InlineTextarea);
  return (
    <HeroBox>
      <Flex flexDirection={"column"}>
        <Box
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          m={{ base: 0 }}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Europa"}
          letterSpacing={"0.02em"}
        >
          <StyledInlineTextarea name="title" />
        </Box>
        <Box
          fontSize={{
            base: "sm",
          }}
          w={{
            base: "full",
            sm: "75%",
            md: "50%",
          }}
          p={0}
          m={0}
          paddingTop={5}
          fontWeight={"subtitle"}
          lineHeight={"subtitle"}
          fontFamily={"Roboto Mono"}
          letterSpacing={"0.02em"}
        >
          <StyledInlineTextarea
            w={{
              base: "full",
              sm: "75%",
              md: "50%",
            }}
            fontFamily={"Roboto Mono"}
            name="subtitle"
          />
        </Box>
      </Flex>
    </HeroBox>
  );
}

const HeroBox = chakra(Box);
export const heroBlock: Block = {
  Component: ({ index, data }) => {
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
