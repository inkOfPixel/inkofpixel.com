import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
  letter-spacing: 0.02em;
  @media (max-width: 1260px) {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
    box-sizing: border-box;
  }
  @media (max-width: 700px) {
    padding-left: 26px;
    padding-right: 26px;
  }
`;

export default Wrapper;
