import { Box, chakra, Container, Flex, Link } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlocksControls,
  InlineImage,
  InlineText,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type FeatureBlockData = BlockTemplateData<
  "ComponentBlocksSingleFeature",
  {
    id: string;
    imageUrl?: Nullable<string>;
    title: string;
    description: string;
    serviceLink?: Nullable<string>;
  }
>;

interface FeatureBlockProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  serviceLink?: string;
}

export function FeatureBlock({ imageUrl, serviceLink }: FeatureBlockProps) {
  const StyledInlineTextarea = chakra(InlineTextarea);
  return (
    <Container>
      <Box as="div">
        <Flex
          flexDirection="column"
          pb={"60px"}
          m={2.5}
          boxSizing={"border-box"}
        >
          {/*  <InlineImage
            uploadDir={() => "http://localhost:1337"}
            name={"imageUrl"}
            parse={(media) => media.filename}
          /> */}
          <img
            width="80px"
            src="https://i.picsum.photos/id/106/80/80.jpg?hmac=om_fN6kywCtxkLhUY-HNdDirboY20kQlR9V3inM1tEQ"
          ></img>
          <Box
            fontSize={"xl"}
            fontWeight={"bold"}
            lineHeight={"hero"}
            fontFamily={"Monospace"}
            letterSpacing={"0.04em"}
            p={"20px 0px"}
          >
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            fontSize={"sm"}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            fontFamily={"Monospace"}
            letterSpacing={"0.02em"}
          >
            <StyledInlineTextarea width={"600px"} name="description" />
          </Box>
          <Link textDecoration={"none"} mt={"20px"} href={serviceLink}>
            <InlineText name="serviceLink" />
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}

export const featureBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    const StyledBlocksControls = chakra(BlocksControls);
    return (
      <StyledBlocksControls
        index={index}
        focusRing={{ offset: 0 }}
        insetControls
        width={"600px"}
      >
        <FeatureBlock {...data} />
      </StyledBlocksControls>
    );
  },
  template: {
    label: "feat",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "Default link",
    },
    fields: [],
  },
};
