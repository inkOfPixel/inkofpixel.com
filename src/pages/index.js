// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Wrapper from "components/Wrapper";
import Link from "gatsby-link";
import mainIllustration from "images/heroIllustration/main-illustration.svg";
import illustration00 from "images/heroIllustration/illustration00.svg";
import illustration01 from "images/heroIllustration/illustration01.svg";
import illustration02 from "images/heroIllustration/illustration02.svg";
import illustration03 from "images/heroIllustration/illustration03.svg";
import illustration04 from "images/heroIllustration/illustration04.svg";
import illustration05 from "images/heroIllustration/illustration05.svg";
import illustration06 from "images/heroIllustration/illustration06.svg";
import illustration07 from "images/heroIllustration/illustration07.svg";
import illustration08 from "images/heroIllustration/illustration08.svg";
import illustration09 from "images/heroIllustration/illustration09.svg";
import illustration10 from "images/heroIllustration/illustration10.svg";
import illustration11 from "images/heroIllustration/illustration11.svg";
import illustration12 from "images/heroIllustration/illustration12.svg";
import illustration13 from "images/heroIllustration/illustration13.svg";
import illustration14 from "images/heroIllustration/illustration14.svg";
import illustration15 from "images/heroIllustration/illustration15.svg";

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
        </Wrapper>
        <HeroIllustration>
          <Wrapper>
            <div className="mainIllustration">
              <img src={mainIllustration} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration00">
              <img src={illustration00} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration01">
              <img src={illustration01} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration02">
              <img src={illustration02} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration03">
              <img src={illustration01} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration03">
              <img src={illustration03} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration04">
              <img src={illustration04} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration05">
              <img src={illustration05} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration06">
              <img src={illustration06} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration07">
              <img src={illustration07} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration08">
              <img src={illustration08} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration09">
              <img src={illustration09} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration10">
              <img src={illustration10} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration11">
              <img src={illustration11} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration12">
              <img src={illustration12} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration13">
              <img src={illustration13} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration14">
              <img src={illustration14} alt="inkofpixel logo" />
            </div>
            <div className="illustration illustration15">
              <img src={illustration15} alt="inkofpixel logo" />
            </div>
          </Wrapper>
        </HeroIllustration>
      </Section>
      <Section className="Services" id="Services">
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
  overflow: hidden;
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

const show = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const HeroIllustration = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: -2;
  @media (max-width: 900px) {
    position: relative;
  }
  .illustration {
    position: absolute;
    animation: ${show} 1s ease-in forwards;
    opacity: 0;
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .mainIllustration {
    width: 1080px;
    top: 100px;
    right: -250px;
    position: absolute;
    @media (max-width: 1200px) {
      width: 1000px;
      right: -150px;
      top: 170px;
    }
    @media (max-width: 1000px) {
      width: 900px;
      right: -200px;
    }
    @media (max-width: 900px) {
      position: relative;
      top: -200px;
      left: 0;
      width: 130%;
      margin-bottom: -200px;
    }
    @media (max-width: 600px) {
      position: relative;
      top: 0px;
      left: 0;
      width: 130%;
      margin-bottom: -100px;
    }
    img {
      width: 100%;
    }
  }
  .illustration00 {
    width: 200px;
    left: 100px;
    top: 150px;
    animation-delay: 9000ms;
  }
  .illustration01 {
    width: 160px;
    left: 275px;
    top: 150px;
    animation-delay: 11800ms;
  }
  .illustration02 {
    width: 250px;
    left: 265px;
    top: 212px;
    animation-delay: 8400ms;
  }
  .illustration03 {
    width: 36px;
    left: 440px;
    top: 160px;
    animation-delay: 11200ms;
  }
  .illustration04 {
    width: 80px;
    left: 505px;
    top: 156px;
    animation-delay: 10700ms;
  }
  .illustration05 {
    width: 185px;
    left: 475px;
    top: 200px;
    animation-delay: 7800ms;
  }
  .illustration06 {
    width: 130px;
    left: 566px;
    top: 220px;

    animation-delay: 7200ms;
  }
  .illustration07 {
    width: 60px;
    left: 647px;
    top: 294px;
    animation-delay: 9500ms;
  }
  .illustration08 {
    width: 80px;
    left: 636px;
    top: 334px;
    animation-delay: 10000ms;
  }
  .illustration09 {
    width: 50px;
    left: 685px;
    top: 262px;
    animation-delay: 2000ms;
  }
  .illustration10 {
    width: 50px;
    left: 711px;
    top: 182px;
    animation-delay: 2500ms;
  }
  .illustration11 {
    width: 70px;
    left: 755px;
    top: 154px;
    animation-delay: 3000ms;
  }
  .illustration12 {
    width: 80px;
    left: 736px;
    top: 275px;
    animation-delay: 3600ms;
  }
  .illustration13 {
    width: 70px;
    left: 805px;
    top: 247px;
    animation-delay: 4100ms;
  }
  .illustration14 {
    width: 140px;
    left: 925px;
    top: 173px;
    animation-delay: 5500ms;
  }
  .illustration15 {
    width: 60px;
    left: 996px;
    top: 271px;
    animation-delay: 5000ms;
  }
`;

const Section = styled.section`
  width: 100%;

  position: relative;
  ${Wrapper} {
    z-index: 10;
  }
  &.Hero {
    padding-top: 300px;
    padding-bottom: 200px;
    @media (max-width:900px){
      padding-bottom: 50px;
      padding-top: 100px;
    }
    ${Title} {
      color: #473CE7;
    }
    ${Subtitle} {
      color: #161338;
    }
  }
  &.Services {
    margin-top: 200px;
    background-color: #F3F3F3;
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
      background-color: #473CE7;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(5deg);
      background-color: #F3F3F3;
    }
    ${Title} {
      text-align: center;
      color:#473CE7;
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
            padding-top: 0px;
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
      background-color: #473CE7;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(-5deg);
      background-color: #fff;
    }
    ${Title} {
      text-align: center;
      color: #473CE7;
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
        background-color: #F3F3F3;
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
          background-color: #F3F3F3;
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
    background-color: #F3F3F3;
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
      background-color: #473CE7;
    }
    &:after {
      z-index: 2;
      top: -70px;
      transform: skewY(5deg);
      background-color: #F3F3F3;
    }
    ${Title} {
      text-align: center;
      color: #473CE7;
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
