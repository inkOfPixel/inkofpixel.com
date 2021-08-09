import { Box, Flex } from "@chakra-ui/react";
import { PROJECT_BLOCK } from "@features/sectionBlocks";
import { ProjectBlockData } from "@features/sectionBlocks/ProjectBlock";
import React from "react";
import {
  BlockComponentProps,
  Block,
  BlocksControls,
  InlineTextarea,
  InlineBlocks,
} from "react-tinacms-inline";
import { BlockItemProps, BlockTemplateData } from "./types";

export type ProjectListSectionData = BlockTemplateData<
  "projectListSection",
  {
    id: string;
    sectionTitle: Nullable<string>;
    sectionTitleColor: Nullable<string>;
    projects: ProjectBlockData[];
  }
>;

interface ProjectListSectionProps {
  sectionTitle: Nullable<string>;
  sectionTitleColor: Nullable<string>;
  preview: boolean;
}

export function ProjectListSection({
  sectionTitle,
  sectionTitleColor,
  preview,
}: ProjectListSectionProps) {
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);
  return (
    <Flex
      py="14"
      flexDir="column"
      w={{
        base: "full",
        xl: "1200px",
      }}
      px={{
        base: "10",
        xl: "0",
      }}
      m={{
        base: "0 auto",
      }}
      pos="relative">
      {sectionTitle == null ? (
        <Box
          color={sectionTitleColor ? sectionTitleColor : "black"}
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
          color={sectionTitleColor ? sectionTitleColor : "black"}
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
            backgroundColor: `${
              sectionTitleColor ? sectionTitleColor : "black"
            }`,
          }}>
          <InlineTextarea name="sectionTitle" />
        </Box>
      )}
      <Flex
        sx={{
          "& > div": {
            w: "full",
            height: "fit-content",
          },
        }}
        px="0">
        <InlineBlocks
          className="inline-blocks"
          name="projects"
          blocks={PROJECT_BLOCK}
          itemProps={itemProps}
        />
      </Flex>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  console.log("datasection", JSON.stringify(data, null, " "));

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ProjectListSection {...data} />
    </BlocksControls>
  );
}

export const projectListSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Project list section",
    defaultItem: {
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
