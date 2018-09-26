// @flow

import React from "react";
import styled from "styled-components";
import Page from "components/Page";
import Markdown from "react-markdown";
import Helmet from "react-helmet";
import simplePathJoin from "utils/simplePathJoin";

type Props = {
  data: Object,
  pathContext: {
    slug: string,
    locale: string
  }
};

export default ({ data, pathContext }: Props) => {
  const { markdownRemark, navigation, site } = data;
  const { origin } = site.siteMetadata;
  const { title, locales } = markdownRemark.fields.frontmatter;
  const page = locales.find(locale => locale.language === pathContext.locale);
  const currentNavigation = navigation.locales.find(
    locale => locale.language === pathContext.locale
  );
  return (
    <Page
      locale={page.language}
      navigation={{
        main: currentNavigation.main.links,
        language: locales.map(locale => ({
          locale: locale.language,
          url: locale.path
        }))
      }}
    >
      <Helmet>
        <title>{page.seo.title} | inkOfPixel</title>
        <meta name="description" content={page.seo.description} />
        <meta property="og:title" content={page.seo.title} />
        <meta property="og:url" content={simplePathJoin(origin, page.path)} />
        <meta property="og:description" content={page.seo.description} />
        {locales.map(locale => (
          <link
            key={locale.language}
            rel="alternate"
            href={simplePathJoin(origin, locale.path)}
            hreflang={locale.language}
          />
        ))}
      </Helmet>
      <OuterWrapper>
        <Wrapper>
          <Title>{title}</Title>
          <RichText source={page.body} />
        </Wrapper>
      </OuterWrapper>
    </Page>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        frontmatter {
          title
          locales {
            language
            path
            seo {
              title
              description
            }
            body
          }
        }
      }
    }
  }
`;

const OuterWrapper = styled.div`
  padding-bottom: 100px;
  padding-top: 160px;
  @media (max-width: 899px) {
    padding-top: 60px;
  }
`;

const Title = styled.h1`
  padding-bottom: 40px;
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
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const RichText = styled(Markdown)`
  overflow: hidden;
  p {
    line-height: 1.6em;
    font-size: 14px;
    padding-bottom: 20px;
  }
  h2 {
  }
`;
