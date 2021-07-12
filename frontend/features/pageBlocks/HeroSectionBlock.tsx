import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroSectionBlockData = BlockTemplateData<
  "heroSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
  }
>;

export const StyledInlineBlocks = chakra(InlineBlocks);
export const StyledInlineTextarea = chakra(InlineTextarea);

export function HeroSectionBlock() {
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
      flexDir="column"
      w={{
        base: "full",
      }}
      m={{
        base: "0 auto",
      }}
      pos="relative">
      <Flex
        w={{
          base: "full",
          xl: "1200px",
        }}
        p={{ base: "0px 26px", sm: "0px 40px", xl: "0px" }}
        m="0 auto"
        pos="relative">
        <Box
          w={{
            base: "full",
            xl: "1200px",
          }}
          height="fit-content">
          <Flex flexDirection="column">
            <Box
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              m={{ base: 0 }}
              fontWeight="bold"
              lineHeight="hero"
              fontFamily="Europa"
              letterSpacing="0.02em">
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
              fontWeight="subtitle"
              lineHeight="subtitle"
              fontFamily="Roboto Mono"
              letterSpacing="0.02em">
              <StyledInlineTextarea
                w={{
                  base: "full",
                  sm: "75%",
                  md: "50%",
                }}
                fontFamily="Roboto Mono"
                name="subtitle"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <HeroSectionBlock {...data} />
    </BlocksControls>
  );
}

export const heroSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Hero Section",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      blocks: [],
    },
    fields: [],
  },
};
