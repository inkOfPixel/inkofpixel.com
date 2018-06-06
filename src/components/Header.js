// @flow

import React, { type Node, Component, Fragment } from "react";
import { slide as SlideMenu } from "react-burger-menu";
import styled from "styled-components";
import Link from "gatsby-link";
import logo from "images/Fiber4Retelit - Logo.svg";

type Props = {};
type State = {
  isMobileMenuOpen: boolean
};

class Header extends Component<Props, State> {
  state = {
    isMobileMenuOpen: false
  };

  handleMobileMenuStateChange = ({ isOpen }) => {
    this.setState(() => ({ isMobileMenuOpen: isOpen }));
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  render() {
    const { isMobileMenuOpen } = this.state;
    return (
      <Fragment>
        <MobileMenuContainer>
          <Logo to="/">
            <Icon src={logo} alt="Fiber 4.0 logo" />
            <Wordmark>Fiber 4.0</Wordmark>
          </Logo>
          <MobileMenu
            right
            isOpen={isMobileMenuOpen}
            onStateChange={this.handleMobileMenuStateChange}
            customCrossIcon={<CrossIcon />}
            customBurgerIcon={<BurgerIcon />}
          >
            <MobileLink to="/" onClick={this.toggleMenu}>
              Home
            </MobileLink>
            <MobileLink to="/english-version" onClick={this.toggleMenu}>
              English version
            </MobileLink>
            <MobileLink to="/documenti" onClick={this.toggleMenu}>
              Documenti
            </MobileLink>
            <ResourceLink
              href="/assets/fiber-4.0-prospetto-informativo.pdf"
              onClick={this.toggleMenu}
              target="_blank"
            >
              Prospetto informativo
            </ResourceLink>
            <ResourceLink
              href="assets/fiber-4.0-modulo-di-delega.pdf"
              onClick={this.toggleMenu}
              target="_blank"
            >
              Modulo di delega
            </ResourceLink>
          </MobileMenu>
        </MobileMenuContainer>
        <DesktopMenuContainer>
          <Wrapper>
            <Logo to="/">
              <Icon src={logo} alt="Fiber 4.0 logo" />
              <Wordmark>Fiber 4.0</Wordmark>
            </Logo>
            <List>
              <ListItem>
                <Link to="/english-version">English version</Link>
              </ListItem>
              <ListItem>
                <Link to="/documenti">Documenti</Link>
              </ListItem>
              <ListItem className="button secondary">
                <a
                  href="/assets/fiber-4.0-prospetto-informativo.pdf"
                  target="_blank"
                >
                  Prospetto informativo
                </a>
              </ListItem>
              <ListItem className="button primary">
                <a href="assets/fiber-4.0-modulo-di-delega.pdf" target="_blank">
                  Modulo di delega
                </a>
              </ListItem>
            </List>
          </Wrapper>
        </DesktopMenuContainer>
      </Fragment>
    );
  }
}

const DesktopMenuContainer = styled.header`
  @media (max-width: 899px) {
    display: none;
  }
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 160px;
  background: rgba(255, 255, 255, 0.95);
`;
const Wrapper = styled.div`
  width: 960px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 1000px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const Logo = styled(Link)`
  position: absolute;
  display: block;
  left: 0px;
  font-size: 22px;
  color: #4840bb;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-decoration: none;
  top: 24px;
  @media (max-width: 1000px) {
    left: 40px;
  }
  @media (max-width: 600px) {
    left: 20px;
  }
`;

const Icon = styled.div.attrs({
  children: ({ src, alt }) => <img src={src} alt={alt} />
})`
  width: 50px;
  img {
    width: 100%;
  }
`;

const Wordmark = styled.div`
  position: absolute;
  width: 100px;
  top: 45px;
  left: 58px;
`;

const List = styled.ul`
  list-style: none;
  position: absolute;
  right: 0px;
  top: 60px;
  margin: 0;
  @media (max-width: 1000px) {
    right: 40px;
  }
`;

let ListItem = ({ children, className }) => (
  <li className={className}>{children}</li>
);

ListItem = styled(ListItem)`
  display: inline-block;
  a {
    display: block;
    margin: 0 0px 0 10px;
    padding: 12px 10px;
    letter-spacing: 0.02em;
    color: #161338;
    text-decoration: none;
    position: relative;
    transition: all 300ms;
    &::before {
      background: #161338;
      opacity: 0;
      bottom: -1px;
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
  &.button {
    a {
      padding: 12px 20px;
      &::before {
        display: none;
      }
    }
    &.primary a {
      border: 1px solid #4840bb;
      background-color: #4840bb;
      color: #fff;
      &:hover {
        background-color: #3f38a3;
      }
    }
    &.secondary a {
      color: #4840bb;
      border: 1px solid #4840bb;
      &:hover {
        background-color: rgba(72, 64, 187, 0.2);
      }
    }
  }
`;

const MobileMenuContainer = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
  height: 160px;
  ${Logo} {
    top: 60px;
  }
  /* Position and sizing of burger button */
  .bm-burger-button {
    position: fixed;
    width: 56px;
    height: 56px;
    right: 20px;
    top: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
  }
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #161338;
    height: 10% !important;
  }
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 32px !important;
    width: 32px !important;
    right: 20px !important;
    top: 20px !important;
  }
  /* Color/shape of close button cross */
  .bm-cross {
  }
  /* General sidebar styles */
  .bm-menu {
    // background: red;
    // padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }
  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 40px;
  }

  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const CrossIcon = styled.div`
  &::before {
    content: "";
    background-color: red;
    height: 2px;
    width: 100%;
    display: block;
    transform: rotate(45deg);
    margin-top: 50%;
    position: absolute;
    background-color: #161338;
  }
  &::after {
    content: "";
    background-color: red;
    height: 2px;
    width: 100%;
    display: block;
    transform: rotate(-45deg);
    margin-top: 50%;
    position: absolute;
    background-color: #161338;
  }
`;
const BurgerIcon = styled.div`
  width: 28px !important;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 2px !important;
  background-color: #161338;
  ::before,
  ::after {
    content: "";
    width: 100%;
    position: absolute;
    display: block;
    background-color: #161338;
    height: 2px;
  }
  ::before {
    top: -10px;
  }
  ::after {
    top: 10px;
  }
`;

const MobileMenu = styled(SlideMenu)`
  background: #fff;
  padding: 2.5em 1.5em 0;
  font-size: 1.15em;
  top: 0;
`;

const MobileLink = styled(Link)`
  display: inline-block;
  color: #161338;
  text-decoration: none;
  font-size: 24px;
  padding-bottom: 30px;
`;

const ResourceLink = styled.a`
  display: inline-block;
  color: #161338;
  text-decoration: none;
  font-size: 24px;
  padding-bottom: 30px;
`;

export default Header;
