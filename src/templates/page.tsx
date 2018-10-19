import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Markdown from "react-markdown";
import Page from "components/Page";
import { IPageLocale } from "types/index";

interface IProps {
  data: any;
  pathContext: {
    slug: string;
    locale: string;
  };
}

export default ({ data, pathContext }: IProps) => {
  const currentPage = data.page.fields.frontmatter.locales.find(
    locale => locale.language === pathContext.locale
  );
  return (
    <Page
      title={currentPage.title}
      description={currentPage.seo.description}
      localeCode={pathContext.locale}
      pageLocales={data.page.fields.frontmatter.locales.map(
        (locale: any): IPageLocale => ({
          code: locale.language,
          url: locale.path
        })
      )}
    >
      <OuterWrapper>
        <Wrapper>
          <Title>{data.page.fields.frontmatter.title}</Title>
          <RichText source={currentPage.body} />
        </Wrapper>
      </OuterWrapper>
    </Page>
  );
};

export const query = graphql`
  query PageQuery($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
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
