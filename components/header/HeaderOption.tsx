import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  className?: string;
};

export default function HeaderOption({ icon, title, className }: Props) {
  return (
    <div
      className={
        "flex transition-colors duration-150 cursor-pointer hover:bg-tweater-gray-medium px-6 py-4 rounded-[2.5rem] text-[1.8rem] gap-4 items-center " +
        className
      }
    >
      {icon}
      <span className="xl:hidden">{title}</span>
    </div>
  );
}
