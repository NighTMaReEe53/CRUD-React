import { HTMLAttributes } from "react";

interface ICIRCLE_PROPS extends HTMLAttributes<HTMLSpanElement> {
  ID?: 1;
}

const CIRCLE_COLOR = ({ ...rest }: ICIRCLE_PROPS) => {
  return <span {...rest}></span>;
};

export default CIRCLE_COLOR;
