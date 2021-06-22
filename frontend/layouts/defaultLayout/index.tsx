import { Box, Flex, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
// import DarkModeSwitch from "@components/DarkModeSwitch";

export function DefaultLayout({ children, title }: any) {
  const { colorMode } = useColorMode();
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Box>
        <Flex
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="flex-end"
        >
          {/* <DarkModeSwitch /> */}
        </Flex>
        <Box color={colorMode == "light" ? "black" : "white"}>{children}</Box>
      </Box>
    </React.Fragment>
  );
}
