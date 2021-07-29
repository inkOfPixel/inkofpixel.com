import { Box, Checkbox, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export interface MenuContext {
  isOpen: boolean;
  toggle(): void;
}

export const MenuContext = React.createContext<MenuContext | null>(null);

function useMenuContext() {
  const value = React.useContext(MenuContext);
  if (value == null) {
    throw new Error("Can't use useMenuContext without a LocaleMenu");
  }
  return value;
}

export function LocaleMenu({ children }: React.PropsWithChildren<unknown>) {
  const [isOpen, setIsOpen] = React.useState(false);
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <MenuContext.Provider value={{ isOpen, toggle }}>
      <React.Fragment>
        <GooeySVGDefs />
        <Box filter="url(#shadowed-goo1)" overflow="visible">
          {children}
        </Box>
      </React.Fragment>
    </MenuContext.Provider>
  );
}

export function LocaleMenuButton({
  children,
}: React.PropsWithChildren<unknown>) {
  const value = useMenuContext();
  return (
    <Box>
      <Checkbox
        userSelect="none"
        type="checkbox"
        name="gooey-menu-open"
        id="gooey-menu-open"
        display="none"
        onChange={value.toggle}
      />
      <FormLabel
        userSelect="none"
        fontWeight="light"
        fontFamily="Roboto Mono"
        fontSize="xs"
        pos="relative"
        backgroundColor="dark"
        borderRadius="100%"
        display="block"
        zIndex="1"
        left="0.5"
        w="12"
        h="12"
        color="white"
        textAlign="center"
        lineHeight="48px"
        htmlFor="gooey-menu-open"
        transitionDuration="400ms"
        transform={
          value.isOpen
            ? "scale(0.8, 0.8) translate3d(0, 0, 0)"
            : "scale(1, 1) translate3d(0, 0, 0)"
        }
        cursor="pointer"
        _hover={{
          transform: `${
            value.isOpen ? null : "scale(1.1, 1.1) translate3d(0, 0, 0)"
          }`,
        }}
        sx={{
          "&::before": {
            pos: "absolute",
            zIndex: "1",
            transition: "all 200ms",
            opacity: `${value.isOpen ? "1" : "0"}`,
            content: "'✕'",
            fontSize: "25px",
            color: "white",
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            top: "1%",
            h: "98%",
            w: "98%",
            borderRadius: "100%",
            backgroundColor: "dark",
          },
        }}>
        {children}
      </FormLabel>
    </Box>
  );
}

export function LocaleMenuList(props: React.PropsWithChildren<unknown>) {
  const children = React.Children.map(props.children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index });
    }
    return child;
  });
  return (
    <Box
      mt="-2.5"
      pos="absolute"
      color="white"
      transition="transform ease-out 2000ms"
      backgroundColor="transparent">
      {children}
    </Box>
  );
}

type LocaleMenuLinkProps = React.PropsWithChildren<{
  index?: number;
  href: string;
  locale: string;
}>;

export function LocaleMenuLink({
  index = 0,
  href,
  locale,
  children,
}: LocaleMenuLinkProps) {
  const value = useMenuContext();

  return (
    <Link locale={locale} href={href} passHref>
      <Box
        as="a"
        pos="relative"
        display="block"
        borderRadius="full"
        w="44px"
        h="44px"
        userSelect="none"
        fontFamily="Roboto Mono"
        backgroundColor="dark"
        mt="5"
        left="1"
        color="white"
        textAlign="center"
        lineHeight="44px"
        transition="transform 200ms ease-out 0"
        fontSize="xs"
        transitionTimingFunction="cubic-bezier(0.165, 0.84, 0.44, 1)"
        transitionDuration={`${300 + 100 * index}ms`}
        _hover={{
          transform: "scale(1.1, 1.1)",
        }}
        transform={
          value.isOpen
            ? "translate3d(0, 0, 0)"
            : `translate3d(0, ${-64 * (index + 1)}px, 0)`
        }>
        {children}
      </Box>
    </Link>
  );
}

const GooeySVGDefs = () => (
  <Box as="svg" pos="absolute" width="0" height="0">
    <defs>
      <filter id="shadowed-goo1">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <filter id="shadowed-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
        <feColorMatrix
          in="shadow"
          mode="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
          result="shadow"
        />
        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
        <feComposite in2="shadow" in="goo" result="goo" />
        <feComposite in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
  </Box>
);
