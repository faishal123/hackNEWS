import React from "react";
import css from "./Text.module.css";

type TextProps = {
  id: string;
  children: string | string[];
  size?:
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "xxxlarge"
    | "xxxxlarge"
    | "xxxxxlarge";
  variant?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  block?: boolean;
  color?: "white" | "black" | "orange";
};

const Text: React.FC<TextProps> = ({
  children,
  size = "medium",
  variant = "regular",
  block = false,
  color = "white",
  id,
}) => {
  return (
    <span
      data-testid={id}
      className={`${css[`color-${color}`]} ${
        css[`display-${block ? "block" : "inline"}`]
      } ${css[`variant-${variant}`]} ${css[`size-${size}`]} ${css.text}`}
    >
      {children}
    </span>
  );
};

export default Text;
