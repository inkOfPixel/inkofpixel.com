import {
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {
  Block,
  BlockComponentProps,
  BlocksControls,
  InlineBlocks,
} from "react-tinacms-inline";
import { NAV_BLOCK } from "@features/defaultBlocks/";
import { NavBlockData } from "@features/defaultBlocks/NavigationBlock";
import { SectionBlockTemplateData } from "../pageBlocks/types";
import MenuIcon from "@components/MenuIcon";
import { useCMS } from "tinacms";
import DrawerLogo from "@components/DrawerLogo";
import { GooeyMenu } from "@components/GooeyMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "@components/Logo";

export type NavigationSectionBlockData = SectionBlockTemplateData<
  "navigationSection",
  {
    id: string;
    availableLanguages: Nullable<string[]>;
    blocks?: NavBlockData[];
  }
>;

const StyledInlineBlocks = chakra(InlineBlocks);

export function NavigationSectionBlock() {
  const cms = useCMS();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="full" alignItems="center">
      <Box
        display={{
          base: "block",
          lg: "none",
        }}>
        <MenuIcon
          onClick={onOpen}
          boxSize="10"
          display={{
            base: "block",
            lg: "none",
          }}
          _hover={{ cursor: "pointer" }}
          color={"rgb(22,19,56)"}
          w="40"
          h="40"
        />
        <Drawer
          placement="left"
          onClose={onClose}
          isOpen={isOpen}
          autoFocus={false}
          onEsc={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody onClick={onClose}>
              <Flex
                justifyContent="center"
                flexDir="column"
                mt="16"
                alignItems="center"
                textAlign="center">
                <Box as="a" href={router.locale} ml="1" mb="8">
                  <DrawerLogo
                    width="40"
                    height="40"
                    navigationColor={"rgb(22, 19, 56)"}
                  />
                </Box>
                <StyledInlineBlocks
                  textAlign="center"
                  name="global.topbar.menu.links"
                  blocks={NAV_BLOCK}
                  isOpen={true}
                />
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Flex
        flex={{
          base: "1 1 0%",
          lg: "null",
        }}
        mr="4"
        ml="4"
        justifyContent={{
          base: "center",
          lg: "flex-start",
        }}>
        <Link href="/" passHref>
          <Box
            color={"rgb(22, 19, 56)"}
            as="a"
            width={{
              base: "36",
              sm: "52",
            }}
            height="54px">
            <Logo width="100%" height="100%" color="rgb(22, 19, 56)" />
          </Box>
        </Link>
      </Flex>
      <Flex
        alignItems={"baseline"}
        flex={{
          lg: "1 1 0%",
        }}
        textAlign={cms.enabled ? "right" : "left"}>
        <StyledInlineBlocks
          zIndex="1"
          display={{
            base: "none",
            lg: "flex",
          }}
          flex="1 1 0%"
          w="full"
          mr="8"
          justifyContent="flex-end"
          flexDir="row"
          name="global.topbar.menu.links"
          blocks={NAV_BLOCK}
          direction="horizontal"
          max={6}
        />
      </Flex>

      <GooeyMenu
        mt="3"
        mr={{
          base: "0",
          xl: "8",
        }}
        renderLabel={() => (
          <span className="selected">{router.locale?.toUpperCase()}</span>
        )}
        size="10"
      />
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  console.log("data", JSON.stringify(data, null, " "));

  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <NavigationSectionBlock {...data} />
    </BlocksControls>
  );
}
export const navigationSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "Navigation Section",
    defaultItem: {
      blocks: [
        {
          _template: "ComponentBlocksNavigation",
          pageName: "Default",
          path: "/",
        },
        {
          _template: "ComponentBlocksNavigation",
          pageName: "Default",
          path: "/",
        },
        {
          _template: "ComponentBlocksNavigation",
          pageName: "Default",
          path: "/",
        },
        {
          _template: "ComponentBlocksNavigation",
          pageName: "Default",
          path: "/",
        },
      ],
    },
    fields: [],
  },
};
