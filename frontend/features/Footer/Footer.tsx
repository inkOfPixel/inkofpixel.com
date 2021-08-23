import { Box } from "@chakra-ui/react";
import { FooterBlockData } from "@features/Footer/blocks/FooterBlock";
import React, { PropsWithChildren } from "react";

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
