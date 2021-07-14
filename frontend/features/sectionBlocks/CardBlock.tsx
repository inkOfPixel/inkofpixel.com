import { Box, chakra, Flex, Img } from "@chakra-ui/react";
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

export type CardBlockData = BlockTemplateData<
  "ComponentBlocksCard",
  {
    id: string;
    image?: Nullable<CardImage>;
    title: string;
    description: string;
    url?: Nullable<string>;
    urlName?: Nullable<string>;
  }
>;

type CardImage = {
  id: string;
  altText: Nullable<string>;
  url: string;
};

interface CardBlockProps {
  image?: Nullable<CardImage>;
  url?: string;
  urlName?: string;
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

const StyledInlineTextarea = chakra(InlineTextarea);

export function CardBlock({ url, image, urlName }: CardBlockProps) {
  const cms = useCMS();

  return (
    <Flex
      flexDir="column"
      boxSizing="border-box"
      justifyContent="space-between"
      h={cms.enabled ? "full" : "auto"}
      w={{
        base: "full",
      }}
      backgroundColor="white"
      href={url}
      transition="all 0.8s"
      _hover={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)",
        transform: "scale(1.01, 1.01)",
        transition: "0.8s",
      }}>
      <Flex flexDir={"column"}>
        {cms.enabled ? (
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
                <Box pos="relative" overflow="hidden" height="80">
                  <Img
                    w="full"
                    h="full"
                    objectFit="cover"
                    objectPosition="center"
                    opacity="1"
                    transition="0.5s"
                    borderStyle="none"
                    src={imageSrc}
                    alt="Cover image"
                  />
                </Box>
              );
            }}
          </InlineImage>
        ) : (
          <Box pos="relative" overflow="hidden" height="72">
            <Img
              w="full"
              h="full"
              objectFit="cover"
              objectPosition="center"
              opacity="1"
              transition="0.5s"
              borderStyle="none"
              src={
                image ? STRAPI_URL + image.url : "/images/default-image.png"
              }></Img>
          </Box>
        )}

        <Flex
          flexDir="column"
          w="full"
          p="8"
          pos="relative"
          boxSizing="border-box">
          <Box
            pb="5"
            fontFamily="Europa"
            color="dark"
            fontSize="xl"
            name="title"
            letterSpacing="0.06em"
            fontWeight="bold">
            <StyledInlineTextarea
              pb="5"
              fontFamily="Europa"
              color="dark"
              fontSize="xl"
              name="title"
              letterSpacing="0.06em"
              fontWeight="bold"
            />
          </Box>
          <Box
            fontFamily="Roboto Mono"
            fontSize="sm"
            lineHeight="1.6em"
            color="cardDescription"
            letterSpacing="0.02em"
            name="description">
            <StyledInlineTextarea
              fontFamily="Roboto Mono"
              fontSize="sm"
              lineHeight="1.6em"
              color="cardDescription"
              letterSpacing="0.02em"
              name="description"
            />
          </Box>
        </Flex>
      </Flex>
      <Box
        display="inline-block"
        textDecoration="none"
        transition="all 0.4s ease 0s"
        color="dark"
        _after={{
          content: "'→'",
          display: "inline-block",
          fontSize: "md",
          paddingLeft: "2.5",
          transition: "0.4s",
          color: "dark",
          fontWeight: "thin",
        }}
        _hover={{
          color: " rgb(5, 195, 182)",
          _after: {
            paddingLeft: "20px",
          },
        }}
        mx="8"
        mb="8">
        <Box as="span">{urlName ? urlName : "Discover more"}</Box>
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardBlock {...data} />
    </BlocksControls>
  );
}

export const cardBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "card",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      url: "Default link",
    },
    fields: [
      {
        name: "url",
        label: "Url",
        component: "text",
        defaultValue: "/",
      },
      {
        name: "urlName",
        label: "Url name",
        component: "text",
      },
    ],
  },
};
