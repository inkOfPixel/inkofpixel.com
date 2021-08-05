import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Splash from "./Splash";

export type SocialProps = React.PropsWithChildren<{
  link: string;
  color: string;
  onHoverColor: string;
}>;

export function Social({ link, color, onHoverColor, children }: SocialProps) {
  return (
    <Link href={link} passHref>
      <Box as="a" m="1">
        <Splash
          className="contactBubble"
          transition="0.3s all"
          backgroundColor={color}
          _hover={{
            backgroundColor: onHoverColor,
          }}
          pos="relative"
          w="60px"
          h="60px">
          {children}
        </Splash>
      </Box>
    </Link>
  );
}
