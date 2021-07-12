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
import { SectionBlockTemplateData } from "./types";
import Menu from "@components/Menu";
import { useCMS } from "tinacms";
import Icon from "@components/Icon";
import { Image } from "@chakra-ui/image";
import { GooeyMenu } from "@components/GooeyMenu";

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

export function NavigationSectionBlock(data: NavigationSectionBlockData) {
  const cms = useCMS();
  /*
  const uniqueArray = things.thing.filter((thing, index) => {
    const _thing = JSON.stringify(thing);
    return index === things.thing.findIndex(obj => {
      return JSON.stringify(obj) === _thing;
    });
  });
*/
  console.log("UNIQUE", uniqueArray);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex as="header" w="full" zIndex="100" pos="absolute" h="40">
      <Box
        h="full"
        p={{
          base: "0px 26px",
          md: "0px 40px",
        }}
        w={{
          base: "full",
          xl: "1200px",
        }}
        m={{
          base: "0px auto",
        }}>
        <Flex h="full" alignItems="center">
          <Box
            display={{
              base: "block",
              lg: "none",
            }}>
            <StyledMenu
              mb={"2.5"}
              onClick={onOpen}
              color={"rgb(22,19,56)"}
              display={{
                base: "block",
                lg: "none",
              }}
              size="40px"
              _hover={{ cursor: "pointer" }}
            />
            <Drawer
              placement="left"
              onClose={onClose}
              isOpen={isOpen}
              autoFocus={false}
              onEsc={onClose}
              size="xs">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody>
                  <Flex
                    justifyContent="center"
                    flexDir="column"
                    mt={16}
                    alignItems="center"
                    textAlign="center">
                    <Box as={"a"} href={"/"} ml={1} mb={8}>
                      <Icon
                        width="40px"
                        height="40px"
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
            </Drawer>
          </Box>
          <Flex
            flex={{
              base: "1 1 0%",
              lg: "null",
            }}
            justifyContent={{
              base: "center",
              lg: "flex-start",
            }}>
            <Box
              color={"rgb(22, 19, 56)"}
              as={"a"}
              href="/"
              width={{
                base: "150px",
                sm: "200px",
              }}
              height="54px">
              <Image alt="Logo" src="/logo.svg" fill="rgb(22, 19, 56)" />
            </Box>
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
              mr="30px"
              justifyContent="flex-end"
              flexDir="row"
              name="blocks"
              blocks={NAV_BLOCK}
              direction="horizontal"
              max={6}
            />
          </Flex>

          <StyledGooeyMenu
            mr={{
              base: "0",
              xl: "30px",
            }}
            renderLabel={() => <span className="selected">{"EN"}</span>}
            size={"44px"}>
            {data.availableLanguages?.map((lang, index) => (
              <span key={index}>{lang.locale.toUpperCase()}</span>
            ))}
          </StyledGooeyMenu>
        </Flex>
      </Box>
    </Flex>
  );
}

function BlockComponent({ index, data }: BlockComponentProps) {
  return (
    <BlocksControls index={index} focusRing={{ offset: 0 }} insetControls>
      <NavigationSectionBlock {...data} />
    </BlocksControls>
  );
}
export const navigationSectionBlock: Block = {
  Component: BlockComponent,
  template: {
    label: "navigationSection",
    defaultItem: {
      blocks: [
        {
          id: "0",
          pageName: "Default",
          path: "/",
        },
      ],
    },
    fields: [],
  },
};
