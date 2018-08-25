// @flow

import React, { type Node } from "react";
import styled, { css, keyframes } from "styled-components";

type Props = {
  children: Node,
  className?: string,
  label: string,
  renderLabel?: () => Node,
  color: string,
  backgroundColor: string,
  size: number,
  spacing: number,
  open: boolean,
  onToggle?: Function
};

type State = {
  open: boolean
};

class GooeyMenu extends React.Component<Props, State> {
  static defaultProps = {
    color: "#fff",
    backgroundColor: "#00bcd4",
    size: 80,
    spacing: 20
  };

  state = {
    open: false
  };

  isControlled = () => {
    return this.props.open !== undefined;
  };

  getState = () => {
    if (this.isControlled()) {
      return this.props;
    } else {
      return this.state;
    }
  };

  handleToggleMenu = (event: Event) => {
    if (this.isControlled() && this.props.onToggle) {
      this.props.onToggle(event.currentTarget.checked);
    } else {
      this.setState({ open: event.currentTarget.checked });
    }
  };

  render() {
    const {
      children,
      className,
      renderLabel,
      size,
      spacing,
      color,
      backgroundColor
    } = this.props;
    const itemCount = React.Children.count(children);
    const { open } = this.getState();
    return (
      <React.Fragment>
        <GooeySVGDefs />
        <Menu className={className}>
          <Checkbox
            itemCount={itemCount}
            onChange={this.handleToggleMenu}
            checked={open}
          />
          <Items
            itemCount={itemCount}
            size={size}
            spacing={spacing}
            color={color}
            backgroundColor={backgroundColor}
          >
            {children}
          </Items>
          <Label size={size} color={color} backgroundColor={backgroundColor}>
            <div className="toggleButtonContent">
              {renderLabel && renderLabel()}
            </div>
          </Label>
        </Menu>
      </React.Fragment>
    );
  }
}

const buttonStyles = css`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 100%;
  display: block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  color: ${({ color }) => color};
  text-align: center;
  line-height: ${({ size }) => size}px;
  transform: translate3d(0, 0, 0);
  transition: transform ease-out 200ms;
`;

const Menu = styled.div`
  position: relative;
  filter: url("#shadowed-goo1");
  overflow: visible;
`;

const Label = styled.label.attrs({
  htmlFor: "gooey-menu-open"
})`
  position: relative;
  ${buttonStyles};
  transition-duration: 400ms;
  transform: scale(1, 1) translate3d(0, 0, 0);
  cursor: pointer;
  &:hover {
    transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  }
  .toggleButtonContent {
    opacity: 1;
  }
  &::before {
    position: absolute;
    z-index: 1;
    transition: all 200ms;
    opacity: 0;
    content: "✕";
    font-size: 25px;
    color: ${({ color }) => color};
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    top: 1%;
    height: 98%;
    width: 98%;
    border-radius: 100%;
    background: ${({ backgroundColor }) => backgroundColor};
  }
`;

const Items = styled.div`
  position: absolute;
  padding-top: ${({ size }) => size}px;
  & > * {
    margin-top: ${({ spacing }) => spacing}px;
    ${buttonStyles};
    ${props =>
      Array.apply(null, Array(props.itemCount)).map(
        (_, i) => css`
          &:nth-child(${i + 1}) {
            transform: translate3d(
              0,
              ${({ size, spacing }) => -(size + spacing) * (i + 1)}px,
              0
            );
          }
        `
      )};
  }
`;

const Checkbox = styled.input.attrs({
  type: "checkbox",
  name: "gooey-menu-open",
  id: "gooey-menu-open"
})`
  display: none;
  &:checked {
    & ~ ${Label} {
      transition-timing-function: linear;
      transition-duration: 200ms;
      transform: scale(0.8, 0.8) translate3d(0, 0, 0);
      .toggleButtonContent {
        opacity: 0;
      }
      &::before {
        opacity: 1;
      }
    }
    & ~ ${Items} > * {
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      ${props =>
        Array.apply(null, Array(props.itemCount)).map(
          (_, i) => css`
            &:nth-child(${i + 1}) {
              transition-duration: ${300 + 100 * i}ms;
              transform: translate3d(0, 0, 0);
              &:hover {
                transition: transform 400ms;
                transform: scale(1.1, 1.1);
              }
            }
          `
        )};
    }
  }
`;

const GooeySVGDefs = () => (
  <svg width={0} height={0}>
    <defs>
      <filter id="shadowed-goo1">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <filter id="shadowed-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="goo"
        />
        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
        <feColorMatrix
          in="shadow"
          mode="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
          result="shadow"
        />
        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
        <feComposite in2="shadow" in="goo" result="goo" />
        <feComposite in2="goo" in="SourceGraphic" result="mix" />
      </filter>
    </defs>
  </svg>
);

export default GooeyMenu;
