import { Box } from "@chakra-ui/react";
import Splash from "@components/Splash";
import React from "react";
import {
  BlockComponentProps,
  BlocksControls,
  Block,
} from "react-tinacms-inline";

import Link from "next/link";
import {
  FacebookIcon,
  GithubIcon,
  QuestionMarkIcon,
  TwitterIcon,
} from "@components/SocialIcons";

export type SocialBubbleBlockData = BlockTemplateData<
  "socialBubble",
  {
    id: string;
    url: Nullable<string>;
    bubbleColor: Nullable<string>;
    bubbleHoverColor: Nullable<string>;
    image: Nullable<SocialImage>;
  }
>;

interface SocialImage {
  id: string;
  url: string;
  alternativeText: Nullable<string>;
}

type SocialBubbleBlockProps = {
  url: string;
  bubbleColor: Nullable<string>;
  bubbleHoverColor: Nullable<string>;
};

export default function SocialBubbleBlock({
  url,
  bubbleColor,
  bubbleHoverColor,
}: SocialBubbleBlockProps) {
  return (
    <Link href={url} passHref>
      <Box as="a" my="1" mx="2">
        <Splash
          className="contactBubble"
          transition="0.3s all"
          backgroundColor={bubbleColor ? bubbleColor : "rgba(248,223,255, 0.7)"}
          _hover={{
            backgroundColor: bubbleHoverColor
              ? bubbleHoverColor
              : "rgba(248,223,255, 1)",
          }}
          pos="relative"
          w="60px"
          h="60px"
        >
          {url.includes("facebook") ? (
            <FacebookIcon color="white" />
          ) : url.includes("github") ? (
            <GithubIcon color="white" />
          ) : url.includes("twitter") ? (
            <TwitterIcon color="white" />
          ) : (
            <QuestionMarkIcon color="white" />
          )}
        </Splash>
      </Box>
    </Link>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <SocialBubbleBlock {...data} />
    </BlocksControls>
  );
}

export const socialBlock: Block = {
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
