// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";
import Splash from "components/Splash";
import Markdown from "react-markdown";
import { Check } from "react-feather";
import { kebabCase } from "lodash";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const ServicesPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { site, navigation, cookiePolicy, page } = data;
  const { origin } = site.siteMetadata;
  const currentPage = page.fields.locales.find(
    locale => locale.language === pageLocale
  );
  const currentNavigation = navigation.locales.find(
    locale => locale.language === pageLocale
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
        <meta property="og:image " content={currentPage.seo.image} />
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
        <Info>
          <PageTitle>{currentPage.title}</PageTitle>
          <Intro>{currentPage.intro}</Intro>
          <Subtitle>{currentPage.subtitle}</Subtitle>
        </Info>
        <ServiceList>
          {currentPage.servicesList.map((item, index) => (
            <Service key={item.title} id={kebabCase(item.title)}>
              <ServiceIcon>
                <Splash
                  color={
                    index < 3
                      ? ["#f8f1ff", "#e8fbf6", "#fff7df"][index]
                      : "#ffefe4"
                  }
                >
                  <img src={item.image} alt={`${item.title} inkOfPixel`} />
                </Splash>
              </ServiceIcon>
              <ServiceText>
                <ServiceTitle className="title">{item.title}</ServiceTitle>
                <RichText source={item.description} />
                <ServicePoints>
                  {item.points &&
                    item.points.map((subitem, pointIndex) => (
                      <Point key={pointIndex}>
                        <CheckContainer
                          style={{
                            backgroundColor:
                              index < 3
                                ? ["#f8f1ff", "#e8fbf6", "#fff7df"][index]
                                : "#ffefe4"
                          }}
                        >
                          <Check
                            color={
                              index < 3
                                ? ["#8152bc", "#05c3b6", "#F6BC00"][index]
                                : "#FD7241"
                            }
                            size={18}
                            strokeLinecap="square"
                            strokeWidth="3"
                          />
                        </CheckContainer>
                        <PointTitle>{subitem.title}</PointTitle>
                      </Point>
                    ))}
                </ServicePoints>
              </ServiceText>
            </Service>
          ))}
        </ServiceList>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ServicesPageQuery($name: String!) {
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
            image
          }
          intro
          subtitle
          servicesList {
            title
            image
            description
            points {
              title
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

const Flexbox = styled.div`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  width: 80%;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
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

const Intro = styled.h2`
  font-size: 46px;
  padding: 0;
  margin: 0;
  font-weight: 700;
  font-family: Europa;
  line-height: 1.1em;

  line-height: 1.2em;
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
  color: ${props => props.theme.colors.gray};
  padding-top: 20px;
`;
const ServiceList = styled.ul`
  margin-top: 50px;
`;

const Service = styled.li`
  display: flex;
  padding: 50px 0;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ServiceIcon = styled.div`
  flex: 0 0 400px;
  padding-top: 30px;
  @media (max-width: 900px) {
    flex: 0 0 280px;
  }
  @media (max-width: 700px) {
    flex: 0 0 auto;
  }
  ${Splash} {
    margin: 0 auto;
    height: 180px;
    width: 180px;
    img {
      width: 100px;
    }
    @media (max-width: 900px) {
      height: 140px;
      width: 140px;
      img {
        width: 80px;
      }
    }
    @media (max-width: 700px) {
      margin: 0;
      margin-bottom: 30px;
    }
  }
`;

const ServiceText = styled.div``;
const ServiceTitle = styled.h3`
  font-weight: 700;
  font-family: Europa;
  font-size: 20px;
  padding-bottom: 20px;
  letter-spacing: 0.04em;
`;
const RichText = styled(Markdown)`
  font-size: 14px;
  line-height: 1.8em;
  color: ${props => props.theme.colors.gray};
  p {
    padding-bottom: 10px;
  }
  strong {
    font-weight: 600;
  }
`;

const ServicePoints = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-top: 40px;
`;
const Point = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;

const CheckContainer = styled.div`
  height: 30px;
  width: 30px;
  background-color: red;
  border-radius: 50%;
  position: relative;
  flex: 0 0 30px;
  margin-left: 30px;
  margin-right: 20px;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  @media (max-width: 500px) {
    height: 24px;
    width: 24px;
    flex: 0 0 24px;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

const PointTitle = styled.p`
  font-size: 14px;
  line-height: 1.8em;
  color: ${props => props.theme.colors.gray};
`;

export default ServicesPage;
