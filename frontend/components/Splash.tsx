import { Box, chakra, Flex, keyframes } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const rotateInverse = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const bordertl = keyframes`
  0%, 100% { border-top-left-radius: 50%; }
  25% { border-top-left-radius: 80%;}
  50% { border-top-left-radius: 40%; }
  75% { border-top-left-radius: 45%; }
`;

const bordertr = keyframes`
  0%, 100% { border-top-right-radius: 50%;}
  25% { border-top-right-radius: 49%;}
  50% { border-top-right-radius: 50%;}
  75% { border-top-right-radius: 35%;}
`;

const borderbr = keyframes`
  0%, 100% { border-bottom-right-radius: 50%; }
  25% { border-bottom-right-radius: 45%;}
  50% { border-bottom-right-radius: 47%;}
  75% { border-bottom-right-radius: 48%;}
`;

const borderbl = keyframes`
  0%, 100% { border-bottom-left-radius: 50%; }
  25% { border-bottom-left-radius: 48%; }
  50% { border-bottom-left-radius: 48%; }
  75% { border-bottom-left-radius: 45%;}
`;

const Bubble = chakra(({ className, children }: any) => {
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    setRandomNumber(random(3, 6));
  }, []);

  return (
    <Box
      className={className}
      pos="absolute"
      w="500px"
      h="500px"
      backgroundColor="red.500"
      animation={
        randomNumber +
        "s linear infinite " +
        bordertl +
        "," +
        randomNumber +
        "s linear infinite " +
        bordertr +
        "," +
        randomNumber +
        "s linear infinite " +
        borderbr +
        "," +
        randomNumber +
        "s linear infinite " +
        borderbl +
        "," +
        "8s linear infinite " +
        rotate
      }>
      <Flex
        className="content"
        alignItems="center"
        justifyContent="center"
        w="full"
        h="full"
        animation={"8s " + rotateInverse + " linear infinite"}>
        {children}
      </Flex>
    </Box>
  );
});

/*
  animation: ${() => random(3, 6)}s linear infinite ${bordertl},
    ${() => random(3, 6)}s linear infinite ${bordertr},
    ${() => random(3, 6)}s linear infinite ${borderbl},
    ${() => random(3, 6)}s linear infinite ${borderbr},
    ${random(5, 12).toFixed(2)}s linear infinite ${rotate};
`;

Splash.defaultProps = {
  color: "#000",
  size: "300px",
};
*/
export default Bubble;
