import React from "react";

export default function Splash() {
  return <div>SPLASH</div>;
}
/*
interface IProps {
  className?: string;
  speed?: string;
  size?: string;
  color?: string;
}

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

const Splash = styled<IProps>(({ children, className }) => (
  <div className={className}>
    <div className="content">{children}</div>
  </div>
)).attrs({
  speed: () => `${random(5, 12).toFixed(2)}s`,
})`
  position: relative;
  width: ${(props: IProps) => props.size};
  height: ${(props) => props.size};
  background-color: ${(props) => props.color};
  animation: ${() => random(3, 6)}s linear infinite ${bordertl},
    ${() => random(3, 6)}s linear infinite ${bordertr},
    ${() => random(3, 6)}s linear infinite ${borderbl},
    ${() => random(3, 6)}s linear infinite ${borderbr},
    ${(props) => props.speed} linear infinite ${rotate};
  & > .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    animation: ${(props) => props.speed} ${rotateInverse} linear infinite;
  }
`;

Splash.defaultProps = {
  color: "#000",
  size: "300px",
};

export default Splash;
*/
