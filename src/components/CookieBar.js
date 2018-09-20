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
  background-color: ${props => props.theme.colors.darkBlue};
  color: #fff;
  padding: 5px 15px;
  cursor: pointer;
  transition: 500ms all;
  border: 1px solid ${props => props.theme.colors.darkBlue};
  color: ${props => props.theme.colors.darkBlue};
  background-color: transparent;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.04em;
  transition: all 0.3s;
  text-transform: uppercase;
  display: inline-block;
  position: relative;
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

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  height: 24px;
  width: 24px;
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
    background-color: ${props => props.theme.colors.darkBlue};
  }
  &::after {
    content: "";
    background-color: red;
    height: 2px;
    width: 80%;
    display: block;
    transform: rotate(-45deg);
    position: absolute;
    background-color: ${props => props.theme.colors.darkBlue};
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
  color: ${props => props.theme.colors.darkBlue};
  text-decoration: none;
  position: relative;
  &::before {
    background: ${props => props.theme.colors.darkBlue};
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
