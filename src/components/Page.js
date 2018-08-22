// flow

import React, { type Node, Fragment } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import it from "react-intl/locale-data/it";
import itMessages from "translations/locales/it.json";
import defaultTheme from "themes/default.json";
import Header from "components/Header";
import Footer from "components/Footer";
import CookieBar from "components/CookieBar";
import favicon from "images/inkOfPixel - Favicon.png";

type Props = {
  children: Node,
  theme: Object,
  locale: string,
  defaultLocale: string,
  navigation: any
};

type State = {
  inferredLocale: string
};

addLocaleData([...en, ...it]);

class Page extends React.Component<Props, State> {
  static defaultProps = {
    theme: defaultTheme
  };

  state = {
    inferredLocale: this.props.locale
  };

  componentDidMount() {
    const inferredLocale =
      (window.navigator.languages && window.navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage ||
      this.state.inferredLocale;
    if (inferredLocale !== this.state.inferredLocale) {
      this.setState({ inferredLocale });
    }
  }

  render() {
    const { children, theme, navigation, locale, defaultLocale } = this.props;
    return (
      <IntlProvider locale={locale} messages={{ it: itMessages }[locale]}>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Helmet>
              <link rel="icon" href={favicon} type="image/png" />
              <title>inkOfPixel</title>
              <meta
                name="description"
                content="We are software company. We build innovative digital solutions and never stop learning. If you’re looking for new ideas and talented people to bring 
      them to life, this is the right place.
      "
              />
              <meta
                name="keywords"
                content="shopify,e-commerce,webapp,app,sofware,react,gatsby"
              />
              <meta property="og:title" content="inkOfPixel" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="/" />
              <meta
                property="og:description"
                content="We are software company. We build innovative digital solutions and never stop learning. If you’re looking for new ideas and talented people to bring 
      them to life, this is the right place.
      "
              />
              {/* <meta property="
      og: image " content={ogImage} /> */}
            </Helmet>
            <Header
              navigation={navigation}
              locale={locale}
              defaultLocale={defaultLocale}
            />
            {children}
            <Footer />
            <CookieBar />
          </Fragment>
        </ThemeProvider>
      </IntlProvider>
    );
  }
}

export default Page;
