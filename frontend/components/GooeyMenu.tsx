import { Box, chakra, Checkbox, FormLabel, Link } from "@chakra-ui/react";
import React, { useState } from "react";

export const GooeyMenu = chakra(({ renderLabel, children }: any) => {
  const [open, setOpen] = useState(false);

  function handleToggleMenu() {
    setOpen(!open);
  }
  const StyledLabel = chakra(FormLabel);

  return (
    <React.Fragment>
      <GooeySVGDefs />
      <Box pos="relative" filter="url(#shadowed-goo1)" overflow="visible">
        <Checkbox
          userSelect="none"
          type="checkbox"
          name="gooey-menu-open"
          id="gooey-menu-open"
          display="none"
          onChange={handleToggleMenu}></Checkbox>
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
          {children.map((lang: any, index: number): any =>
            open === true ? (
              <Link
                userSelect="none"
                fontFamily="Roboto Mono"
                href={"/" + lang.props.children.toLowerCase()}
                fontSize="xs"
                transitionTimingFunction="cubic-bezier(0.165, 0.84, 0.44, 1)"
                transitionDuration={300 + 100 * index + "ms"}
                _hover={{
                  transform: "scale(1.1, 1.1)",
                }}
                key={index}
                transform="translate3d(0, 0, 0)">
                <a>{lang}</a>
              </Link>
            ) : (
              <Link
                href="/"
                fontFamily="Roboto Mono"
                fontSize="xs"
                transitionDuration={300 + 100 * index + "ms"}
                transform={"translate3d(0," + -64 * (index + 1) + "px, 0)"}
                key={index}>
                <a>{lang}</a>
              </Link>
            )
          )}
        </Box>
        <StyledLabel
          userSelect="none"
          fontWeight="light"
          fontFamily="Roboto Mono"
          fontSize="xs"
          pos="relative"
          backgroundColor="dark"
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
          <Box className="toggleButtonContent">
            {renderLabel && renderLabel()}
          </Box>
        </StyledLabel>
      </Box>
    </React.Fragment>
  );
});

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
