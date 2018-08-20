// @flow

import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

type Props = {
  locale: string,
  alternatePageURL: string
};

type State = {
  dismissed: boolean
};

export default class LanguageBanner extends React.Component<Props, State> {
  state = {
    dismissed: false
  };

  componentDidMount() {
    const dismissed =
      typeof window.localStorage.getItem("languageBannerDismissed") ===
      "string";
    if (dismissed !== this.state.dismissed) {
      this.setState(() => ({ dismissed }));
    }
  }

  render() {
    if (this.state.dismissed) {
      return null;
    }
    return (
      <Banner>
        It looks like your current language is IT.{" "}
        <Link to="/">Switch to Italian</Link> or <button>dismiss</button>
      </Banner>
    );
  }
}

const Banner = styled.div`
  background-color: #161338;
  color: #fff;
  padding: 8px;
  text-align: center;
  font-size: 14px;
`;
