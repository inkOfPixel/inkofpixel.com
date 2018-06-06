// @flow

import React, { type Node, Component } from "react";
import styled from "styled-components";

type Props = {
  children: Node,
  secret: string
};

type State = {
  isPasswordFormOpen: boolean,
  state: string
};

class LockScreen extends Component<Props, State> {
  state = {
    isAuthenticated: false,
    password: ""
  };

  componentDidMount() {
    const input = window.localStorage.getItem("pwd");
    if (atob(input) === this.props.secret) {
      this.setState(() => ({ isAuthenticated: true }));
    }
  }

  openPasswordForm = () => {
    const input = window.prompt("Inserisci la password", "");
    if (input === this.props.secret) {
      this.setState(() => ({ isAuthenticated: true }));
      window.localStorage.setItem("pwd", btoa(input));
    } else {
      alert("La password non e' corretta!");
    }
  };

  render() {
    if (this.state.isAuthenticated) {
      return this.props.children;
    }
    return (
      <TriggerButton onClick={this.openPasswordForm}>
        <h1>Sito in costruzione</h1>
      </TriggerButton>
    );
  }
}

const TriggerButton = styled.button`
  background-color: white;
  border: none;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  outline: none;
`;

export default LockScreen;
