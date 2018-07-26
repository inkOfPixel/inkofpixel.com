// @flow

import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import projectTheme from "themes/project.json";

export default ({ data }) => {
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
      <Hero
        style={{
          backgroundImage: `url('${page.frontmatter.heroImage}')`
        }}
      >
        <Wrapper>
          <Heading>
            <ProjectType>{page.frontmatter.type}</ProjectType>
            <Title>{page.frontmatter.title}</Title>
          </Heading>
        </Wrapper>
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
        featuredImage
        heroImage
        type
        seoTitle
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
    line-height: 1.3em;
    padding-bottom: 20px;
    width: 700px;
    font-size: 14px;
    margin: 0 auto;
    @media (max-width: 800px) {
      width: 100%;
    }
    img {
      padding: 15px 0;
      width: 100%;
      display: block;
      width: 1200px;
      margin-left: -250px;
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
