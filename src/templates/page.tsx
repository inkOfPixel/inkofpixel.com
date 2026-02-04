import React from "react";
import styled from "types/styled-components";
import Markdown from "react-markdown";
import Page from "components/Page";
import { PageShell } from "types/shell";

interface IProps {
  page: any;
  shell: PageShell;
}

export default ({ page, shell }: IProps) => {
  const currentPage = page.fields.frontmatter.locales.find(
    (locale: any) => locale.language === shell.locale
  );
  return (
    <Page
      localeCode={shell.locale}
      defaultLocaleCode={shell.defaultLocale}
      pageLocales={shell.pageLocales}
      navigationLinks={shell.navigationLinks}
      cookiePolicyPath={shell.cookiePolicyPath}
    >
      <OuterWrapper>
        <Wrapper>
          <Title>{page.fields.frontmatter.title}</Title>
          <RichText>
            <Markdown>{currentPage.body}</Markdown>
          </RichText>
        </Wrapper>
      </OuterWrapper>
    </Page>
  );
};

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

const RichText = styled.div`
  overflow: hidden;
  p {
    line-height: 1.6em;
    font-size: 14px;
    padding-bottom: 20px;
  }
  h2 {
  }
`;
