import React from "react";
import styled from "types/styled-components";
import { default as BaseSplash } from "components/Splash";
import SimpleIcon from "components/SimpleIcon";
import Page from "components/Page";
import Wrapper from "components/Wrapper";
import ContactForm from "components/ContactForm";
import { PageShell } from "types/shell";

interface IProps {
  page: any;
  contacts: any;
  shell: PageShell;
  flash?: { contactSuccess?: boolean };
}

const ContactsPage = ({ page, contacts, shell, flash }: IProps) => {
  const currentPage = page.locales.find(
    (locale: any) => locale.language === shell.locale
  );
  return (
    <Page
      localeCode={shell.locale}
      defaultLocaleCode={shell.defaultLocale}
      pageLocales={shell.pageLocales}
      navigationLinks={shell.navigationLinks}
      cookiePolicyPath={shell.cookiePolicyPath}
    >
      <Wrapper>
        <Spacer />
        <FeedbackContainer
          data-contact-feedback
          data-sent={
            flash?.contactSuccess === true
              ? "1"
              : flash?.contactSuccess === false
                ? "0"
                : ""
          }
        >
          <Flexbox>
            <Info>
              <PageTitle>{currentPage.title}</PageTitle>
              <Intro>{currentPage.intro}</Intro>
              <Subtitle>{currentPage.subtitle}</Subtitle>
              <Mail href={`mailto:${contacts.email}`} data-rel="external">
                {contacts.email}
              </Mail>
            </Info>
            <div className="form-wrapper">
              <ContactForm
                forceSuccess={flash?.contactSuccess}
                redirectTo={currentPage?.path}
              />
            </div>
            <div className="feedback-wrapper">
              <FeedbackBanner>
                <div className="success">
                  <h3>{shell.locale === "it" ? "Grazie!" : "Thank you!"}</h3>
                  <p>
                    {shell.locale === "it"
                      ? "Ti contatteremo presto."
                      : "We'll get in touch soon."}
                  </p>
                </div>
                <div className="error">
                  <h3>
                    {shell.locale === "it"
                      ? "Ops, si è verificato un errore!"
                      : "Ops, an error occurred!"}
                  </h3>
                  <p>
                    {shell.locale === "it"
                      ? "Riprova più tardi."
                      : "Please try again."}
                  </p>
                </div>
              </FeedbackBanner>
            </div>
          </Flexbox>
        </FeedbackContainer>
        <Socials>
          {contacts.socials.map((social: any) => (
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
    </Page>
  );
};

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

const FeedbackContainer = styled.div`
  .feedback-wrapper {
    display: none;
  }
  &[data-sent="1"] .form-wrapper,
  &[data-sent="0"] .form-wrapper {
    display: none;
  }
  &[data-sent="1"] .feedback-wrapper,
  &[data-sent="0"] .feedback-wrapper {
    display: block;
  }
`;

const FeedbackBanner = styled.div`
  display: none;
  padding-top: 20px;
  padding-bottom: 20px;
  h3 {
    font-size: 24px;
    font-weight: 700;
    font-family: Europa;
    line-height: 1.2em;
    padding-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #5c5c5c;
  }
  .success,
  .error {
    display: none;
  }
  ${FeedbackContainer}[data-sent="1"] &,
  ${FeedbackContainer}[data-sent="0"] & {
    display: block;
  }
  ${FeedbackContainer}[data-sent="1"] & .success {
    display: block;
  }
  ${FeedbackContainer}[data-sent="0"] & .error {
    display: block;
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

export default ContactsPage;
