import React from "react";
interface IconInterface {
  navigationColor: string;
  width: string;
  height: string;
}

function DrawerLogo({
  width = "40px",
  height = "40px",
  navigationColor = "#0000ff",
}: IconInterface) {
  return (
    <svg
      width={width}
      height={height}
      fill={navigationColor}
      viewBox="0 0 100 100">
      <path
        d="M79.65,45.3l20.28-20.28L74.98,0L54.7,20.28c-2.6,2.6-6.81,2.6-9.4,0c0,0,0,0,0,0L25.02,0
	L0,25.02L20.28,45.3c2.6,2.6,2.6,6.81,0,9.4c0,0,0,0,0,0L0,75.05l25.02,25.02L45.3,79.79c2.6-2.6,6.81-2.6,9.4,0c0,0,0,0,0,0
	l20.28,20.28L100,75.05L79.72,54.77c-2.63-2.57-2.68-6.79-0.11-9.42C79.62,45.33,79.64,45.31,79.65,45.3z M54.7,70.31
	c-2.6,2.6-6.81,2.6-9.4,0c0,0,0,0,0,0L29.69,54.77c-2.6-2.6-2.6-6.81,0-9.4c0,0,0,0,0,0l15.54-15.61c2.6-2.6,6.81-2.6,9.4,0
	c0,0,0,0,0,0l15.54,15.61c2.6,2.6,2.6,6.81,0,9.4c0,0,0,0,0,0L54.7,70.31z"
      />
    </svg>
  );
}

export default DrawerLogo;
