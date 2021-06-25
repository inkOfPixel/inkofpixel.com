import { Flex, Box, chakra, useMediaQuery } from "@chakra-ui/react";

import React from "react";
import {
  Block,
  BlocksControls,
  InlineText,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroBlockData = BlockTemplateData<
  "ComponentBlocksHero",
  {
    id: string;
    title?: Nullable<string>;
    subtitle?: Nullable<string>;
  }
>;

interface HeroBlockProps {
  imageUrl?: string;
  title?: string;
  description: string;
  projectLink?: string;
}

export function HeroBlock({}: HeroBlockProps) {
  const [isSmallerThan900] = useMediaQuery("(max-width: 900px)");
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const [isSmallerThan1260] = useMediaQuery("(max-width: 1260px)");
  const [isSmallerThan700] = useMediaQuery("(max-width: 700)");
  const [isSmallerThan1020] = useMediaQuery("(max-width: 1020)");
  return (
    <HeroBox as="section" pt={"300px"} pb={"400px"} overflow={"hidden"}>
      <Flex
        w={isSmallerThan1020 ? "100%" : isSmallerThan1260 ? "100%" : "1200px"}
        p={
          isSmallerThan700 ? "0px 26px" : isSmallerThan1260 ? "0px 40px" : "0px"
        }
        m={"0px auto"}
        pos={"relative"}
        flexDirection="column"
      >
        <Box
          fontSize={isSmallerThan600 ? "3xl" : isSmallerThan900 ? "4xl" : "5xl"}
          w={"50vw"}
          p={0}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <InlineTextarea name="title" />
        </Box>
        <Box
          fontSize={"sm"}
          w={"45%"}
          p={0}
          m={0}
          paddingTop={5}
          fontWeight={"subtitle"}
          lineHeight={"subtitle"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <InlineTextarea name="subtitle" />
        </Box>
      </Flex>
    </HeroBox>
  );
}

const HeroBox = chakra(Box);
export const heroBlock: Block = {
  Component: ({ index, data, name, ...other }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <HeroBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "hero",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
    },
    fields: [],
  },
};
