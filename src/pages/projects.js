// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import Link from "gatsby-link";

type Props = {
  data: {}
};

const ProjectsPage = ({ data }: Props) => {
  const projects = data.allMarkdownRemark.edges;
  return (
    <Page>
      <Wrapper>
        <ul>
          {projects.map(project => (
            <li>
              <div>{project.node.frontmatter.title}</div>
              <div>{project.node.frontmatter.excerpt}</div>
              <div>{project.node.frontmatter.featuredImage}</div>
              <div>{project.node.frontmatter.type}</div>
            </li>
          ))}
        </ul>
      </Wrapper>
    </Page>
  );
};

export default ProjectsPage;

export const query = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark(filter: { fields: { collection: { eq: "projects" } } }) {
      edges {
        node {
          frontmatter {
            title
            excerpt
            featuredImage
            type
          }
        }
      }
    }
  }
`;
