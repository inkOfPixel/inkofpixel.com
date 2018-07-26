// @flow

import "normalize.css";
import React from "react";
import { injectGlobal } from "styled-components";

injectGlobal`
 @import url("https://use.typekit.net/zrn4omm.css");
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500');


  body {
    font-family: 'Roboto Mono', monospace;
    color: #161338;
  }
  h1 {
    font-family: "Europa", sans-serif;
  }
  p {
    margin: 0;
  }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
  }

  a[href^="tel"] {
  color: inherit;
  text-decoration: none;

}
`;

type Props = {
  children: Function
};

class TemplateWrapper extends React.Component<Props> {
  render() {
    const { children } = this.props;
    return children();
  }
}

export default TemplateWrapper;
