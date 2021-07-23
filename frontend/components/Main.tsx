import { Box } from "@chakra-ui/react";
import React from "react";

export function Main({ children }: React.PropsWithChildren<unknown>) {
  return <Box as="main">{children}</Box>;
}
