import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface LowerFooterProps {
  data: {
    copyright: Nullable<string>;
    sharedCapital: Nullable<number>;
    cap: Nullable<number>;
    city: Nullable<string>;
    vatNumber: Nullable<number>;
    street: Nullable<string>;
  };
}

export function LowerFooter({ data }: LowerFooterProps) {
  return (
    <Box>
      <Box m="0" pt="12" fontSize="13px" lineHeight="1.4em">
        <Text pb="4">{data.copyright}</Text>
        <Text>
          {"Capital €" +
            data.sharedCapital +
            " i.v • " +
            data.street +
            " - " +
            data.cap +
            " " +
            data.city +
            " • " +
            "VAT Number " +
            data.vatNumber +
            " • REA MI - 2081233"}
        </Text>
      </Box>
    </Box>
  );
}
