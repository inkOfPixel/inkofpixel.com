import AppProviders from "@components/AppProviders";
import { AppProps } from "next/app";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProviders preview={pageProps.preview === true}>
      <Component {...pageProps} />
    </AppProviders>
  );
}

export default MyApp;
