import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type AboutUsSectionBlockData = BlockTemplateData<
  "aboutUsSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
  }
>;

const StyledInlineTextarea = chakra(InlineTextarea);

export function AboutUsSectionBlock(sectionTitle: string) {
  return (
    <Box as="section" py="52" w="full" pos="relative">
      <Box
        px={{
          base: "7",
          lg: "10",
          xl: "0",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        zIndex="10"
        m="0 auto"
        boxSizing="border-box"
        pos="relative"
        letterSpacing="0.02em">
        {sectionTitle == null ? (
          <Box
            color="rgb(129, 82, 188)"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.1em"
            pos="relative"
            w="full"
            pb="8"
            as="h2"
            fontFamily="Roboto Mono"
            lineHeight="1.15em">
            <InlineTextarea name="sectionTitle" />
          </Box>
        ) : (
          <Box
            color="rgb(129, 82, 188)"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.1em"
            pos="relative"
            w="full"
            pb="8"
            as="h2"
            fontFamily="Roboto Mono"
            lineHeight="1.15em"
            _before={{
              content: "''",
              display: "block",
              h: "0.5",
              w: "14",
              pos: "absolute",
              top: "7px",
              left: "-68px",
              backgroundColor: "rgb(129, 82, 188)",
            }}>
            <InlineTextarea name="sectionTitle" />
          </Box>
        )}
        <Flex flexDirection="column">
          <Box
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            m="0"
            fontWeight="bold"
            lineHeight="hero"
            fontFamily="Europa"
            letterSpacing="0.02em">
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            w={{
              base: "full",
              md: "75%",
              lg: "65%",
            }}
            wordBreak="keep-all"
            fontSize={{
              base: "sm",
            }}
            pt="5"
            m="0"
            fontWeight="subtitle"
            lineHeight="subtitle"
            fontFamily="Roboto Mono"
            letterSpacing="0.02em">
            <StyledInlineTextarea
              pt="5"
              fontFamily="Roboto Mono"
              name="subtitle"></StyledInlineTextarea>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <AboutUsSectionBlock {...data} />
    </BlocksControls>
  );
}

export const aboutUsSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "About us Section",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      sectionTitle: "Default section title",
    },
    fields: [],
  },
};
