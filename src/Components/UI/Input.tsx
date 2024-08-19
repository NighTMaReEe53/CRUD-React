import { InputHTMLAttributes } from "react";
import { INPUT_NAME } from "../INTERFACE/INPUT_PROPS";

interface INPUT_PROPS extends InputHTMLAttributes<HTMLInputElement> {
  ID: string;
  TYPE: string;
  NAME: INPUT_NAME;
  className: string;
}

const Input = ({ ID, TYPE, className, NAME, ...rest }: INPUT_PROPS) => {
  return (
    <input
      type={TYPE}
      id={ID}
      name={NAME}
      className={`${className}`}
      {...rest}
    />
  );
};

export default Input;
