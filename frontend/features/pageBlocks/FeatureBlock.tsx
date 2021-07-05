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
    imageUrl: Nullable<FeatureImage>;
    title: Nullable<string>;
    description: Nullable<string>;
    serviceLink: Nullable<string>;
  }
>;

interface FeatureImage {
  id: Nullable<string>;
  altText: Nullable<string>;
  url: Nullable<string>;
}

interface FeatureBlockProps {
  imageUrl?: Nullable<FeatureImage>;
  serviceLink?: string;
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({ serviceLink, imageUrl }: FeatureBlockProps) {
  const cms = useCMS();
  return (
    <Container maxWidth={"full"}>
      <Box as="div">
        <Flex
          flexDirection="column"
          pb={"60px"}
          m={2.5}
          boxSizing={"border-box"}>
          <InlineImage
            name="imageUrl"
            uploadDir={() => "/"}
            previewSrc={(fieldValue) => cms.media.previewSrc(fieldValue.id)}
            parse={(media) => STRAPI_URL + media.id}>
            {() => (
              <Box w={"100px"} h={"100px"}>
                <Img
                  width="80px"
                  height="80px"
                  src={
                    imageUrl?.url
                      ? STRAPI_URL + imageUrl.url
                      : "/defaultImage.png"
                  }
                  alt={"Cover image"}
                />
              </Box>
            )}
          </InlineImage>
          {console.log("imageurl", imageUrl?.url)}
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
        imageUrl={data.imageUrl}
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
      imageUrl: {
        id: "0",
        altText: "Default",
        src: "/defaultImage.png",
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
        name: "imageUrl",
        label: "URL",
        component: "image",
        defaultValue: "/defaultImage.png",
      },
    ],
  },
};
