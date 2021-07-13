import { Box, Flex } from "@chakra-ui/react";
import Logo from "@components/Logo";
import { transform } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function FooterSectionBlock() {
  return (
    <Box
      pos="relative"
      overflow="hidden"
      pt="36"
      backgroundColor="rgb(5,195,182)"
      pb="36"
      color="white"
      as="section">
      <Box
        pr={{
          base: "7",
          lg: "10",
        }}
        pl={{
          base: "7",
          lg: "10",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        m="0 auto"
        pos="relative"
        boxSizing="border-box"
        letterSpacing="0.02em">
        <Flex
          flexDirection={{
            base: "column",
            md: "row",
          }}
          m="0"
          p="0"
          alignItems="start">
          <Logo width="200px" height="55px" color="white" />
          <Flex
            pl={{
              base: "0",
              md: "24",
            }}
            pt={{
              base: "14",
              md: 0,
            }}
            boxSizing="border-box"
            flexGrow={1}
            flexShrink={0}
            flexBasis="auto">
            <Box className="caption" fontSize="sm" lineHeight="1.8em">
              <Box as="span">
                {"Collaboriamo con brand e imprenditori ambiziosi. " +
                  <br /> +
                  "Costruiamo qualcosa di grande insieme."}
              </Box>
              <Link href="mailto:info@inkofpixel.com" passHref>
                <Box
                  as="a"
                  fontFamily="Europa"
                  fontSize="2xl"
                  pt="6"
                  fontWeight="bold"
                  letterSpacing="0.04em"
                  display="inline-block"
                  textDecoration="none"
                  pos="relative"
                  transition="all 300ms ease 0s"
                  color="white"
                  _before={{
                    backgroundColor: "white",
                    opacity: 0,
                    bottom: "-4px",
                    content: "''",
                    h: "2px",
                    left: "50%",
                    pos: "absolute",
                    w: "0%",
                    transition: "all 300ms ease 0s",
                    transform: "translateX(-50%) translateY(0px)",
                  }}>
                  info@inkofpixel.com
                </Box>
                <Flex
                  flexDir={{
                    base: "column",
                    sm: "row",
                  }}
                  fontSize="sm"
                  lineHeight="1.4em">
                      <Box>
                          
                      </Box>
                  </Flex>
              </Link>
            </Box>
          </Flex>
        </Flex>
        <Box m="0" pt="12" fontSize="sm" lineHeight="1.4em"></Box>
      </Box>
    </Box>
  );
}
