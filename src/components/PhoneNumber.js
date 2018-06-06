// @flow

import React, { Component } from "react";
import styled from "styled-components";

type Props = {};

class PhoneNumber extends Component<Props> {
  state = {
    numberVisible: false
  };

  handleClick = () => {
    this.setState(previousState => ({
      numberVisible: !previousState.numberVisible
    }));
  };

  render() {
    return (
      <Container>
        <Number visible={this.state.numberVisible}>+39 02 760 797 272</Number>
        <Icon onClick={this.handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </Icon>
      </Container>
    );
  }
}

const Container = styled.div`
  background-color: #4840bb;
  position: fixed;
  bottom: 80px;
  right: 80px;
  z-index: 10;
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 28px;
  border: 1px solid #fff;
  @media (max-width: 599px) {
    bottom: 30px;
    right: 30px;
  }
`;

const Number = styled.span`
  @media all and (max-width: 599px) {
    width: ${({ visible }) => (visible ? "190px" : "0px")};
    padding-left: ${({ visible }) => (visible ? "20px" : "0px")};
  }
  @media (min-width: 600px) {
    width: 190px;
    padding-left: 20px;
  }
  right: 50px;
  font-size: 24px;
  overflow: hidden;
  color: #fff;
  transition: 0.5s;
  white-space: nowrap;
`;

const Icon = styled.div`
  height: 56px;
  width: 56px;
  right: 0;
  svg {
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
  }
`;

export default PhoneNumber;
