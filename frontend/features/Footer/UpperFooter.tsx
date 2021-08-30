import { Box, chakra, Flex, Link, Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { InlineBlocks } from "react-tinacms-inline";
import { FOOTER_BLOCK } from ".";

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
      alignItems="start"
    >
      {props.children}
    </Flex>
  );
}

interface FooterDescriptionProps {
  description: Nullable<string>;
}

export function FooterDescription({ description }: FooterDescriptionProps) {
  return (
    <Box
      className="caption"
      mb="6"
      fontSize="sm"
      maxW="500px"
      lineHeight="1.8em"
    >
      <Box as="span">{description}</Box>
    </Box>
  );
}

interface EmailProps {
  email: Nullable<string>;
}

export function FooterEmail({ email }: EmailProps) {
  return (
    <Box>
      <Link
        style={{ textDecoration: "none", userSelect: "none" }}
        href={`mailto: ${email}`}
      >
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
          }}
        >
          <Text>{email}</Text>
        </Box>
      </Link>
    </Box>
  );
}

export function Container(props: PropsWithChildren<unknown>) {
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
      flexBasis="auto"
    >
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
      direction="horizontal"
      fontSize="sm"
      lineHeight="1.4em"
      max={3}
      name="global.companyData.locations"
      blocks={FOOTER_BLOCK}
    />
  );
}
