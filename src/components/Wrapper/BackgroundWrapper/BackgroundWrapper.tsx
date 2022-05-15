import React from "react";
import css from "./BackgroundWrapper.module.css";

type BackgroundWrapperProps = {
  children: JSX.Element | JSX.Element[];
};

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div id="backgroundWrapper" className={css.backgroundWrapperContainer}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;
