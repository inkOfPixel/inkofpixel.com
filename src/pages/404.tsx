import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Page from "components/Page";
import Wrapper from "components/Wrapper";

const NotFoundPage = () => (
  <Page
    title="Page not found"
    description="The page you are looking for does not exist"
    localeCode="en"
  >
    <NotFoundWrapper>
      <Spacer />
      <Title>Not found</Title>
      <Description>
        Ops! The page you are looking for does not exist
      </Description>
      <CallToAction to="/">Rescue me!</CallToAction>
    </NotFoundWrapper>
  </Page>
);

const NotFoundWrapper = styled(Wrapper)`
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
`;

const Spacer = styled.div`
  width: 100%;
  height: 200px;
`;

const CallToAction = styled(Link)`
  border: 1px solid ${props => props.theme.colors.darkBlue};
  color: ${props => props.theme.colors.darkBlue};
  background-color: transparent;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.04em;
  overflow: hidden;
  display: inline-block;
  position: relative;
  min-width: 200px;
  transition: all 0.3s;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  margin: 40px 10px 10px 10px;
  line-height: 40px;
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

export default NotFoundPage;
