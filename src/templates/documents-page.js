// @flow

import React from "react";

export default ({ data }) => {
  const page = data.markdownRemark;
  return (
    <Page>
      <Wrapper>
        <Title>{page.frontmatter.title}</Title>
        <RichTextEditor dangerouslySetInnerHTML={{ __html: page.html }} />
      </Wrapper>
      <Section className="Vote">
        <Wrapper>
          <Title>Partecipa al voto</Title>
          <LinkButtonContainer>
            <LinkButton>SCARICA IL MODULO DELEGA</LinkButton>
          </LinkButtonContainer>
          <Paragraph>Chiamaci o scrivici per saperne di più</Paragraph>
          <div className="mail">info@fiber4retelit.it</div>
          <div className="phone"> +39 02 760 797 272 </div>
        </Wrapper>
      </Section>
    </Page>
  );
};

export const query = graphql`
  query DocumentsPageQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const Page = styled.div`
  padding-top: 160px;
  @media (max-width: 899px) {
    padding-top: 60px;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  font-family: "Playfair Display", serif;
  padding: 0;
  padding-top: 40px;
  margin: 0;
  @media (max-width: 700px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
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

const RichTextEditor = styled.div`
  padding-bottom: 100px;
  p {
    line-height: 1.3em;
    padding-bottom: 15px;
  }
  h2 {
  }
  table {
    margin-top: 20px;
    margin-bottom: 40px;
    border-collapse: collapse;
    border: 1px solid black;
    text-align: center;
    th {
      padding: 12px 20px;
      border: 1px solid #333;
    }
    td {
      padding: 12px 20px;
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
  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
    padding-top: 50px;
    > li {
      padding-top: 40px;
      padding-bottom: 40px;
      position: relative;
      padding-left: 110px;
      border-bottom: 1px solid #dadada;
      &:before {
        display: block;
        position: absolute;
        content: "";
        height: 10px;
        width: 90px;
        background-color: #1e83ef;
        left: 0;
        top: 52px;
      }
      a {
        font-size: 32px;
        font-weight: 700px;
        letter-spacing: 0.02em;
        text-decoration: none;
        color: #161338;
        transition: 0.3s;
        :hover {
          color: #1e83ef;
        }
      }
    }
    @media (max-width: 1000px) {
      > li {
        padding-left: 80px;
        &:before {
          width: 60px;
        }
        a {
          font-size: 30px;
        }
      }
    }
    @media (max-width: 600px) {
      > li {
        padding-left: 30px;
        &:before {
          width: 10px;
        }
      }
    }
    @media (max-width: 500px) {
      > li {
        padding-left: 30px;
        &:before {
          top: 48px;
        }
        a {
          font-size: 24px;
        }
      }
    }
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  font-family: "Roboto Condensed", serif;
  padding: 0;
  margin: 0;
  padding-top: 30px;
  line-height: 1.4em;
  letter-spacing: 0.02em;
`;
const LinkButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;
const LinkButton = styled.a`
  display: inline-block;
  border: 1px solid #161338;
  height: 50px;
  padding-left: 50px;
  padding-right: 50px;
  box-sizing: border-box;
  padding-top: 15px;
  letter-spacing: 0.06em;
  &::after {
    content: "→";
    display: inline-block;
    padding-left: 10px;
    transition: 0.5s;
  }
  &:hover {
    cursor: pointer;
    &::after {
      padding-left: 20px;
      margin-right: -10px;
    }
  }
  @media (max-width: 400px) {
    height: 46px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 13px;
  }
`;

const Section = styled.section`
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  &.Vote {
    background: rgb(30, 131, 239);
    background: linear-gradient(
      140deg,
      rgba(30, 131, 239, 1) 0%,
      rgba(72, 64, 187, 1) 100%
    );
    color: #fff;
    ${Title} {
      text-align: center;
      padding-bottom: 60px;
    }
    ${LinkButtonContainer} {
      text-align: center;
      ${LinkButton} {
        border: 1px solid #fff;
        text-decoration: none;
        color: #fff;
        @media (max-width: 360px) {
          padding-right: 20px;
          padding-left: 20px;
          &::after {
            display: none;
          }
        }
      }
    }
    ${Paragraph} {
      text-align: center;
      padding-top: 50px;
    }
    .mail {
      font-weight: 300;
      font-size: 52px;
      text-align: center;
      padding-top: 60px;
      @media (max-width: 600px) {
        font-size: 40px;
      }
      @media (max-width: 400px) {
        font-size: 32px;
      }
    }
    .phone {
      font-weight: 300;
      font-size: 52px;
      text-align: center;
      @media (max-width: 600px) {
        font-size: 40px;
      }
      @media (max-width: 400px) {
        font-size: 32px;
      }
    }
  }}`;

import styled from "styled-components";
