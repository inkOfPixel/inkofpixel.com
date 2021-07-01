import { Box, chakra, Flex } from "@chakra-ui/react";
import { BlockItemProps, FEAT_BLOCK } from "@features/pageBlocks";
import { FeatureBlockData } from "@features/pageBlocks/FeatureBlock";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";
import { SectionBlockTemplateData } from "./types";

export type FeatureSectionBlockData = SectionBlockTemplateData<
  "featureSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks: FeatureBlockData[];
  }
>;

export const StyledInlineTextarea = chakra(InlineTextarea);
export const StyledInlineBlocks = chakra(InlineBlocks);

export function FeatureSectionBlock(preview: boolean) {
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

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
      }}>
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
          lg: "420px",
        }}>
        <Box
          fontSize={"5xl"}
          p={0}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          letterSpacing={"0.02em"}>
          <StyledInlineTextarea
            fontSize={"5xl"}
            p={0}
            m={0}
            fontWeight={"bold"}
            lineHeight={"hero"}
            letterSpacing={"0.02em"}
            name="title"
          />
        </Box>
        <Box
          fontSize={"sm"}
          pt={5}
          m={0}
          paddingTop={5}
          fontWeight={"subtitle"}
          lineHeight={"subtitle"}
          color={"description"}
          letterSpacing={"0.04em"}
          fontFamily={"Roboto Mono"}>
          <StyledInlineTextarea
            fontSize={"sm"}
            p={0}
            m={0}
            paddingTop={5}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            letterSpacing={"0.02em"}
            color={"description"}
            name="subtitle"
          />
        </Box>
      </Flex>
      <StyledInlineBlocks
        mt={{
          base: 10,
          md: 0,
        }}
        width={"600px"}
        height={"fit-content"}
        name="blocks"
        blocks={FEAT_BLOCK}
        itemProps={itemProps}
      />
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureSectionBlock {...data} />
    </BlocksControls>
  );
}

export const featureSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "featureSection",
    defaultItem: {
      title: "Default section title",
      subtitle: "Default section subtitle",
      blocks: [],
    },
    fields: [],
  },
};
