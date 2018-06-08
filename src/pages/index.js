// @flow

import React, { Fragment } from "react";
import styled from "styled-components";
import Wrapper from "components/Wrapper";
import illustration from "images/inkOfPixel - Hero - Illustration.svg";

type Props = {
  data: {}
};

const IndexPage = ({ data }: Props) => {
  const hero = data.hero.edges[0].node;
  const services = data.services.edges[0].node;
  return (
    <Page>
      {console.log(data)}
      <Section className="Hero">
        <Wrapper>
          <HeroIllustration src={illustration} />
          <Title dangerouslySetInnerHTML={{ __html: hero.heroTitle }} />
          <Subtitle>{hero.heroSubtitle}</Subtitle>
        </Wrapper>
      </Section>
      <Section className="Services">
        <Wrapper>
          <Title>{services.servicesTitle}</Title>
          <Subtitle>{services.servicesDescription}</Subtitle>
          <ul className="primaryServicesList">
            {services.servicesPrimaryList.map(item => (
              <li key={item.title}>
                <img src={item.image} alt={`${item.title} inkOfPixel`} />
                <p className="title">{item.title}</p>
                <p className="description">{item.description}</p>
              </li>
            ))}
          </ul>
          <Subtitle className="secondary">
            {services.servicesDescription}
          </Subtitle>
          <ul className="secondaryServicesList">
            {services.serviceSecondaryList.map(item => (
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
      <Section className="Projects">
        <Wrapper>
          <Title>{services.servicesTitle}</Title>
          <Subtitle>{services.servicesDescription}</Subtitle>
        </Wrapper>
      </Section>
    </Page>
  );
};

const Page = styled.div`
  padding-top: 160px;
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
  @media (max-width: 700px) {
    font-size: 20px;
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
      width: 50%;

      @media (max-width: 700px) {
        width: 70%;
      }
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
      width: 70%;
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
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 30px;
        flex: 1 1 0;
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
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 30px;
        flex: 1 1 0;
        img {
          width: 160px;
        }
        .content {
          padding-left: 30px;
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
      background-color: #FE5A6D;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(-5deg);
      background-color: #fff;
    }
    ${Title} {
      text-align: center;
      color: #FE5A6D;
    }
    ${Subtitle} {
      text-align: center;
      width: 70%;
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
          heroTitle
          heroSubtitle
        }
      }
    }
    services: allHomePageJson(
      filter: { fields: { name: { eq: "services" } } }
    ) {
      edges {
        node {
          servicesTitle
          servicesDescription
          servicesPrimaryList {
            image
            title
            description
          }
          servicesSubDescription
          serviceSecondaryList {
            image
            title
            description
          }
        }
      }
    }
  }
`;
