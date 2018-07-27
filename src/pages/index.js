// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import ScrollableAnchor from "react-scrollable-anchor";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import Link from "gatsby-link";
import Splash from "components/Splash";

type Props = {
  data: {}
};

const IndexPage = ({ data }: Props) => {
  const hero = data.hero.edges[0].node;
  const services = data.services.edges[0].node;
  const projects = data.projects.edges[0].node;
  const contacts = data.contacts.edges[0].node;
  return (
    <Page>
      <Section className="Hero">
        <Wrapper>
          <Slogan dangerouslySetInnerHTML={{ __html: hero.title }} />
          <Subtitle>{hero.subtitle}</Subtitle>
          <HeroIllustration>
            <Splash className="splash01" color="#f8f1ff" size="600px" />
            <Splash className="splash02" color="#ffefe4" size="280px" />
            <Splash className="splash03" color="#f8f1ff" size="150px" />
            <Splash className="splash04" color="#e8fbf6" size="100px" />
            <Splash className="splash05" color="#e8fbf6" size="60px" />
            <Splash className="splash06" color="#fff7df" size="60px" />
          </HeroIllustration>
        </Wrapper>
      </Section>
      <ScrollableAnchor id="services">
        <Section className="Services">
          <Wrapper>
            <SectionTitle>Service</SectionTitle>
            <Flexbox>
              <Heading>
                <DisplayText>{services.title}</DisplayText>
                <Subtitle>{services.description}</Subtitle>
              </Heading>
              <ServiceList>
                {services.primaryList.map((item, index) => (
                  <li key={item.title}>
                    <Splash
                      color={["#f8f1ff", "#e8fbf6", "#fff7df"][index]}
                      size="100px"
                    >
                      <img src={item.image} alt={`${item.title} inkOfPixel`} />
                    </Splash>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                  </li>
                ))}
              </ServiceList>
            </Flexbox>
            <Flexbox>
              <Heading className="secondary">
                <DisplayText>{services.subTitle}</DisplayText>
                <Subtitle>{services.subDescription}</Subtitle>
              </Heading>
              <ServiceList className="secondaryServicesList">
                {services.secondaryList.map(item => (
                  <li key={item.title}>
                    <Splash color="#ffefe4" size="100px">
                      <img src={item.image} alt={`${item.title} inkOfPixel`} />
                    </Splash>
                    <p className="title">{item.title}</p>
                    <p className="description">{item.description}</p>
                  </li>
                ))}
              </ServiceList>
            </Flexbox>
          </Wrapper>
        </Section>
      </ScrollableAnchor>
      <ScrollableAnchor id="work">
        <Section className="Work">
          <Wrapper>
            <SectionTitle>Our Work</SectionTitle>
            <DisplayText>{projects.title}</DisplayText>
            <ul className="featuredProjectsList">
              {projects.fields.featuredProjects.map(item => (
                <li key={item.frontmatter.title}>
                  <Link to={item.fields.path}>
                    <div className="content">
                      <div
                        className="featuredImage"
                        style={{
                          backgroundImage: `url('${
                            item.frontmatter.featuredImage
                          }')`
                        }}
                      />
                      <div className="info">
                        <p className="title">{item.frontmatter.title}</p>
                        <p className="description">
                          {item.frontmatter.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="projectLink" to={item.fields.path}>
                      Discover More
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Wrapper>
        </Section>
      </ScrollableAnchor>
      <ScrollableAnchor id="about">
        <Section className="About">
          <Wrapper>
            <SectionTitle>About Us</SectionTitle>
            <DisplayText>
              We are engineers, designers and scientists.
            </DisplayText>
            <Subtitle>
              We use state of the art technologies, embrace change and never
              stop learning.
              <br />If you’re looking for new ideas and talented people to bring
              them to life, you’ve come to the right place.
            </Subtitle>
          </Wrapper>
        </Section>
      </ScrollableAnchor>
    </Page>
  );
};

const Flexbox = styled.div`
  display: flex;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
`;

const Slogan = styled.h2`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const DisplayText = styled.p`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;
  @media (max-width: 900px) {
    font-size: 40px;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 0;
  font-weight: 400;
  line-height: 1.8em;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  width: 100%;
  padding-bottom: 30px;
  &::before {
    content: "";
    display: block;
    height: 2px;
    width: 60px;
    background-color: #161338;
    position: absolute;
    top: 7px;
    left: -68px;
  }
`;

const HeroIllustration = styled.div`
  width: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  ${Splash} {
    position: absolute;
  }
  .splash01 {
    top: -200px;
    right: -200px;
  }
  .splash02 {
    top: 200px;
    right: 500px;
  }
  .splash03 {
    top: 130px;
    left: -60px;
  }
  .splash04 {
    top: -100px;
    left: 400px;
  }
  .splash05 {
    top: 250px;
    left: 230px;
  }
  .splash06 {
    top: -20px;
    left: 230px;
  }
}
`;

const ServiceList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  position: relative;
  ${Wrapper} {
    z-index: 10;
  }
  &.Hero {
    padding-top: 300px;
    padding-bottom: 400px;
    overflow: hidden;
    @media (max-width: 900px) {
      padding-top: 200px;
      padding-bottom: 300px;
    }
    ${Subtitle} {
      width: 50%;
      padding-top: 20px;

      @media (max-width: 800px) {
        width: 70%;
      }
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }
  &.Services {
    background-color: #fff;
    padding-bottom: 150px;
    ${SectionTitle} {
      color: #8152bc;
      &::before {
        background-color: #8152bc;
      }
    }
    ${Flexbox} {
      @media (max-width: 750px) {
        flex-direction: column;
      }
    }
    ${Heading} {
      flex: 0 0 400px;
      margin-right: 150px;
      @media (max-width: 1000px) {
        flex: 0 0 320px;
        margin-right: 100px;
      }
      @media (max-width: 1000px) {
        flex: 0 0 300px;
        margin-right: 80px;
      }
      @media (max-width: 750px) {
        flex: 0 0 auto;
        padding-bottom: 50px;
        margin: 0;
        &.secondary {
          padding-top: 50px;
        }
      }
    }
    ${Subtitle} {
      padding-top: 20px;
      color: #949494;
    }
    ${ServiceList} {
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-bottom: 40px;
        &:nth-child(1) {
          .icon {
            background-color: #f8f1ff;
          }
        }
        &:nth-child(2) {
          .icon {
            background-color: #e8fbf6;
          }
        }
        &:nth-child(3) {
          .icon {
            background-color: #fff7df;
          }
        }
        ${Splash} {
          img {
            width: 80px;
          }
        }
        .title {
          font-weight: 700;
          font-family: Europa;
          font-size: 20px;
          padding-bottom: 20px;
          padding-top: 20px;
          letter-spacing: 0.04em;
        }
        .description {
          font-size: 14px;
          line-height: 1.8em;
          color: #949494;
        }
      }
    }
  }
  &.Work {
    margin-top: 0px;
    background-color: #fff;
    padding-top: 150px;
    padding-bottom: 150px;
    background-color: #eaf7f7;
    ${SectionTitle} {
      color: #05c3b6;
      &::before {
        background-color: #05c3b6;
      }
    }
    ${DisplayText} {
      padding-bottom: 100px;
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
      @media (max-width: 750px) {
        width: 100%;
        margin-left: 0;
      }
      li {
        margin: 15px;
        display: flex;
        box-sizing: border-box;
        width: calc(33.33% - 30px);
        background-color: #fff;
        a {
          flex-direction: column;
          box-sizing: border-box;
          display: flex;
          text-decoration: none;
          justify-content: space-between;
          height: 100%;
        }
        @media (max-width: 1000px) {
          width: calc(50% - 30px);
          &:nth-child(3) {
            display: none;
          }
        }
        @media (max-width: 750px) {
          width: 100%;
          margin: 15px 0;
          &:nth-child(3) {
            display: block;
          }
        }
      }
      .featuredImage {
        width: 100%;
        height: 300px;
        background-size: cover;
        position: relative;
        background-position: center;
      }
      .content {
        display: flex;
        flex-direction: column;
        .info {
          width: 100%;
          padding: 30px;
          box-sizing: border-box;
          position: relative;
          .title {
            font-weight: 700;
            font-family: Europa;
            font-size: 20px;
            padding-bottom: 20px;
            letter-spacing: 0.04em;
            color: #161338;
          }
          .description {
            font-size: 14px;
            line-height: 1.6em;
            color: #949494;
          }
        }
      }
      .projectLink {
        color: #05c3b6;
        display: inline-block;
        text-decoration: none;
        transition: all 0.3s;
        margin: 0 30px 30px 30px;
        &:hover {
          color: #7589f4;
        }
      }
    }
  }
  &.About {
    background-color: #fff;
    padding-top: 200px;
    padding-bottom: 200px;
    ${SectionTitle} {
      color: #8152bc;
      &::before {
        background-color: #8152bc;
      }
    }
    ${DisplayText} {
      width: 80%;
      line-height: 1.2em;
      @media (max-width: 700px) {
        width: 100%;
      }
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
          subTitle
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
              }
              fields {
                path
              }
            }
          }
        }
      }
    }
    contacts: allHomePageJson(
      filter: { fields: { name: { eq: "contacts" } } }
    ) {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`;
