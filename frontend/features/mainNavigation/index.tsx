import React from "react";
import { Box, chakra, Flex } from "@chakra-ui/react";
import { InlineBlocks } from "react-tinacms-inline";
import { NAV_BLOCK } from "@features/page/navigationMenu";
import { NavBlockData } from "@features/page/navigationMenu/NavigationBlock";
import { useCMS } from "tinacms";
import Logo from "@components/Logo";
import { useRouter } from "next/router";
import { BlockTemplateData, Nullable } from "@types";

export type NavigationSectionBlockData = BlockTemplateData<
  "navigationSection",
  {
    id: string;
    availableLanguages: Nullable<string[]>;
    blocks?: NavBlockData[];
  }
>;

const NavigationInlineBlocks = chakra(InlineBlocks);

export function NavBar({ children }: React.PropsWithChildren<unknown>) {
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
          {children}
        </Flex>
      </Box>
    </Flex>
  );
}

export function NavMenuDesktop() {
  const cms = useCMS();

  return (
    <Flex
      alignItems="baseline"
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
      <NavigationInlineBlocks
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

export function NavMenuMobile() {
  const router = useRouter();
  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      mt="16"
      alignItems="center"
      textAlign="center">
      <Box as="a" href={router.locale} ml="1" mb="8">
        <Logo width="10" height="10" color={"rgb(22, 19, 56)"} />
      </Box>
      <NavigationInlineBlocks
        name="global.topbar.menu.links"
        blocks={NAV_BLOCK}
        sx={{
          "& > div": {
            ml: "0",
          },
        }}
      />
    </Flex>
  );
}
