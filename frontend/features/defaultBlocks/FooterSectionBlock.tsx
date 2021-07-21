import { Box, chakra, Flex, Text, Link } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { InlineBlocks, InlineTextarea } from "react-tinacms-inline";
import { FooterBlockData } from "@features/defaultBlocks/FooterBlock";
import { FOOTER_BLOCK } from "@features/defaultBlocks";

export type FooterSectionBlockData = {
  id: string;
  description: Nullable<string>;
  email: Nullable<string>;
  sharedCapital: Nullable<number>;
  street: Nullable<string>;
  cap: Nullable<number>;
  city: Nullable<string>;
  vatNumber: Nullable<number>;
  copyright: Nullable<string>;
  blocks: FooterBlockData[];
};

const StyledInlineBlocks = chakra(InlineBlocks);

export default function FooterSectionBlock(asd: FooterSectionBlockData) {
  return (
    <Box>
      <Box m="0" pt="12" fontSize="sm" lineHeight="1.4em">
        <Text pb="4">{asd.copyright}</Text>
        <Text>
          {"Capital €" +
            asd.sharedCapital +
            " i.v • " +
            asd.street +
            " - " +
            asd.cap +
            " " +
            asd.city +
            " • " +
            "VAT Number " +
            asd.vatNumber +
            " • REA MI - 2081233"}
        </Text>
      </Box>
    </Box>
  );
}

export function Footer(props: PropsWithChildren<unknown>) {
  return (
    <Box
      fontFamily="Roboto Mono"
      letterSpacing="0.08em"
      pos="relative"
      overflow="hidden"
      pt="36"
      backgroundColor="rgb(5,195,182)"
      pb="36"
      color="white"
      as="section">
      <Box
        pr={{
          base: "7",
          lg: "10",
        }}
        pl={{
          base: "7",
          lg: "10",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        m="0 auto"
        pos="relative"
        boxSizing="border-box"
        letterSpacing="0.02em">
        {props.children}
      </Box>
    </Box>
  );
}

export function UpperFooter(props: PropsWithChildren<unknown>) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        md: "row",
      }}
      m="0"
      p="0"
      alignItems="start">
      {props.children}
    </Flex>
  );
}

export function BlocksContainer() {
  return (
    <Flex
      pl={{
        base: "0",
        md: "24",
      }}
      pt={{
        base: "14",
        md: 0,
      }}
      boxSizing="border-box"
      flexDirection="column"
      flexGrow={1}
      flexShrink={0}
      flexBasis="auto">
      <Box
        className="caption"
        mb="6"
        fontSize="sm"
        maxW="500px"
        lineHeight="1.8em">
        <Box as="span">
          <InlineTextarea name="description" />
        </Box>
      </Box>
      <Box>
        <Link
          style={{ textDecoration: "none", userSelect: "none" }}
          href={"mailto:" + asd.email}>
          <Box
            as="span"
            fontFamily="Europa"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="0.04em"
            display="inline"
            pos="relative"
            transition="all 300ms ease 0s"
            color="white"
            _before={{
              backgroundColor: "white",
              opacity: 0,
              bottom: "-4px",
              content: "' '",
              h: "2px",
              left: "50%",
              pos: "absolute",
              w: "0%",
              transition: "all 300ms ease 0s",
              transform: "translateX(-50%) translateY(0px)",
            }}
            _hover={{
              _before: {
                opacity: "1",
                w: "full",
              },
            }}>
            <InlineTextarea name="email" />
          </Box>
        </Link>
      </Box>

      <StyledInlineBlocks
        display="flex"
        flexDir={{
          base: "column",
          sm: "row",
        }}
        fontSize="sm"
        lineHeight="1.4em"
        name="global.bottomBar.footer.blocks"
        blocks={FOOTER_BLOCK}
      />
    </Flex>
  );
}
