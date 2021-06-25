import { Box, chakra, Flex } from "@chakra-ui/react";
import { FEAT_BLOCK } from "@features/pageBlocks";
import { FeatureBlockData } from "@features/pageBlocks/FeatureBlock";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineBlocks,
  InlineText,
  InlineTextarea,
} from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type FeatureSectionBlockData = SectionBlockTemplateData<
  "featureSection",
  {
    id: string;
    title?: string;
    subtitle?: string;
    blocks?: FeatureBlockData[];
  }
>;

export function FeatureSectionBlock() {
  const StyledInlineTextarea = chakra(InlineTextarea);
  const StyledInlineBlocks = chakra(InlineBlocks);
  return (
    <Flex
      m={{
        base: "0px",
        xl: "0px auto",
      }}
      p={{
        base: "0px 26px",
        md: "0px 40px",
        xl: "0px",
      }}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      w={{
        base: "full",
        xl: "1200px",
      }}
    >
      <Flex
        flexDirection={"column"}
        mr={{
          base: "0px",
          md: "80px",
          lg: "150px",
        }}
        flexGrow={0}
        flexShrink={0}
        flexBasis={{
          base: "auto",
          md: "300px",
          lg: "400px",
        }}
      >
        <Box
          fontSize={"5xl"}
          p={0}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <StyledInlineTextarea
            fontSize={"5xl"}
            p={0}
            m={0}
            fontWeight={"bold"}
            lineHeight={"hero"}
            fontFamily={"Monospace"}
            letterSpacing={"0.02em"}
            name="title"
          />
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
          <StyledInlineTextarea
            fontSize={"sm"}
            p={0}
            m={0}
            paddingTop={5}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            fontFamily={"Monospace"}
            letterSpacing={"0.02em"}
            name="subtitle"
          />
        </Box>
      </Flex>
      <StyledInlineBlocks width={"600px"} name="blocks" blocks={FEAT_BLOCK} />
    </Flex>
  );
}

export const featureSectionBlock: Block = {
  Component: ({ index, data }) => {
    return (
      <BlocksControls
        index={index}
        focusRing={{ offset: data.id }}
        insetControls
      >
        <FeatureSectionBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "featureSection",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      blocks: [],
    },
    fields: [],
  },
};
