"use client";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useClickOutside from "@/helper/ClickOutside";
type Props = {};

function Search({}: Props) {
  const [focused, setFocused] = useState(false);
  const domNodeRef = useRef<HTMLDivElement>(null);
  function toggleFocus() {
    setFocused(false);
  }
  const ref = useClickOutside(domNodeRef, toggleFocus);

  return (
    <div
      ref={domNodeRef}
      id="search-box"
      onClick={() => setFocused(true)}
      className={`${
        focused ? "border border-[rgb(29,155,240)]" : ""
      } px-4 py-4 w-full rounded-[2.5rem] flex items-center gap-4 bg-[rgb(239,243,244)]`}
    >
      <BsSearch
        id="search-icon"
        fontSize={18}
        color={`${!focused ? "rgb(83,100,113)" : "rgb(29,155,240)"}`}
      />
      <input
        id="search-input"
        type="text"
        className="outline-none placeholder:text-[rgb(83,100,113)] text-[1.4rem] text-[rgb(83,100,113)] bg-transparent flex-1"
        placeholder="Search Twitter"
      />
    </div>
  );
}

export default Search;
