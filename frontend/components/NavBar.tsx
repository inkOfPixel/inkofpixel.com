import React, { PropsWithChildren } from "react";

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
import { InlineBlocks } from "react-tinacms-inline";
import { NAV_BLOCK } from "@features/defaultBlocks/";
import { NavBlockData } from "@features/defaultBlocks/NavigationBlock";
import { SectionBlockTemplateData } from "@features/pageBlocks/types";
import MenuIcon from "@components/MenuIcon";
import { useCMS } from "tinacms";
import DrawerLogo from "@components/DrawerLogo";
import { useRouter } from "next/router";

export type NavigationSectionBlockData = SectionBlockTemplateData<
  "navigationSection",
  {
    id: string;
    availableLanguages: Nullable<string[]>;
    blocks?: NavBlockData[];
  }
>;

const StyledInlineBlocks = chakra(InlineBlocks);

export function NavBar(props: PropsWithChildren<unknown>) {
  return (
    <Flex as="header" w="full" pos="absolute" zIndex="1" h="40">
      <Box
        h="full"
        px={{
          base: "6",
          sm: "10",
          xl: "0",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        my="0"
        mx="auto">
        <Flex h="full" justifyContent="space-between" alignItems="center">
          {props.children}
        </Flex>
      </Box>
    </Flex>
  );
}

export function NavMenu() {
  const cms = useCMS();
  return (
    <Flex
      alignItems={"baseline"}
      flex={{
        lg: "1 1 0%",
      }}
      mr="8"
      mb="1"
      display={{
        base: "none",
        lg: "block",
      }}
      textAlign={cms.enabled ? "right" : "left"}>
      <StyledInlineBlocks
        sx={{
          "& > div": {
            w: `${cms.enabled ? "36" : "auto"}`,
          },
        }}
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
  );
}

export function MobileNavMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <Box
      display={{
        base: "block",
        lg: "none",
      }}>
      <MenuIcon
        onClick={onOpen}
        boxSize="24px"
        _hover={{ cursor: "pointer" }}
        color={"rgb(22,19,56)"}
        w="40px"
        h="40px"
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
  );
}
