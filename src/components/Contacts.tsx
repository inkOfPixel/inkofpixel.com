import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "types/styled-components";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { default as BaseSplash } from "components/Splash";
import { default as BaseIcon } from "react-simple-icons";
import Wrapper from "components/Wrapper";
import ContactForm from "./ContactForm";

type Props = InjectedIntlProps;

interface IQueryData {
  contacts: {
    email: string;
    socials: {
      title: string;
      link: string;
      iconHandle: string;
    };
  };
  section: any;
}

const Contacts = injectIntl(({ intl }: Props) => {
  return (
    <StaticQuery
      query={graphql`
        query ContactsQuery {
          contacts: settingsJson(fields: { name: { eq: "contacts" } }) {
            email
            socials {
              title
              link
              iconHandle
            }
          }
          section: staticPagesJson(fields: { name: { eq: "contacts" } }) {
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
      `}
    >
      {(data: IQueryData) => {
        const localizedSection = data.section.fields.locales.find(
          locale => locale.language === intl.locale
        );
        return (
          <Wrapper>
            <Flexbox>
              <Info>
                <SectionTitle>{localizedSection.title}</SectionTitle>
                <Intro>{localizedSection.intro}</Intro>
                <Subtitle>{localizedSection.subtitle}</Subtitle>
                <Mail
                  href={`mailto:${data.contacts.email}`}
                  data-rel="external"
                >
                  {data.contacts.email}
                </Mail>
              </Info>
              <ContactForm />
            </Flexbox>
            <Socials>
              {data.contacts.socials.map(social => (
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
        );
      }}
    </StaticQuery>
  );
});

const Flexbox = styled.div`
  display: flex;
  margin-top: 50px;
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
const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  margin: 0.67em 0;
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

const Intro = styled.h3`
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

export default Contacts;
