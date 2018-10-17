import React from "react";
import styled from "styled-components";
import ScrollableAnchor from "react-scrollable-anchor";
import { FormattedMessage } from "react-intl";
import Wrapper from "components/Wrapper";
import Logo from "components/Logo";

interface IProps {}

export default class Footer extends React.Component<IProps> {
  render() {
    return (
      <ScrollableAnchor id="contacts">
        <Container>
          <Wrapper>
            <Flexbox>
              <Logo />
              <div className="contact">
                <div className="caption">
                  <FormattedMessage
                    id="footer.contacts.description"
                    defaultMessage="We collaborate with ambitious brands and entrepreneurs.{newLine}We’d love to build something great together."
                    values={{ newLine: <br /> }}
                  />
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
                <FormattedMessage
                  id="footer.copyright"
                  defaultMessage="© {year} inkOfPixel Srl. All rights reserved."
                  values={{ year: new Date().getFullYear() }}
                />
              </p>
              <p className="companyInfo">
                <FormattedMessage
                  id="footer.companyInfo"
                  defaultMessage="Capital €10200 i.v. • Piazza Castello n. 26 - 20121 Milano • VAT
                Number 09287730965 • REA MI - 2081233"
                />
              </p>
            </BottomLine>
          </Wrapper>
        </Container>
      </ScrollableAnchor>
    );
  }
}

const Container = styled.footer`
  background-color: ${props => props.theme.colors.green};
  position: relative;
  overflow: hidden;
  padding-top: 150px;
  padding-bottom: 150px;
  color: ${props => props.theme.colors.white};
`;

const Flexbox = styled.div`
  display: flex;
  @media (max-width: 850px) {
    flex-direction: column;
  }
  ${Logo} {
    fill: ${props => props.theme.colors.white};
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
      color: ${props => props.theme.colors.white};
      &::before {
        background: ${props => props.theme.colors.white};
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
  padding-top: 50px;
  font-size: 13px;
  line-height: 1.4em;
  .copyright {
    padding-bottom: 15px;
  }
`;
