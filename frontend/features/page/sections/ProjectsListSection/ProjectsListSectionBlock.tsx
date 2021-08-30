import { Box, Flex } from "@chakra-ui/react";

import React from "react";
import {
  BlockComponentProps,
  Block,
  BlocksControls,
  InlineTextarea,
  InlineBlocks,
} from "react-tinacms-inline";
import { PROJECT_BLOCK } from "..";
import { ProjectBlockData } from "./block/ProjectBlock";

export type ProjectListSectionData = BlockTemplateData<
  "projectsSection",
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
  index: number;
}

export function ProjectListSection({
  sectionTitle,
  sectionTitleColor,
  preview,
  index,
}: ProjectListSectionProps) {
  const itemProps = React.useMemo<BlockItemProps>(() => {
    return {
      isPreview: preview,
    };
  }, [preview]);

  return (
    <Box as="section" w="full" pos="relative">
      <Flex
        pt={index === 0 ? "52" : "0"}
        pb="5"
        flexDir="column"
        w={{
          base: "full",
          xl: "1200px",
        }}
        px={{
          base: "10",
          xl: "0",
        }}
        mx="auto"
        pos="relative"
      >
        <Box
          color={sectionTitleColor ? sectionTitleColor : "rgb(129, 82, 188)"}
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
                  content: `""`,
                  display: "block",
                  h: "2px",
                  w: "60px",
                  pos: "absolute",
                  top: "7px",
                  left: "-68px",
                  backgroundColor: sectionTitleColor
                    ? sectionTitleColor
                    : "rgb(129, 82, 188)",
                }
              : undefined
          }
        >
          <InlineTextarea name="sectionTitle" />
        </Box>
        <Flex
          sx={{
            "& > div": {
              w: "full",
              height: "fit-content",
            },
          }}
          px="0"
        >
          <InlineBlocks
            name="projects"
            blocks={PROJECT_BLOCK}
            itemProps={itemProps}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ProjectListSection index={index} {...data} />
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
