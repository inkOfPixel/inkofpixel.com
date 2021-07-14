import { Box, chakra, Flex } from "@chakra-ui/react";
import Splash from "@components/Splash";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";
import { useCMS } from "tinacms";
import { SectionBlockTemplateData } from "./types";

export type HeroSectionBlockData = SectionBlockTemplateData<
  "heroSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    areBubblesActive: boolean;
  }
>;

const StyledInlineTextarea = chakra(InlineTextarea);
const Bubble = chakra(Splash);

export function HeroSectionBlock(data: HeroSectionBlockData) {
  return (
    <Box
      overflow="hidden"
      w="full"
      pb={{
        base: "80",
        lg: "400px",
      }}
      pt={{
        base: "52",
        lg: "80",
      }}
      as="section">
      <Flex
        flexDir="column"
        w={{
          base: "full",
        }}
        m={{
          base: "0 auto",
        }}>
        <Flex
          w={{
            base: "full",
            xl: "1200px",
          }}
          py="0"
          px={{
            base: "6",
            sm: "10",
            xl: "0",
          }}
          m="0 auto"
          pos="relative">
          {data.areBubblesActive === true ? (
            <Box
              w="full"
              pos="absolute"
              zIndex="-1"
              left="0"
              top="0"
              className="HeroIllustrator">
              <Bubble
                top={{
                  base: "-250px",
                  sm: "-200px",
                }}
                right={{
                  base: "-200px",
                  sm: "-200px",
                }}
                boxSize="600px"
                backgroundColor="#f8f1ff"
              />
              <Bubble
                top="200px"
                right="500px"
                boxSize="280px"
                backgroundColor="#ffefe4"
                display={{
                  base: "none",
                  lg: "block",
                }}
              />
              <Bubble
                top="130px"
                left="-60px"
                backgroundColor="#f8f1ff"
                boxSize="150px"
                display={{
                  base: "none",
                  sm: "block",
                }}
              />
              <Bubble
                top="-100px"
                left="400px"
                backgroundColor="#e8fbf6"
                boxSize="100px"
                display={{
                  base: "none",
                  lg: "block",
                }}
              />
              <Bubble
                top="230px"
                left="230px"
                backgroundColor="#e8fbf6"
                boxSize="60px"
                display={{
                  base: "none",
                  xl: "block",
                }}
              />
              <Bubble
                top="-20px"
                left="230px"
                backgroundColor="#fff7df"
                boxSize="60px"
                display={{
                  base: "none",
                  md: "block",
                }}
              />
            </Box>
          ) : null}
          <Box
            w={{
              base: "full",
              xl: "1200px",
            }}
            height="fit-content">
            <Flex flexDirection="column">
              <Box
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                m={{ base: 0 }}
                w={{
                  base: "full",
                  sm: "75%",
                  md: "500px",
                }}
                fontWeight="bold"
                lineHeight="hero"
                fontFamily="Europa"
                letterSpacing="0.02em">
                <StyledInlineTextarea name="title" />
              </Box>
              <Box
                fontSize={{
                  base: "sm",
                }}
                w={{
                  base: "full",
                  sm: "75%",
                  md: "600px",
                }}
                p={0}
                m={0}
                paddingTop={5}
                fontWeight="subtitle"
                lineHeight="subtitle"
                fontFamily="Roboto Mono"
                letterSpacing="0.02em">
                <StyledInlineTextarea
                  w={{
                    base: "full",
                    sm: "75%",
                    md: "50%",
                  }}
                  fontFamily="Roboto Mono"
                  name="subtitle"
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <HeroSectionBlock active={data.areBubblesActive} {...data} />
    </BlocksControls>
  );
}

export const heroSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Hero section",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      blocks: [],
    },
    fields: [
      {
        name: "areBubblesActive",
        label: "Activate bubble",
        component: "toggle",
      },
    ],
  },
};
