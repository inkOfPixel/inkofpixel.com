import styled from "styled-components";

interface Props {
  size?: "small" | "normal";
}

const Wrapper = styled.div`
  width: ${(props: Props) =>
    ({
      small: "960px",
      normal: "1200px"
    }[props.size || "normal"])};
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  letter-spacing: 0.02em;
  @media (max-width: 1260px) {
    width: ${(props: Props) =>
      ({
        small: "960px",
        normal: "100%"
      }[props.size || "normal"])};
    padding: ${(props: Props) =>
      ({
        small: "0px",
        normal: "0 40px"
      }[props.size || "normal"])};
  }
  @media (max-width: 1020px) {
    width: ${(props: Props) =>
      ({
        small: "100%",
        normal: "100%"
      }[props.size || "normal"])};
    padding: ${(props: Props) =>
      ({
        small: "0 40px",
        normal: "0 40px"
      }[props.size || "normal"])};
  }
  @media (max-width: 700px) {
    padding: ${(props: Props) =>
      ({
        small: "0 26px",
        normal: "0 26px"
      }[props.size || "normal"])};
  }
`;

export default Wrapper;
