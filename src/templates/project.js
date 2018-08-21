// @flow

import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Img from "gatsby-image";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import projectTheme from "themes/project.json";

type Props = {
  data: Object
};

export default ({ data }: Props) => {
  const page = data.markdownRemark;
  return (
    <Page theme={projectTheme}>
      <Helmet>
        <title>{page.frontmatter.seoTitle}</title>
        <meta
          property="description"
          content={page.frontmatter.seoDescription}
        />
        <meta property="og:title" content={page.frontmatter.title} />
        <meta
          property="og:description"
          content={page.frontmatter.seoDescription}
        />
      </Helmet>
      <Hero>
        <Img sizes={page.frontmatter.heroImage.childImageSharp.sizes} />
        <HeroContent>
          <Wrapper>
            <Heading>
              <ProjectType>{page.frontmatter.type}</ProjectType>
              <Title>{page.frontmatter.title}</Title>
            </Heading>
          </Wrapper>
        </HeroContent>
      </Hero>
      <Wrapper>
        <RichTextEditor dangerouslySetInnerHTML={{ __html: page.html }} />
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query DefaultPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        # heroImage {
        #   childImageSharp {
        #     sizes(maxWidth: 1200) {
        #       ...GatsbyImageSharpSizes
        #     }
        #   }
        # }
        # type
        # seoTitle
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

const RichTextEditor = styled.div`
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
        height: 2px;
        width: calc(100% + 6px);
        display: block;
        position: absolute;
        bottom: -2px;
        left: -3px;
        background-color: #161338;
      }
      &:hover {
        color: #05c3b6;
        &::after {
          background-color: #05c3b6;
        }
      }
    }
    .gatsby-resp-image-wrapper {
      display: block;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
      width: 100vw !important;
      max-width: 1200px !important;
      margin-left: -250px !important;
      @media (max-width: 1260px) {
        width: calc(100vw - 80px) !important;
        margin-left: calc((-100vw + 780px) / 2) !important;
      }
      @media (max-width: 800px) {
        width: 100% !important;
        margin-left: 0 !important;
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
        color: #05c3b6;
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
