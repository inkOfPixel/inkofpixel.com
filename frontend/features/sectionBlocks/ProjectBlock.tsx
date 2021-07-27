import { Box, Flex, Img } from "@chakra-ui/react";
import { STRAPI_URL } from "@config/env";
import { BlockTemplateData } from "@features/pageBlocks";
import Link from "next/link";
import React from "react";
import {
  BlockComponentProps,
  BlocksControls,
  Block,
  InlineTextarea,
  InlineImage,
} from "react-tinacms-inline";
import { useCMS } from "tinacms";

export type ProjectBlockData = BlockTemplateData<
  "project",
  {
    id: string;
    companyName: Nullable<string>;
    projectType: Nullable<string>;
    description: Nullable<string>;
    linkName: Nullable<string>;
    linkPath: Nullable<string>;
    image: Nullable<ProjectImage>;
  }
>;

interface ProjectBlockProps {
  linkName: Nullable<string>;
  linkPath: Nullable<string>;
  image: Nullable<ProjectImage>;
}

interface ProjectImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

interface ImageRenderProps {
  src: {
    url?: string;
    previewSrc?: string;
  };
}

export function ProjectBlock({ image, linkName, linkPath }: ProjectBlockProps) {
  const cms = useCMS();
  return (
    <Flex
      pt="14"
      flexDir={{
        base: "column-reverse",
        lg: "row",
      }}>
      <Box
        w={{
          base: "full",
          lg: "40%",
        }}
        p={{
          base: "5",
        }}
        mx="0"
        pr={{
          lg: "16",
        }}
        boxSizing="border-box">
        <Box
          fontWeight="bold"
          fontFamily="Europa"
          fontSize="xl"
          pb="2.5"
          letterSpacing="0.04em"
          color="dark"
          as="h3">
          <InlineTextarea name="companyName" />
        </Box>
        <Box
          fontSize="xs"
          fontWeight="normal"
          textTransform="uppercase"
          letterSpacing="0.01em"
          pos="relative"
          w="full"
          pb="5"
          color="rgb(5,195,182)">
          <InlineTextarea name="projectType" />
        </Box>
        <Box
          fontSize="sm"
          fontFamily="Roboto Mono"
          color="description"
          lineHeight="1.8em">
          <InlineTextarea name="description" />
        </Box>
        <Box>
          <Link href={linkPath ? linkPath : "/"} passHref>
            <Box
              as="a"
              color="dark"
              display="inline-block"
              textDecoration="none"
              mt="5"
              fontSize="sm"
              transition="all 0.4s ease 0s"
              _after={{
                content: "'→'",
                display: "inline-block",
                fontSize: "md",
                paddingLeft: "10px",
                transition: "0.4s",
                color: "dark",
                fontWeight: "thin",
              }}
              _hover={{
                color: " rgb(5, 195, 182)",
                _after: {
                  paddingLeft: "20px",
                },
              }}>
              {linkName}
            </Box>
          </Link>
        </Box>
      </Box>
      <Box
        w={{
          base: "full",
          lg: "60%",
        }}
        h="350px">
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
                <Box
                  pr="10"
                  pos="relative"
                  overflow="hidden"
                  mt="-30px"
                  height="360px">
                  <Img
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
                </Box>
              );
            }}
          </InlineImage>
        ) : (
          <Link href={linkPath ? linkPath : "/"} passHref>
            <Box as="a" pos="relative" overflow="hidden" height="90">
              <Img
                w={image ? "full" : "72"}
                h={image ? "full" : "72"}
                objectFit="cover"
                objectPosition="center"
                opacity="1"
                transition="0.5s"
                borderStyle="none"
                src={
                  image ? STRAPI_URL + image.url : "/images/default-image.png"
                }></Img>
            </Box>
          </Link>
        )}
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  console.log("datablock", JSON.stringify(data, null, " "));

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ProjectBlock {...data} />
    </BlocksControls>
  );
}

export const projectBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Project",
    defaultItem: {
      companyName: "Default title",
      projectType: "Default type",
      description: "Default description",
      linkName: "Deafult link",
      linkPath: "/",
    },
    fields: [
      {
        name: "linkName",
        label: "Link name",
        component: "text",
      },
      {
        name: "linkPath",
        label: "Link path",
        component: "text",
      },
    ],
  },
};
