import { Box, chakra } from "@chakra-ui/react";
import Link from "next/link";
import { BlockTemplateData } from "@features/sectionBlocks";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineTextarea,
} from "react-tinacms-inline";

export type NavBlockData = BlockTemplateData<
  "ComponentBlocksNavigation",
  {
    id: string;
    pageName?: Nullable<string>;
    path?: Nullable<string>;
  }
>;
interface NavBlockProps {
  path: string;
  isOpen: boolean;
}

export function NavigationBlock({ path, isOpen }: NavBlockProps) {
  return (
    <Link href={path} passHref>
      <Box
        display={isOpen ? "inline-block" : "block"}
        m="0"
        px="2.5"
        py={isOpen ? "5" : "3"}
        letterSpacing="0.02em"
        color="dark"
        className="link"
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
          _before: {
            opacity: "1",
            w: "full",
          },
        }}>
        <InlineTextarea name="pageName" />
      </Box>
    </Link>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <NavigationBlock image={data.image} {...data} />
    </BlocksControls>
  );
}

export const navigationBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "nav",
    defaultItem: {
      pageName: "Link",
      path: "/",
    },
    fields: [
      {
        name: "path",
        label: "Url",
        component: "text",
      },
      {
        name: "pageName",
        label: "Page",
        component: "text",
      },
    ],
  },
};
