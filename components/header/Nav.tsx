import React from "react";
import HeaderOption from "./HeaderOption";
import { AiOutlineBell } from "react-icons/ai";
import { BsSearch, BsEnvelope } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { RiHome7Fill } from "react-icons/ri";
import AddTweat from "./AddTweat";
import Profile from "./Profile";
type Props = {};

function Nav({}: Props) {
  return (
    <nav className="w-full sm:justify-between sm:my-0 sm:flex-row my-10 flex-1 flex flex-col xl:items-end items-start gap-4">
      <HeaderOption
        icon={<RiHome7Fill className="text-[2.5rem]" />}
        title="Home"
      />
      <HeaderOption
        icon={<BsSearch className="text-[2.5rem]" />}
        title="Search"
      />
      <HeaderOption
        icon={<AiOutlineBell className="text-[2.5rem]" />}
        title="Notifications"
      />
      <HeaderOption
        icon={<BsEnvelope className="text-[2.5rem]" />}
        title="Messages"
      />
      <HeaderOption
        className="sm:hidden"
        icon={<FaRegUser className="text-[2.5rem]" />}
        title="Profile"
      />

      {/* add new tweet */}
      <AddTweat />

      {/* profile */}
      <Profile />
    </nav>
  );
}

export default Nav;
