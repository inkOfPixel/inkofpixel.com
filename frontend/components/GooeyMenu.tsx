import { Box, chakra, Checkbox, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";

export const GooeyMenu = chakra(({ renderLabel, children }: any) => {
  const [open, setOpen] = useState(false);

  function handleToggleMenu() {
    setOpen(!open);
  }
  const StyledLabel = chakra(FormLabel);
  const itemCount = React.Children.count(children);
  console.log("OPEN? ", open);

  return (
    <React.Fragment>
      <GooeySVGDefs />
      <Box pos="relative" filter="url('#shadowed-goo1)" overflow="visible">
        <Checkbox
          type="checkbox"
          name="gooey-menu-open"
          id="gooey-menu-open"
          display="none"
          onChange={handleToggleMenu}
          sx={{
            "&:checked": {
              "& ~ label ": {
                transitionTimingFunction: "linear",
                transitionDuration: "200ms",
                transform: "scale (0.8, 0.8) translate3d(0, 0, 0)",
                ".toggleButtonContent": {
                  opacity: "0",
                },
                "&::before": {
                  opacity: "1",
                },
              },
              "& ~ .items > * ": {
                transitionTimingFunction: "cubic-bezier(0.165, 0.84, 0.44, 1)",
                transform: "translate3d(0, 0, 0)",
                transitionDuration: "400ms",
                "&:hover": {
                  transition: "transform 400ms",
                  transform: "scale(1.1, 1.1)",
                },
              },
            },
          }}></Checkbox>
        <Box
          pos="absolute"
          pt="44px"
          spacing="20px"
          color="white"
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
              transition: "transform ease-out 200ms",
            },
          }}>
          {children}
        </Box>
        <StyledLabel
          pos="relative"
          backgroundColor="dark"
          borderRadius="100%"
          display="block"
          w="44px"
          h="44px"
          color="white"
          textAlign="center"
          lineHeight="44px"
          transition="transform ease-out 200ms"
          htmlFor="gooey-menu-open"
          transitionDuration="400ms"
          transform="scale(1, 1) translate3d(0, 0, 0)"
          cursor="pointer"
          _hover={{
            transform: "scale(1.1, 1.1) translate3d(0, 0, 0)",
          }}
          css={{
            ".toggleButtonContent": {
              opacity: 1,
            },
          }}
          _before={{
            pos: "absolute",
            zIndex: "1",
            transition: "all 200ms",
            opacity: "0",
            content: "'✕'",
            fontSize: "25px",
            color: "white",
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            top: "1%",
            h: "98%",
            w: "98%",
            borderRadius: "100%",
            backgroundColor: "green.600",
          }}>
          <Box className="toggleButtonContent">{renderLabel()}</Box>
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
