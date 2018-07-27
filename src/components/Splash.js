// @flow

import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateInverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const bordertl = keyframes`
  0%, 100% { border-top-left-radius: 50%; }
  25% { border-top-left-radius: 90px;}
  50% { border-top-left-radius: 40%; }
  75% { border-top-left-radius: 45%; }
`;

const bordertr = keyframes`
  0%, 100% { border-top-right-radius: 50%;}
  25% { border-top-right-radius: 49%;}
  50% { border-top-right-radius: 50%px;}
  75% { border-top-right-radius: 35%px;}
`;

const borderbr = keyframes`
  0%, 100% { border-bottom-right-radius: 50%; }
  25% { border-bottom-right-radius: 45%;}
  50% { border-bottom-right-radius: 47%;}
  75% { border-bottom-right-radius: 48%;}
`;

const borderbl = keyframes`
  0%, 100% { border-bottom-left-radius: 50%; }
  25% { border-bottom-left-radius: 48%; }
  50% { border-bottom-left-radius: 48%; }
  75% { border-bottom-left-radius: 45%;}
`;

let Splash = ({ className, children }: Props) => (
  <div className={className}>
    <div className="content">{children}</div>
  </div>
);

Splash = styled(Splash)`
  position: relative;
  radius: 50%;

  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${props => props.color};
  animation: 3s ${bordertl} linear infinite, 4s ${bordertr} linear infinite,
    5.6s ${borderbl} linear infinite, 3.3s ${borderbr} linear infinite,
    3.6s ${rotate} linear infinite, 2s hover ease-in-out infinite;
  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    animation: 3.6s ${rotateInverse} linear infinite,
      2s hover ease-in-out infinite;
  }
`;

Splash.defaultProps = {
  color: "#000",
  size: "300px"
};

export default Splash;
