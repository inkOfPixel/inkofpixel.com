import { Box, Flex } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import React from "react";

export function Header(props: Props) {
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
        m={{
          base: "0 auto",
        }}>
        {props.children}
      </Box>
    </Flex>
  );
}
