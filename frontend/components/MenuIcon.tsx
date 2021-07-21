import React from "react";
import { Box, BoxProps, chakra } from "@chakra-ui/react";

const MenuIcon = chakra((props: BoxProps) => {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="40px"
      height="40px"
      fill="none"
      stroke="dark"
      strokeWidth="1.5"
      {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Box>
  );
});

export default MenuIcon;
