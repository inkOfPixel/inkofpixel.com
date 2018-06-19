// @flow

import React, { Fragment } from "react";
import styled from "styled-components";
import Wrapper from "components/Wrapper";
import illustration from "images/inkOfPixel - Hero - Illustration.svg";
import Link from "gatsby-link";

type Props = {
  data: {}
};

const IndexPage = ({ data }: Props) => {
  const hero = data.hero.edges[0].node;
  const services = data.services.edges[0].node;
  const projects = data.projects.edges[0].node;
  return (
    <Page>
      {console.log(data)}
      <Section className="Hero">
        <Wrapper>
          <HeroIllustration src={illustration} />
          <Title dangerouslySetInnerHTML={{ __html: hero.title }} />
          <Subtitle>{hero.subtitle}</Subtitle>
        </Wrapper>
      </Section>
      <Section className="Services" id="Sevices">
        <Wrapper>
          <Title>{services.title}</Title>
          <Subtitle>{services.description}</Subtitle>
          <ul className="primaryServicesList">
            {services.primaryList.map(item => (
              <li key={item.title}>
                <img src={item.image} alt={`${item.title} inkOfPixel`} />
                <p className="title">{item.title}</p>
                <p className="description">{item.description}</p>
              </li>
            ))}
          </ul>
          <Subtitle className="secondary">{services.description}</Subtitle>
          <ul className="secondaryServicesList">
            {services.secondaryList.map(item => (
              <li key={item.title}>
                <img src={item.image} alt={`${item.title} inkOfPixel`} />
                <div className="content">
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Wrapper>
      </Section>
      <Section className="Projects" id="Projects">
        <Wrapper>
          <Title>{projects.title}</Title>
          <Subtitle>{projects.description}</Subtitle>
          <ul className="featuredProjectsList">
            {projects.fields.featuredProjects.map(item => (
              <li key={item.frontmatter.title}>
                <div className="content">
                  <img
                    src={item.frontmatter.logo}
                    alt={`${item.frontmatter.title} logo`}
                  />
                  <p className="description">{item.frontmatter.excerpt}</p>
                  <Link className="projectLink" to={item.fields.path}>
                    Discover More
                  </Link>
                </div>
                <div
                  className="featuredImage"
                  style={{
                    backgroundImage: `url('${item.frontmatter.featuredImage}')`
                  }}
                />
              </li>
            ))}
          </ul>
        </Wrapper>
      </Section>
      <Section className="Contacts" id="Contacts">
        <Wrapper>
          <Title>{services.title}</Title>
          <Subtitle>{services.description}</Subtitle>
          <form name="contact" netlify>
            <p>
              <label>
                Name <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Email <input type="email" name="email" />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </Wrapper>
      </Section>
    </Page>
  );
};

const Page = styled.div`
  padding-top: 160px;
  overflow: hidden;
  @media (max-width: 899px) {
    padding-top: 20px;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  @media (max-width: 700px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 24px;
  padding: 0;
  margin: 0;
  padding-top: 30px;
  font-weight: 700;
  width: 50%;
  line-height: 1.4em;
  @media (max-width: 700px) {
    font-size: 20px;
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const HeroIllustration = styled.div.attrs({
  children: ({ src, alt }) => <img src={src} alt={alt} />
})`
  width: 700px;
  position: absolute;
  z-index: -1;
  right: -100px;
  top: -100px;
  @media (max-width: 1200px) {
    right: -200px;
    width: 680px;
  }
  @media (max-width: 900px) {
    opacity: 0.5;
    right: -300px;
  }
  img {
    width: 100%;
  }
`;

const Section = styled.section`
  width: 100%;

  position: relative;
  ${Wrapper} {
    z-index: 10;
  }
  &.Hero {
    padding-top: 100px;
    padding-bottom: 140px;
    ${Title} {
      color: #7589f4;
    }
    ${Subtitle} {
      color: #161338;
    }
  }
  &.Services {
    margin-top: 200px;
    background-color: rgb(245, 245, 245);
    padding-top: 30px;
    padding-bottom: 200px;
    &:before,
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 500px;
      width: 100%;
    }
    &:before {
      z-index: 1;
      top: -100px;
      transform: skewY(4deg);
      background-color: #7589f4;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(5deg);
      background-color: rgb(245, 245, 245);
    }
    ${Title} {
      text-align: center;
      color: #7589f4;
    }
    ${Subtitle} {
      text-align: center;
      margin: 0 auto;
      padding-bottom: 60px;
      &.secondary {
        padding-top: 60px;
      }
    }
    .primaryServicesList {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      width: calc(100% + 20px);
      margin-left: -10px;
      flex-wrap: wrap;
      justify-content: center;
      @media (max-width: 600px) {
        width: calc(100% + 60px);
        margin-left: -30px;
      }
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 30px;

        width: calc(25% - 20px);
        @media (max-width: 1100px) {
          width: calc(33.33% - 20px);
        }
        @media (max-width: 800px) {
          width: calc(50% - 20px);
        }
        @media (max-width: 500px) {
          width: calc(100% - 20px);
        }

        img {
          width: 160px;
        }
        .title {
          font-weight: 700;
          font-size: 20px;
          padding-bottom: 20px;
          padding-top: 20px;
        }
        .description {
          font-size: 14px;
          text-align: center;
          line-height: 1.6em;
        }
      }
    }
    .secondaryServicesList {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      width: calc(100% + 20px);
      margin-left: -10px;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        width: calc(100% + 60px);
        margin-left: -30px;
      }
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 30px;
        width: calc(50% - 20px);
        @media (max-width: 900px) {
          width: calc(100% - 20px);
        }
        @media (max-width: 500px) {
          flex-direction: column;
        }

        img {
          width: 160px;
        }
        .content {
          padding-left: 30px;
          @media (max-width: 500px) {
            padding-left: 0;
            text-align: center;
          }
          .title {
            font-weight: 700;
            font-size: 20px;
            padding-bottom: 20px;
            padding-top: 20px;
          }
          .description {
            font-size: 14px;
            line-height: 1.6em;
          }
        }
      }
    }
  }
  &.Projects {
    margin-top: 0px;
    background-color: #fff;
    padding-top: 30px;
    padding-bottom: 100px;
    &:before,
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 500px;
      width: 100%;
    }
    &:before {
      z-index: 1;
      top: -100px;
      transform: skewY(-4deg);
      background-color: #fe5a6d;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(-5deg);
      background-color: #fff;
    }
    ${Title} {
      text-align: center;
      color: #fe5a6d;
    }
    ${Subtitle} {
      text-align: center;
      margin: 0 auto;
      padding-bottom: 60px;
      &.secondary {
        padding-top: 60px;
      }
    }
    .featuredProjectsList {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      width: calc(100% + 30px);
      margin-left: -15px;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        width: calc(100% + 80px);
        margin-left: -40px;
      }
      li {
        margin: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        width: calc(50% - 30px);
        justify-content: space-between;
        background-color: rgb(245, 245, 245);
        @media (max-width: 900px) {
          width: calc(100% - 30px);
          flex-direction: row;
        }
        @media (max-width: 700px) {
          flex-direction: column;
        }
      }
      img {
        width: 300px;
        display: block;
        margin: 0 auto;
      }
      .content {
        width: 100%;
        padding: 30px 0 60px 0;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        .description {
          width: 100%;
          box-sizing: border-box;
          padding: 0 30px;
          font-size: 14px;
          line-height: 1.8em;
        }
        .projectLink {
          color: #161338;
          font-weight: 700;
          margin-top: 20px;
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s;
          &:hover {
            color: #7589f4;
          }
        }
      }
      .featuredImage {
        width: 100%;
        height: 300px;
        background-size: cover;
        position: relative;
        background-position: center;
        @media (max-width: 900px) {
          height: 100%;
        }
        @media (max-width: 700px) {
          height: 300px;
        }
        &::after {
          position: absolute;
          height: 50px;
          width: 100%;
          background-color: rgb(245, 245, 245);
          content: "";
          top: -40px;
          left: 0;
          transform: skewY(2deg);
          @media (max-width: 900px) {
            height: 100%;
            width: 50px;
            top: 0;
            left: -40px;
            transform: skewY(0deg);
            transform: skewX(2deg);
          }
          @media (max-width: 700px) {
            height: 50px;
            width: 100%;
            top: -40px;
            left: 0;
            transform: skewY(2deg);
            transform: skewX(0deg);
          }
        }
      }
    }
  }
  &.Contacts {
    margin-top: 200px;
    background-color: rgb(245, 245, 245);
    padding-top: 30px;
    padding-bottom: 200px;
    &:before,
    &:after {
      display: block;
      content: "";
      position: absolute;
      height: 500px;
      width: 100%;
    }
    &:before {
      z-index: 1;
      top: -100px;
      transform: skewY(4deg);
      background-color: #7589f4;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(5deg);
      background-color: rgb(245, 245, 245);
    }
    ${Title} {
      text-align: center;
      color: #7589f4;
    }
    ${Subtitle} {
      text-align: center;
      margin: 0 auto;
      padding-bottom: 60px;
      &.secondary {
        padding-top: 60px;
      }
    }
`;

export default IndexPage;

export const query = graphql`
  query HomePageQuery {
    hero: allHomePageJson(filter: { fields: { name: { eq: "hero" } } }) {
      edges {
        node {
          title
          subtitle
        }
      }
    }
    services: allHomePageJson(
      filter: { fields: { name: { eq: "services" } } }
    ) {
      edges {
        node {
          title
          description
          primaryList {
            image
            title
            description
          }
          subDescription
          secondaryList {
            image
            title
            description
          }
        }
      }
    }
    projects: allHomePageJson(
      filter: { fields: { name: { eq: "projects" } } }
    ) {
      edges {
        node {
          title
          description
          fields {
            name
            featuredProjects {
              id
              frontmatter {
                title
                excerpt
                featuredImage
                logo
              }
              fields {
                path
              }
            }
          }
        }
      }
    }
  }
`;
