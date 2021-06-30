import { Box, chakra, Container, Flex, Link } from "@chakra-ui/react";
import { STRAPI_URL } from "@config/env";
import React from "react";
import { Block, BlocksControls, InlineTextarea } from "react-tinacms-inline";
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
  serviceLink?: string;
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({ imageUrl, serviceLink }: FeatureBlockProps) {
  return (
    <Container>
      <Box as="div">
        <Flex
          flexDirection="column"
          pb={"60px"}
          m={2.5}
          boxSizing={"border-box"}
        >
          {/* <InlineImage
            uploadDir={() => "http://localhost:1337"}
            name={"imageUrl"}
            parse={(media) => media.filename}
          /> */}
          <img width="80px" src={STRAPI_URL + imageUrl}></img>
          <Box
            fontFamily={"Europa"}
            fontSize={"xl"}
            fontWeight={"bold"}
            lineHeight={"hero"}
            letterSpacing={"0.04em"}
            p={"20px 0px"}
          >
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            fontSize={"sm"}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            letterSpacing={"0.02em"}
            color={"description"}
          >
            <StyledInlineTextarea
              color={"description"}
              width={"600px"}
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

export const StyledBlocksControls = chakra(BlocksControls);

export const featureBlock: Block = {
  Component: ({ index, data }) => {
    return (
      <StyledBlocksControls index={index} focusRing={{ offset: 0 }}>
        <FeatureBlock
          key={data.id}
          imageUrl={data.imageUrl}
          serviceLink={data.serviceLink}
          {...data}
        />
      </StyledBlocksControls>
    );
  },
  template: {
    label: "feat",
    defaultItem: {
      title: "Default title",
      description: "Default description",
      serviceLink: "/",
    },
    fields: [
      {
        name: "serviceLink",
        label: "Url",
        component: "text",
      },
    ],
  },
};
