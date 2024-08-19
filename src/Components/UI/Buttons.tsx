import { ButtonHTMLAttributes, ReactNode } from "react";

interface BTNS_PROPS extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  WIDTH?: "w-fit" | "w-full";
  className?: string;
}

const Buttons = ({children, WIDTH = "w-fit", className, ...rest}: BTNS_PROPS) => {
  return (
    <button
      className={`${WIDTH} ${className} p-2 text-white transition rounded-md font-bold `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Buttons;
