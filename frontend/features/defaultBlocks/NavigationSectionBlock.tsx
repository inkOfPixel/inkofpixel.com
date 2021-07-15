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
import { NAV_BLOCK } from "@features/sectionBlocks";
import { NavBlockData } from "@features/sectionBlocks/NavigationBlock";
import { SectionBlockTemplateData } from "../pageBlocks/types";
import Menu from "@components/Menu";
import { useCMS } from "tinacms";
import Icon from "@components/Icon";
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

const StyledMenu = chakra(Menu);
const StyledInlineBlocks = chakra(InlineBlocks);
const StyledGooeyMenu = chakra(GooeyMenu);
const StyledDrawer = chakra(Drawer);

export function NavigationSectionBlock(data: NavigationSectionBlockData) {
  const cms = useCMS();
  const router = useRouter();

  const uniqueArray = data.availableLanguages?.filter((item, index) => {
    const _thing = JSON.stringify(item);
    return (
      index ===
      data.availableLanguages?.findIndex((obj) => {
        return JSON.stringify(obj) === _thing;
      })
    );
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="header" w="full" pos="absolute" h="40">
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
        m={{
          base: "0 auto",
        }}>
        <Flex h="full" alignItems="center">
          <Box
            display={{
              base: "block",
              lg: "none",
            }}>
            <StyledMenu
              onClick={onOpen}
              color={"rgb(22,19,56)"}
              display={{
                base: "block",
                lg: "none",
              }}
              size="10"
              _hover={{ cursor: "pointer" }}
            />
            <StyledDrawer
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
                    <Box as={"a"} href={router.locale} ml="1" mb="8">
                      <Icon
                        width="10"
                        height="10"
                        navigationColor={"rgb(22, 19, 56)"}
                      />
                    </Box>
                    <StyledInlineBlocks
                      textAlign="center"
                      name="blocks"
                      blocks={NAV_BLOCK}
                      isOpen={true}
                    />
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </StyledDrawer>
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
              display={{
                base: "none",
                lg: "flex",
              }}
              flex="1 1 0%"
              w="full"
              mr="8"
              justifyContent="flex-end"
              flexDir="row"
              name="blocks"
              blocks={NAV_BLOCK}
              direction="horizontal"
              max={6}
            />
          </Flex>

          <StyledGooeyMenu
            mt="3"
            mr={{
              base: "0",
              xl: "8",
            }}
            renderLabel={() => (
              <span className="selected">{router.locale?.toUpperCase()}</span>
            )}
            size="10">
            {uniqueArray?.map((lang: any, index) => (
              <span key={index}>{lang.locale.toUpperCase()}</span>
            ))}
          </StyledGooeyMenu>
        </Flex>
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  console.log("aa", JSON.stringify(data, null, " "));

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
