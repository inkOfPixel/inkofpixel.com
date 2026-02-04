import React from "react";
import Link from "components/Link";
import Image from "components/Image";
import styled from "types/styled-components";
import { FormattedMessage } from "react-intl";
import Page from "components/Page";
import { PageShell } from "types/shell";
import Wrapper from "components/Wrapper";

interface IProps {
  page: any;
  projects: any[];
  shell: PageShell;
}

const ProjectsPage = ({ page, projects, shell }: IProps) => {
  const currentPage = page.locales.find(
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
      <Wrapper>
        <Spacer />
        <PageTitle>{currentPage.title}</PageTitle>
        <ProjectsList>
          {projects.map(project => {
            const currentItem = project.fields.frontmatter.locales.find(
              (locale: any) => locale.language === shell.locale
            );
            return (
              <ProjectListItem key={currentItem.path}>
                <ProjectDescription>
                  <ProjectTitle>{project.fields.frontmatter.title}</ProjectTitle>
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
                    <Image
                      src={currentItem.featuredImage}
                      alt={project.fields.frontmatter.title}
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
    padding: 20px 0;
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
  padding-bottom: 20px;
  color: ${props => props.theme.colors.green};
`;
const ProjectExcerpt = styled.div`
  font-size: 14px;
  line-height: 1.8em;
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
