import { Box, chakra, Flex } from "@chakra-ui/react";
import { BlockItemProps, FEATURE_BLOCK } from "@features/sectionBlocks";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type FeatureListSectionBlockData = BlockTemplateData<
  "featureSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks: FeatureBlockData[];
  }
>;

type FeatureListSectionProps = {
  sectionTitle: string;
  preview: boolean;
};

export const StyledInlineTextarea = chakra(InlineTextarea);
export const StyledInlineBlocks = chakra(InlineBlocks);

export function FeatureListSectionBlock({
  sectionTitle,
  preview,
}: FeatureListSectionProps) {
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <Box as="section" pb="36">
      <Box
        m={{
          base: "0px",
          xl: "0px auto",
        }}
        p={{
          base: "0px 26px",
          md: "0px 40px",
          xl: "0px",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}>
        {sectionTitle == null ? (
          <Box
            color="rgb(129, 82, 188)"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.1em"
            pos="relative"
            w="full"
            pb={8}
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
            pb="30px"
            as="h2"
            fontFamily="Roboto Mono"
            lineHeight="1.15em"
            _before={{
              content: "''",
              display: "block",
              h: "2px",
              w: "60px",
              pos: "absolute",
              top: "7px",
              left: "-68px",
              backgroundColor: "rgb(129, 82, 188)",
            }}>
            <InlineTextarea name="sectionTitle" />
          </Box>
        )}

        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}>
          <Flex
            flexDirection="column"
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
            }}>
            <Box
              fontSize="5xl"
              p={0}
              m={0}
              fontWeight="bold"
              lineHeight="hero"
              fontFamily="Europa"
              letterSpacing="0.02em">
              <StyledInlineTextarea
                fontSize="5xl"
                p={0}
                m={0}
                fontWeight="bold"
                lineHeight="hero"
                fontFamily="Europa"
                letterSpacing="0.02em"
                name="title"
              />
            </Box>
            <Box
              fontSize="sm"
              pt={5}
              m={0}
              w="full"
              paddingTop={5}
              fontWeight="subtitle"
              lineHeight="subtitle"
              color="description"
              letterSpacing="0.04em"
              fontFamily="Roboto Mono">
              <StyledInlineTextarea
                fontSize="sm"
                p={0}
                m={0}
                paddingTop={5}
                fontWeight="subtitle"
                lineHeight="subtitle"
                letterSpacing="0.02em"
                color="description"
                name="subtitle"
              />
            </Box>
          </Flex>
          <StyledInlineBlocks
            mt={{
              base: 10,
              md: 0,
            }}
            height="fit-content"
            w="full"
            name="blocks"
            blocks={FEATURE_BLOCK}
            itemProps={itemProps}
          />
        </Flex>
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureListSectionBlock {...data} />
    </BlocksControls>
  );
}

export const featureSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Feature List Section",
    defaultItem: {
      sectionTitle: "Default section title",
      title: "Default section title",
      subtitle: "Default section subtitle",
      blocks: [
        {
          _template: "ComponentBlocksSingleFeature",
          title: "Default title",
          description: "Default description",
          url: "/",
        },
        {
          _template: "ComponentBlocksSingleFeature",
          title: "Default title",
          description: "Default description",
          url: "/",
        },
        {
          _template: "ComponentBlocksSingleFeature",
          title: "Default title",
          description: "Default description",
          url: "/",
        },
      ],
    },
    fields: [],
  },
};