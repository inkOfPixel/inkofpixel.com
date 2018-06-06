// @flow

import "normalize.css";
import React, { type Node, Component } from "react";
import Helmet from "react-helmet";
import styled, { injectGlobal } from "styled-components";
import Link from "gatsby-link";
import Header from "components/Header";
import Footer from "components/Footer";
import PhoneNumber from "components/PhoneNumber";
import CookieBar from "components/CookieBar";
import backgroundImage from "images/Fiber4Retelit - Background.jpg";
import favicon from "images/Fiber4Retelit - Favicon.png";

injectGlobal`
  @import url("https://fonts.googleapis.com/css?family=Playfair+Display:700|Roboto+Condensed:300,400,700");
  body {
    font-family: "Roboto Condensed", sans-serif;
    color: #161338;
  }
  h1 {
    font-family: "Playfair Display", serif;
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
          <title>Fiber4Retelit</title>
          <meta
            name="description"
            content="Crediamo che occorra cambiare passo nella gestione affinché Retelit possa fare un salto dimensionale e qualitativo"
          />
          <meta
            name="keywords"
            content="retelit,fiber,ICT,technology,telecomunication,legal,finance"
          />
          <meta property="og:url" content="/" />
          <meta
            property="og:title"
            content="Fiber4Retelit - Rendiamo Retelit leader dei servizi ICT alle imprese"
          />
          <meta
            property="og:description"
            content="Crediamo che occorra cambiare passo nella gestione affinché Retelit possa fare un salto dimensionale e qualitativo"
          />
          {/* <meta property="og:image" content={ogImage} /> */}
        </Helmet>
        <Header />
        <Background />
        {children()}
        <PhoneNumber />
        <Footer />
        <CookieBar>
          {accept => (
            <Bar>
              <Text>
                Questo sito utilizza i cookie per garantire una migliore
                esperienza utente. Continuando la navigazione accetti la nostra{" "}
                <StyledLink to="/privacy-policy">cookies policy</StyledLink>
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

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-image: url("${backgroundImage}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  z-index: -2;
  opacity: 0.5;
    @media (max-width: 1000px) {
        background-size: cover;
    }
`;

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
