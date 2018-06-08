// @flow

import React from "react";

export default ({ data }) => {
  const project = data.markdownRemark;
  return (
    <Page>
      <Wrapper>
        <Title>{project.frontmatter.title}</Title>
        <RichTextEditor dangerouslySetInnerHTML={{ __html: project.html }} />
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

const Page = styled.div`
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

const RichTextEditor = styled.div`
  overflow: hidden;
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

import styled from "styled-components";
