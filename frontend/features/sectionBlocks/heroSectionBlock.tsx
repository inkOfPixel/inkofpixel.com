import { Box, chakra, Flex } from "@chakra-ui/react";
import { HERO_BLOCK } from "@features/pageBlocks";
import { HeroBlockData } from "@features/pageBlocks/HeroBlock";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineBlocks,
  InlineText,
  InlineTextarea,
} from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type HeroSectionBlockData = SectionBlockTemplateData<
  "heroSection",
  {
    id: string;
    title: string;
    subtitle: string;
    blocks: HeroBlockData[];
  }
>;

export function HeroSectionBlock() {
  const StyledInlineBlocks = chakra(InlineBlocks);
  return (
    <Flex
      pb={{
        base: "300px",
        lg: "400px",
      }}
      pt={{
        base: "200px",
        lg: "300px",
      }}
      flexDir={"column"}
      w={{
        base: "full",
      }}
      m={{
        base: "0 auto",
      }}
      position={"relative"}
    >
      <Flex>
        <Box
          fontSize={"xl"}
          p={0}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <InlineTextarea name="title" />
        </Box>
        <Box
          fontSize={"sm"}
          p={0}
          m={0}
          paddingTop={5}
          fontWeight={"subtitle"}
          lineHeight={"subtitle"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <InlineTextarea name="subtitle" />
        </Box>
      </Flex>
      <Flex
        w={{
          base: "full",
          xl: "1200px",
        }}
        p={{ base: "0px 26px", sm: "0px 40px", xl: "0px" }}
        m={"0 auto"}
        pos={"relative"}
      >
        <StyledInlineBlocks
          w={{
            base: "full",
            xl: "1200px",
          }}
          height={"fit-content"}
          name="blocks"
          blocks={HERO_BLOCK}
        />
      </Flex>
    </Flex>
  );
}

export const heroSectionBlock: Block = {
  Component: ({ index, data }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <HeroSectionBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "heroSection",
    defaultItem: {
      title: " ",
      subtitle: " ",
      blocks: [],
    },
    fields: [],
  },
};
