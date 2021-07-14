import { Box, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
// import DarkModeSwitch from "@components/DarkModeSwitch";

export function DefaultLayout({ children, title }: any) {
  const { colorMode } = useColorMode();

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/static/favicon.png" />
      </Head>
      <Box color="black">
        <Box color={colorMode == "light" ? "black" : "white"}>{children}</Box>
      </Box>
    </React.Fragment>
  );
}
