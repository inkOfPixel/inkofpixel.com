import { Box } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export function Main(props: PropsWithChildren<unknown>) {
  return <Box as="main">{props.children}</Box>;
}
