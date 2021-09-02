import { Box, Text, Link, chakra } from "@chakra-ui/react";
import NextLink from "next/link";

import React, { PropsWithChildren } from "react";
import { InlineBlocks } from "react-tinacms-inline";
import { LOCATION_BLOCK } from ".";

export function FooterHomeLink(props: PropsWithChildren<unknown>) {
  return (
    <NextLink href="/" passHref>
      <Box
        as="a"
        width={{
          base: "36",
          sm: "52",
        }}
        height="14"
      >
        {props.children}
      </Box>
    </NextLink>
  );
}

export function Footer(props: PropsWithChildren<unknown>) {
  return (
    <Box py="36" backgroundColor="emerald.500" color="white" as="footer">
      <Box
        px={{
          base: "7",
          lg: "10",
        }}
        w={{
          base: "full",
          xl: "container.xl",
        }}
        mx="auto"
        boxSizing="border-box"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function Copyright({ children }: PropsWithChildren<unknown>) {
  return <Text pb="4">{children}</Text>;
}

export function FooterDescription({ children }: PropsWithChildren<unknown>) {
  return (
    <Box maxW="500px" lineHeight="1.8em">
      <Box as="span">{children}</Box>
    </Box>
  );
}

export function FooterEmail({ children }: PropsWithChildren<unknown>) {
  return (
    <Box>
      <Link
        style={{ textDecoration: "none", userSelect: "none" }}
        href={`mailto: ${children}`}
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
            transition: "all 300ms ease",
            transform: "translateX(-50%) translateY(0px)",
          }}
          _hover={{
            _before: {
              opacity: "1",
              w: "full",
            },
          }}
        >
          <Text>{children}</Text>
        </Box>
      </Link>
    </Box>
  );
}

const StyledInlineBlocks = chakra(InlineBlocks);

export function LocationsBlocks() {
  return (
    <StyledInlineBlocks
      display="flex"
      flexDir={{
        base: "column",
        sm: "row",
      }}
      direction="horizontal"
      lineHeight="1.4em"
      w="full"
      max={3}
      name="global.companyData.locations"
      blocks={LOCATION_BLOCK}
    />
  );
}
