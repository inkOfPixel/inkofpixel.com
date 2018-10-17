import React from "react";

interface IProps {
  children: (answer: (value: boolean) => void) => React.ReactNode;
}

interface IState {
  accepted: undefined | null | boolean;
}

class Cookie extends React.Component<IProps, IState> {
  state = {
    accepted: undefined
  };

  componentDidMount() {
    const storedValue = window.localStorage.getItem("acceptsCookies");
    if (storedValue) {
      const accepted = Boolean(storedValue);
      if (accepted !== this.state.accepted) {
        this.setState(() => ({ accepted }));
      }
    }
  }

  answer = (accepted: boolean) => {
    window.localStorage.setItem("acceptsCookies", String(accepted));
    this.setState(() => ({ accepted }));
  };

  render() {
    if (typeof this.state.accepted === "boolean") {
      return null;
    }
    return this.props.children(this.answer);
  }
}

export default Cookie;
