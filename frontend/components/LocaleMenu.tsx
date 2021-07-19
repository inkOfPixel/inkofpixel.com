import { Box, Checkbox, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import React, { PropsWithChildren, useState } from "react";

export function LocaleMenu(props: PropsWithChildren<unknown>) {
  return (
    <React.Fragment>
      <GooeySVGDefs />
      <Box pos="relative" filter="url(#shadowed-goo1)" overflow="visible">
        {props.children}
      </Box>
    </React.Fragment>
  );
}

export function LocaleMenuButton(props: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState(false);
  function handleToggleMenu() {
    setOpen(!open);
  }

  return (
    <Box>
      <Checkbox
        userSelect="none"
        type="checkbox"
        name="gooey-menu-open"
        id="gooey-menu-open"
        display="none"
        onChange={handleToggleMenu}
      />
      <FormLabel
        userSelect="none"
        fontWeight="light"
        fontFamily="Roboto Mono"
        fontSize="xs"
        pos="relative"
        backgroundColor="green"
        borderRadius="100%"
        display="block"
        w="44px"
        h="44px"
        color="white"
        textAlign="center"
        lineHeight="44px"
        htmlFor="gooey-menu-open"
        transitionDuration="400ms"
        transform={
          open === true
            ? "scale(0.8, 0.8) translate3d(0, 0, 0)"
            : "scale(1, 1) translate3d(0, 0, 0)"
        }
        cursor="pointer"
        _hover={{
          transform: `${
            open === false ? "scale(1.1, 1.1) translate3d(0, 0, 0)" : null
          }`,
        }}
        css={{
          ".toggleButtonContent": {
            opacity: `${open === true ? "0" : "1"}`,
          },
        }}
        sx={{
          "&::before": {
            pos: "absolute",
            zIndex: "1",
            transition: "all 200ms",
            opacity: `${open === false ? "0" : "1"}`,
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
        {props.children}
      </FormLabel>
    </Box>
  );
}

export function LocaleMenuList(props: PropsWithChildren<unknown>) {
  return (
    <Box
      pos="absolute"
      pt="44px"
      spacing="20px"
      color="white"
      transition="transform ease-out 2000ms"
      backgroundColor="transparent"
      sx={{
        "& > *": {
          pos: "relative",
          mt: "20px",
          backgroundColor: "dark",
          borderRadius: "100%",
          display: "block",
          w: "44px",
          h: "44px",
          color: "white",
          textAlign: "center",
          lineHeight: "44px",
          transition: "transform 200ms ease-out 0",
        },
      }}>
      {props.children}
    </Box>
  );
}

type LocaleMenuLinkProps = {
  key: number;
  href: string;
  locale: string;
};

export function LocaleMenuLink(props: LocaleMenuLinkProps) {
  return (
    <Link href={"/" + props.href} locale={props.locale} passHref>
      <Box
        userSelect="none"
        fontFamily="Roboto Mono"
        fontSize="xs"
        transitionTimingFunction="cubic-bezier(0.165, 0.84, 0.44, 1)"
        transitionDuration={300 + 100 * props.key + "ms"}
        _hover={{
          transform: "scale(1.1, 1.1)",
        }}
        key={props.key}
        transform="translate3d(0, 0, 0)">
        {props.locale}
      </Box>
    </Link>
  );
}

const GooeySVGDefs = () => (
  <svg width={0} height={0}>
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
  </svg>
);
