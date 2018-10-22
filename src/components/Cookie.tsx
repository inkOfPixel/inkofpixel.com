import React from "react";

interface IProps {
  children: (answer: (value: boolean) => void) => React.ReactNode;
}

enum Consent {
  Accepted = "accepted",
  Denied = "denied",
  Verify = "verify",
  NotSet = "not set"
}

interface IState {
  consent: Consent;
}

const COOKIE_NAME = "cookieConsent";

const saveConsent = (consent: Consent) => {
  window.localStorage.setItem(COOKIE_NAME, consent);
};

const getConsent = (): Consent | null => {
  const consent = window.localStorage.getItem(COOKIE_NAME) as Consent | null;
  return consent;
};

class Cookie extends React.Component<IProps, IState> {
  state = {
    consent: Consent.Verify
  };

  componentDidMount() {
    const consent = getConsent();
    if (consent) {
      this.setState(() => ({ consent }));
    } else {
      this.setState(() => ({ consent: Consent.NotSet }));
    }
  }

  answer = (accepted: boolean) => {
    const consent = accepted ? Consent.Accepted : Consent.Denied;
    saveConsent(consent);
    this.setState(() => ({ consent }));
  };

  render() {
    const { consent } = this.state;
    if (consent === Consent.NotSet) {
      return this.props.children(this.answer);
    }
    return null;
  }
}

export default Cookie;
