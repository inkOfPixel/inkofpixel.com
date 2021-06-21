// styled-components.ts
import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface ThemeInterface {
  colors: {
    [name: string]: string | undefined;
  };
  navigationColor: string;
  languageSelector: {
    color: string;
    backgroundColor: string;
  };
  languageSelectorDark: {
    color: string;
    backgroundColor: string;
  };
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as unknown as ThemedStyledComponentsModule<ThemeInterface>;

export { css, createGlobalStyle, keyframes, ThemeProvider, withTheme };
export default styled;
