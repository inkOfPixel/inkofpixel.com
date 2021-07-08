import { Box, chakra, Flex } from "@chakra-ui/react";
import { BlockItemProps, FEAT_BLOCK } from "@features/sectionBlocks";
import { FeatureBlockData } from "@features/sectionBlocks/FeatureBlock";
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
    sectionTitle: Nullable<string>;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    blocks: FeatureBlockData[];
  }
>;

export const StyledInlineTextarea = chakra(InlineTextarea);
export const StyledInlineBlocks = chakra(InlineBlocks);

export function FeatureSectionBlock(section: any, preview: boolean) {
  
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <Box as="section" pb="150px">
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
        {section.sectionTitle != null ? (
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
            lineHeight="1.15em">
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
            blocks={FEAT_BLOCK}
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
      <FeatureSectionBlock section={data} {...data} />
    </BlocksControls>
  );
}

export const featureSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "featureSection",
    defaultItem: {
      sectionTitle: "Services",
      title: "Default section title",
      subtitle: "Default section subtitle",
      blocks: [],
    },
    fields: [],
  },
};
