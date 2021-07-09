/* eslint-disable @next/next/no-img-element */
import { Box, chakra, Container, Flex, Img, Link } from "@chakra-ui/react";
import { STRAPI_URL } from "@config/env";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineImage,
  InlineTextarea,
} from "react-tinacms-inline";
import { useCMS } from "tinacms";
import { BlockTemplateData } from "./types";

export type FeatureBlockData = BlockTemplateData<
  "ComponentBlocksSingleFeature",
  {
    id: Nullable<string>;
    image: Nullable<FeatureImage>;
    title: Nullable<string>;
    description: Nullable<string>;
    url: Nullable<string>;
  }
>;

interface FeatureImage {
  id: string;
  altText: Nullable<string>;
  url: string;
}

interface FeatureBlockProps {
  image?: Nullable<FeatureImage>;
  url?: string;
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({ url, image }: FeatureBlockProps) {
  const cms = useCMS();
  return (
    <Container maxWidth={"full"}>
      <Box as="div">
        <Flex
          flexDirection="column"
          pb={"60px"}
          m={2.5}
          boxSizing={"border-box"}>
          {cms.enabled ? (
            <InlineImage
              name="image"
              uploadDir={() => "/"}
              previewSrc={(imageSrc) => {
                if (imageSrc === "") {
                  return "";
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
                    boxSize="100px">
                    <Img
                      width="80px"
                      height="80px"
                      src={imageSrc}
                      alt="Cover image"
                    />
                  </Flex>
                );
              }}
            </InlineImage>
          ) : (
            <Flex justifyContent="center" alignItems="center" boxSize="100px">
              <Img
                width="80px"
                height="80px"
                src={
                  image ? STRAPI_URL + image.url : "/images/default-image.png"
                }></Img>
            </Flex>
          )}
          <Box
            fontSize="xl"
            fontWeight="bold"
            lineHeight="hero"
            letterSpacing="0.04em"
            p="20px 0px">
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            fontFamily="Roboto Mono"
            fontSize="sm"
            fontWeight="subtitle"
            lineHeight="subtitle"
            letterSpacing="0.02em"
            color="description">
            <StyledInlineTextarea
              color="description"
              height="auto"
              name="description"
            />
          </Box>
          <Box
            display="inline-block"
            textDecoration="none"
            transition="all 0.4s ease 0s"
            color="dark"
            _after={{
              content: "'→'",
              display: "inline-block",
              fontSize: "md",
              paddingLeft: "10px",
              transition: "0.4s",
              fontWeight: "thin",
            }}
            _hover={{
              color: "rgb(5, 195, 182)",
              _after: {
                paddingLeft: "20px",
              },
            }}
            mt="20px">
            <Box as={"span"}>
              <Link
                fontFamily="Roboto Mono"
                color="dark"
                fontWeight="light"
                fontSize="sm"
                userSelect="none"
                letterSpacing="0.02em"
                _hover={{
                  color: "rgb(5, 195, 182)",
                  textDecorationLine: "none",
                }}
                href={url}>
                Learn more
              </Link>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureBlock {...data} />
    </BlocksControls>
  );
}

export const featureBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Feature",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "/",
    },
    fields: [
      {
        name: "url",
        label: "Url",
        component: "text",
        defaultValue: "/",
      },
      {
        name: "image",
        label: "URL",
        component: "image",
        defaultValue: "/images/default-image.png",
      },
    ],
  },
};
