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
    imageUrl?: string;
    title: string;
    description: string;
    projectLink?: Nullable<string>;
  }
>;

interface CardBlockProps {
  imageUrl?: string;
  title?: string;
  description: string;
  projectLink?: string;
}

const StyledImage = chakra(InlineImage);
const StyledInlineTextarea = chakra(InlineTextarea);

export function CardBlock({ projectLink, imageUrl }: CardBlockProps) {
  const cms = useCMS();
  return (
    <Flex
      as={"a"}
      m={"15px"}
      flexDir={"column"}
      boxSizing={"border-box"}
      justifyContent={"space-between"}
      h={cms.enabled ? "full" : "auto"}
      width={"calc(33.33% - 30px)"}
      backgroundColor={"white"}
      href={projectLink}
      transition={"all 0.8s"}
      _hover={{
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.15)",
        transform: "scale(1.01, 1.01)",
        transition: "0.8s",
      }}>
      <Flex flexDir={"column"}>
        <Box pos={"relative"} overflow={"hidden"} height={"300px"}>
          <Img
            position={"absolute"}
            top={0}
            left={0}
            src={
              imageUrl
                ? STRAPI_URL + imageUrl
                : "http://localhost:1337/uploads/80_c6692eb6f8"
            }
            w={"full"}
            h={"full"}
            objectFit={"cover"}
            objectPosition={"center center"}
            opacity={1}
            transition={"0.5s"}
            borderStyle={"none"}></Img>
        </Box>
        <Flex
          flexDir={"column"}
          w={"full"}
          p={"30px"}
          pos={"relative"}
          boxSizing={"border-box"}>
          <Box
            pb={5}
            fontFamily={"Europa"}
            color="dark"
            fontSize={"xl"}
            name="title"
            letterSpacing={"0.06em"}
            fontWeight={"bold"}>
            <StyledInlineTextarea
              pb={5}
              fontFamily={"Europa"}
              color="dark"
              fontSize={"xl"}
              name="title"
              letterSpacing={"0.06em"}
              fontWeight={"bold"}
            />
          </Box>
          <Box
            fontFamily={"Roboto Mono"}
            fontSize={"sm"}
            lineHeight={"1.6em"}
            color={"cardDescription"}
            letterSpacing={"0.02em"}
            name="description">
            <StyledInlineTextarea
              fontFamily={"Roboto Mono"}
              fontSize={"sm"}
              lineHeight={"1.6em"}
              letterSpacing={"0.02em"}
              color={"cardDescription"}
              name="description"
            />
          </Box>
        </Flex>
      </Flex>
      <Box
        display={"inline-block"}
        textDecoration={"none"}
        transition="all 0.4s ease 0s"
        color={"dark"}
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
        }}
        margin={"0px 30px 30px"}>
        <Box as={"span"}>Discover more</Box>
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <CardBlock
        {...data}
        imageUrl={data.imageUrl ? data.imageUrl : null}
        projectLink={data.projectLink}
      />
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
      projectLink: "Default link",
    },
    fields: [],
  },
};
