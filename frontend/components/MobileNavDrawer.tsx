import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Icon,
  IconProps,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export function MobileNavDrawer({
  children,
}: React.PropsWithChildren<unknown>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      display={{
        base: "block",
        lg: "none",
      }}
    >
      <MenuIcon
        onClick={onOpen}
        _hover={{ cursor: "pointer" }}
        color="primaryText"
        w="10"
        h="10"
      />
      <Drawer
        placement="left"
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
        onEsc={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody onClick={onClose}>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export const MenuIcon = (props: IconProps) => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="primaryText"
      strokeWidth="1.5"
      {...props}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Icon>
  );
};
