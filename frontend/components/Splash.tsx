import { Box, chakra, Flex, keyframes } from "@chakra-ui/react";
import React from "react";

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

function useRandomNumber(min: number, max: number) {
  const [randomNumber, setRandomNumber] = React.useState(0);

  React.useEffect(() => {
    setRandomNumber(random(min, max));
  }, [min, max]);

  return randomNumber;
}

interface SplashProps {
  className: string;
}

const Bubble = chakra(
  ({ children, className }: React.PropsWithChildren<SplashProps>) => {
    const randomNumber = useRandomNumber(3, 6);
    const randomSpeed = useRandomNumber(5, 12);
    return (
      <Box
        className={className}
        pos="absolute"
        w="500px"
        h="500px"
        backgroundColor="rbg(246, 250, 248)"
        animation={`${randomNumber}s linear infinite ${bordertl}, 
                  ${randomNumber}s linear infinite ${bordertr}, 
                  ${randomNumber}s linear infinite ${borderbr}, 
                  ${randomNumber}s linear infinite ${borderbl}, 
                  ${randomSpeed}s linear infinite ${rotate}`}>
        <Flex
          className="content"
          alignItems="center"
          justifyContent="center"
          w="full"
          h="full"
          animation={`${randomSpeed}s ${rotateInverse} linear infinite`}>
          {children}
        </Flex>
      </Box>
    );
  }
);

export default Bubble;
