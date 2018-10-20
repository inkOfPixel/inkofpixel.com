import React, { ChangeEvent, FormEvent } from "react";
import styled from "types/styled-components";
import { FormattedMessage } from "react-intl";
import TextareaAutosize from "react-autosize-textarea";

interface IProps {}

enum FormState {
  Normal = "normal",
  Success = "success",
  Submitting = "Submitting",
  Error = "error"
}

interface IState {
  state: FormState;
  [name: string]: any;
}

function encode(data: any) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ContactForm extends React.Component<IProps, IState> {
  state = {
    state: FormState.Normal
  };

  feedbackRef = React.createRef<HTMLElement>();

  handleChange = (event: ChangeEvent<HTMLElement>) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target;
    try {
      this.setState({ state: FormState.Submitting });
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": form.getAttribute("name"),
          ...this.state
        })
      });
      this.setState({ state: FormState.Success }, () => {
        this.feedbackRef.current && this.feedbackRef.current.scrollIntoView();
      });
    } catch (error) {
      this.setState({ state: FormState.Error, error: error.message }, () => {
        this.feedbackRef.current && this.feedbackRef.current.scrollIntoView();
      });
    }
  };

  handleReset = () => {
    this.setState({ state: FormState.Normal });
  };

  render() {
    const { state } = this.state;
    if (state === FormState.Success) {
      return (
        <Feedback ref={this.feedbackRef}>
          <h3>
            <FormattedMessage
              id="contacts.form.thankYou"
              defaultMessage="Thank you!"
            />
          </h3>
          <FormattedMessage
            id="contacts.form.thankYouDetails"
            defaultMessage="We'll get in touch soon."
          />
        </Feedback>
      );
    }
    if (state === FormState.Error) {
      return (
        <Feedback ref={this.feedbackRef}>
          <h3>
            <FormattedMessage
              id="contacts.form.errorMessage"
              defaultMessage="Ops, an error occurred!"
            />
          </h3>
          <Button onClick={this.handleReset}>
            <FormattedMessage
              id="contacts.form.tryAgain"
              defaultMessage="Try again"
            />
          </Button>
        </Feedback>
      );
    }
    return (
      <Form
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <FormField className="hidden">
          <label>
            Don’t fill this out if you're human:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </FormField>
        <FormField className="half">
          <label htmlFor="name">
            <FormattedMessage id="contacts.form.name" defaultMessage="Name" />
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
                onChange={this.handleChange}
              />
            )}
          </FormattedMessage>
          <span className="focus-border" />
        </FormField>
        <FormField className="half">
          <label htmlFor="email">
            <FormattedMessage id="contacts.form.email" defaultMessage="Email" />
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            )}
          </FormattedMessage>
          <span className="focus-border" />
        </FormField>
        <SendButton>
          <FormattedMessage id="contacts.form.send" defaultMessage="Send" />
        </SendButton>
      </Form>
    );
  }
}

const Feedback = styled.div`
  padding-top: 30px;
  padding-bottom: 50px;
  h3 {
    font-size: 46px;
    font-weight: 700;
    font-family: Europa;
    line-height: 1.1em;
    padding-bottom: 20px;
    @media (max-width: 900px) {
      font-size: 40px;
    }
    @media (max-width: 600px) {
      font-size: 32px;
    }
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

const Button = styled.button`
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

const SendButton = styled(Button).attrs({ type: "submit" })`
  margin: 40px 10px 10px 10px;
`;
export default ContactForm;
