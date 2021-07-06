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
    serviceLink: Nullable<string>;
  }
>;

interface FeatureImage {
  id: string;
  altText: Nullable<string>;
  url: string;
}

interface FeatureBlockProps {
  image?: Nullable<FeatureImage>;
  serviceLink?: string;
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({ serviceLink, image }: FeatureBlockProps) {
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
                  console.log("imageSrc", imageSrc);

                  return "/images/default-image.png";
                }
                // console.log({ fieldValue: imageSrc });
                // const previewSrc = cms.media.previewSrc(imageSrc);
                // return previewSrc;
                return imageSrc;
              }}
              parse={(media) => {
                console.log("PARSE", { media });
                return media.previewSrc;
              }}>
              {(imageProps) => {
                console.log("ImageProps", imageProps);
                return (
                  <Box w="100px" h="100px">
                    <Img
                      width="80px"
                      height="80px"
                      src={
                        imageProps.src?.previewSrc != null
                          ? imageProps.src.previewSrc
                          : typeof imageProps.src == "object"
                          ? STRAPI_URL + imageProps.src?.url
                          : imageProps.src?.startsWith("http") ||
                            imageProps.src?.startsWith("/images")
                          ? imageProps.src
                          : STRAPI_URL + imageProps.src
                      }
                      alt={"Cover image"}
                    />
                  </Box>
                );
              }}
            </InlineImage>
          ) : (
            <Box boxSize="100px">
              <Img
                width="80px"
                height="80px"
                src={
                  image ? STRAPI_URL + image.url : "/images/default-image.png"
                }></Img>
            </Box>
          )}
          <Box
            fontSize={"xl"}
            fontWeight={"bold"}
            lineHeight={"hero"}
            letterSpacing={"0.04em"}
            p={"20px 0px"}>
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            fontFamily={"Roboto Mono"}
            fontSize={"sm"}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            letterSpacing={"0.02em"}
            color={"description"}>
            <StyledInlineTextarea
              color={"description"}
              height={"auto"}
              name="description"
            />
          </Box>
          <Link textDecoration={"none"} mt={"20px"} href={serviceLink}>
            Learn more →
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FeatureBlock
        image={data.image}
        serviceLink={data.serviceLink}
        {...data}
      />
    </BlocksControls>
  );
}

export const featureBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "feat",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "/",
      image: {
        id: "51",
      },
    },
    fields: [
      {
        name: "serviceLink",
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
