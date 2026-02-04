import React from "react";
import Link from "components/Link";
import Image from "components/Image";
import styled from "types/styled-components";
import { FormattedMessage, FormattedDate } from "react-intl";
import Page from "components/Page";
import { PageShell } from "types/shell";
import Wrapper from "components/Wrapper";
import Masonry from "react-masonry-css";

interface IProps {
  page: any;
  posts: any[];
  shell: PageShell;
}

const masonryBreakpoints = {
  default: 2,
  800: 1
};

const BlogPage = ({ page, posts, shell }: IProps) => {
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
        <Subtitle>{currentPage.subtitle}</Subtitle>
        <Container>
          <Masonry
            breakpointCols={masonryBreakpoints}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {posts.map((post) => {
              const currentItem = post.fields.frontmatter.locales.find(
                (locale: any) => locale.language === shell.locale
              );
              return (
                <PostListItem key={currentItem.path}>
                  <PostFeaturedImageWrapper>
                    <Link to={currentItem.path}>
                      <Image
                        src={currentItem.featuredImage}
                        alt={currentItem.title}
                      />
                    </Link>
                  </PostFeaturedImageWrapper>
                  <ProjectDescription>
                    <PostDate>
                      <FormattedDate
                        day="2-digit"
                        month="long"
                        year="numeric"
                        value={new Date(post.fields.frontmatter.date)}
                      />
                    </PostDate>
                    <PostTitle>{currentItem.title}</PostTitle>
                    <PostAuthor>{post.fields.frontmatter.author}</PostAuthor>
                    <PostExcerpt>{currentItem.excerpt}</PostExcerpt>
                    <PostLink>
                      <Link to={currentItem.path}>
                        <FormattedMessage
                          id="blog.readMore"
                          defaultMessage="Read more"
                        />
                      </Link>
                    </PostLink>
                  </ProjectDescription>
                </PostListItem>
              );
            })}
          </Masonry>
        </Container>
      </Wrapper>
    </Page>
  );
};

const PageTitle = styled.h1`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.green};
  font-family: "Roboto Mono", monospace;
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

const Subtitle = styled.h2`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;
  padding-bottom: 40px;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;
const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;

const Container = styled.div`
  width: calc(100% + 120px);
  margin-left: -60px;
  @media (max-width: 1260px) {
    width: calc(100% + 80px);
    margin-left: -40px;
  }
  @media (max-width: 1000px) {
    width: calc(100% + 40px);
    margin-left: -20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
  .masonry-grid {
    display: flex;
    margin-left: 0;
    width: auto;
  }
  .masonry-grid-column {
    padding-left: 0;
    background-clip: padding-box;
  }
`;

const PostListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 60px;
  box-sizing: border-box;
  width: 100%;
  @media (max-width: 1260px) {
    padding: 40px;
  }
  @media (max-width: 1000px) {
    padding: 20px;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding: 0;
    margin: 40px 0;
  }
`;

const ProjectDescription = styled.div`
  padding-right: 60px;
  box-sizing: border-box;
  padding: 30px 0;
  @media (max-width: 900px) {
    width: 100%;
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

const PostDate = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  color: ${props => props.theme.colors.gray};
  font-family: "Roboto Mono", monospace;
  padding-bottom: 13px;
`;

const PostTitle = styled.h3`
  font-weight: 700;
  font-family: Europa;
  font-size: 24px;
  padding-bottom: 15px;
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
  color: ${props => props.theme.colors.green};
  font-family: "Roboto Mono", monospace;
  padding-bottom: 25px;
`;

const PostExcerpt = styled.div`
  font-size: 14px;
  line-height: 1.8em;
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
