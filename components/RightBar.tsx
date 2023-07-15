import React from "react";
import Search from "./rightbar/Search";
import Trending from "./rightbar/Trending";

export default function RightBar() {
  return (
    <section className="flex-1 lg:hidden p-4 min-h-full">
      <div className="w-[30.5rem]">
        <Search />
        <Trending />
      </div>
    </section>
  );
}
