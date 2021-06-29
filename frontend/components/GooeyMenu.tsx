import React, { ChangeEvent } from "react";
import styled, { css } from "types/styled-components";

interface IProps {
  className?: string;
  renderLabel?: () => React.ReactNode;
  color?: string;
  backgroundColor?: string;
  size?: number;
  spacing?: number;
  open: boolean;
  onToggle?: (value: boolean) => void;
}

interface IState {
  open: boolean;
}

class GooeyMenu extends React.Component<IProps, IState> {
  static defaultProps = {
    color: "#fff",
    backgroundColor: "#00bcd4",
    size: 80,
    spacing: 20,
  };

  state = {
    open: false,
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

  handleToggleMenu = (event: ChangeEvent<HTMLInputElement>) => {
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
      backgroundColor,
    } = this.props;
    const itemCount = React.Children.count(children);
    const { open } = this.getState();
    return (
      <React.Fragment>
        <GooeySVGDefs />
        <Menu className={className}>
          <Checkbox
            
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

interface IButtonProps {
  color: string;
  backgroundColor: string;
  size: number;
}

const buttonStyles = css<IButtonProps>`
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

interface ILabelProps {
  color: string;
  backgroundColor: string;
  htmlFor?: string;
}

const Label = styled<ILabelProps & IButtonProps, "label">("label").attrs({
  htmlFor: "gooey-menu-open",
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

interface IItemsProps {
  size: number;
  spacing: number;
  itemCount: number;
}

const Items = styled.div`
  position: absolute;
  padding-top: ${(props: IItemsProps) => props.size}px;
  & > * {
    margin-top: ${(props: IItemsProps) => props.spacing}px;
    ${buttonStyles};
    ${(props: IItemsProps) =>
      Array.apply(null, Array(props.itemCount)).map(
        (_: number, i: number) => css`
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

interface ICheckboxProps {
  itemCount: number;
}

const Checkbox = styled.input.attrs({
  type: "checkbox",
  name: "gooey-menu-open",
  id: "gooey-menu-open",
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
      ${(props: ICheckboxProps) =>
        Array.apply(null, Array(props.itemCount)).map(
          (_: number, i: number) => css`
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
