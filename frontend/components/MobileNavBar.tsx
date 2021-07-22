import {
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconProps,
  useDisclosure,
} from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export function MobileNavMenu(props: PropsWithChildren<unknown>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      display={{
        base: "block",
        lg: "none",
      }}>
      <MenuIcon
        onClick={onOpen}
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
          <DrawerBody onClick={onClose}>{props.children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export const MenuIcon = chakra((props: IconProps) => {
  return (
    <Icon
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="40px"
      height="40px"
      fill="none"
      stroke="dark"
      strokeWidth="1.5"
      {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Icon>
  );
});
