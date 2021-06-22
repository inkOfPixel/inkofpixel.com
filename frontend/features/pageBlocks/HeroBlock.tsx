import { Flex, Box, chakra, useMediaQuery } from "@chakra-ui/react";

import React from "react";
import { Block, BlocksControls, InlineText } from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

export type HeroBlockData = BlockTemplateData<
  "hero",
  {
    id: string;
    title: string;
    subtitle: string;
  }
>;

interface HeroBlockProps {
  imageUrl?: string;
  title?: string;
  description: string;
  projectLink?: string;
}

export function HeroBlock({}: HeroBlockProps) {
  /*const [isSmallerThan900] = useMediaQuery(
    "(max-width: 900px){ font-size:4xl }"
  );*/
  return (
    <HeroBox as="section" pt={"300px"} pb={"400px"} overflow={"hidden"}>
      <Flex w={"1200px"} m={"0 auto"} flexDirection="column">
        <Box
          fontSize={"5xl"}
          w={"50%"}
          p={0}
          m={0}
          fontWeight={"bold"}
          lineHeight={"hero"}
          fontFamily={"Monospace"}
          letterSpacing={"0.02em"}
        >
          <h2>
            <InlineText name="title" />
          </h2>
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
        >
          <InlineText name="subtitle" />
        </Box>
      </Flex>
    </HeroBox>
  );
}

const HeroBox = chakra(Box);
//const H2 = chakra(InlineText);

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
