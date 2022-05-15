import React, { MouseEventHandler } from "react";
import css from "./Button.module.css";

type ButtonProps = {
  text: string;
  onClick: (() => void) | MouseEventHandler<HTMLButtonElement>;
  id: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, id }) => {
  return (
    <button data-testid={id} onClick={onClick} className={css.button}>
      {text}
    </button>
  );
};

export default Button;
