import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface LowerFooterProps {
  additionalLegalInfo: Nullable<string>;
  vatId: Nullable<string>;
  capital: Nullable<number>;
  copyright: Nullable<string>;
  street: Nullable<string>;
  cap: Nullable<number>;
  city: Nullable<string>;
}

export function LowerFooter({
  additionalLegalInfo,
  vatId,
  capital,
  street,
  city,
  cap,
  copyright,
}: LowerFooterProps) {
  return (
    <Box>
      <Box m="0" pt="12" fontSize="13px" lineHeight="1.4em">
        <Text pb="4">{copyright}</Text>
        <Text>
          {`Capital € ${capital} i.v • ${street} - ${cap} ${city} • VAT Number ${vatId} • ${additionalLegalInfo}`}
        </Text>
      </Box>
    </Box>
  );
}
