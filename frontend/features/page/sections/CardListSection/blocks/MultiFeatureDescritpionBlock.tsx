import { Box, chakra, Flex } from "@chakra-ui/react";
import CheckIcon from "@components/CheckIcon";
import React from "react";
import {
  BlockComponentProps,
  BlocksControls,
  Block,
  InlineTextarea,
} from "react-tinacms-inline";

export type MultiFeatureDescriptionBlockData = BlockTemplateData<
  "multiFeature",
  {
    id: string;
    description: Nullable<string>;
    bubbleColor: Nullable<string>;
    checkColor: Nullable<string>;
  }
>;

interface MultiFeatureDescriptionBlockProps {
  bubbleColor: string;
  checkColor: string;
}

const StyledInlineTextarea = chakra(InlineTextarea);

export function MultiFeatureDescriptionBlock({
  bubbleColor,
  checkColor,
}: MultiFeatureDescriptionBlockProps) {
  return (
    <Flex alignItems="center" py="2.5" px="0">
      <Box
        w="8"
        h="8"
        backgroundColor={bubbleColor ? bubbleColor : "rgb(248, 241, 255)"}
        borderRadius="50%"
        pos="relative"
        flex="0 0 32px"
        ml="8"
        mr="5">
        <CheckIcon
          mt="4"
          pos="absolute"
          left="50%"
          right="50%"
          transform="translateX(-50%) translateY(-50%)"
          color={checkColor ? checkColor : "black"}
        />
      </Box>
      <Box fontSize="sm" w="full" lineHeight="1.8em" color="description">
        <StyledInlineTextarea py="1.5" name="description" />
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <MultiFeatureDescriptionBlock {...data} />
    </BlocksControls>
  );
}

export const multiFeatureDescriptionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Feature description",
    defaultItem: {
      description: "Default description",
    },
    fields: [],
  },
};
