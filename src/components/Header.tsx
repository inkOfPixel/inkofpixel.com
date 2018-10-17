import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import styled, { withTheme } from "styled-components";
import { FormattedMessage } from "react-intl";
import Logo from "components/Logo";
import Wrapper from "components/Wrapper";
import GooeyMenu from "components/GooeyMenu";
import { IPageLocale } from "types";

interface IProps {
  theme: any;
  locale: string;
  defaultLocale: string;
  pageLocales?: IPageLocale[];
}

interface IState {
  languageMenuOpen: boolean;
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
    defaultLocale: "en"
  };

  state = {
    languageMenuOpen: false
  };

  handleToggleLanguageMenu = (open: boolean) => {
    this.setState({
      languageMenuOpen: open
    });
  };

  render() {
    const { languageMenuOpen } = this.state;
    const { locale, defaultLocale, pageLocales } = this.props;
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
            navLocale => navLocale.language === locale
          );
          if (!localizedNavigation) {
            throw new Error(
              `Didn't found any navigation with locale ${locale}`
            );
          }
          return (
            <DesktopMenuContainer>
              <Wrapper>
                <LogoLink to={locale === defaultLocale ? "" : `/${locale}`}>
                  <Logo />
                  <AssistiveText>
                    <FormattedMessage
                      id="header.logo.assistiveText"
                      defaultMessage="Link to home page"
                    />
                  </AssistiveText>
                </LogoLink>
                <RightBarItems>
                  <List>
                    {localizedNavigation.main &&
                      localizedNavigation.main.links.map(link => (
                        <ListItem key={link.label}>
                          <Link to={link.url}>{link.label}</Link>
                        </ListItem>
                      ))}
                  </List>
                  <LanguageSelector
                    renderLabel={() => (
                      <span className="selected">{locale}</span>
                    )}
                    color={this.props.theme.languageSelector.color}
                    backgroundColor={
                      this.props.theme.languageSelector.backgroundColor
                    }
                    size={50}
                    open={languageMenuOpen}
                    onToggle={this.handleToggleLanguageMenu}
                  >
                    {pageLocales &&
                      pageLocales.map(pageLocale => (
                        <Link
                          key={pageLocale.code}
                          onClick={() => this.handleToggleLanguageMenu(false)}
                          to={pageLocale.url}
                          className={
                            pageLocale.code === locale ? "selected" : ""
                          }
                        >
                          {pageLocale.code}
                        </Link>
                      ))}
                  </LanguageSelector>
                </RightBarItems>
              </Wrapper>
            </DesktopMenuContainer>
          );
        }}
      />
    );
  }
}

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

const RightBarItems = styled.div`
  position: absolute;
  right: 0;
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

const ListItem = styled.li`
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

const LanguageSelector = styled(GooeyMenu)`
  margin-left: 40px;
  @media (max-width: 1260px) {
    margin-right: 40px;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    font-size: 13px;
  }
  .selected {
    text-transform: uppercase;
    font-size: 13px;
  }
`;

export default withTheme(Header);
