// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import Link from "gatsby-link";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";
import TextareaAutosize from "react-autosize-textarea";
import { default as BaseSplash } from "components/Splash";
import { default as BaseIcon } from "react-simple-icons";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const ServicesPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { contacts, site, navigation, cookiePolicy, page } = data;
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
        <Flexbox>
          <Info>
            <PageTitle>{currentPage.title}</PageTitle>
            <Intro>{currentPage.intro}</Intro>
            <Subtitle>{currentPage.subtitle}</Subtitle>
            <Mail href={`mailto:${contacts.email}`} data-rel="external">
              {contacts.email}
            </Mail>
          </Info>
        </Flexbox>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ServicesPageQuery($name: String!) {
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
    contacts: settingsJson(fields: { name: { eq: "contacts" } }) {
      email
      socials {
        title
        link
        iconHandle
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
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;

const Flexbox = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
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
const PageTitle = styled.h1`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: #05c3b6;
  font-family: "Roboto Mono", monospace;
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    position: absolute;
    top: 7px;
    left: -68px;
    background-color: #05c3b6;
  }
`;

const Intro = styled.h2`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  font-weight: 400;
  line-height: 1.8em;
  color: #949494;
  padding-top: 20px;
`;

export default ServicesPage;
