// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
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
      {console.log(data)}
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
            <Heading>
              <Title>{services.title}</Title>
              <Subtitle>{services.description}</Subtitle>
            </Heading>
            <ServiceList className="secondaryServicesList">
              {services.secondaryList.map(item => (
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
          <Title>{contacts.title}</Title>
          <Subtitle>{contacts.description}</Subtitle>
          <form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div className="row hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </div>
            <div className="row">
              <label for="name">Name</label>
              <input type="text" name="name" />
            </div>
            <div className="row">
              <label for="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div className="row">
              <label for="message">Message</label>
              <textarea name="message" />
            </div>
            <div className="row submit">
              <button type="submit">Send</button>
            </div>
          </form>
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
  @media (max-width: 700px) {
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
  width: calc(100% - 550px);
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-top: 30px;
  justify-content: center;
`;

const Section = styled.section`
  width: 100%;
  position: relative;
  ${Wrapper} {
    z-index: 10;
  }
  &.Hero {
    padding-top: 130px;
    padding-bottom: 400px;
    @media (max-width:900px){
      padding-bottom: 50px;
    }
    ${Subtitle} {
      width: 50%;
      padding-top: 20px;
      font-size: 16px;
    }
  }
  &.Services {
    background-color: #fff;
    padding-bottom: 150px;
    ${SectionTitle}{
      color: #8152BC; 
      &::before{
        background-color: #8152BC;
      }
    }
    ${Heading}{
      width: 400px;
      margin-right: 150px;
    }
    ${Subtitle} {
      padding-top: 20px;
      color: #949494;
      &.secondary {
        padding-top: 60px;
      }
    }
    ${ServiceList} {
      li {
        background-color: #fff;
        margin: 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-bottom: 40px;
        .icon{
          height: 100px;
          width: 100px;
          radius: 50%;
          background-color: #f8f1ff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          animation: 
            3s ${bordertl} linear infinite, 
            4s ${bordertr} linear infinite,
            5.6s ${borderbl} linear infinite, 
            3.3s ${borderbr} linear infinite,
            3.6s ${rotate} linear infinite, 
            2s hover ease-in-out infinite;
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
          line-height: 1.6em;
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
    background-color: #EAF7F7;
    ${SectionTitle}{
      color: #05C3B6; 
      &::before{
        background-color: #05C3B6;
      }
    }
    ${Title}{
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
        background-color: #fff;
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
          background-color: #fff;
          content: "";
          top: -40px;
          left: 0;
          transform: skewY(2deg);
          border-bottom: 4px solid #161338;
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
    background-color: #fff;
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
      background-color: #fff;
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
    form{
      width: 400px;
      display: block;
      margin: 0 auto;
      @media (max-width: 460px){

        width: 100%;
      }
      .hidden{
        display: none;
      }
      .row{
        width: 100%;
        padding-bottom: 20px;
        label{
          display: block;
          padding-bottom: 10px;
        }
        textarea,
        input{
          width: 100%;
          background-color: #fff;
          border: none;
          border-radius: none;
          border: 4px solid #161338;
        }
        input{
          height: 40px;
          padding: 0 10px;
          box-sizing: border-box;
        }
        textarea{
          height: 100px;
 box-sizing: border-box;
 padding: 10px;
        }
        &.submit{
          text-align: right;
        }
        button{
          width:200px;
          display: inline-block;
          height: 40px;
          background-color: #161338;
          color: #fff;
          border: none;
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
