import React from "react";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, ...rest }, ref) => (
    <a href={to} ref={ref} {...rest}>
      {children}
    </a>
  )
);

Link.displayName = "Link";

export default Link;
