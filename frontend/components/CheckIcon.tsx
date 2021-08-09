import { Icon, IconProps } from "@chakra-ui/react";
import React from "react";

export default function CheckIcon({ color, ...otherProps }: IconProps) {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      w="4"
      h="4"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}
