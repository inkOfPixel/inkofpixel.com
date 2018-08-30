// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import Link from "gatsby-link";
import Img from "gatsby-image";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const ProjectsPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { site, navigation, cookiePolicy, page } = data;
  const { origin } = site.siteMetadata;
  const currentPage = page.fields.locales.find(
    locale => locale.language === pageLocale
  );
  const currentNavigation = navigation.locales.find(
    locale => locale.language === pageLocale
  );
  const projects = data.projects.edges.map(
    ({ node }) => node.fields.frontmatter
  );
  return (
    <Page
      locale={pageLocale}
      navigation={{
        main: currentNavigation.main.links,
        language: page.fields.locales.map(locale => ({
          locale: locale.language,
          url: locale.path
        })),
        cookiePolicy: cookiePolicy.fields.frontmatter.locales.find(
          locale => locale.language === pathContext.locale
        ).path
      }}
    >
      <Helmet>
        <title>{currentPage.title} | inkOfPixel</title>
        <meta name="description" content={currentPage.seo.description} />
        <meta property="og:title" content={currentPage.title} />
        {/* @TODO: @mmarcon here I need the image to be uploaded on CMS.. I'll wait for it before enabling this <meta property="og:image " content={page.heroImage.publicURL} /> */}
        <meta
          property="og:url"
          content={simplePathJoin(origin, currentPage.path)}
        />
        <meta property="og:description" content={currentPage.seo.description} />
        {page.fields.locales.map(locale => (
          <link
            key={locale.language}
            rel="alternate"
            href={simplePathJoin(origin, locale.path)}
            hreflang={locale.language}
          />
        ))}
      </Helmet>
      <Wrapper>
        <Spacer />
        <PageTitle>{currentPage.title}</PageTitle>
        <ProjectsList>
          {projects.map(project => {
            const currentItem = project.locales.find(
              locale => locale.language === pageLocale
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
                      sizes={currentItem.featuredImage.childImageSharp.sizes}
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
    cookiePolicy: markdownRemark(fields: { slug: { eq: "/cookies/" } }) {
      fields {
        frontmatter {
          locales {
            language
            path
          }
        }
      }
    }
    page: staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
        locales {
          language
          path
          title
          seo {
            description
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
                    sizes(maxWidth: 1200, maxHeight: 600) {
                      ...GatsbyImageSharpSizes
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
    display: inline-block;
    width: auto;
    padding-right: 0;
    &::before {
      background: #161338;
      opacity: 0;
      bottom: -1px;
      content: "";
      height: 1px;
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
