import { Box, chakra, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { Block, BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { NAV_BLOCK } from "@features/pageBlocks";
import { NavBlockData } from "features/pageBlocks/NavigationBlock";
import { SectionBlockTemplateData } from "./types";
import Image from "next/image";
import Menu from "@components/Menu";

export type NavigationSectionBlockData = SectionBlockTemplateData<
  "navigationSection",
  {
    id: string;
    blocks?: NavBlockData[];
  }
>;

const StyledInlineBlocks = chakra(InlineBlocks);
const StyledMenu = chakra(Menu);

export function NavigationSectionBlock() {
  const [state, setState] = useState(false);

  const handleNav = () => {
    setState(!state);
  };

  return (
    <Flex as={"header"} w={"full"} zIndex={"100"} h={"160px"}>
      <Box
        h="full"
        p={{
          base: "0px 26px",
          md: "0px 40px",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        m={{
          base: "0px auto",
        }}
      >
        <Flex h={"full"} alignItems={"center"}>
          <Box
            display={{
              base: "block",
              lg: "none",
            }}
          >
            <StyledMenu
              onClick={() => handleNav()}
              color={"rgb(22,19,56)"}
              size={"40px"}
            />
          </Box>
          <Flex
            flex={{
              base: "1 1 0%",
              lg: "null",
            }}
            justifyContent={{
              base: "center",
              lg: "flex-start",
            }}
          >
            <Box color={"rgb(22, 19, 56)"} as={"a"} href="/home">
              <Image src="/logo.svg" width="200px" height="55px" />
            </Box>
          </Flex>
          <Flex
            alignItems={"baseline"}
            flex={{
              lg: "1 1 0%",
            }}
          >
            <StyledInlineBlocks
              display={{
                base: "none",
                lg: "flex",
              }}
              flex={"1 1 0%"}
              w={"full"}
              mr={"30px"}
              justifyContent={"flex-end"}
              flexDir={"row"}
              name="blocks"
              blocks={NAV_BLOCK}
              direction={"horizontal"}
            />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export const navigationSectionBlock: Block = {
  Component: ({ index, data }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
        <NavigationSectionBlock {...data} />
      </BlocksControls>
    );
  },
  template: {
    label: "navigationSection",
    defaultItem: {
      blocks: [
        {
          id: "100",
          pageName: "Default",
          path: "/home",
        },
      ],
    },
    fields: [],
  },
};
