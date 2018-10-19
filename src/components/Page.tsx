import "normalize.css";
import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import { ThemeProvider, createGlobalStyle } from "types/styled-components";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import it from "react-intl/locale-data/it";
import itMessages from "translations/locales/it.json";
import defaultTheme from "themes/default.json";
import Header from "components/Header";
import Footer from "components/Footer";
import CookieBar from "components/CookieBar";
import favicon from "images/favicon.png";
import { IPageLocale } from "types/index";
import simplePathJoin from "utils/simplePathJoin";

interface IProps {
  theme: any;
  title: string;
  description: string;
  localeCode: string;
  defaultLocaleCode: string;
  pageLocales?: IPageLocale[];
}

addLocaleData([...en, ...it]);

const GlobalStyle = createGlobalStyle`
  @import url("https://use.typekit.net/zrn4omm.css");
  @import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,500");

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Roboto Mono", monospace;
    color: ${props => props.theme.colors.darkBlue};
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
`;

interface ILayoutPageQueryData {
  site: {
    siteMetadata: {
      origin: string;
    };
  };
}

class Page extends React.Component<IProps> {
  static defaultProps = {
    theme: defaultTheme,
    defaultLocaleCode: "en"
  };

  render() {
    const {
      children,
      theme,
      localeCode,
      defaultLocaleCode,
      pageLocales,
      title,
      description
    } = this.props;
    const translations: { [code: string]: any } = { it: itMessages };
    const currentPageLocale = pageLocales
      ? pageLocales.find(pageLocale => pageLocale.code === localeCode)
      : undefined;
    if (pageLocales && !currentPageLocale) {
      throw new Error(`Couldn't find page with locale code ${localeCode}`);
    }
    return (
      <IntlProvider locale={localeCode} messages={translations[localeCode]}>
        <ThemeProvider theme={theme}>
          <StaticQuery
            query={graphql`
              query LayoutPageQuery {
                site {
                  siteMetadata {
                    origin
                  }
                }
              }
            `}
          >
            {(data: ILayoutPageQueryData) => {
              return (
                <>
                  <GlobalStyle />
                  <Helmet>
                    <html lang={localeCode} />
                    <link rel="icon" href={favicon} type="image/png" />
                    <title>
                      {/inkofpixel/i.test(title)
                        ? title
                        : `${title} | inkOfPixel`}
                    </title>
                    <meta
                      name="description"
                      content={
                        description ||
                        "We are software company. We build innovative digital solutions and never stop learning. If you’re looking for new ideas and talented people to bring them to life, this is the right place."
                      }
                    />
                    <meta
                      name="keywords"
                      content="shopify,e-commerce,webapp,app,sofware,react,gatsby"
                    />
                    <meta property="og:title" content={title} />
                    <meta property="og:type" content="website" />
                    {currentPageLocale && (
                      <meta
                        property="og:url"
                        content={simplePathJoin(
                          data.site.siteMetadata.origin,
                          currentPageLocale.url
                        )}
                      />
                    )}
                    <meta
                      property="og:description"
                      content={
                        description ||
                        "We are software company. We build innovative digital solutions and never stop learning. If you’re looking for new ideas and talented people to bring them to life, this is the right place."
                      }
                    />
                    {pageLocales &&
                      pageLocales.map(pageLocale => (
                        <link
                          key={pageLocale.code}
                          rel="alternate"
                          hrefLang={pageLocale.code}
                          href={simplePathJoin(
                            data.site.siteMetadata.origin,
                            pageLocale.url
                          )}
                        />
                      ))}
                  </Helmet>
                  <Header
                    locale={localeCode}
                    defaultLocale={defaultLocaleCode}
                    pageLocales={pageLocales}
                  />
                  {children}
                  <Footer />
                  <CookieBar locale={localeCode} />
                </>
              );
            }}
          </StaticQuery>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default Page;
