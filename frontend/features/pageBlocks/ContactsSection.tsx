import {
  Box,
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

export type ContactsSectionBlockData = BlockTemplateData<
  "contactsSection",
  {
    id: string;
    title: Nullable<string>;
    subtitle: Nullable<string>;
    email: Nullable<string>;
    sectionTitle: Nullable<string>;
  }
>;

export function ContactsSectionBlock() {
  const sectionTitle = "SECTION TITLE";
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
            lineHeight="1.15em">
            {sectionTitle}
          </Box>
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
            {sectionTitle}
          </Box>
        )}
        <Flex
          flexDir={{
            base: "column",
            md: "row",
          }}>
          <Flex
            flexBasis={{
              base: "full",
              md: "74",
              xl: "96",
            }}
            mr={{
              base: "0",
              xl: "36",
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
            pt="7"
            pb="20">
            <Box
              w={{
                base: "calc(100% - 20px)",
                sm: "calc(50% - 20px)",
                md: "calc(100% - 20px)",
                lg: "calc(50% - 20px)",
              }}
              m="2.5"
              display="inline-block">
              <FormLabel
                fontWeight="400"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="0.1em"
                pos="relative"
                w="full"
                display="block">
                Name
              </FormLabel>
              <Input
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
                type="text"
                placeholder="Peter Smith"
                isRequired
              />
            </Box>
            <Box
              w={{
                base: "calc(100% - 20px)",
                sm: "calc(50% - 20px)",
                md: "calc(100% - 20px)",
                lg: "calc(50% - 20px)",
              }}
              m="2.5"
              display="inline-block">
              <FormLabel
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
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
                type="email"
                placeholder="example@yourdomain.com"
                isRequired
              />
            </Box>
            <Box w="calc(100% - 10px)" m="2.5" display="inline-block">
              <FormLabel
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
                borderX="none"
                borderTop="none"
                borderRadius="0"
                pos="relative"
                outline="none"
                borderBottom="1px solid rgb(148, 148, 148)"
                w="full"
                minH="10"
                py="2.5"
                boxSizing="border-box"
                fontSize="sm"
                resize="none"
                display="block"
                lineHeight="1.4em"
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
          </FormControl>
        </Flex>
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
    fields: [],
  },
};
