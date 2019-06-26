import React, { PropsWithChildren, useEffect } from "react";
import styled, { css } from "styled-components";

type Props = PropsWithChildren<{
  handleClose: () => void;
  isOpen: boolean;
}>;

function Mask({ handleClose }: { handleClose: () => void }) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return function restoreScroll() {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return <MaskComponent onClick={handleClose} />;
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
