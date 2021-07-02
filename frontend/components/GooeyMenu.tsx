import { Box, Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";

export default function GooeyMenu({
  color = "#fff",
  backgroundColor = "rgb(22, 19, 56)",
  size = 80,
  spacing = 20,
  className,
  renderLabel,
  children,
  open,
}: any) {
  const [state, setState] = useState(open);

  function handleToggleMenu() {
    setState(!state);
  }

  const itemCount = React.Children.count(children);

  return (
    <React.Fragment>
      <GooeySVGDefs />
      <Box
        position="relative"
        filter="url('#shadowed-goo1')"
        overflow="visible"
        className={className}>
        <Checkbox
          type={"checkbox"}
          name={"gooey-menu-open"}
          id={"gooey-menu-open"}
          display={"none"}
          itemCount={itemCount}
          onChange={handleToggleMenu}
          checked={state}
        />

        {/*Da dare ai bottoni
          background={backgroundColor}
          borderRadius={"100%"}
          display={"block"}
          width={size}
          height={size}
          text-align={"center"}
          line-height={size}
          transform={"scale(1,1) translate3d(0, 0, 0)"} -> Questa è la regola che sposta i bottoni
          transition={"transform ease-out 200ms"}*/}

        <Box
          position={"absolute"}
          pt={size}
          mt={spacing}
          itemCount={itemCount}
          color={color}
          backgroundColor={backgroundColor}
          
          ></Box>
        <Box
          as={"label"}
          pos={"relative"}
          htmlFor="gooey-menu-open"
          color={color}
          backgroundColor={backgroundColor}
          background={backgroundColor}
          borderRadius={"100%"}
          display={"block"}
          width={size}
          height={size}
          text-align={"center"}
          line-height={size}
          transform={"scale(1,1) translate3d(0, 0, 0)"}
          transition={"transform ease-out 200ms"}
          transitionDuration={"400ms"}
          cursor={"pointer"}
          _hover={{
            transform: "scale(1.1, 1.1) translate3d(0,0,0)",
          }}
          _before={{
            pos: "absolute",
            zIndex: "1",
            transition: "all 200ms",
            opacity: "0",
            content: "'✕'",
            fontsize: "25px",
            color: { color },
            left: "50%",
            transform: "translate3d(-50%, 0, 0)",
            top: "1%",
            h: "98%",
            w: "98%",
            borderRadius: "100%",
            backgroundColor: { backgroundColor },
          }}>
          <Box
            pos={"relative"}
            textAlign="center"
            top={"30%"}
            fontSize={"xs"}
            className="toggleButtonContent">
            {renderLabel && renderLabel()}
          </Box>
        </Box>
      </Box>
    </React.Fragment>
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
