import { Box, Flex } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export function Header(props: PropsWithChildren<unknown>) {
  return (
    <Flex as="header" w="full" pos="absolute" zIndex="1" h="40">
      <Box
        h="full"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        my="0"
        mx="auto">
        {props.children}
      </Box>
    </Flex>
  );
}
