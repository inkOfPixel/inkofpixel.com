import React from "react";
import styled from "types/styled-components";
import { default as BaseSplash } from "components/Splash";
import SimpleIcon from "components/SimpleIcon";
import Wrapper from "components/Wrapper";
import ContactForm from "./ContactForm";

interface ContactsProps {
  contacts: {
    email: string;
    socials: Array<{
      title: string;
      link: string;
      iconHandle: string;
    }>;
  };
  section: {
    title: string;
    intro: string;
    subtitle: string;
  };
}

const Contacts = ({ contacts, section }: ContactsProps) => {
  return (
    <Wrapper>
      <Flexbox>
        <Info>
          <SectionTitle>{section.title}</SectionTitle>
          <Intro>{section.intro}</Intro>
          <Subtitle>{section.subtitle}</Subtitle>
          <Mail href={`mailto:${contacts.email}`} data-rel="external">
            {contacts.email}
          </Mail>
        </Info>
        <ContactForm />
      </Flexbox>
      <Socials>
        {contacts.socials.map((social) => (
          <SocialLink
            key={social.title}
            href={social.link}
            aria-label={`${social.title} account of inkOfPixel`}
          >
            <Splash className={social.iconHandle} size="60px">
              <SimpleIcon name={social.iconHandle} fill="#fff" />
            </Splash>
          </SocialLink>
        ))}
      </Socials>
    </Wrapper>
  );
};

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
