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
            <Service key={item.title}>
              <ServiceIcon>
                <Splash
                  color={
                    index < 3
                      ? ["#f8f1ff", "#e8fbf6", "#fff7df"][index]
                      : "#ffefe4"
                  }
                  size="180px"
                >
                  <img src={item.image} alt={`${item.title} inkOfPixel`} />
                </Splash>
              </ServiceIcon>
              <ServiceText>
                <ServiceTitle className="title">{item.title}</ServiceTitle>
                <RichText source={item.description} />
                {item.points &&
                  item.points.map((subitem, pointIndex) => (
                    <Points key={pointIndex}>{subitem.title}</Points>
                  ))}
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
  color: #05c3b6;
  font-family: "Roboto Mono", monospace;
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
  color: #949494;
  padding-top: 20px;
`;
const ServiceList = styled.ul`
  margin-top: 100px;
`;

const Service = styled.li`
  display: flex;
`;

const ServiceIcon = styled.div`
  flex: 0 0 400px;
  padding-top: 30px;
  ${Splash} {
    margin: 0 auto;
    img {
      width: 100px;
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
  color: #949494;
  p {
    padding-bottom: 10px;
  }
  strong {
    font-weight: 600;
  }
`;

const Points = styled.div``;

export default ServicesPage;
