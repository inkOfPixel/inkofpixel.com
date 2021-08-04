import { Box, BoxProps, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import Splash from "./Splash";

export type SocialProps = React.PropsWithChildren<{
  link: string;
  color: string;
  isBubbleActive: boolean;
  onHoverColor: string;
}>;

export function Social({
  link,
  isBubbleActive,
  color,
  onHoverColor,
  children,
}: SocialProps) {
  return (
    <Link href={link} passHref>
      <Box as="a" m="1">
        {isBubbleActive ? (
          <Splash
            className="asd"
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
        ) : (
          <Flex
            transition="0.3s all"
            backgroundColor={color}
            _hover={{
              backgroundColor: onHoverColor,
            }}
            pos="relative"
            borderRadius="full"
            justifyContent="center"
            alignItems="center"
            w="60px"
            h="60px">
            {children}
          </Flex>
        )}
      </Box>
    </Link>
  );
}
