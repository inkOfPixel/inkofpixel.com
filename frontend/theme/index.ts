import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  ...chakraTheme.fonts,
  body: `"Roboto Mono", monospace`,
  heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const config: ThemeOverride["config"] = {
  // @ts-ignore
  initialColorMode: "system",
  useSystemColorMode: true,
};

const overrides: ThemeOverride = {
  config,
  fonts,
  breakpoints,
  fontWeights: {
    normal: 300,
    subtitle: 400,
    medium: 600,
    bold: 700,
  },
  fontsizes: {
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
  lineHeights: {
    hero: "1.1em",
    subtitle: "1.8em",
  },
  colors: {
    dark: "rgb(22,19,56)",
  },
  components: {
    /*
        Define custom components
    */
  },
};

const customTheme = extendTheme(overrides);

export default customTheme;
