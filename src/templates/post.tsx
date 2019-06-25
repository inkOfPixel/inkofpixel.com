import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "types/styled-components";
import Markdown from "react-markdown";
import Wrapper from "components/Wrapper";

import Page from "components/Page";
import { IPageLocale } from "types/index";
import SharePost from "components/SharePost";

interface IProps {
  data: any;
  pathContext: {
    slug: string;
    locale: string;
  };
}

export default ({ data, pathContext }: IProps) => {
  console.log("data", data);
  console.log("pathContext", pathContext);
  console.log("data.post.fields.frontmatter", data.post.fields.frontmatter);
  const currentPost = data.post.fields.frontmatter.locales.find(
    locale => locale.language === pathContext.locale
  );
  console.log("currentPost", currentPost);

  return (
    <Page
      title={currentPost.seoTitle}
      description={currentPost.seodescription}
      localeCode={pathContext.locale}
      pageLocales={data.post.fields.frontmatter.locales.map(
        (locale: any): IPageLocale => ({
          code: locale.language,
          url: locale.path
        })
      )}
    >
      <Helmet>
        <meta property="og:image " content={currentPost.heroImage.publicURL} />
      </Helmet>
      <Hero>
        <Wrapper>
          <Title>{data.post.fields.frontmatter.title}</Title>
          <Date>{data.post.fields.frontmatter.date}</Date>
          <Author>{data.post.fields.frontmatter.author}</Author>
          <Img fluid={currentPost.heroImage.childImageSharp.fluid} />
        </Wrapper>
      </Hero>

      <Wrapper>
        <RichText source={currentPost.body} />
      </Wrapper>
      <ShareContainer>
        <ShareMsg>Share</ShareMsg>
        <SharePost text={data.post.fields.frontmatter.title} />
      </ShareContainer>
    </Page>
  );
};

export const query = graphql`
  query DefaultPageQueryMarketing($slug: String!) {
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
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        frontmatter {
          title
          date
          author
          locales {
            language
            path
            body
            heroImage {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            seoTitle
            seoDescription
          }
        }
      }
    }
  }
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
  flex-direction: column;
  align-items: center;
`;

const ShareMsg = styled.p`
  text-transform: uppercase;
`;
const Date = styled.p`
  margin: 20px 0;
`;
const Author = styled.p`
  margin: 20px 0;
  text-transform: uppercase;
  color: ${props => props.theme.colors.green};
`;

const Hero = styled.div`
  min-height: 480px;
  width: 100%;
  position: relative;
  padding-top: 160px;
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
`;
