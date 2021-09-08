import { Box, chakra } from "@chakra-ui/react";
import { CARD_BLOCK } from "@features/page/sections";
import { CardBlockData } from "@features/page/sections/CardListSection/blocks/CardBlock";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";

export type CardSectionBlockData = BlockTemplateData<
  "cardListSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks: CardBlockData[];
  }
>;

interface CardListSectionBlockProps {
  sectionTitle: string;
}

const StyledInlineTextarea = chakra(InlineTextarea);
const StyledInlineBlocks = chakra(InlineBlocks);

export function CardListSectionBlock(sectionTitle: CardListSectionBlockProps) {
  return (
    <Box
      bg="rgb(234, 247, 247)"
      as="section"
      w={{
        base: "full",
      }}
      m="0 auto"
      py="36"
      px="0"
      backgroundColor="emerald.50"
    >
      <Box
        zIndex="10"
        py="0"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        m="0 auto"
        w={{
          base: "full",
          xl: "container.xl",
        }}
      >
        <Box
          as="h2"
          color="emerald.500"
          textTransform="uppercase"
          letterSpacing="0.1em"
          w="full"
          pb="8"
          pos="relative"
          lineHeight="1.15em"
          _before={
            sectionTitle
              ? {
                  content: `""`,
                  display: "block",
                  h: "0.5",
                  w: "14",
                  pos: "absolute",
                  top: "7px",
                  left: "-68px",
                  backgroundColor: "emerald.500",
                }
              : undefined
          }
        >
          <InlineTextarea name="sectionTitle" />
        </Box>

        <Box
          fontFamily="Europa"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          pb="24"
          m="0"
          fontWeight="bold"
          lineHeight="hero"
        >
          <StyledInlineTextarea name="title" />
        </Box>

        <StyledInlineBlocks
          sx={{
            "& > div": {
              w: {
                base: "calc(100% - 30px)",
                md: "calc(45% - 30px)",
                lg: "calc(33% - 30px)",
              },
              h: "auto",
              m: "4",
            },
          }}
          display="flex"
          flexDir={{
            base: "column",
            md: "row",
          }}
          justifyContent="center"
          flexWrap="wrap"
          name="blocks"
          blocks={CARD_BLOCK}
          direction="horizontal"
        />
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardListSectionBlock {...data} />
    </BlocksControls>
  );
}

export const cardSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Card List Section",
    defaultItem: {
      title: "Default title",
      sectionTitle: "Default section title",
      subtitle: "Default subtitle",
      blocks: [
        {
          _template: "card",
          title: "Default title",
          description: "Default description",
          link: {
            label: "Default link",
            url: "/",
          },
        },
        {
          _template: "card",
          title: "Default title",
          description: "Default description",
          link: {
            label: "Default link",
            url: "/",
          },
        },
        {
          _template: "card",
          title: "Default title",
          description: "Default description",
          link: {
            label: "Default link",
            url: "/",
          },
        },
      ],
    },
    fields: [],
  },
};
