/// <reference types="astro/client" />

import "styled-components";
import ThemeInterface from "themes/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInterface {}
}
