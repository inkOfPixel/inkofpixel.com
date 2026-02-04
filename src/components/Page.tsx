import "normalize.css";
import React from "react";
import { ThemeProvider, createGlobalStyle } from "types/styled-components";
import { IntlProvider } from "react-intl";
import itMessages from "translations/locales/it.json";
import defaultTheme from "themes/default.json";
import Header from "components/Header";
import Footer from "components/Footer";
import CookieBar from "components/CookieBar";
import { IPageLocale } from "types/index";

interface IProps {
  theme: any;
  localeCode: string;
  defaultLocaleCode: string;
  pageLocales?: IPageLocale[];
  headerTheme?: string;
  navigationLinks: Array<{ label: string; url: string }>;
  cookiePolicyPath?: string;
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Roboto Mono", monospace;
    color: ${(props) => props.theme.colors.darkBlue};
  }
  h1 {
    font-family: "Europa", sans-serif;
  }
  p {
    margin: 0;
  }
  a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }

  a[href^="tel"] {
    color: inherit;
    text-decoration: none;
  }
  .no-scroll {
    overflow: hidden;
  }
`;

class Page extends React.Component<IProps> {
  static defaultProps = {
    theme: defaultTheme,
    defaultLocaleCode: "en",
    headerTheme: "light",
  };

  render() {
    const {
      children,
      theme,
      localeCode,
      defaultLocaleCode,
      pageLocales,
      headerTheme,
      navigationLinks,
      cookiePolicyPath,
    } = this.props;
    const translations: { [code: string]: any } = { it: itMessages };
    return (
      <IntlProvider
        locale={localeCode}
        messages={translations[localeCode] || {}}
      >
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <Header
              locale={localeCode}
              defaultLocale={defaultLocaleCode}
              pageLocales={pageLocales}
              headerTheme={headerTheme}
              navigationLinks={navigationLinks}
            />
            {children}
            <Footer />
            <CookieBar locale={localeCode} cookiePolicyPath={cookiePolicyPath} />
          </>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default Page;
