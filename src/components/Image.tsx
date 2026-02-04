import React from "react";

interface ImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
}

const Image = ({ src, alt = "", className, ...rest }: ImageProps) => {
  const outerClass = ["gatsby-image-outer-wrapper", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={outerClass} {...rest}>
      <div className="gatsby-image-wrapper">
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
};

export default Image;
