// @flow

import React, { type Node, Component } from "react";
import styled from "styled-components";
import Wrapper from "components/Wrapper";
import Link from "gatsby-link";
import Logo from "components/Logo";

type Props = {};

class Footer extends Component<Props> {
  render() {
    return (
      <Container id="Contacts">
        <Wrapper>
          <Flexbox>
            <Logo color="#fff" />
            <div className="contact">
              <div className="caption">
                We collaborate with ambitious brands and people;
                <br />
                We’d love to build something great together.
              </div>
              <a
                className="mail"
                href="mailto:info@inkofpixel.com"
                target="_top"
              >
                info@inkofpixel.com
              </a>
            </div>
          </Flexbox>
          <BottomLine>
            <p className="copyright">
              © 2018 inkOfPixel Srl. All rights reserved.
            </p>
            <p className="companyInfo">
              Capital €10200 i.v. • Piazza Castello n. 26 - 20121 Milano • VAT
              Number 09287730965 • REA MI - 2081233
            </p>
          </BottomLine>
        </Wrapper>
      </Container>
    );
  }
}

const Container = styled.footer`
  background-color: #05c3b6;
  position: relative;
  overflow: hidden;
  padding-top: 150px;
  padding-bottom: 150px;
  color: #fff;
`;

const Flexbox = styled.div`
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
  }
  .contact {
    padding-left: 100px;
    box-sizing: border-box;
    @media (max-width: 850px) {
      padding-left: 0;
      padding-top: 60px;
    }
    .caption {
      font-size: 14px;
      line-height: 1.8em;
    }
    .mail {
      font-family: Europa;
      font-size: 24px;
      padding-top: 24px;
      font-weight: 700;
      letter-spacing: 0.04em;
      display: inline-block;
      text-decoration: none;
      position: relative;
      transition: all 300ms;
      color: #fff;
      &::before {
        background: #fff;
        opacity: 0;
        bottom: -4px;
        content: "";
        height: 2px;
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
    }
  }
`;
const BottomLine = styled.div`
   {
    padding-top: 100px;
    font-size: 13px;
    line-height: 1.4em;
    .copyright {
      padding-bottom: 15px;
    }
  }
`;

export default Footer;
