// @flow

import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";
import Link from "gatsby-link";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import simplePathJoin from "utils/simplePathJoin";
import TextareaAutosize from "react-autosize-textarea";
import { default as BaseSplash } from "components/Splash";
import { default as BaseIcon } from "react-simple-icons";

type Props = {
  data: Object,
  pathContext: {
    locale: string
  }
};

const ContactsPage = ({ data, pathContext }: Props) => {
  const { locale: pageLocale } = pathContext;
  const { contacts, site, navigation, cookiePolicy, page } = data;
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
        <Flexbox>
          <Info>
            <PageTitle>{currentPage.title}</PageTitle>
            <Intro>{currentPage.intro}</Intro>
            <Subtitle>{currentPage.subtitle}</Subtitle>
            <Mail href={`mailto:${contacts.email}`} data-rel="external">
              {contacts.email}
            </Mail>
          </Info>
          <Form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="contact" />
            <FormField className="hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </FormField>
            <FormField className="half">
              <label htmlFor="name">
                <FormattedMessage
                  id="contacts.form.name"
                  defaultMessage="Name"
                />
              </label>
              <FormattedMessage
                id="contacts.form.namePlaceholder"
                defaultMessage="Peter Smith"
              >
                {txt => (
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={txt}
                    required
                  />
                )}
              </FormattedMessage>
              <span className="focus-border" />
            </FormField>
            <FormField className="half">
              <label htmlFor="email">
                <FormattedMessage
                  id="contacts.form.email"
                  defaultMessage="Email"
                />
              </label>

              <FormattedMessage
                id="contacts.form.emailPlaceholder"
                defaultMessage="example@yourdomain.com"
              >
                {txt => (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={txt}
                    required
                  />
                )}
              </FormattedMessage>
              <span className="focus-border" />
            </FormField>
            <FormField>
              <label htmlFor="message">
                <FormattedMessage
                  id="contacts.form.message"
                  defaultMessage="Message"
                />
              </label>
              <FormattedMessage
                id="contacts.form.messagePlaceholder"
                defaultMessage="Hi there..."
              >
                {txt => (
                  <TextareaAutosize
                    id="message"
                    name="message"
                    placeholder={txt}
                    required
                  />
                )}
              </FormattedMessage>
              <span className="focus-border" />
            </FormField>
            <SendButton type="submit">
              <FormattedMessage id="contacts.form.send" defaultMessage="Send" />
            </SendButton>
          </Form>
        </Flexbox>
        <Socials>
          {contacts.socials.map(social => (
            <SocialLink
              key={social.title}
              href={social.link}
              aria-label={`${social.title} account of inkOfPixel`}
            >
              <Splash className={social.iconHandle} size="60px">
                <Icon name={social.iconHandle} />
              </Splash>
            </SocialLink>
          ))}
        </Socials>
      </Wrapper>
    </Page>
  );
};

export const query = graphql`
  query ContactsPageQuery($name: String!) {
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
    contacts: settingsJson(fields: { name: { eq: "contacts" } }) {
      email
      socials {
        title
        link
        iconHandle
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
  display: flex;
  flex-direction: column;
  margin-right: 150px;
  flex: 0 0 400px;
  @media (max-width: 1150px) {
    flex: 0 0 300px;
    margin-right: 80px;
  }
  @media (max-width: 800px) {
    flex: 0 0 100%;
    margin-right: 0;
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

const Mail = styled.a`
  font-size: 14px;
  padding: 0;
  margin: 0;
  font-weight: 400;
  line-height: 1.8em;
  color: ${props => props.theme.colors.gray};
  padding-top: 60px;
  text-decoration: none;
  display: inline-block;
  &:hover {
    color: ${props => props.theme.colors.darkBlue};
  }
`;

const Form = styled.form`
  flex-grow: 1;
  padding-top: 30px;
  padding-bottom: 80px;
  @media (max-width: 800px) {
    margin: 80px -10px 0 -10px;
  }
`;

const FormField = styled.div`
  display: inline-block;
  margin: 10px;
  width: calc(100% - 20px);
  position: relative;
  &.half {
    width: calc(50% - 20px);
    @media (max-width: 950px) {
      width: calc(100% - 20px);
    }
    @media (max-width: 800px) {
      width: calc(50% - 20px);
    }
    @media (max-width: 600px) {
      width: calc(100% - 20px);
    }
  }
  &.hidden {
    display: none;
  }
  label {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    position: relative;
    width: 100%;
    display: block;
  }
  input,
  textarea {
    border: none;
    position: relative;
    outline: none;
    border-bottom: 1px solid #949494;
    width: 100%;
    min-height: 40px;
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.04em;
    display: block;
    resize: none;
    line-height: 1.4em;
    ~ .focus-border {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1px;
      background-color: ${props => props.theme.colors.darkBlue};
      transition: 0.4s;
    }
    &:focus {
      ~ .focus-border {
        width: 100%;
        transition: 0.4s;
      }
    }
    &::placeholder {
      color: #ccc;
    }
  }
`;

const SendButton = styled.button`
  border: 1px solid ${props => props.theme.colors.darkBlue};
  color: ${props => props.theme.colors.darkBlue};
  background-color: transparent;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.04em;
  overflow: hidden;
  display: block;
  position: relative;
  min-width: 200px;
  height: 40px;
  transition: all 0.3s;
  text-transform: uppercase;
  margin: 40px 10px 10px 10px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
  &::after {
    background: ${props => props.theme.colors.darkBlue};
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
    height: 100%;
    left: 0;
    top: 0;
    width: 0;
  }
  &:hover:after {
    width: 100%;
  }
`;

const Socials = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 120px;
`;

const SocialLink = styled.a`
  display: inline-block;
  margin: 5px;
`;

const Icon = styled(BaseIcon)`
  fill: #fff;
`;

const Splash = styled(BaseSplash)`
  transition: 0.3s all;
  &.twitter {
    background-color: rgba(29, 161, 242, 0.7);
    &:hover {
      background-color: rgba(29, 161, 242, 1);
    }
  }
  &.facebook {
    background-color: rgba(59, 89, 152, 0.7);
    &:hover {
      background-color: rgba(59, 89, 152, 1);
    }
  }

  &.github {
    background-color: rgba(24, 23, 23, 0.7);
    &:hover {
      background-color: rgba(24, 23, 23, 1);
    }
  }
`;

export default ContactsPage;
