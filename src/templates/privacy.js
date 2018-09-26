// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";
import { default as BaseSplash } from "components/Splash";
import { default as BaseIcon } from "react-simple-icons";
import { encodingExists } from "iconv-lite";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const PrivacyPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { allIubendaDocument, site, navigation, cookiePolicy, page } = data;
  const { origin } = site.siteMetadata;
  const currentPage = page.fields.locales.find(
    locale => locale.language === pageLocale
  );
  const currentNavigation = navigation.locales.find(
    locale => locale.language === pageLocale
  );
  return (
    <Page
      locale={pageLocale}
      navigation={{
        main: currentNavigation.main.links,
        language: page.fields.locales.map(locale => ({
          locale: locale.language,
          url: locale.path
        })),
        cookiePolicy: cookiePolicy.fields.frontmatter.locales.find(
          locale => locale.language === pathContext.locale
        ).path
      }}
    >
      <Helmet>
        <title>{currentPage.title} | inkOfPixel</title>
        <meta name="description" content={currentPage.seo.description} />
        <meta property="og:title" content={currentPage.title} />
        <meta property="og:image " content={currentPage.seo.image} />
        <meta
          property="og:url"
          content={simplePathJoin(origin, currentPage.path)}
        />
        <meta property="og:description" content={currentPage.seo.description} />
        {page.fields.locales.map(locale => (
          <link
            key={locale.language}
            rel="alternate"
            href={simplePathJoin(origin, locale.path)}
            hreflang={locale.language}
          />
        ))}
      </Helmet>
      <Wrapper>
        <Spacer />
        <Info>
          <PageTitle>{currentPage.title}</PageTitle>
        </Info>
        <Content
          dangerouslySetInnerHTML={{
            __html: allIubendaDocument.edges[0].node.content
          }}
        />
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query PrivacyPageQuery($name: String!) {
    site {
      siteMetadata {
        origin
      }
    }
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
    cookiePolicy: markdownRemark(fields: { slug: { eq: "/cookies/" } }) {
      fields {
        frontmatter {
          locales {
            language
            path
          }
        }
      }
    }
    page: staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
        locales {
          language
          path
          title
          seo {
            description
            image
          }
          intro
          subtitle
        }
      }
    }
    allIubendaDocument {
      edges {
        node {
          content
        }
      }
    }
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 150px;
  flex: 0 0 400px;
  @media (max-width: 1150px) {
    flex: 0 0 300px;
    margin-right: 80px;
  }
  @media (max-width: 800px) {
    flex: 0 0 100%;
    margin-right: 0;
  }
`;
const PageTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.green};
  font-family: "Roboto Mono", monospace;
  margin: 0.67em 0;
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    position: absolute;
    top: 7px;
    left: -68px;
    background-color: ${props => props.theme.colors.green};
  }
`;

const Content = styled.div`
  padding-bottom: 80px;
  h1 {
    font-size: 46px;
    padding: 0;
    margin: 0;
    font-weight: 700;
    font-family: Europa;
    line-height: 1.1em;
    padding-bottom: 20px;
    @media (max-width: 900px) {
      font-size: 40px;
    }
    @media (max-width: 600px) {
      font-size: 32px;
    }
  }
  p {
    line-height: 1.8em;
    padding-bottom: 10px;
    font-size: 14px;
    b {
      font-weight: 500;
    }
  }
  h2 {
    font-weight: 700;
    font-family: Europa;
    font-size: 24px;
    padding-bottom: 10px;
    padding-top: 30px;
  }
  h3 {
    font-weight: 700;
    font-family: Europa;
    font-size: 20px;
    padding-bottom: 10px;
    padding-top: 20px;
  }
  h4 {
    line-height: 1.8em;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  a {
    font-weight: 700;
    color: inherit;
    position: relative;
    text-decoration: none;
    transition: 0.3s all;
    &::after {
      transition: 0.3s all;
      content: "";
      height: 1px;
      width: calc(100% + 6px);
      display: block;
      position: absolute;
      bottom: -2px;
      left: -3px;
      background-color: ${props => props.theme.colors.darkBlue};
    }
    &:hover {
      color: ${props => props.theme.colors.green};
      &::after {
        background-color: ${props => props.theme.colors.green};
      }
    }
  }
  ul {
    padding-left: 20px;
    box-sizing: border-box;
    li {
      line-height: 1.8em;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 14px;
      b {
        font-weight: 500;
      }
    }
  }
`;

export default PrivacyPage;
