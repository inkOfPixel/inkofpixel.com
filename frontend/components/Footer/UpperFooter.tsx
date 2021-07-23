import { Box, chakra, Flex, Link } from "@chakra-ui/react";
import { FOOTER_BLOCK } from "@features/defaultBlocks";
import React, { PropsWithChildren } from "react";
import { InlineBlocks, InlineTextarea } from "react-tinacms-inline";

const StyledInlineBlocks = chakra(InlineBlocks);

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

export function FooterDescription() {
  return (
    <Box
      className="caption"
      mb="6"
      fontSize="sm"
      maxW="500px"
      lineHeight="1.8em">
      <Box as="span">
        <InlineTextarea name="global.bottomBar.footer.description" />
      </Box>
    </Box>
  );
}

interface EmailProps {
  email: Nullable<string>;
}

export function FooterEmail(props: EmailProps) {
  return (
    <Box>
      <Link
        style={{ textDecoration: "none", userSelect: "none" }}
        href={"mailto:" + props.email}>
        <Box
          as="span"
          fontFamily="Europa"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="0.08em"
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
          <InlineTextarea name="global.bottomBar.footer.email" />
        </Box>
      </Link>
    </Box>
  );
}

export function BlocksContainer(props: PropsWithChildren<unknown>) {
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
      {props.children}
    </Flex>
  );
}

export function FooterBlocks() {
  return (
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
  );
}
