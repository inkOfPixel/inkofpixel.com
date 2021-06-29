import { Box, Link } from "@chakra-ui/react";
import { BlockTemplateData } from "@features/pageBlocks";
import React from "react";
import { Block, BlocksControls, InlineTextarea } from "react-tinacms-inline";

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
}

export function NavigationBlock({ path }: NavBlockProps) {
  return (
    <Box>
      <Link
        display={"block"}
        m={"0px 0px 0px 10px"}
        p={"12px 10px"}
        letterSpacing={"0.02em"}
        color={"dark"}
        className="link"
        position={"relative"}
        transition={"all 0.3s"}
        fontSize={"sm"}
        fontWeight={"subtitle"}
        href={path}
      >
        <InlineTextarea name="pageName" />
      </Link>
    </Box>
  );
}

export const navigationBlock: Block = {
  Component: ({ index, data }) => {
    return (
      <BlocksControls index={index} focusRing={{ offset: 0 }}>
        <NavigationBlock
          key={data.id}
          imageUrl={data.imageUrl}
          serviceLink={data.serviceLink}
          {...data}
        />
      </BlocksControls>
    );
  },
  template: {
    label: "nav",
    defaultItem: {
      pageName: "Link",
      path: "/home",
    },
    fields: [
      {
        name: "path",
        label: "Url",
        component: "text",
      },
    ],
  },
};
