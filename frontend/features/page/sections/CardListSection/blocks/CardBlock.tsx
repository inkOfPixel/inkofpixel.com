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

export type CardBlockData = BlockTemplateData<
  "card",
  {
    id: string;
    image?: Nullable<CardImage>;
    title: string;
    description: string;
    link: LinkData;
  }
>;

export type LinkData = {
  url: string;
  label: string;
};

type CardImage = {
  id: string;
  altText: Nullable<string>;
  url: string;
};

interface CardBlockProps {
  image?: Nullable<CardImage>;
  link: {
    url?: string;
    label?: string;
  };
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

const StyledInlineTextarea = chakra(InlineTextarea);

export function CardBlock({ link: { url, label }, image }: CardBlockProps) {
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
      }}
    >
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
            }}
          >
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
                  pos="relative"
                  justifyContent="center"
                  overflow="hidden"
                  w="auto"
                  height="auto"
                >
                  <Img
                    textAlign="center"
                    w={image ? "full" : "72"}
                    h={image ? "full" : "72"}
                    objectFit="cover"
                    objectPosition="center"
                    opacity="1"
                    transition="0.5s"
                    borderStyle="none"
                    src={imageSrc}
                    alt="Cover image"
                  />
                </Flex>
              );
            }}
          </InlineImage>
        ) : (
          <Flex
            justifyContent="center"
            pos="relative"
            overflow="hidden"
            height="72"
          >
            <Img
              w={image ? "full" : "72"}
              h={image ? "full" : "72"}
              objectFit="cover"
              objectPosition="center"
              opacity="1"
              transition="0.5s"
              borderStyle="none"
              src={image ? STRAPI_URL + image.url : "/images/default-image.png"}
            ></Img>
          </Flex>
        )}

        <Flex
          flexDir="column"
          w="full"
          p="8"
          pos="relative"
          boxSizing="border-box"
        >
          <Box
            pb="5"
            fontFamily="Europa"
            color="dark"
            fontSize="xl"
            name="title"
            letterSpacing="0.06em"
            fontWeight="bold"
          >
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
          <Box lineHeight="1.6em" color="cardDescription" name="description">
            <StyledInlineTextarea
              lineHeight="1.6em"
              color="cardDescription"
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
            paddingLeft: "5",
            color: " rgb(5, 195, 182)",
          },
        }}
        mx="8"
        mb="8"
      >
        <Box as="span">{label ? label : "Discover more"}</Box>
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
      link: {
        label: "Default link",
        url: "/",
      },
    },
    fields: [
      {
        name: "link.url",
        label: "Url",
        component: "text",
      },
      {
        name: "link.label",
        label: "Label",
        component: "text",
      },
    ],
  },
};
