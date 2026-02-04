import React from "react";
import rawPaths from "react-simple-icons/dist/paths";

const paths =
  (rawPaths as unknown as { default?: Record<string, string> }).default ??
  (rawPaths as unknown as Record<string, string>);

interface SimpleIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number | string;
  fill?: string;
}

const SimpleIcon = ({
  name,
  size = 16,
  fill = "currentcolor",
  ...rest
}: SimpleIconProps) => {
  const d = paths[name];
  if (!d) {
    return null;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="1.414"
      {...rest}
    >
      <path fillRule="nonzero" d={d} />
    </svg>
  );
};

export default SimpleIcon;
