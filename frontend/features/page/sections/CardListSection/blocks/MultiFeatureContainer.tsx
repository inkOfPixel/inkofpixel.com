import { Box } from "@chakra-ui/react";
import { BlockTemplateData, Nullable } from "@types";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
} from "react-tinacms-inline";
import { MultiFeatureDescriptionBlockData } from "./MultiFeatureDescritpionBlock";

export type MultiFeatureContainerBlockData = BlockTemplateData<
  "featureSection",
  {
    id: string;
    title: Nullable<string>;
    description: Nullable<string>;
    image: {
      id: string;
      url: Nullable<string>;
      alternativeText: Nullable<string>;
    };
    blocks: MultiFeatureDescriptionBlockData[];
  }
>;

export function MultiFeatureContainerBlock() {
  return <Box></Box>;
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <MultiFeatureContainerBlock {...data} />
    </BlocksControls>
  );
}

export const multiFeatureContainerBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Multi-feature container",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      image: {
        id: "51",
      },
    },
    fields: [],
  },
};
