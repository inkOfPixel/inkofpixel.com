import { Box, Img } from "@chakra-ui/react";
import { STRAPI_URL } from "@config/env";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
} from "react-tinacms-inline";

export type ImageBlockData = BlockTemplateData<
  "image",
  {
    id: string;
    url: string;
    alternativeText: Nullable<string>;
  }
>;

interface ImageBlockProps {
  url: string;
}

export function ImageBlock({ url }: ImageBlockProps) {
  return (
    <Box mx="auto" my="8" w={{ base: "full", md: "container.md" }}>
      <Img
        href={`${STRAPI_URL}${url}`}
        w={{
          base: "full",
          md: "calc(100vw - 80px)",
          xl: "container.lg",
        }}
        ml={{
          base: "0",
          md: "calc((-100vw + 780px) / 2)",
          xl: "64",
        }}
        display="block"
        my="10"
        boxShadow="rgb(0 0 0 / 15%) 0px 4px 20px 0px"
      ></Img>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ImageBlock {...data} />
    </BlocksControls>
  );
}

export const imageBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Image block",
    defaultItem: {},
    fields: [
      {
        name: "image",
        component: "Image",
        label: "Image",
      },
    ],
  },
};
