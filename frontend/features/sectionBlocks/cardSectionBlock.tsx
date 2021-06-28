import { Box, chakra, Flex } from "@chakra-ui/react";
import { CARD_BLOCK } from "@features/pageBlocks";
import { CardBlockData } from "@features/pageBlocks/CardBlock";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineBlock,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";
import { useCMS } from "tinacms";
import { SectionBlockTemplateData } from "./types";

export type CardSectionBlockData = SectionBlockTemplateData<
  "cardSection",
  {
    id: string;
    title?: string;
    subtitle?: string;
    blocks?: CardBlockData[];
  }
>;

export const StyledInlineBlocks = chakra(InlineBlocks);
export const StyledInlineTextarea = chakra(InlineTextarea);

export function CardSectionBlock() {
  const cms = useCMS();
  return (
    <Box
      as={"section"}
      w={{
        base: "full",
      }}
      m={"0 auto"}
      p={"150px 0px"}
      backgroundColor={"cardSectionBg"}
    >
      <Box
        p={{
          base: "0px 26px",
          sm: "0px 40px",
          xl: "0px",
        }}
        m={"0 auto"}
        w={{
          base: "full",
          xl: "1200px",
        }}
        letterSpacing={"0.02em"}
        pos={"relative"}
      >
        <Box
          fontSize={"5xl"}
          p={"0px 0px 100px 0px"}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          letterSpacing={"0.02em"}
        >
          <StyledInlineTextarea
            fontSize={"5xl"}
            p={"0px 0px 100px 0px"}
            m={0}
            fontWeight={"bold"}
            lineHeight={"hero"}
            letterSpacing={"0.02em"}
            name="title"
          />
        </Box>
        <StyledInlineBlocks
          display={"flex"}
          flexBasis={"30%"}
          flexWrap={"wrap"}
          flexDir={{
            base: "column",
            md: "row",
          }}
          m={{
            base: "0px",
            md: "0px 0px 0px -15px",
          }}
          w={{
            base: "full",
            md: "calc(100% + 30px)",
          }}
          className="card-list"
          name="blocks"
          blocks={CARD_BLOCK}
          direction={"horizontal"}
        />
      </Box>
    </Box>
  );
}

export const cardSectionBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <CardSectionBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "cardSection",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      blocks: [],
    },
    fields: [],
  },
};
