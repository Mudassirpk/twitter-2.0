"use client";
import React from "react";
type Props = {
  title: string;
  selected: boolean;
};

export default function Tab({ title, selected }: Props) {
  return (
    <div className="text-center hover:bg-tweater-gray-medium cursor-pointer text-[1.4rem] font-bold w-full flex items-center justify-center pt-4 px-4 border-b border-tweater-gray-dim">
      <p
        className={`pb-4 ${
          selected && "border-b-2 border-tweater-blue-normal"
        } max-w-min`}
      >
        {title}
      </p>
    </div>
  );
}
