import React, { InputHTMLAttributes } from "react";
import css from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const Input: React.FC<InputProps> = (props) => {
  return <input className={css.input} {...props} data-testid={props.id} />;
};

export default Input;
