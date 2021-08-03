import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";

export type SimpleSectionBlockData = BlockTemplateData<
  "simpleSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    sectionTitleColor: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
  }
>;

interface SimpleSectionBlockProps {
  sectionTitle: string;
  sectionTitleColor: string;
}

const StyledInlineTextarea = chakra(InlineTextarea);

export function SimpleSectionBlock({
  sectionTitle,
  sectionTitleColor,
}: SimpleSectionBlockProps) {
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
        <Box
          color={sectionTitleColor || "black"}
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="0.1em"
          pos="relative"
          w="full"
          pb="8"
          as="h2"
          fontFamily="Roboto Mono"
          lineHeight="1.15em"
          _before={
            sectionTitle
              ? {
                  content: "''",
                  display: "block",
                  h: "0.5",
                  w: "14",
                  pos: "absolute",
                  top: "7px",
                  left: "-68px",
                  backgroundColor: sectionTitleColor || "black",
                }
              : undefined
          }>
          <InlineTextarea name="sectionTitle" />
        </Box>

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
      <SimpleSectionBlock {...data} />
    </BlocksControls>
  );
}

export const simpleSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Simple Section",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      sectionTitle: "Default section title",
    },
    fields: [
      {
        name: "sectionTitleColor",
        component: "color",
        label: "Section title color",
      },
    ],
  },
};
