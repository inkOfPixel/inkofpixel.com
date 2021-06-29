import React from "react";
import PropTypes from "prop-types";

const Menu = (props: any) => {
  const { color, display, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      display={display}
      {...otherProps}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
};

Menu.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Menu.defaultProps = {
  color: "currentColor",
  size: "24",
};

export default Menu;
