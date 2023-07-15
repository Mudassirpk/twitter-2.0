import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classes: string;
}

function Button({ classes, children }: Props) {
  return (
    <button className={`${classes} rounded-[2rem] px-4 py-2`}>
      {children}
    </button>
  );
}

export default Button;
