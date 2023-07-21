import React from "react";

type Props = { children: React.ReactNode };

function Tabs({ children }: Props) {
  return <div className="w-full flex items-center h-auto">{children}</div>;
}

export default Tabs;
