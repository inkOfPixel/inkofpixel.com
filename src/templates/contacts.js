// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import Link from "gatsby-link";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const ContactsPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { site, navigation, cookiePolicy, page } = data;
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
        <PageTitle>{currentPage.title}</PageTitle>
        <Intro>Drop us a line</Intro>

        <Form
          name="contact"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="row hidden">
            <label>
              Don’t fill this out if you're human: <input name="bot-field" />
            </label>
          </div>
          <div className="row">
            <label for="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className="row">
            <label for="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className="row">
            <label for="message">Message</label>
            <textarea name="message" />
          </div>
          <div className="row submit">
            <button type="submit">Send</button>
          </div>
        </Form>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ContactsPageQuery($name: String!) {
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
        }
      }
    }
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;
const PageTitle = styled.h1`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: #05c3b6;
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

const Form = styled.form`
  .hidden {
    display: none;
  }
`;

export default ContactsPage;
