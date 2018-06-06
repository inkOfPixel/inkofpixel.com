// @flow

import React, { type Node, Component } from "react";
import styled from "styled-components";
import Link from "gatsby-link";

type Props = {};

class Footer extends Component<Props> {
  render() {
    return (
      <Container>
        <Wrapper>
          <p>
            © 2018 Fiber 4.0 Spa |{" "}
            <StyledLink to="/privacy-policy">Privacy Policy</StyledLink> |{" "}
            <StyledLink to="/cookies">Cookies</StyledLink> |{" "}
            <StyledLink to="/Disclaimer">Disclaimer</StyledLink>
          </p>
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.footer`
  background-color: #161338;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  padding-bottom: 80px;
  color: #fff;
`;

const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  position: relative;
  letter-spacing: 0.02em;
  @media (max-width: 1000px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  &::before {
    background: #fff;
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

export default Footer;
