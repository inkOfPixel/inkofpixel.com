import { Box, chakra } from "@chakra-ui/react";
import { CARD_BLOCK } from "@features/sectionBlocks";
import { CardBlockData } from "@features/sectionBlocks/CardBlock";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type CardSectionBlockData = SectionBlockTemplateData<
  "cardSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks?: CardBlockData[];
  }
>;

const StyledInlineBlocks = chakra(InlineBlocks);
const StyledInlineTextarea = chakra(InlineTextarea);

export function CardSectionBlock() {
  return (
    <Box
      as={"section"}
      w={{
        base: "full",
      }}
      m={"0 auto"}
      p={"150px 0px"}
      backgroundColor={"cardSectionBg"}>
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
        pos={"relative"}>
        <Box
          fontSize={"5xl"}
          p={"0px 0px 100px 0px"}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          letterSpacing={"0.02em"}>
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
          justifyContent={"center"}
          flexBasis={"30%"}
        />
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardSectionBlock {...data} />
    </BlocksControls>
  );
}

export const cardSectionBlock: Block = {
  Component: BlockComponent,
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
