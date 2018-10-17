import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "types/styled-components";
import { FormattedMessage } from "react-intl";
import Wrapper from "components/Wrapper";
import Splash from "components/Splash";
import Page from "components/Page";
import { IPageLocale } from "types";

interface IProps {
  data: any;
  pathContext: {
    locale: string;
  };
}

export default class Home extends React.Component<IProps> {
  render() {
    const { data, pathContext } = this.props;
    const home = data.page;
    const currentHome = home.fields.locales.find(
      locale => locale.language === pathContext.locale
    );
    const { featuredProjects } = home.fields;
    return (
      <Page
        title={currentHome.title}
        description={currentHome.seo.description}
        localeCode={pathContext.locale}
        pageLocales={data.page.fields.locales.map(
          (locale: any): IPageLocale => ({
            code: locale.language,
            url: locale.path
          })
        )}
      >
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
                      <Link className="link" to={item.link}>
                        <FormattedMessage
                          id="home.serviceSection.discoverMore"
                          defaultMessage="Discover more"
                        />
                      </Link>
                    </li>
                  ))}
                </ServiceList>
              </Flexbox>
            ))}
          </Wrapper>
        </Section>
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
                          fluid={
                            currentItem.featuredImage.childImageSharp.fluid
                          }
                        />
                        <div className="info">
                          <p className="title">{frontmatter.title}</p>
                          <p className="description">{currentItem.excerpt}</p>
                        </div>
                      </div>
                      <div className="discoverMore">
                        <FormattedMessage
                          id="projectCard.discoverMore"
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
      </Page>
    );
  }
}

export const query = graphql`
  query HomeQuery($name: String!) {
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
              link
            }
          }
          projects {
            title
            description
          }
        }
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
    background-color: ${props => props.theme.colors.darkBlue};
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
      color: ${props => props.theme.colors.purple};
      &::before {
        background-color: ${props => props.theme.colors.purple};
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
      color: ${props => props.theme.colors.gray};
    }
    ${ServiceList} {
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-bottom: 60px;
        &:nth-child(1) {
          .icon {
            background-color: ${props => props.theme.colors.lightPurple};
          }
        }
        &:nth-child(2) {
          .icon {
            background-color: ${props => props.theme.colors.lightGreen};
          }
        }
        &:nth-child(3) {
          .icon {
            background-color: ${props => props.theme.colors.lightYello};
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
          color: ${props => props.theme.colors.gray};
        }
        .link {
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
      color: ${props => props.theme.colors.green};
      &::before {
        background-color: ${props => props.theme.colors.green};
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
        transition: 800ms all;
        &:hover {
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);
          transform: scale(1.01, 1.01);
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
        .gatsby-image-wrapper {
          height: 300px;
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
              color: ${props => props.theme.colors.darkBlue};
            }
            .description {
              font-size: 14px;
              line-height: 1.6em;
              color: ${props => props.theme.colors.gray};
            }
          }
        }
        .discoverMore {
          color: ${props => props.theme.colors.darkBlue};
          display: inline-block;
          text-decoration: none;
          transition: all 0.3s;
          margin: 0 30px 30px 30px;
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
      }
    }
  }
  &.About {
    background-color: #fff;
    padding-top: 200px;
    padding-bottom: 200px;
    ${SectionTitle} {
      color: ${props => props.theme.colors.purple};
      &::before {
        background-color: ${props => props.theme.colors.purple};
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
