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
        <Spacer />
        <PageTitle>Projects</PageTitle>
        <ProjectsList>
          {projects.map(project => (
            <Project>
              <ProjectDescription>
                <ProjectTitle>{project.node.frontmatter.title}</ProjectTitle>
                <ProjectType>{project.node.frontmatter.type}</ProjectType>
                <ProjectExcerpt>
                  {project.node.frontmatter.excerpt}
                </ProjectExcerpt>
                <ProjectLink>
                  <Link to={project.node.fields.path}>See More</Link>
                </ProjectLink>
              </ProjectDescription>

              <ProjectImage>
                <Link
                  to={project.node.fields.path}
                  style={{
                    backgroundImage: `url('${
                      project.node.frontmatter.featuredImage
                    }')`
                  }}
                />
              </ProjectImage>
            </Project>
          ))}
        </ProjectsList>
      </Wrapper>
    </Page>
  );
};

const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;
const PageTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: #05c3b6;
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    position: absolute;
    top: 7px;
    left: -68px;
    background-color: #05c3b6;
  }
`;

const ProjectsList = styled.ul`
  list-style: none;
  padding: 60px 0;
`;

const Project = styled.li`
  display: flex;
  &:not(:first-child) {
    margin-top: 60px;
  }
  @media (max-width: 900px) {
    flex-direction: column-reverse;
    &:not(:first-child) {
      margin-top: 100px;
    }
  }
`;

const ProjectDescription = styled.div`
  width: 40%;
  padding-right: 60px;
  box-sizing: border-box;
  padding-top: 10px;
  @media (max-width: 900px) {
    width: 100%;
    padding: 20px;
  }
`;
const ProjectImage = styled.div`
  width: 60%;
  height: 350px;
  @media (max-width: 900px) {
    width: 100%;
  }
  a {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    background-position: center;
    display: block;
  }
`;

const ProjectTitle = styled.h3`
  font-weight: 700;
  font-family: Europa;
  font-size: 20px;
  padding-bottom: 10px;
  letter-spacing: 0.04em;
  color: #161338;
`;
const ProjectType = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
  color: #05c3b6;
`;
const ProjectExcerpt = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  color: #949494;
`;

const ProjectLink = styled.div`
  a {
    padding-top: 20px;
    padding-bottom: 6px;
    display: block;
    color: #161338;
    letter-spacing: 0.02em;
    text-decoration: none;
    position: relative;
    transition: all 300ms;
    font-weight: 400;
    font-size: 14px;
    width: calc(100% + 60px);
    padding-right: 60px;
    @media (max-width: 900px) {
      display: inline-block;
      width: auto;
      padding-right: 0;
    }
    &::before {
      background: #161338;
      opacity: 0;
      bottom: -1px;
      content: "";
      height: 2px;
      left: 0;
      position: absolute;
      width: 0%;
      transition: all 300ms;
    }
    &:hover {
      &::before {
        opacity: 1;
        width: 100%;
      }
    }
  }
`;

export default ProjectsPage;

// export const query = graphql`
//   query ProjectsPageQuery {
//     allMarkdownRemark(filter: { fields: { collection: { eq: "projects" } } }) {
//       edges {
//         node {
//           frontmatter {
//             title
//             excerpt
//             featuredImage
//             type
//           }
//           fields {
//             path
//           }
//         }
//       }
//     }
//   }
// `;
