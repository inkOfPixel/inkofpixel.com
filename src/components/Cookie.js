// @ flow

import React, { type Node, Component } from "react";
import styled from "styled-components";

type Props = {
  children: (answer: (boolean) => void) => Node
};

type State = {
  accepted: ?boolean
};

class Cookie extends Component<Props, State> {
  state = {
    accepted: undefined
  };

  componentDidMount() {
    const storedValue = window.localStorage.getItem("acceptsCookies");
    if (storedValue) {
      const accepted = Boolean(storedValue);
      if (accepted !== this.state.accepted) {
        this.setState(() => ({ accepted }));
      }
    }
  }

  answer = (accepted: boolean) => {
    window.localStorage.setItem("acceptsCookies", String(accepted));
    this.setState(() => ({ accepted }));
  };

  render() {
    if (typeof this.state.accepted === "boolean") {
      return null;
    }
    return this.props.children(this.answer);
  }
}

export default Cookie;
