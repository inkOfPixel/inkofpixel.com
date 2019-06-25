import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "types/styled-components";
import { FormattedMessage } from "react-intl";
import Page from "components/Page";
import { IPageLocale } from "types/index";
import Wrapper from "components/Wrapper";
import Masonry from "react-masonry-component";

interface IProps {
  data: any;
  pathContext: {
    locale: string;
  };
}

const masonryOptions = {
  transitionDuration: 0
};

const BlogPage = ({ data, pathContext }: IProps) => {
  console.log(data);
  console.log(pathContext);
  const currentPage = data.page.fields.locales.find(
    locale => locale.language === pathContext.locale
  );
  const posts = data.posts.edges.map(({ node }) => node.fields.frontmatter);

  console.log(posts);
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
        <h1>{currentPage.subtitle}</h1>
        <Masonry elementType={"ul"} options={masonryOptions}>
          {posts.map(post => {
            const currentItem = post.locales.find(
              locale => locale.language === pathContext.locale
            );
            return (
              <PostListItem key={currentItem.path}>
                <PostFeaturedImageWrapper>
                  <Link to={currentItem.path}>
                    <Img
                      fluid={currentItem.featuredImage.childImageSharp.fluid}
                    />
                  </Link>
                </PostFeaturedImageWrapper>
                <ProjectDescription>
                  <PostTitle>{post.title}</PostTitle>
                  <PostDate>{post.date}</PostDate>
                  <PostAuthor>{currentItem.author}</PostAuthor>
                  <PostExcerpt>{currentItem.excerpt}</PostExcerpt>
                  <PostLink>
                    <Link to={currentItem.path}>
                      <FormattedMessage
                        id="projectCard.readMore"
                        defaultMessage="Read more"
                      />
                    </Link>
                  </PostLink>
                </ProjectDescription>
              </PostListItem>
            );
          })}
        </Masonry>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query BlogPageQuery($name: String!) {
    page: staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
        locales {
          language
          path
          title
          subtitle
          seo {
            description
            image
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: {
        fields: {
          collection: { eq: "posts" }
          frontmatter: { published: { eq: true } }
        }
      }
    ) {
      edges {
        node {
          fields {
            frontmatter {
              title
              date
              author
              locales {
                language
                path
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

const PostListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: calc(50% - 40px);
  @media (max-width: 650px) {
    width: 100%;
    margin: 0;
    margin-bottom: 40px;
  }
`;

const ProjectDescription = styled.div`
  padding-right: 60px;
  box-sizing: border-box;
  padding-top: 10px;
  @media (max-width: 900px) {
    width: 100%;
    padding: 20px;
  }
`;
const PostFeaturedImageWrapper = styled.div`
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

const PostTitle = styled.h3`
  font-weight: 700;
  font-family: Europa;
  font-size: 20px;
  padding-bottom: 10px;
  letter-spacing: 0.04em;
  color: ${props => props.theme.colors.darkBlue};
`;
const PostAuthor = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
`;
const PostDate = styled.p`
  margin: 10px 0;
`;

const PostExcerpt = styled.div`
  font-size: 14px;
  line-height: 1.6em;
  color: ${props => props.theme.colors.gray};
`;

const PostLink = styled.div`
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

export default BlogPage;
