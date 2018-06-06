// @flow

import React, { type Node, Component, createContext, Fragment } from "react";
import AnimateHeight from "react-animate-height";

type Props = {
  initialValue: string,
  children: Node
};
type State = {
  context: {
    selectedValue: ?string,
    toggleValue: (value: ?string) => void
  }
};

const AccordionContext = createContext();

export class Accordion extends Component<Props, State> {
  static defaultProps = {
    initialValue: null
  };

  constructor(props) {
    super(props);
    this.state = {
      context: {
        selectedValue: props.initialValue,
        toggleValue: this.toggleValue
      }
    };
  }

  toggleValue = (value: ?string) => {
    this.setState(prevState => ({
      context: {
        ...prevState.context,
        selectedValue: value === prevState.context.selectedValue ? null : value
      }
    }));
  };

  render() {
    return (
      <AccordionContext.Provider value={this.state.context}>
        {this.props.children}
      </AccordionContext.Provider>
    );
  }
}

type AccordionItemProps = {
  children: Node,
  value: string
};

export const AccordionItem = ({ children, value }: AccordionItemProps) => (
  <AccordionContext.Consumer>
    {({ selectedValue, toggleValue }) => (
      <Fragment>
        <button onClick={() => toggleValue(value)}>{value}</button>
        <AnimateHeight
          duration={300}
          height={value === selectedValue ? "auto" : 0}
        >
          {children}
        </AnimateHeight>
      </Fragment>
    )}
  </AccordionContext.Consumer>
);
