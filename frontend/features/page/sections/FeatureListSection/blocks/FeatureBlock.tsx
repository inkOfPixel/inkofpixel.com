import { Box, chakra, Container, Flex, Img, Link } from "@chakra-ui/react";
import Bubble from "@components/Bubble";
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
import { LinkData } from "../../CardListSection/blocks/CardBlock";

export type FeatureBlockData = BlockTemplateData<
  "feature",
  {
    id: string;
    image: Nullable<FeatureImage>;
    title: Nullable<string>;
    description: Nullable<string>;
    link: LinkData;
    bubbleColor: Nullable<string>;
  }
>;

interface FeatureImage {
  id: string;
  altText: Nullable<string>;
  url: string;
}

interface FeatureBlockProps {
  image?: Nullable<FeatureImage>;
  link: {
    url?: string;
    label?: string;
  };

  bubbleColor: Nullable<string>;
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({
  image,
  bubbleColor,
  link: { url, label },
}: FeatureBlockProps) {
  const cms = useCMS();

  return (
    <Container maxWidth="full">
      <Box as="div">
        <Flex flexDirection="column" pb="16" m="2.5" boxSizing="border-box">
          <Bubble
            pos="relative"
            boxSize="24"
            backgroundColor={bubbleColor ? bubbleColor : "rgb(248, 241, 255)"}>
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
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      boxSize="24">
                      <Img
                        width="20"
                        height="20"
                        src={imageSrc}
                        alt="Cover image"
                      />
                    </Flex>
                  );
                }}
              </InlineImage>
            ) : (
              <Flex justifyContent="center" alignItems="center" boxSize="24">
                <Img
                  width="20"
                  height="20"
                  src={
                    image ? STRAPI_URL + image.url : "/images/default-image.png"
                  }></Img>
              </Flex>
            )}
          </Bubble>
          <Box
            fontSize="xl"
            fontFamily="Roboto Mono"
            fontWeight="bold"
            lineHeight="hero"
            letterSpacing="0.04em"
            py="5"
            px="0">
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
              paddingLeft: "2.5",
              transition: "0.4s",
              fontWeight: "thin",
            }}
            _hover={{
              color: "rgb(5, 195, 182)",
              _after: {
                color: "rgb(5, 195, 182)",
                paddingLeft: "5",
              },
            }}
            mt="5">
            <Box as="span">
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
                href={url ? url : "/"}>
                {label ? label : "Learn more"}
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
        validate(url: string) {
          if (!url) {
            return "Required!";
          }
          if (!url.startsWith("/")) {
            return "Url should start with /";
          }
        },
      },
      {
        name: "link.label",
        label: "Label",
        component: "text",
        validate(label: string) {
          if (!label) {
            return "Required!";
          }
        },
      },
      {
        name: "bubbleColor",
        label: "Bubble color",
        component: "color",
      },
    ],
  },
};
