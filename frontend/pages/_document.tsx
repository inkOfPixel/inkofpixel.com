/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-page-custom-font */
import { ColorModeScript } from "@chakra-ui/react";
import Theme from "@theme";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="//db.onlinewebfonts.com/c/23c0fcab84d99da0de762de7e220a6e1?family=Europa"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body
          style={{
            letterSpacing: "var(--chakra-letterSpacings-body)",
            fontSize: "var(--chakra-fontSizes-sm)",
          }}
        >
          <ColorModeScript initialColorMode={Theme.config?.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
