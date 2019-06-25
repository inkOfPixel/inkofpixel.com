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
import { FormattedMessage } from "react-intl";

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
  // const shareUrl = `${data.site.siteMetadata.origin}${currentPost.path}`;

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
        <meta
          property="og:image"
          content={`${data.site.siteMetadata.origin}${
            currentPost.featuredImage.publicURL
          }`}
        />
      </Helmet>
      <Hero>
        <Wrapper size="small">
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
        <ShareMsg>
          <FormattedMessage id="post.share" defaultMessage="Share" />
        </ShareMsg>
        <SharePost text={data.post.fields.frontmatter.title} url={""} />
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
            featuredImage {
              publicURL
            }
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

const Title = styled.h2`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;
  padding-bottom: 16px;
  text-align: center;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Date = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.gray};
  font-family: "Roboto Mono", monospace;
  padding-bottom: 20px;
  text-align: center;
`;
const Author = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.green};
  font-family: "Roboto Mono", monospace;
  padding-bottom: 40px;
  text-align: center;
`;

const Hero = styled.div`
  width: 100%;
  position: relative;
  padding-top: 200px;
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const RichText = styled(Markdown)`
  padding: 30px 0;
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
      width: 960px;
      margin-left: -130px;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
      @media (max-width: 1020px) {
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
