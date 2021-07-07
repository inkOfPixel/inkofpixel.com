import { Box, Link } from "@chakra-ui/react";
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
    <Box>
      <Link
        display={isOpen ? "inline-block" : "block"}
        m={isOpen ? "0px 0px 0px 0px" : "0px 0px 0px 10px"}
        p={isOpen ? "20px 10px" : "12px 10px"}
        letterSpacing={"0.02em"}
        color={"dark"}
        className="link"
        position={"relative"}
        transition={"all 0.3s"}
        fontSize={"sm"}
        fontWeight={"subtitle"}
        href={path}
        _before={{
          background: "rgb(22,19,56)",
          bottom: "-1px",
          content: "' '",
          height: "2px",
          left: "50%",
          position: "absolute",
          width: "0%",
          transition: "all 300ms",
          transform: "translateX(-50%) translateY(-50%)",
        }}
        _hover={{
          _before: {
            opacity: "1",
            w: "100%",
          },
        }}>
        <InlineTextarea name="pageName" />
      </Link>
    </Box>
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
