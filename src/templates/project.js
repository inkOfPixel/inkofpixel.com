// @flow

import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Markdown from "react-markdown";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import projectTheme from "themes/project.json";
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
      theme={projectTheme}
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
        <title>{page.seoTitle} | inkOfPixel</title>
        <meta name="description" content={page.seoDescription} />
        <meta property="og:title" content={page.seoTitle} />
        <meta property="og:image " content={page.heroImage.publicURL} />
        <meta property="og:url" content={simplePathJoin(origin, page.path)} />
        <meta property="og:description" content={page.seoDescription} />
        {locales.map(locale => (
          <link
            key={locale.language}
            rel="alternate"
            href={simplePathJoin(origin, locale.path)}
            hreflang={locale.language}
          />
        ))}
      </Helmet>
      <Hero>
        <Img sizes={page.heroImage.childImageSharp.sizes} />
        <HeroContent>
          <Wrapper>
            <Heading>
              <ProjectType>{page.type}</ProjectType>
              <Title>{title}</Title>
            </Heading>
          </Wrapper>
        </HeroContent>
      </Hero>
      <Wrapper>
        <RichText source={page.body} />
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query DefaultPageQuery($slug: String!) {
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
        slug
        frontmatter {
          title
          locales {
            language
            path
            body
            heroImage {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1200) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            type
            seoTitle
            seoDescription
          }
        }
      }
    }
  }
`;

const Hero = styled.div`
  height: 480px;
  width: 100%;
  background-size: cover;
  background-position: center center;
  position: relative;
  ${Wrapper} {
    height: 100%;
  }
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Heading = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
`;

const ProjectType = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  padding-bottom: 10px;
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    background-color: #fff;
    position: absolute;
    top: 7px;
    left: -68px;
  }
`;

const Title = styled.h2`
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

const RichText = styled(Markdown)`
  padding: 50px 0;
  p {
    line-height: 1.8em;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 700px;
    font-size: 14px;
    margin: 0 auto;
    box-sizing: border-box;
    @media (max-width: 800px) {
      width: 100%;
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
    img {
      width: 100%;
      display: block;
      width: 1200px;
      margin-left: -250px;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
      @media (max-width: 1260px) {
        width: calc(100vw - 80px);
        margin-left: calc((-100vw + 780px) / 2);
      }
      @media (max-width: 800px) {
        width: 100%;
        margin-left: 0;
      }
    }
  }
  h2 {
    padding-top: 30px;
    width: 700px;
    font-size: 24px;
    letter-spacing: 0.02em;
    margin: 0 auto;
    font-family: Europa, sans-serif;
    box-sizing: border-box;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  blockquote {
    padding: 60px 40px;
    background-color: #eaf7f7;
    width: 700px;
    margin: 30px auto;
    box-sizing: border-box;
    position: relative;

    @media (max-width: 800px) {
      width: 100%;
    }
    p {
      width: 100%;
      position: relative;
      color: #03635d;
      font-weight: 700;
      font-style: italic;
      padding: 0;
      &:before,
      &:after {
        content: "“";
        display: block;
        position: absolute;
        color: ${props => props.theme.colors.green};
        opacity: 0.4;
        font-size: 90px;
        font-weight: 400;
      }
      &:before {
        content: "“";
        top: -10px;
        left: -30px;
      }
      &:after {
        content: "”";
        bottom: -50px;
        right: 0;
      }
    }
    ul {
      list-style: none;
      bottom: 0;
      right: 0;
      padding-top: 60px;
      text-align: right;
      li {
        color: #03635d;
        font-size: 14px;
        margin-bottom: -20px;
      }
    }
  }
  table {
    margin-top: 20px;
    margin-bottom: 40px;
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
    width: 100%;
    border: none;
    overflow: scroll;
    display: block;
    th {
      padding: 12px 15px;
      border: 1px solid #333;
    }
    td {
      padding: 12px 15px;
      border: 1px solid #999;
    }
  }
  hr {
    height: 1px;
    border: none;
    background-color: #999;
    margin-left: 40px;
    margin-right: 40px;
    width: calc(100% - 80px);
    margin-top: 40px;
    margin-bottom: 50px;
  }
`;
