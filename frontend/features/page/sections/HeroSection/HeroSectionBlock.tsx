import { Box, chakra, Flex } from "@chakra-ui/react";
import Bubble from "@components/Bubble";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";

export type HeroSectionBlockData = BlockTemplateData<
  "heroSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    areBubblesActive: Nullable<boolean>;
  }
>;

const StyledInlineTextarea = chakra(InlineTextarea);

export function HeroSectionBlock({ areBubblesActive }: HeroSectionBlockData) {
  return (
    <Box
      overflow="hidden"
      zIndex="-1"
      w="full"
      pb={{
        base: "80",
        lg: "96",
      }}
      pt={{
        base: "52",
        lg: "80",
      }}
      as="section"
    >
      <Flex
        flexDir="column"
        w={{
          base: "full",
        }}
        m={{
          base: "0 auto",
        }}
      >
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
          pos="relative"
        >
          {areBubblesActive === true && (
            <Box
              w="full"
              pos="absolute"
              zIndex="-1"
              left="0"
              top="0"
              className="HeroIllustrator"
            >
              <Bubble
                top={{
                  base: "-60",
                  sm: "-52",
                }}
                right={{
                  base: "-52",
                  sm: "-52",
                }}
                boxSize="600px"
                backgroundColor="#f8f1ff"
              />
              <Bubble
                top="44"
                right="500px"
                boxSize="72"
                backgroundColor="#ffefe4"
                display={{
                  base: "none",
                  lg: "block",
                }}
              />
              <Bubble
                top="32"
                left="-16"
                backgroundColor="#f8f1ff"
                boxSize="36"
                display={{
                  base: "none",
                  sm: "block",
                }}
              />
              <Bubble
                top="-24"
                left="96"
                backgroundColor="#e8fbf6"
                boxSize="24"
                display={{
                  base: "none",
                  lg: "block",
                }}
              />
              <Bubble
                top="60"
                left="60"
                backgroundColor="#e8fbf6"
                boxSize="16"
                display={{
                  base: "none",
                  xl: "block",
                }}
              />
              <Bubble
                top="-5"
                left="60"
                backgroundColor="#fff7df"
                boxSize="16"
                display={{
                  base: "none",
                  md: "block",
                }}
              />
            </Box>
          )}
          <Box
            w={{
              base: "full",
              xl: "container.xl",
            }}
            height="fit-content"
          >
            <Flex flexDirection="column">
              <Box
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                m="0"
                w={{
                  base: "full",
                  sm: "75%",
                  md: "500px",
                }}
                fontWeight="bold"
                lineHeight="hero"
                fontFamily="Europa"
              >
                <StyledInlineTextarea name="title" />
              </Box>
              <Box
                w={{
                  base: "full",
                  sm: "75%",
                  md: "600px",
                }}
                m="0"
                pt="5"
                fontWeight="subtitle"
                lineHeight="subtitle"
              >
                <StyledInlineTextarea
                  w={{
                    base: "full",
                    sm: "75%",
                    md: "50%",
                  }}
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
      <HeroSectionBlock {...data} />
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
