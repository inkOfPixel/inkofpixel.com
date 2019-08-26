import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "types/styled-components";
import Markdown, { ReactMarkdownProps } from "react-markdown";
import Wrapper from "components/Wrapper";

import Page from "components/Page";
import { IPageLocale } from "types/index";
import SharePost from "components/SharePost";
import { FormattedMessage, FormattedDate } from "react-intl";
import marked from "marked";

interface IProps {
  data: any;
  pathContext: {
    slug: string;
    locale: string;
  };
}

// Get reference
var renderer = new marked.Renderer();

// Override function
renderer.paragraph = function(text) {
  console.log(text);
  if (/^start-custom-image(([\S\s])*)end-custom-image$/.test(text)) {
    const attributes = {
      src: "",
      size: "",
      width: "",
      alt: "",
      align: "",
      description: "",
      shadow: ""
    };
    const attributesString = text.match(/\((.*?)\)/);
    if (attributesString) {
      const attributesSplitted = attributesString[1].split("|");
      attributesSplitted.forEach(a => {
        const [attrName, attrValue] = a.split(":");
        if (!attrValue || attrValue === "undefined") {
          attributes[attrName] = "";
        } else {
          attributes[attrName] = attrValue;
        }
      });
    }
    return `
    <div class="custom-image-container" ${attributes.size} ${
      attributes.align
    } shadow="${attributes.shadow}">
      <img src="${attributes.src}" ${
      attributes.width ? `width="${attributes.width}"` : ""
    } alt="${attributes.alt}">
    ${
      attributes.description
        ? `
      <div class="img-description">
      <span>
        ${attributes.description}
      </span>
    </div>
    `
        : ``
    }
    </div>
    `;
  } else if (/^start-important-text(([\S\s])*)end-important-text$/.test(text)) {
    const attributes = {
      text: "",
      align: ""
    };
    const attributesString = text.match(/\((.*?)\)/);
    if (attributesString) {
      const attributesSplitted = attributesString[1].split("|");
      attributesSplitted.forEach(a => {
        const [attrName, attrValue] = a.split(":");
        if (!attrValue || attrValue === "undefined") {
          attributes[attrName] = "";
        } else {
          attributes[attrName] = attrValue;
        }
      });
    }
    return `
    <div class="important-text-container" ${attributes.align}>
      <p>${attributes.text}</p>
    </div>
    `;
  }

  return `
  <p>
    ${text}
  </p>
  `;
};

// Run marked

export default ({ data, pathContext }: IProps) => {
  const currentPost = data.post.fields.frontmatter.locales.find(
    locale => locale.language === pathContext.locale
  );

  const html = marked(currentPost.body, { renderer: renderer });

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
          <Title>{currentPost.title}</Title>
          <Date>
            <FormattedDate
              day="2-digit"
              month="long"
              year="numeric"
              value={data.post.fields.frontmatter.date}
            />
          </Date>
          <Author>{data.post.fields.frontmatter.author}</Author>
          <Img fluid={currentPost.heroImage.childImageSharp.fluid} />
        </Wrapper>
      </Hero>

      <Wrapper>
        <Post dangerouslySetInnerHTML={{ __html: html }} />
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
          date
          author
          locales {
            language
            title
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

const Title = styled.h1`
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

const Post = styled.div`
  padding: 50px 0;
  .important-text-container {
    padding: 60px 40px;
    background-color: #eaf7f7;
    width: 700px;
    margin: 30px auto;
    box-sizing: border-box;
    position: relative;
    @media (max-width: 800px) {
      width: 100%;
    }
    &[center] {
      p {
        text-align: center;
      }
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
  }
  .custom-image-container {
    flex-direction: column;
    align-items: center;
    display: flex;
    img {
      display: block;
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
    }
    .img-description {
      padding-top: 10px;
      font-size: 0.85em;
    }
    &[center] {
      justify-content: center;
    }
    &[left] {
      justify-content: flex-start;
    }
    &[right] {
      justify-content: flex-end;
    }
    &[very-tiny] {
      img {
        width: 200px;
      }
      @media (max-width: 240px) {
        width: 100%;
      }
    }
    &[tiny] {
      img {
        width: 300px;
      }
      @media (max-width: 340px) {
        width: 100%;
      }
    }
    &[small] {
      img {
        width: 400px;
      }
      @media (max-width: 440px) {
        width: 100%;
      }
    }
    &[medium] {
      img {
        width: 500px;
      }
      @media (max-width: 540px) {
        width: 100%;
      }
    }
    &[normal] {
      img {
        width: 700px;
        @media (max-width: 740px) {
          max-width: 100%;
        }
      }
    }
  }

  p {
    line-height: 1.8em;
    margin: 30px auto;
    width: 700px;
    font-size: 14px;

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
      width: 860px;
      margin-top: 40px;
      margin-bottom: 40px;
      margin-left: calc((860px - 700px) / -2);
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
      @media (max-width: 920px) {
        width: calc(100% + 80px);
        margin-left: -40px;
      }
      @media (max-width: 800px) {
        width: 100%;
        margin-left: 0;
      }
    }
  }
  ul {
    line-height: 1.8em;
    margin: 30px auto;
    width: 700px;
    font-size: 14px;

    box-sizing: border-box;
    padding-left: 20px;
    @media (max-width: 800px) {
      width: 100%;
    }
    li {
      margin-bottom: 4px;
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
    }
  }
  h2 {
    margin: 0 auto;
    margin-top: 50px;
    width: 700px;
    font-size: 24px;
    letter-spacing: 0.02em;
    font-family: Europa, sans-serif;
    box-sizing: border-box;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  h3 {
    margin: 0 auto;
    margin-top: 50px;
    width: 700px;
    font-size: 18px;
    box-sizing: border-box;
    font-weight: 500;
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
const RichText = styled(Markdown)`
  padding: 50px 0;
  .image-container {
    display: flex;
    justify-content: center;
    &[tiny] {
      img {
        max-width: 300px;
      }
    }
    &[medium] {
      img {
        max-width: 500px;
      }
    }
    &[large] {
      img {
        max-width: 1000px;
      }
    }
  }
  p {
    line-height: 1.8em;
    margin: 30px auto;
    width: 700px;
    font-size: 14px;

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
      width: 860px;
      margin-top: 40px;
      margin-bottom: 40px;
      margin-left: calc((860px - 700px) / -2);
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
      @media (max-width: 920px) {
        width: calc(100% + 80px);
        margin-left: -40px;
      }
      @media (max-width: 800px) {
        width: 100%;
        margin-left: 0;
      }
    }
  }
  ul {
    line-height: 1.8em;
    margin: 30px auto;
    width: 700px;
    font-size: 14px;

    box-sizing: border-box;
    padding-left: 20px;
    @media (max-width: 800px) {
      width: 100%;
    }
    li {
      margin-bottom: 4px;
    }
  }
  h2 {
    margin: 0 auto;
    margin-top: 50px;
    width: 700px;
    font-size: 24px;
    letter-spacing: 0.02em;
    font-family: Europa, sans-serif;
    box-sizing: border-box;
    @media (max-width: 800px) {
      width: 100%;
    }
  }
  h3 {
    margin: 0 auto;
    margin-top: 50px;
    width: 700px;
    font-size: 18px;
    box-sizing: border-box;
    font-weight: 500;
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
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  font-family: "Roboto Mono", monospace;
  text-align: center;
`;
