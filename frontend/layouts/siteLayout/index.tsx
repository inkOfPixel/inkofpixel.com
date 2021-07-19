import { Box, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export function DefaultLayout({ children, title }: any) {
  const { colorMode } = useColorMode();

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Box color={colorMode == "light" ? "black" : "white"}>{children}</Box>
    </React.Fragment>
  );
}
