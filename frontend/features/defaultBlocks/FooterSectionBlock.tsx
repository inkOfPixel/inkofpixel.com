import { Box, chakra, Flex, Text, Link } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
} from "react-tinacms-inline";
import { BlockTemplateData } from "../pageBlocks/types";
import Logo from "@components/Logo";
import { FooterBlockData } from "@features/defaultBlocks/FooterBlock";
import { FOOTER_BLOCK } from "@features/defaultBlocks";

export type FooterSectionBlockData = BlockTemplateData<
  "footerSection",
  {
    id: string;
    description: Nullable<string>;
    email: Nullable<string>;
    sharedCapital: Nullable<number>;
    street: Nullable<string>;
    cap: Nullable<number>;
    city: Nullable<string>;
    vatNumber: Nullable<number>;
    copyright: Nullable<string>;
    blocks: FooterBlockData[];
  }
>;

const StyledInlineBlocks = chakra(InlineBlocks);

export default function FooterSectionBlock({
  description,
  email,
  sharedCapital,
  street,
  cap,
  city,
  vatNumber,
  copyright,
}: FooterSectionBlockData) {
  return (
    <Box
      fontFamily="Roboto Mono"
      letterSpacing="0.08em"
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
          <Box
            color="white"
            as={"a"}
            width={{
              base: "150px",
              sm: "200px",
            }}
            height="54px">
            <Logo width="100%" height="100%" color="white" />
          </Box>
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
            flexDirection="column"
            flexGrow={1}
            flexShrink={0}
            flexBasis="auto">
            <Box
              className="caption"
              mb="6"
              fontSize="sm"
              maxW="500px"
              lineHeight="1.8em">
              <Box as="span">{description}</Box>
            </Box>

            <Box>
              <Link
                style={{ textDecoration: "none", userSelect: "none" }}
                href={"mailto:" + email}>
                <Box
                  as="span"
                  fontFamily="Europa"
                  fontSize="2xl"
                  fontWeight="bold"
                  letterSpacing="0.04em"
                  display="inline"
                  pos="relative"
                  transition="all 300ms ease 0s"
                  color="white"
                  _before={{
                    backgroundColor: "white",
                    opacity: 0,
                    bottom: "-4px",
                    content: "' '",
                    h: "2px",
                    left: "50%",
                    pos: "absolute",
                    w: "0%",
                    transition: "all 300ms ease 0s",
                    transform: "translateX(-50%) translateY(0px)",
                  }}
                  _hover={{
                    _before: {
                      opacity: "1",
                      w: "full",
                    },
                  }}>
                  {email}
                </Box>
              </Link>
            </Box>

            <StyledInlineBlocks
              display="flex"
              flexDir={{
                base: "column",
                sm: "row",
              }}
              fontSize="sm"
              lineHeight="1.4em"
              name="blocks"
              blocks={FOOTER_BLOCK}
            />
          </Flex>
        </Flex>
        <Box m="0" pt="12" fontSize="sm" lineHeight="1.4em">
          <Text pb="4">{copyright}</Text>
          <Text>
            {"Capital €" +
              sharedCapital +
              " i.v • " +
              street +
              " - " +
              cap +
              " " +
              city +
              " • " +
              "VAT Number " +
              vatNumber +
              " • REA MI - 2081233"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FooterSectionBlock {...data} />
    </BlocksControls>
  );
}

export const footerSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Footer",
    fields: [
      {
        name: "description",
        label: "Description",
        component: "text",
        defaultValue: "description",
      },
      {
        name: "street",
        label: "Street",
        component: "text",
        defaultValue: "street",
      },
      {
        name: "email",
        label: "Email",
        component: "text",
        defaultValue: "email",
      },
      {
        name: "city",
        label: "City",
        component: "text",
        defaultValue: "city",
      },
      {
        name: "cap",
        label: "CAP",
        component: "text",
        defaultValue: "province",
      },
      {
        name: "sharedCapital",
        label: "Shared Capital",
        component: "number",
        defaultValue: "sharedCapital",
      },
      {
        name: "vatNumber",
        label: "Vat number",
        component: "number",
        defaultValue: "vatNumber",
      },
      {
        name: "sharedCapital",
        label: "Shared Capital",
        component: "text",
        defaultValue: "sharedCapital",
      },
      {
        name: "copyright",
        label: "Copyright",
        component: "text",
        defaultValue: "copyright",
      },
    ],
    defaultItem: {
      blocks: [
        {
          _template: "ComponentBlocksFooter",
          province: "Milano",
          street: "Piazza Castello 26",
          type: "Legal HQ",
          city: "Milano",
          cap: "20121",
          initials: "MI",
        },
        {
          _template: "ComponentBlocksFooter",
          province: "Treviso",
          street: "Via Leonardo da Vinci 2",
          type: "Operational HQ",
          city: "Godega di Sant'Urbano",
          cap: "31010",
          initials: "TV",
        },
      ],
      description:
        "We collaborate with ambitious brands and entrepreneurs. We’d love to build something great together.",
      email: "info@inkofpixel.com",
      sharedCapital: "Capital $10200 i.v",
      street: "Piazza Castello n. 26",
      city: "Milano",
      cap: "20121",
      vatNumber: "123",
      copyright: "© 2021 inkOfPixel Srl. All rights reserved.",
    },
  },
};
