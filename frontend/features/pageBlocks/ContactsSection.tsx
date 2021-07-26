import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  BlockComponentProps,
  Block,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";
import { BlockTemplateData } from "./types";

import Link from "next/link";
import Splash from "@components/Splash";
import { FacebookIcon, GithubIcon, TwitterIcon } from "@components/SocialIcons";

export type ContactsSectionBlockData = BlockTemplateData<
  "contactsSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    email: Nullable<string>;
    sectionTitle: Nullable<string>;
    areBubblesActive: Nullable<boolean>;
  }
>;

export function ContactsSectionBlock({
  sectionTitle,
  areBubblesActive,
}: ContactsSectionBlockData) {
  console.log("bubble", areBubblesActive);

  return (
    <Box as="section" w="full">
      <Flex
        w={{
          base: "full",
          xl: "1200px",
        }}
        py="0"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        m="0 auto"
        pos="relative"
        flexDir="column">
        {sectionTitle == null ? (
          <Box
            color="rgb(129, 82, 188)"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.1em"
            pos="relative"
            w="full"
            pb={8}
            as="h2"
            fontFamily="Roboto Mono"
            lineHeight="1.15em"></Box>
        ) : (
          <Box
            color="rgb(129, 82, 188)"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.1em"
            pos="relative"
            w="full"
            pb="30px"
            as="h2"
            fontFamily="Roboto Mono"
            lineHeight="1.15em"
            _before={{
              content: "''",
              display: "block",
              h: "2px",
              w: "60px",
              pos: "absolute",
              top: "7px",
              left: "-68px",
              backgroundColor: "rgb(129, 82, 188)",
            }}>
            <InlineTextarea name="sectionTitle" />
          </Box>
        )}
        <Flex
          flexDir={{
            base: "column",
            md: "row",
          }}>
          <Flex
            flex={{
              base: "0 0 full",
              md: "0 0 300px",
              xl: "0 0 400px",
            }}
            mr={{
              base: "0",
              md: "20",
              lg: "36",
            }}
            flexDir="column">
            <Box
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontFamily="Europa"
              fontWeight="bold"
              lineHeight="1.1em">
              <InlineTextarea name="title" />
            </Box>
            <Text fontSize="sm" pt="5" color="description">
              <InlineTextarea name="subtitle" />
            </Text>
            <Link href="mailto:DA INSERIRE" passHref>
              <Box
                as="a"
                fontSize="sm"
                pt="14"
                lineHeight="1.8em"
                textDecoration="none">
                <InlineTextarea name="email" />
              </Box>
            </Link>
          </Flex>
          <FormControl
            flexWrap="wrap"
            fontFamily="Roboto Mono"
            id="contact"
            mt={{
              base: "20",
              md: "0",
            }}
            mr={{
              base: "-2.5",
              md: "0",
            }}
            display="flex"
            flexGrow={1}
            pb="20"
            flexDir={{
              base: "column",
              sm: "row",
              md: "column",
              lg: "row",
            }}>
            <Box
              w={{
                base: "calc(100% - 20px)",
                sm: "calc(50% - 20px)",
                md: "calc(100% - 20px)",
                lg: "calc(50% - 20px)",
              }}
              m="2.5"
              pos="relative"
              display="inline-block">
              <FormLabel
                fontWeight="400"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.1em"
                pos="relative"
                w="full"
                display="block"
                mb="0">
                Name
              </FormLabel>
              <Input
                id="1"
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                px="0"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
                _focus={{
                  "& ~ span": {
                    width: "100%",
                  },
                }}
                type="text"
                placeholder="Peter Smith"
                isRequired
              />
              <Box
                as="span"
                pos="absolute"
                bottom="0"
                left="0"
                w="0"
                h="1px"
                backgroundColor="dark"
                transition="all 0.4s ease 0s"></Box>
            </Box>
            <Box
              w={{
                base: "calc(100% - 20px)",
                sm: "calc(50% - 20px)",
                md: "calc(100% - 20px)",
                lg: "calc(50% - 20px)",
              }}
              m="2.5"
              pos="relative"
              display="inline-block">
              <FormLabel
                mb="0"
                fontWeight="400"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.1em"
                pos="relative"
                w="full"
                display="block">
                Email
              </FormLabel>
              <Input
                id="2"
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                px="0"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
                _focus={{
                  "& ~ span": {
                    width: "100%",
                  },
                }}
                type="text"
                placeholder="example@yourdomain.com"
                isRequired
              />
              <Box
                as="span"
                pos="absolute"
                bottom="0"
                left="0"
                w="0"
                h="1px"
                backgroundColor="dark"
                transition="all 0.4s ease 0s"></Box>
            </Box>
            <Box
              w="calc(100% - 10px)"
              m="2.5"
              pos="relative"
              display="inline-block">
              <FormLabel
                mb="0"
                fontWeight="400"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.1em"
                pos="relative"
                w="full"
                display="block">
                Message
              </FormLabel>
              <Input
                id="3"
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                px="0"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
                _focus={{
                  "& ~ span": {
                    width: "full",
                  },
                }}
                type="text"
                placeholder="Hi there..."
                isRequired
              />
              <Box
                as="span"
                pos="absolute"
                bottom="0"
                left="0"
                w="0"
                h="1px"
                backgroundColor="dark"
                transition="all 0.4s ease 0s"></Box>
            </Box>
            <Button
              borderRadius="0"
              border="1px solid black"
              color="dark"
              backgroundColor="transparent"
              fontSize="sm"
              fontWeight="normal"
              letterSpacing="0.06em"
              overflow="hidden"
              display="block"
              pos="relative"
              w="52"
              h="10"
              transition="all 0.3s ease 0s"
              cursor="pointer"
              _hover={{
                color: "white",

                "& > span:after": {
                  w: "full",
                },
              }}
              mt="10"
              mr="2.5"
              mb="2.5">
              <Box
                as="span"
                _after={{
                  background: "rgb(22,19,56)",
                  content: "''",
                  pos: "absolute",
                  zIndex: -1,
                  transition: "all 0.3s ease 0s",
                  h: "10",
                  left: "0",
                  top: "0",
                  w: "0",
                }}>
                SEND
              </Box>
            </Button>
          </FormControl>
        </Flex>
        {areBubblesActive == true ? (
          <Flex justifyContent="flex-end" w="full" mb="32">
            <Link href="https://twitter.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Splash
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(29, 161, 242, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(29, 161, 242, 1)",
                  }}
                  pos="relative"
                  w="60px"
                  h="60px">
                  <TwitterIcon color="white" width="4" height="4" />
                </Splash>
              </Box>
            </Link>
            <Link href="https://facebook.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Splash
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(59, 89, 152, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(59, 89, 152, 1)",
                  }}
                  pos="relative"
                  w="60px"
                  h="60px">
                  <FacebookIcon color="white" width="4" height="4" />
                </Splash>
              </Box>
            </Link>
            <Link href="https://github.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Splash
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(24, 23, 23, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(24, 23, 23, 1)",
                  }}
                  pos="relative"
                  w="60px"
                  h="60px">
                  <GithubIcon color="white" width="4" height="4" />
                </Splash>
              </Box>
            </Link>
          </Flex>
        ) : (
          <Flex justifyContent="flex-end" w="full" mb="32">
            <Link href="https://twitter.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Flex
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(29, 161, 242, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(29, 161, 242, 1)",
                  }}
                  pos="relative"
                  borderRadius="full"
                  justifyContent="center"
                  alignItems="center"
                  w="60px"
                  h="60px">
                  <TwitterIcon color="white" width="4" height="4" />
                </Flex>
              </Box>
            </Link>
            <Link href="https://facebook.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Flex
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(59, 89, 152, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(59, 89, 152, 1)",
                  }}
                  pos="relative"
                  borderRadius="full"
                  justifyContent="center"
                  alignItems="center"
                  w="60px"
                  h="60px">
                  <FacebookIcon color="white" width="4" height="4" />
                </Flex>
              </Box>
            </Link>
            <Link href="https://github.com/inkofpixel" passHref>
              <Box as="a" m="1">
                <Flex
                  className="asd"
                  transition="0.3s all"
                  backgroundColor="rgba(24, 23, 23, 0.7)"
                  _hover={{
                    backgroundColor: "rgba(24, 23, 23, 1)",
                  }}
                  pos="relative"
                  borderRadius="full"
                  justifyContent="center"
                  alignItems="center"
                  w="60px"
                  h="60px">
                  <GithubIcon color="white" width="4" height="4" />
                </Flex>
              </Box>
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <ContactsSectionBlock {...data} />
    </BlocksControls>
  );
}

export const contactsSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Contacts Section",
    defaultItem: {
      title: "Default title",
      subtitle: "Default subtitle",
      email: "hello@inkofpixel.com",
      blocks: [],
    },
    fields: [
      {
        name: "areBubblesActive",
        component: "toggle",
        label: "Activate bubbles",
      },
    ],
  },
};
