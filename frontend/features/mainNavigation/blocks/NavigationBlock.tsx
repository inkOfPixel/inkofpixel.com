import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";

export type NavBlockData = BlockTemplateData<
  "navigationLink",
  {
    id: string;
    label?: Nullable<string>;
    url?: Nullable<string>;
  }
>;

interface NavigationBlockProps {
  url: string;
}

export function NavigationBlock({ url }: NavigationBlockProps) {
  return (
    <Link href={url} passHref>
      <Box
        display="block"
        m="0"
        ml="2.5"
        px="2.5"
        py="3"
        letterSpacing="0.08em"
        color="dark"
        position="relative"
        transition="all 0.3s"
        fontSize="sm"
        fontWeight="subtitle"
        _before={{
          background: "rgb(22,19,56)",
          bottom: "-1px",
          content: "' '",
          height: "0.5",
          left: "50%",
          position: "absolute",
          width: "0%",
          transition: "all 300ms",
          transform: "translateX(-50%) translateY(-50%)",
        }}
        _hover={{
          cursor: "pointer",
          _before: {
            opacity: "1",
            w: "full",
          },
        }}>
        <InlineTextarea name="label" />
      </Box>
    </Link>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <NavigationBlock {...data} />
    </BlocksControls>
  );
}

export const NavLinkBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "nav",
    defaultItem: {
      label: "Link",
      url: "/",
    },
    fields: [
      {
        name: "url",
        label: "Link url",
        component: "text",
      },
      {
        name: "label",
        label: "Link label",
        component: "text",
      },
    ],
  },
};
