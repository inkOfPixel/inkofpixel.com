// @ flow

import React, { type Node, Component } from "react";
import styled from "styled-components";

type Props = {
  children: (accept: Function) => Node
};

type State = {
  accepted: boolean
};

class CookierBar extends Component<Props, State> {
  state = {
    accepted: true
  };

  componentDidMount() {
    const accepted =
      typeof window.localStorage.getItem("acceptsCookies") === "string";
    if (accepted !== this.state.accepted) {
      this.setState(() => ({ accepted }));
    }
  }

  accept = () => {
    window.localStorage.setItem("acceptsCookies", "yes");
    this.setState(() => ({ accepted: true }));
  };

  render() {
    if (this.state.accepted) {
      return null;
    }
    return this.props.children(this.accept);
  }
}

export default CookierBar;
