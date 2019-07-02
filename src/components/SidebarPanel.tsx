import React from "react";
import styled, { css } from "styled-components";

// class Mask extends React.Component {
//   // useEffect(() => {
//   //   document.body.classList.add("no-scroll");
//   //   return function restoreScroll() {
//   //     document.body.classList.remove("no-scroll");
//   //   };
//   // }, []);
//   render() {
//     return (
//       <MaskComponent onClick={handleClose} />;
//     )
//   }
// }
class Mask extends React.Component {
  componentDidMount() {
    document.body.classList.add("no-scroll");
  }
  componentWillUnmount() {
    document.body.classList.remove("no-scroll");
  }
  render() {
    return <MaskComponent onClick={this.props.handleClose} />;
  }
}

const MaskComponent = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  &::after {
    content: " ";
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default function SideBarPanel({ handleClose, isOpen, children }: Props) {
  return (
    <>
      {isOpen && <Mask handleClose={handleClose} />}
      <SideBarPanelContainer isOpen={isOpen}>{children}</SideBarPanelContainer>
    </>
  );
}

interface SideBarPanelContainerProps {
  isOpen: boolean;
}

const SideBarPanelContainer = styled.div<SideBarPanelContainerProps>`
  width: 460px;
  height: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  overflow-y: scroll;
  left: 0;
  display: flex;
  flex: 1;
  z-index: 200;
  transform: translate(-100%);
  transition: transform 0.3s;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: translate(0);
      transition: transform 0.3s;
    `} @media (max-width:500px) {
    width: 86%;
  }
`;
