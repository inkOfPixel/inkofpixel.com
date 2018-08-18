// @flow

import React from "react";
import styled from "styled-components";
import Page from "components/Page";

export default ({ data, pathContext }) => {
  const home = data.staticPagesJson;
  return (
    <Page>
      {home.fields.name} - {pathContext.locale}
    </Page>
  );
};

export const query = graphql`
  query HomeQuery($name: String!) {
    staticPagesJson(fields: { name: { eq: $name } }) {
      fields {
        name
      }
    }
  }
`;
