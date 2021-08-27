import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
} from "react-tinacms-inline";

export type FooterBlockData = BlockTemplateData<
  "footer",
  {
    id: string;
    city: Nullable<string>;
    type: Nullable<string>;
    street: Nullable<string>;
    cap: Nullable<number>;
    province: Nullable<string>;
    provinceInitials: Nullable<string>;
  }
>;

interface FooterBlockProps {
  city: Nullable<string>;
  type: Nullable<string>;
  street: Nullable<string>;
  cap: Nullable<number>;
  province: Nullable<string>;
  provinceInitials: Nullable<string>;
}

export function FooterBlock({
  city,
  type,
  street,
  cap,
  province,
  provinceInitials,
}: FooterBlockProps) {
  return (
    <Flex flexGrow={1} flexDir="column" pt="12">
      <Box fontFamily="Europa" fontSize="2xl" fontWeight="bold">
        {province}
      </Box>
      <Box fontSize="footer" opacity="0.6" pb="2.5">
        <Box as="span">{type}</Box>
      </Box>
      <Box>{street}</Box>
      <Box>{city}</Box>
      <Box>{`${cap} (${provinceInitials})`}</Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <FooterBlock {...data} />
    </BlocksControls>
  );
}

export const footerBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Footer Block",
    defaultItem: {
      province: "Default province",
      street: "Default street",
      type: "Default type",
      city: "Default city",
      cap: parseInt("12345"),
      provinceInitials: "XX",
    },
    fields: [
      {
        name: "province",
        label: "Province",
        component: "text",
        defaultValue: "province",
      },
      {
        name: "street",
        label: "Street",
        component: "text",
        defaultValue: "street",
      },
      {
        name: "type",
        label: "Type",
        component: "text",
        defaultValue: "type",
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
        component: "number",
        defaultValue: "province",
      },
      {
        name: "provinceInitials",
        label: "Initials",
        component: "text",
        defaultValue: "provinceInitials",
      },
    ],
  },
};
