import { Box } from "@chakra-ui/react";
import { BlockTemplateData, Nullable } from "@types";
import React from "react";
import {
  BlockComponentProps,
  BlocksControls,
  Block,
} from "react-tinacms-inline";

export type MultiFeatureDescriptionBlockData = BlockTemplateData<
  "multifeaturedescription",
  {
    id: string;
    description: Nullable<string>;
    imageColor: Nullable<string>;
  }
>;

export function MultiFeatureDescriptionBlock() {
  return <Box></Box>;
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
