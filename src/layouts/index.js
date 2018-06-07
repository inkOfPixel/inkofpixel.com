// @flow

import "normalize.css";
import React, { type Node, Component } from "react";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";
import Link from "gatsby-link";
import Header from "components/Header";
import Footer from "components/Footer";
import CookieBar from "components/CookieBar";
import favicon from "images/inkOfPixel - Favicon.png";

injectGlobal`
 @import url("https://use.typekit.net/zrn4omm.css");
  body {
    font-family: "Europa", sans-serif;
    color: #161338;
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

type Props = {
  children: Function
};

class TemplateWrapper extends Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <Container>
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
            content="shopify,react,gatsby,webapp,app,sofware"
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
        <Header />
        {children()}
        <Footer />
        <CookieBar>
          {accept => (
            <Bar>
              <Text>
                Questo sito utilizza i cookie per garantire una migliore
                esperienza utente.Continuando la navigazione accetti la nostra
                <StyledLink to="/privacy-policy"> cookies policy </StyledLink>
              </Text>
              <button onClick={accept} />
            </Bar>
          )}
        </CookieBar>
      </Container>
    );
  }
}

const Container = styled.div``;

const Bar = styled.div`
  background-color: #fff;
  border-top: 1px solid #dadada;
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  button {
    position: absolute;
    right: 10px;
    top: 10px;
    background: transparent;
    border: none;
    height: 30px;
    width: 30px;
    padding: 0;
    &:hover {
      cursor: pointer;
    }
    &::before {
      content: "";
      background-color: red;
      height: 2px;
      width: 80%;
      display: block;
      transform: rotate(45deg);
      position: absolute;
      background-color: #161338;
    }
    &::after {
      content: "";
      background-color: red;
      height: 2px;
      width: 80%;
      display: block;
      transform: rotate(-45deg);
      position: absolute;
      background-color: #161338;
    }
  }
`;
const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  padding: 20px 40px;
`;

const StyledLink = styled(Link)`
  color: #161338;
  text-decoration: none;
  position: relative;
  &::before {
    background: #161338;
    opacity: 0;
    bottom: -5px;
    content: "";
    height: 1px;
    left: 50%;
    position: absolute;
    width: 0%;
    transition: all 300ms;
    transform: translateX(-50%) translateY(0);
  }
  &:hover {
    &::before {
      opacity: 1;
      width: 100%;
    }
  }
`;

export default TemplateWrapper;
