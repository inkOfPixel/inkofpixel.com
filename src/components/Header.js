// @flow

import React, { type Node, Component, Fragment } from "react";
import { slide as SlideMenu } from "react-burger-menu";
import styled from "styled-components";
import Link from "gatsby-link";
import Logo from "components/Logo";
import Wrapper from "components/Wrapper";

type Props = {
  locale: string,
  defaultLocale: string,
  navigation: {
    main?: Array<{
      label: string,
      href: string
    }>,
    language?: Array<{
      locale: string,
      url: string
    }>
  }
};

type State = {
  isMobileMenuOpen: boolean
};

class Header extends Component<Props, State> {
  static defaultProps = {
    locale: "en",
    defaultLocale: "en",
    navigation: {}
  };

  state = {
    isMobileMenuOpen: false
  };

  handleMobileMenuStateChange = ({ isOpen }: any) => {
    this.setState(() => ({ isMobileMenuOpen: isOpen }));
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen
    }));
  };

  render() {
    const { isMobileMenuOpen } = this.state;
    const { navigation, locale, defaultLocale } = this.props;
    return (
      <Fragment>
        <DesktopMenuContainer>
          <Wrapper>
            <LogoLink to={locale === defaultLocale ? "" : `/${locale}`}>
              <Logo />
            </LogoLink>
            <RightBarItems>
              <List>
                {navigation.main &&
                  navigation.main.map(item => (
                    <ListItem key={item.label}>
                      <PageAnchorLink to={item.url}>
                        {item.label}
                      </PageAnchorLink>
                    </ListItem>
                  ))}
              </List>
              <LanguageNavigation>
                {navigation.language &&
                  navigation.language.map(item => (
                    <Link
                      key={item.locale}
                      to={item.url}
                      className={item.locale === locale ? "selected" : ""}
                    >
                      {item.locale}
                    </Link>
                  ))}
              </LanguageNavigation>
            </RightBarItems>
          </Wrapper>
        </DesktopMenuContainer>
      </Fragment>
    );
  }
}

const DesktopMenuContainer = styled.header`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 160px;
`;

const LogoLink = styled(Link)`
  position: absolute;
  display: block;
  left: 0px;
  top: 53px;
  @media (max-width: 1260px) {
    left: 40px;
  }
  @media (max-width: 700px) {
    left: 20px;
  }
`;

const PageAnchorLink = styled.a.attrs({
  href: props => props.to
})``;

const RightBarItems = styled.div`
  position: absolute;
  right: 0px;
  top: 60px;
  margin: 0;
  display: flex;
  align-items: baseline;
`;

const List = styled.ul`
  list-style: none;
  @media (max-width: 1260px) {
    right: 40px;
  }
  @media (max-width: 899px) {
    display: none;
  }
`;

let ListItem = ({
  children,
  className
}: {
  children: Node,
  className?: string
}) => <li className={className}>{children}</li>;

ListItem = styled(ListItem)`
  display: inline-block;
  a {
    display: block;
    margin: 0 0px 0 10px;
    padding: 12px 10px;
    letter-spacing: 0.02em;
    color: ${props => props.theme.navigationColor};
    text-decoration: none;
    position: relative;
    transition: all 300ms;
    font-weight: 400;
    font-size: 14px;
    &::before {
      background: ${props => props.theme.navigationColor};
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
`;

const MobileMenuContainer = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
  height: 160px;
  ${LogoLink} {
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

// const MobileLink = styled(Link)`
//   display: inline-block;
//   color: #161338;
//   text-decoration: none;
//   font-size: 24px;
//   padding-bottom: 30px;
// `;

const ResourceLink = styled.a`
  display: inline-block;
  color: #161338;
  text-decoration: none;
  font-size: 24px;
  padding-bottom: 30px;
`;

const LanguageNavigation = styled.nav`
  margin-left: 40px;
  a {
    color: #161338;
    position: relative;
    font-size: 13px;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 20px;
    &::before {
      background: #161338;
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
    &:hover,
    &.selected {
      &::before {
        opacity: 1;
        width: 100%;
      }
    }
  }
`;

export default Header;
