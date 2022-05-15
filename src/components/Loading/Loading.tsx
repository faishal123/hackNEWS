import React from "react";
import LoaderCircle from "../LoaderCircle";
import { createPortal } from "react-dom";
import css from "./Loading.module.css";
import Text from "../Text";

const Loading: React.FC = () => {
  return createPortal(
    <div className={css.loading}>
      <LoaderCircle id="loader" size="small" />
      <Text id="txt-loading-label" variant="medium">
        Loading
      </Text>
    </div>,
    document.body
  );
};

export default Loading;
