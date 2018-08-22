// @flow

import React from "react";
import styled from "styled-components";
import ScrollableAnchor from "react-scrollable-anchor";
import Img from "gatsby-image";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import Splash from "components/Splash";
import simplePathJoin from "utils/simplePathJoin";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

export default class Home extends React.Component<Props> {
  render() {
    const { data, pathContext } = this.props;
    const { locale: pageLocale } = pathContext;
    const { staticPagesJson, site, generalSettings, navigation } = data;
    const { defaultLanguage } = generalSettings;
    const home = data.staticPagesJson;
    const currentHome = home.locales.find(
      locale => locale.language === pageLocale
    );
    const { featuredProjects } = home.fields;
    const currentNavigation = navigation.locales.find(
      locale => locale.language === pageLocale
    );
    return (
      <Page
        locale={pageLocale}
        navigation={{
          main: currentNavigation.main.links,
          language: home.locales.map(locale => ({
            locale: locale.language,
            url:
              locale.language === defaultLanguage
                ? locale.url
                : simplePathJoin("/", locale.language, locale.url)
          }))
        }}
      >
        <Helmet>
          <title>{currentHome.title}</title>
          <meta name="description" content={currentHome.seo.description} />
          <meta property="og:title" content={currentHome.title} />
          <meta
            property="og:description"
            content={currentHome.seo.description}
          />
          {home.locales.map(locale => (
            <link
              key={locale.language}
              rel="alternate"
              href={simplePathJoin(
                site.siteMetadata.origin,
                locale.language !== defaultLanguage ? locale.language : "",
                locale.url
              )}
              hreflang={locale.language}
            />
          ))}
        </Helmet>
        <Section className="Hero">
          <Wrapper>
            <Slogan
              dangerouslySetInnerHTML={{ __html: currentHome.hero.title }}
            />
            <Subtitle>{currentHome.hero.subtitle}</Subtitle>
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
              <SectionTitle>
                <FormattedMessage
                  id="home.serviceSection.title"
                  defaultMessage="Services"
                />
              </SectionTitle>
              {currentHome.services.map((serviceGroup, groupIndex) => (
                <Flexbox key={groupIndex}>
                  <Heading>
                    <DisplayText>{serviceGroup.groupTitle}</DisplayText>
                    <Subtitle>{serviceGroup.groupDescription}</Subtitle>
                  </Heading>
                  <ServiceList>
                    {serviceGroup.serviceList.map((item, index) => (
                      <li key={item.title}>
                        <Splash
                          color={
                            groupIndex === 0
                              ? ["#f8f1ff", "#e8fbf6", "#fff7df"][index]
                              : "#ffefe4"
                          }
                          size="100px"
                        >
                          <img
                            src={item.image}
                            alt={`${item.title} inkOfPixel`}
                          />
                        </Splash>
                        <p className="title">{item.title}</p>
                        <p className="description">{item.description}</p>
                      </li>
                    ))}
                  </ServiceList>
                </Flexbox>
              ))}
            </Wrapper>
          </Section>
        </ScrollableAnchor>
        <ScrollableAnchor id="work">
          <Section className="Work">
            <Wrapper>
              <SectionTitle>
                <FormattedMessage
                  id="home.projectsSection.title"
                  defaultMessage="Our Work"
                />
              </SectionTitle>
              <DisplayText>{currentHome.projects.title}</DisplayText>
              <ul className="featuredProjectsList">
                {featuredProjects.map(item => {
                  const frontmatter = item.fields.frontmatter;
                  const currentItem = frontmatter.locales.find(
                    locale => locale.language === pathContext.locale
                  );
                  return (
                    <li key={frontmatter.title}>
                      <Link to={currentItem.path}>
                        <div className="content">
                          <Img
                            sizes={
                              currentItem.featuredImage.childImageSharp.sizes
                            }
                          />
                          <div className="info">
                            <p className="title">{frontmatter.title}</p>
                            <p className="description">{currentItem.excerpt}</p>
                          </div>
                        </div>
                        <div className="discoverMore">
                          <FormattedMessage
                            className="pippo"
                            id="home.projectsSection.discoverMore"
                            defaultMessage="Discover more"
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Wrapper>
          </Section>
        </ScrollableAnchor>
        <ScrollableAnchor id="about">
          <Section className="About">
            <Wrapper>
              <SectionTitle>
                <FormattedMessage
                  id="home.about.title"
                  defaultMessage="About us"
                />
              </SectionTitle>
              <DisplayText>
                <FormattedMessage
                  id="home.about.heading"
                  defaultMessage="We are engineers, designers and scientists."
                />
              </DisplayText>
              <Subtitle>
                <FormattedMessage
                  id="home.about.description"
                  defaultMessage="We use state of the art technologies, embrace change and never stop learning. {newLine}If you’re looking for new ideas and talented people to bring them to life, you’ve come to the right place."
                  values={{ newLine: <br /> }}
                />
              </Subtitle>
            </Wrapper>
          </Section>
        </ScrollableAnchor>
      </Page>
    );
  }
}

export const query = graphql`
  query HomeQuery($name: String!) {
    site {
      siteMetadata {
        origin
      }
    }
    generalSettings: settingsJson(fields: { name: { eq: "general" } }) {
      defaultLanguage
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
    staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
        featuredProjects {
          fields {
            frontmatter {
              title
              locales {
                language
                path
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
      locales {
        language
        url
        title
        seo {
          description
        }
        hero {
          title
          subtitle
        }
        services {
          groupTitle
          groupDescription
          serviceList {
            title
            image
            description
          }
        }
        projects {
          title
          description
        }
      }
    }
  }
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
  @media (max-width: 1100px) {
    .splash05 {
      display: none;
    }
  }
  @media (max-width: 900px) {
    .splash04 {
      display: none;
    }
    .splash02 {
      display: none;
    }
  }
  @media (max-width: 720px) {
    .splash06 {
      display: none;
    }
  }
  @media (max-width: 500px) {
    .splash03 {
      display: none;
    }
    .splash01 {
      right: -120px;
    }
  }
`;

const Flexbox = styled.div`
  display: flex;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
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
        transition: 500ms all;
        &:hover {
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
        }
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
      .gatsby-image-outer-wrapper {
        height: 300px;
        .gatsby-image-wrapper {
          height: 100%;
        }
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
      .discoverMore {
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
    ${Subtitle} {
      width: 80%;
      padding-top: 20px;

      @media (max-width: 700px) {
        width: 100%;
      }
    }
  }
`;
