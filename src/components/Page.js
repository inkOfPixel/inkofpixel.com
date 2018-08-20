// flow

import React, { type Node, Fragment } from "react";
import Helmet from "react-helmet";
import { ThemeProvider } from "styled-components";
import defaultTheme from "themes/default.json";
import Header from "components/Header";
import Footer from "components/Footer";
import CookieBar from "components/CookieBar";
import LanguageBanner from "containers/LanguageBanner";
import favicon from "images/inkOfPixel - Favicon.png";

type Props = {
  children: Node,
  theme: Object,
  locale: string,
  defaultLocale: string,
  navigation: any
};

const Page = ({
  children,
  theme,
  navigation,
  locale,
  defaultLocale
}: Props) => (
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
        <meta property="og:url" content="/" />
        <meta property="og:title" content="inkOfPixel" />
        <meta
          property="og:description"
          content="We are software company. We build innovative digital solutions and never stop learning. If you’re looking for new ideas and talented people to bring 
      them to life, this is the right place.
      "
        />
        {/* <meta property="
      og: image " content={ogImage} /> */}
      </Helmet>
      <LanguageBanner />
      <Header
        navigation={navigation}
        locale={locale}
        defaultLocale={defaultLocale}
      />
      {children}
      <Footer locale={locale} navigation={navigation} />
      <CookieBar />
    </Fragment>
  </ThemeProvider>
);

Page.defaultProps = {
  theme: defaultTheme
};

export default Page;
