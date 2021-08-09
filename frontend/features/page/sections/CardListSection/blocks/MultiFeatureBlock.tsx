import { Box, Flex, Img } from "@chakra-ui/react";
import Bubble from "@components/Bubble";
import { STRAPI_URL } from "@config/env";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
  InlineImage,
  InlineTextarea,
} from "react-tinacms-inline";
import { useCMS } from "tinacms";
import { MULTI_FEATURE_BLOCK } from "@features/page/sections";
import { MultiFeatureDescriptionBlockData } from "./MultiFeatureDescritpionBlock";
import { InlineWysiwyg } from "react-tinacms-editor";

export type MultiFeatureBlockData = BlockTemplateData<
  "multiFeatureBlock",
  {
    id: string;
    title: Nullable<string>;
    description: Nullable<string>;
    bubbleColor: Nullable<string>;
    checkColor: Nullable<string>;
    image: Nullable<MultiFeatureImageType>;
    blocks: MultiFeatureDescriptionBlockData[];
  }
>;

type MultiFeatureImageType = {
  id: string;
  url: Nullable<string>;
  alternativeText: Nullable<string>;
};

interface MultiFeatureBlockProps {
  bubbleColor: string;
  image: Nullable<MultiFeatureImageType>;
  index: number;
  description: string;
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

export function MultiFeatureBlock({
  bubbleColor,
  image,
  description,
  index,
}: MultiFeatureBlockProps) {
  const cms = useCMS();
  return (
    <Flex
      overflow="hidden"
      flexDir="column"
      w={{
        base: "full",
      }}
      m={{
        base: "0 auto",
      }}>
      <Flex
        w={{
          base: "full",
          xl: "1200px",
        }}
        py="12"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        mx="auto"
        mt={index == 0 ? "52" : "0"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
        pos="relative">
        <Flex
          pt="8"
          justifyContent="center"
          flex={{
            base: "0 0 auto",
            md: "0 0 280px",
            lg: "0 0 400px",
          }}>
          <Bubble
            pos="relative"
            boxSize={{
              base: "36",
              lg: "44",
            }}
            backgroundColor={bubbleColor ? bubbleColor : "rgb(248, 241, 255)"}>
            {cms.enabled ? (
              <Flex justifyContent="center" alignItems="center" boxSize="24">
                <InlineImage
                  name="image"
                  uploadDir={() => "/"}
                  previewSrc={(imageSrc) => {
                    if (imageSrc === "") {
                      return "/images/default-image.png";
                    }

                    return imageSrc;
                  }}
                  parse={(media) => {
                    return media as any;
                  }}>
                  {(imageProps: any) => {
                    const { src } = imageProps as ImageRenderProps;
                    let imageSrc: string = src.previewSrc || src.url || "";
                    if (imageSrc === "") {
                      imageSrc = "/images/default-image.png";
                    } else if (!imageSrc.startsWith("http")) {
                      imageSrc = `${STRAPI_URL}${imageSrc}`;
                    }
                    return (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        boxSize="24">
                        <Img
                          w={{
                            base: "20",
                            lg: "24",
                          }}
                          h={{
                            base: "20",
                            lg: "24",
                          }}
                          src={imageSrc}
                          alt="Cover image"
                        />
                      </Flex>
                    );
                  }}
                </InlineImage>
              </Flex>
            ) : (
              <Flex justifyContent="center" alignItems="center" boxSize="24">
                <Img
                  w={{
                    base: "20",
                    lg: "24",
                  }}
                  h={{
                    base: "20",
                    lg: "24",
                  }}
                  src={
                    image ? STRAPI_URL + image.url : "/images/default-image.png"
                  }></Img>
              </Flex>
            )}
          </Bubble>
        </Flex>
        <Box w="full">
          <Box
            fontFamily="Europa"
            fontSize="xl"
            fontWeight="bold"
            pb="5"
            letterSpacing="0.04em">
            <InlineTextarea name="title" />
          </Box>
          <Box
            fontSize="sm"
            lineHeight="1.8em"
            letterSpacing="0.02em"
            color="description">
            <InlineWysiwyg name="description">{description}</InlineWysiwyg>
          </Box>
          <Box pt="10" m="0">
            <InlineBlocks name="blocks" blocks={MULTI_FEATURE_BLOCK} />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <MultiFeatureBlock index={index} {...data} />
    </BlocksControls>
  );
}

export const multiFeatureBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Multi feature block",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      blocks: [
        {
          _template: "multiFeature",
          description: "Default description",
        },
        {
          _template: "multiFeature",
          description: "Default description",
        },
        {
          _template: "multiFeature",
          description: "Default description",
        },
      ],
    },

    fields: [
      {
        name: "bubbleColor",
        component: "color",
        label: "Bubble color",
      },
      {
        name: "checkColor",
        component: "color",
        label: "Check icon color",
      },
    ],
  },
};
