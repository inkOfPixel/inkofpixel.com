import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "types/styled-components";
import { FormattedMessage } from "react-intl";
import Page from "components/Page";
import { IPageLocale } from "types/index";
import Wrapper from "components/Wrapper";

interface IProps {
  data: any;
  pathContext: {
    locale: string;
  };
}

const ProjectsPage = ({ data, pathContext }: IProps) => {
  const currentPage = data.page.fields.locales.find(
    locale => locale.language === pathContext.locale
  );
  const projects = data.projects.edges.map(
    ({ node }) => node.fields.frontmatter
  );
  return (
    <Page
      title={currentPage.title}
      description={currentPage.seo.description}
      localeCode={pathContext.locale}
      pageLocales={data.page.fields.locales.map(
        (locale: any): IPageLocale => ({
          code: locale.language,
          url: locale.path
        })
      )}
    >
      <Wrapper>
        <Spacer />
        <PageTitle>{currentPage.title}</PageTitle>
        <ProjectsList>
          {projects.map(project => {
            const currentItem = project.locales.find(
              locale => locale.language === pathContext.locale
            );
            return (
              <ProjectListItem key={currentItem.path}>
                <ProjectDescription>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectType>{currentItem.type}</ProjectType>
                  <ProjectExcerpt>{currentItem.excerpt}</ProjectExcerpt>
                  <ProjectLink>
                    <Link to={currentItem.path}>
                      <FormattedMessage
                        id="projectCard.discoverMore"
                        defaultMessage="Discover more"
                      />
                    </Link>
                  </ProjectLink>
                </ProjectDescription>

                <ProjectFeaturedImageWrapper>
                  <Link to={currentItem.path}>
                    <Img
                      fluid={currentItem.featuredImage.childImageSharp.fluid}
                    />
                  </Link>
                </ProjectFeaturedImageWrapper>
              </ProjectListItem>
            );
          })}
        </ProjectsList>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ProjectsPageQuery($name: String!) {
    page: staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
        locales {
          language
          path
          title
          seo {
            description
            image
          }
        }
      }
    }
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___priority], order: ASC }
      filter: {
        fields: {
          collection: { eq: "projects" }
          frontmatter: { published: { eq: true } }
        }
      }
    ) {
      edges {
        node {
          fields {
            frontmatter {
              title
              locales {
                language
                path
                type
                excerpt
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 1200, maxHeight: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

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
  color: ${props => props.theme.colors.green};
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    position: absolute;
    top: 7px;
    left: -68px;
    background-color: ${props => props.theme.colors.green};
  }
`;

const ProjectsList = styled.ul`
  list-style: none;
  padding: 60px 0;
`;

const ProjectListItem = styled.li`
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
const ProjectFeaturedImageWrapper = styled.div`
  width: 60%;
  @media (max-width: 900px) {
    width: 100%;
  }
  .gatsby-image-wrapper {
    height: 350px;
    @media (max-width: 500px) {
      height: 250px;
    }
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
  color: ${props => props.theme.colors.darkBlue};
`;
const ProjectType = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
  color: ${props => props.theme.colors.green};
`;
const ProjectExcerpt = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  color: ${props => props.theme.colors.gray};
`;

const ProjectLink = styled.div`
  a {
    color: ${props => props.theme.colors.darkBlue};
    display: inline-block;
    text-decoration: none;
    transition: all 0.3s;
    margin-top: 20px;
    font-size: 14px;
    transition: 0.4s;
    &::after {
      content: "→";
      display: inline-block;
      font-size: 16px;
      padding-left: 10px;
      transition: 0.4s;
      color: ${props => props.theme.colors.darkBlue};
    }
    &:hover {
      color: ${props => props.theme.colors.green};
      &::after {
        padding-left: 20px;
        color: ${props => props.theme.colors.green};
      }
    }
  }
`;

export default ProjectsPage;
