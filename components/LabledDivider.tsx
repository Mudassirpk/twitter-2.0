import React from "react";

type Props = {
  label: string;
};

function LabledDivider({ label }: Props) {
  return (
    <div className="flex w-full gap-2 items-center">
      <div className="h-[2px] bg-gray-300 flex-1"></div>
      <p className="text-[1.4rem] font-semibold">{label}</p>
      <div className="h-[2px] bg-gray-300 flex-1"></div>
    </div>
  );
}

export default LabledDivider;
