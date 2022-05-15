import React from "react";
import css from "./LoaderCircle.module.css";

const dimentionMap = {
  xxxlarge: 120,
  xxlarge: 100,
  xlarge: 80,
  large: 60,
  medium: 40,
  small: 30,
  xsmall: 20,
};

type LoaderCircleProps = {
  id: string;
  size?:
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "xxxlarge";
};

const LoaderCircle: React.FC<LoaderCircleProps> = ({ size = "small", id }) => {
  const sizeToUse = dimentionMap[size];
  return (
    <div
      data-testid={id}
      style={{
        width: `${sizeToUse}px`,
        height: `${sizeToUse}px`,
        border: `${sizeToUse / 7.5 + 1}px solid #FEC260`,
        borderTop: `${sizeToUse / 7.5 + 1}px solid #efefef`,
      }}
      className={css.loader}
    ></div>
  );
};

export default LoaderCircle;
