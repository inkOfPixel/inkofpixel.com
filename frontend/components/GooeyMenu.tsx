import { Box, chakra, Checkbox, FormLabel, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { LocaleMenu } from "./LocaleMenu";

export const GooeyMenu = chakra(({ renderLabel, children }: any) => {
  
  const StyledLabel = chakra(FormLabel);

  return (
    <LocaleMenu>
      
        {children
          ? children.map((lang: any, index: number): any =>
              open === true ? (
                
              ) : (
                <Link
                  href="/"
                  fontFamily="Roboto Mono"
                  fontSize="xs"
                  transitionDuration={300 + 100 * index + "ms"}
                  transform={"translate3d(0," + -64 * (index + 1) + "px, 0)"}
                  key={index}>
                  {lang}
                </Link>
              )
            )
          : "EN"}
      </Box>
      
        <Box className="toggleButtonContent">
          {renderLabel && renderLabel()}
        </Box>
      </StyledLabel>
    </LocaleMenu>
  );
});
