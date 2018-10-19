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
      this.setState(() => ({ accepted }));
    } else {
      this.setState({ accepted: false });
    }
  }

  answer = (accepted: boolean) => {
    window.localStorage.setItem("acceptsCookies", String(accepted));
    this.setState(() => ({ accepted }));
  };

  render() {
    const { accepted } = this.state;
    if (accepted === true || accepted === undefined) {
      return null;
    }
    return this.props.children(this.answer);
  }
}

export default Cookie;
