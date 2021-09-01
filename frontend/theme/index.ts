import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";

const fonts = {
  ...chakraTheme.fonts,
  body: `"Roboto Mono", monospace`,
};

const config: ThemeOverride["config"] = {
  // @ts-ignore
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides: ThemeOverride = {
  config,
  fonts,
  fontWeights: {
    normal: 300,
    subtitle: 400,
    medium: 600,
    bold: 700,
  },
  fontsizes: {
    footer: "10px",
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "46px",
    "6xl": "64px",
  },
  letterSpacings: {
    body: "0.02em",
  },
  lineHeights: {
    hero: "1.1em",
    subtitle: "1.8em",
  },
  colors: {
    primaryText: "#161338",
    subdudeText: "#5C5C5C",
    emerald: {
      50: "#E6FFFA",
      500: "#4FD1C5",
    },
  },
  styles: {
    global: {
      body: {
        fontSize: "sm",
        letterSpacing: "body",
      },
    },
  },
};

const customTheme = extendTheme(overrides);

export default customTheme;
