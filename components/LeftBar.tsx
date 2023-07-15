import Link from "next/link";
import React from "react";

// components
import Nav from "./header/Nav";

// icons
import { GrTwitter } from "react-icons/gr";

export default function LeftBar() {
  return (
    <header className="z-50 bg-white sm:border-t sm:border-tweater-gray-dim sm:h-auto h-screen xl:w-auto w-[40.5rem] sm:fixed sm:bottom-0 sm:w-full sm:flex-row flex flex-col items-end p-4">
      <div className="w-[27.5rem] sm:w-full xl:w-auto xl:items-end xl:pr-6 flex flex-col items-start min-h-full">
        <Link
          href={"/"}
          className="sm:hidden p-6 rounded-full hover:bg-tweater-gray-medium cursor-pointer"
        >
          <GrTwitter className="text-[rgb(29,155,240)] text-[3rem]" />
        </Link>

        {/* nav */}
        <Nav />
      </div>
    </header>
  );
}
