import { Box, useColorMode } from "@chakra-ui/react";
import { NAV_BLOCK } from "@features/navigation";
import { useNavPlugin } from "@features/plugins/useNavPlugin";
import Head from "next/head";
import React from "react";
import { InlineBlocks, InlineForm } from "react-tinacms-inline";
// import DarkModeSwitch from "@components/DarkModeSwitch";

export function DefaultLayout({ data, children, title }: any) {
  const { colorMode } = useColorMode();
  const [_, form] = useNavPlugin(data);

  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <Box color="black">
        <InlineForm form={form}>
          <InlineBlocks name="sections" blocks={NAV_BLOCK} />
        </InlineForm>
        {/*
        <Flex
          direction="row"
          alignItems="center"
          width="100%"
          justifyContent="flex-end"
        >
           <DarkModeSwitch /> 
        </Flex>*/}
        <Box color={colorMode == "light" ? "black" : "white"}>{children}</Box>
      </Box>
    </React.Fragment>
  );
}
