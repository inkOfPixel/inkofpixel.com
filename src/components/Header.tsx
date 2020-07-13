import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled, { withTheme } from "types/styled-components";
import { FormattedMessage } from "react-intl";
import Logo from "components/Logo";
import Icon from "components/Icon";
import Wrapper from "components/Wrapper";
import GooeyMenu from "components/GooeyMenu";
import { IPageLocale } from "types";
import ThemeInterface from "themes/theme";
import Menu from "icons/Menu";
import SideBarPanel from "./SidebarPanel";
import { css } from "styled-components";

interface IProps {
  theme: ThemeInterface;
  locale: string;
  defaultLocale: string;
  pageLocales?: IPageLocale[];
  headerTheme: string;
}

interface IState {
  languageMenuOpen: boolean;
  isMobileNavOpen: boolean;
}

interface IHeaderQueryData {
  navigation: {
    locales: INavigationLocale[];
  };
}

interface INavigationLocale {
  language: string;
  main: {
    links: Array<{ label: string; url: string }>;
  };
}

class Header extends React.Component<IProps, IState> {
  static defaultProps = {
    locale: "en",
    defaultLocale: "en",
  };

  state = {
    languageMenuOpen: false,
    isMobileNavOpen: false,
  };

  handleToggleLanguageMenu = (open: boolean) => {
    this.setState({
      languageMenuOpen: open,
    });
  };

  handleOpenSidenav = () => {
    this.setState({
      isMobileNavOpen: true,
    });
  };

  handleCloseSidenav = () => {
    this.setState({
      isMobileNavOpen: false,
    });
  };

  render() {
    const { languageMenuOpen } = this.state;
    const {
      locale,
      defaultLocale,
      pageLocales,
      theme,
      headerTheme,
    } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query HeaderQuery {
            navigation: settingsJson(fields: { name: { eq: "navigation" } }) {
              locales {
                language
                main {
                  links {
                    label
                    url
                  }
                }
              }
            }
          }
        `}
        render={({ navigation }: IHeaderQueryData) => {
          const localizedNavigation = navigation.locales.find(
            (navLocale) => navLocale.language === locale
          );

          if (!localizedNavigation) {
            throw new Error(
              `Didn't found any navigation with locale ${locale}`
            );
          }
          return (
            <>
              <DesktopMenuContainer>
                <Wrapper style={{ height: "100%" }}>
                  <NavContainer headerTheme={headerTheme}>
                    <MenuIcon onClick={this.handleOpenSidenav} />
                    <LogoContainer>
                      <LogoLink
                        to={locale === defaultLocale ? "" : `/${locale}`}
                      >
                        <Logo />
                        <AssistiveText>
                          <FormattedMessage
                            id="header.logo.assistiveText"
                            defaultMessage="Link to home page"
                          />
                        </AssistiveText>
                      </LogoLink>
                    </LogoContainer>
                    <RightBarItems>
                      <List>
                        {localizedNavigation.main &&
                          localizedNavigation.main.links.map((link) => (
                            <ListItem key={link.label}>
                              <Link to={link.url}>{link.label}</Link>
                            </ListItem>
                          ))}
                      </List>
                      {pageLocales &&
                        pageLocales.length > 1 && (
                          <LanguageSelector
                            renderLabel={() => (
                              <span className="selected">{locale}</span>
                            )}
                            color={
                              headerTheme === "dark"
                                ? theme.languageSelectorDark.color
                                : theme.languageSelector.color
                            }
                            backgroundColor={
                              headerTheme === "dark"
                                ? theme.languageSelectorDark.backgroundColor
                                : theme.languageSelector.backgroundColor
                            }
                            size={44}
                            open={languageMenuOpen}
                            onToggle={this.handleToggleLanguageMenu}
                          >
                            {pageLocales.map((pageLocale) => (
                              <Link
                                key={pageLocale.code}
                                onClick={() =>
                                  this.handleToggleLanguageMenu(false)
                                }
                                to={pageLocale.url}
                                className={
                                  pageLocale.code === locale ? "selected" : ""
                                }
                              >
                                {pageLocale.code}
                              </Link>
                            ))}
                          </LanguageSelector>
                        )}
                    </RightBarItems>
                  </NavContainer>
                </Wrapper>
              </DesktopMenuContainer>
              <SideBarPanel
                isOpen={this.state.isMobileNavOpen}
                handleClose={this.handleCloseSidenav}
              >
                <LinkMobileContainer>
                  <IconContainer>
                    <IconLink to={locale === defaultLocale ? "" : `/${locale}`}>
                      <Icon />
                      <AssistiveText>
                        <FormattedMessage
                          id="header.logo.assistiveText"
                          defaultMessage="Link to home page"
                        />
                      </AssistiveText>
                    </IconLink>
                  </IconContainer>
                  {localizedNavigation.main &&
                    localizedNavigation.main.links.map((link) => (
                      <MobileListItem key={link.label}>
                        <Link
                          to={link.url}
                          onClick={() => this.handleCloseSidenav()}
                        >
                          {link.label}
                        </Link>
                      </MobileListItem>
                    ))}
                </LinkMobileContainer>
              </SideBarPanel>
            </>
          );
        }}
      />
    );
  }
}

const LogoContainer = styled.div`
  @media (max-width: 899px) {
    display: flex;
    flex: 1;
    justify-content: center;
  }
`;

const MenuIcon = styled(Menu)`
  height: 40px;
  width: 40px;
  display: none;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 899px) {
    display: block;
  }
`;

const AssistiveText = styled.span`
  height: 1px;
  width: 1px;
  position: absolute;
  overflow: hidden;
  top: -10px;
`;

const DesktopMenuContainer = styled.header`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 160px;
`;

const LogoLink = styled(Link)`
  display: inline-block;
  width: 200px;
  @media (max-width: 1260px) {
    /* left: 40px; */
  }
  @media (max-width: 600px) {
    width: 150px;
  }
`;

const RightBarItems = styled.div`
  display: flex;
  @media (min-width: 899px) {
    flex: 1;
  }
  align-items: baseline;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 30px;
  @media (max-width: 899px) {
    display: none;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  a {
    display: block;
    margin: 0 0px 0 10px;
    padding: 12px 10px;
    letter-spacing: 0.02em;
    color: ${(props) => props.theme.navigationColor};
    text-decoration: none;
    position: relative;
    transition: all 300ms;
    font-weight: 400;
    font-size: 14px;
    &::before {
      background: ${(props) => props.theme.navigationColor};
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

const LanguageSelector = styled(GooeyMenu)`
  margin-right: 0;
  @media (min-width: 1260px) {
    margin-right: 30px;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
  }
  .selected {
    text-transform: uppercase;
    font-size: 12px;
  }
`;

const LinkMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 70px;
  ${Icon} {
    fill: #161338;
  }
`;

const IconContainer = styled.div`
  padding-bottom: 30px;
`;

const IconLink = styled(Link)`
  display: inline-block;
  width: 40px;
`;

const MobileListItem = styled.li`
  display: flex;
  a {
    display: block;
    padding: 20px 10px;
    letter-spacing: 0.02em;
    color: #161338;
    text-decoration: none;
    position: relative;
    transition: all 300ms;
    font-weight: 400;
    font-size: 14px;
  }
`;

const NavContainer = styled.div<{ headerTheme: string }>`
  display: flex;
  height: 100%;
  align-items: center;
  ${({ headerTheme }) =>
    headerTheme === "dark" &&
    css`
      ${ListItem} {
        a {
          color: #161338;
        }
      }
      ${Logo} {
        fill: #161338 !important;
      }
    `};
`;
export default withTheme(Header);
