import { Box, chakra, Container, Flex, Link } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineImage,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type FeatureBlockData = BlockTemplateData<
  "ComponentBlocksSingleFeature",
  {
    id: Nullable<string>;
    imageUrl: Nullable<string>;
    title: Nullable<string>;
    description: Nullable<string>;
    serviceLink: Nullable<string>;
  }
>;

interface FeatureBlockProps {
  imageUrl?: string;
  serviceLink?: string;
}

export const StyledInlineTextarea = chakra(InlineTextarea);

export function FeatureBlock({ serviceLink }: FeatureBlockProps) {
  return (
    <Container>
      <Box as="div">
        <Flex
          flexDirection="column"
          pb={"60px"}
          m={2.5}
          boxSizing={"border-box"}>
          <InlineImage
            uploadDir={() => "http://localhost:1337/upload"}
            name={"imageUrl"}
            parse={(media) => media.filename}
          />

          <Box
            fontSize={"xl"}
            fontWeight={"bold"}
            lineHeight={"hero"}
            letterSpacing={"0.04em"}
            p={"20px 0px"}>
            <StyledInlineTextarea name="title" />
          </Box>
          <Box
            fontSize={"sm"}
            fontWeight={"subtitle"}
            lineHeight={"subtitle"}
            letterSpacing={"0.02em"}
            color={"description"}>
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
      serviceLink: "Default link",
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
