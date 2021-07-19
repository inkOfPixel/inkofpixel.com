import { Box } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import React from "react";

export function Main(props: Props) {
  return <Box as="main">{props.children}</Box>;
}
