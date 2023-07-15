import React from "react";
import { GiFeather } from "react-icons/gi";
type Props = {};

function AddTweat({}: Props) {
  return (
    <button className="w-[90%] sm:fixed sm:bottom-28 sm:right-10 xl:w-auto xl:mr-4 xl:rounded-full hover:bg-tweater-blue-dark rounded-[2.5rem] px-4 py-4 bg-tweater-blue-normal text-center font-semibold text-[1.8rem] transition-colors duration-300">
      <span className="text-white xl:hidden">Tweet</span>
      <GiFeather className="hidden xl:block text-white text-[1.4rem]" />
    </button>
  );
}

export default AddTweat;
