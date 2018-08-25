// @ flow

import React, { type Node, Component } from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import { FormattedMessage } from "react-intl";
import Cookie from "components/Cookie";

type Props = {
  cookiePolicyURL: string
};

const CookierBar = ({ cookiePolicyURL = "/cookie-policy" }: Props) => (
  <Cookie>
    {answer => (
      <Bar>
        <Text>
          <FormattedMessage
            id="cookie.message"
            defaultMessage="We use cookies to ensure that we give you the best experience
          on our website. Read our"
          />
          <StyledLink to={cookiePolicyURL}> cookies policy </StyledLink>
          <Button onClick={() => answer(true)}>OK</Button>
        </Text>
        <CloseButton
          onClick={() => answer(false)}
          aria-label="Close cookie policy message banner"
        />
      </Bar>
    )}
  </Cookie>
);

const Bar = styled.div`
  background-color: #fff;
  border-top: 1px solid #dadada;
  z-index: 999;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Button = styled.button`
  border: none;
  background-color: #161338;
  border-radius: 2px;
  color: #fff;
  padding: 5px 15px;
  cursor: pointer;
  transition: 500ms all;
  &:hover {
    background-color: #7589f4;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  height: 30px;
  width: 30px;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
  &::before {
    content: "";
    background-color: red;
    height: 2px;
    width: 80%;
    display: block;
    transform: rotate(45deg);
    position: absolute;
    background-color: #161338;
  }
  &::after {
    content: "";
    background-color: red;
    height: 2px;
    width: 80%;
    display: block;
    transform: rotate(-45deg);
    position: absolute;
    background-color: #161338;
  }
`;

const Text = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  padding: 20px 40px;
`;

const StyledLink = styled(Link)`
  color: #161338;
  text-decoration: none;
  position: relative;
  &::before {
    background: #161338;
    opacity: 0;
    bottom: -5px;
    content: "";
    height: 1px;
    left: 50%;
    position: absolute;
    width: 0%;
    transition: all 300ms;
    transform: translateX(-50%) translateY(0);
  }
  &:hover {
    &::before {
      opacity: 1;
      width: 100%;
    }
  }
`;

export default CookierBar;
