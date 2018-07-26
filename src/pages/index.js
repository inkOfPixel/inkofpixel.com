// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import Link from "gatsby-link";

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
          <Title dangerouslySetInnerHTML={{ __html: hero.title }} />
          <Subtitle>{hero.subtitle}</Subtitle>
          <HeroIllustration>
            <div className="drop drop01" />
            <div className="drop drop02" />
            <div className="drop drop03" />
            <div className="drop drop04" />
            <div className="drop drop05" />
            <div className="drop drop06" />
          </HeroIllustration>
        </Wrapper>
      </Section>
      <Section className="Services" id="Services">
        <Wrapper>
          <SectionTitle>Service</SectionTitle>
          <Flexbox>
            <Heading>
              <Title>{services.title}</Title>
              <Subtitle>{services.description}</Subtitle>
            </Heading>
            <ServiceList>
              {services.primaryList.map(item => (
                <li key={item.title}>
                  <div className="icon">
                    <img src={item.image} alt={`${item.title} inkOfPixel`} />
                  </div>
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </li>
              ))}
            </ServiceList>
          </Flexbox>
          <Flexbox>
            <Heading className="secondary">
              <Title>{services.subTitle}</Title>
              <Subtitle>{services.subDescription}</Subtitle>
            </Heading>
            <ServiceList className="secondaryServicesList">
              {services.secondaryList.map(item => (
                <li key={item.title}>
                  <div className="icon secondary">
                    <img src={item.image} alt={`${item.title} inkOfPixel`} />
                  </div>
                  <p className="title">{item.title}</p>
                  <p className="description">{item.description}</p>
                </li>
              ))}
            </ServiceList>
          </Flexbox>
        </Wrapper>
      </Section>
      <Section className="Projects" id="Projects">
        <Wrapper>
          <SectionTitle>Projects</SectionTitle>
          <Title>{projects.title}</Title>
          <ul className="featuredProjectsList">
            {projects.fields.featuredProjects.map(item => (
              <li key={item.frontmatter.title}>
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
                    <p className="description">{item.frontmatter.excerpt}</p>
                  </div>
                </div>
                <Link className="projectLink" to={item.fields.path}>
                  Discover More
                </Link>
              </li>
            ))}
          </ul>
        </Wrapper>
      </Section>
      <Section className="About" id="About">
        <Wrapper>
          <SectionTitle>About Us</SectionTitle>
          <Title>
            We’re an experience design agency that builds brands, platforms, &
            eCommerce flagships that help businesses succeed in digital culture
          </Title>
        </Wrapper>
      </Section>
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

const Title = styled.h2`
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

const SectionTitle = styled.p`
  font-size: 14px;
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
    background-color: #000;
    position: absolute;
    top: 7px;
    left: -68px;
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateInverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const bordertl = keyframes`
  0%, 100% { border-top-left-radius: 50%; }
  25% { border-top-left-radius: 90px;}
  50% { border-top-left-radius: 40%; }
  75% { border-top-left-radius: 45%; }
`;

const bordertr = keyframes`
  0%, 100% { border-top-right-radius: 50%;}
  25% { border-top-right-radius: 49%;}
  50% { border-top-right-radius: 50%px;}
  75% { border-top-right-radius: 35%px;}
`;

const borderbr = keyframes`
  0%, 100% { border-bottom-right-radius: 50%; }
  25% { border-bottom-right-radius: 45%;}
  50% { border-bottom-right-radius: 47%;}
  75% { border-bottom-right-radius: 48%;}
`;

const borderbl = keyframes`
  0%, 100% { border-bottom-left-radius: 50%; }
  25% { border-bottom-left-radius: 48%; }
  50% { border-bottom-left-radius: 48%; }
  75% { border-bottom-left-radius: 45%;}
`;

const HeroIllustration = styled.div`
  width: 100%;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  .drop{
    position: absolute;
    radius: 50%;
  }
  .drop01 {
    top: -200px;
    right: -200px;
    width:600px;
    height: 600px;
    background-color: #f8f1ff;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
  }
  .drop02 {
    top: 200px;
    right: 500px;
    width: 280px;
    height: 280px;
    background-color: #ffefe4;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
  }
  .drop03 {
    top: 130px;
    left: -60px;
    width: 150px;
    height: 150px;
    background-color: #f8f1ff;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
  }
  .drop04 {
    top: -100px;
    left: 400px;
    width: 100px;
    height: 100px;
    background-color: #e8fbf6;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
  }
  .drop05 {
    top: 250px;
    left: 230px;
    width: 60px;
    height: 60px;
    background-color: #e8fbf6;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
  }
  .drop06 {
    top: -20px;
    left: 230px;
    width: 60px;
    height: 60px;
    background-color: #fff7df;
    animation: 
      3s ${bordertl} linear infinite, 
      4s ${bordertr} linear infinite,
      5.6s ${borderbl} linear infinite, 
      3.3s ${borderbr} linear infinite,
      3.6s ${rotate} linear infinite, 
      2s hover ease-in-out infinite;
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
        .icon {
          height: 100px;
          width: 100px;
          radius: 50%;

          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          animation: 3s ${bordertl} linear infinite,
            4s ${bordertr} linear infinite, 5.6s ${borderbl} linear infinite,
            3.3s ${borderbr} linear infinite, 3.6s ${rotate} linear infinite,
            2s hover ease-in-out infinite;
          &.secondary {
            background-color: #ffefe4;
          }
          img {
            width: 80px;
            position: absolute;
            animation: 3.6s ${rotateInverse} linear infinite,
              2s hover ease-in-out infinite;
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
  &.Projects {
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
    ${Title} {
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
        flex-direction: column;
        box-sizing: border-box;
        width: calc(33.33% - 30px);
        background-color: #fff;
        justify-content: space-between;
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
    ${Title} {
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
