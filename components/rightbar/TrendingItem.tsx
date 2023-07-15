import React from "react";
import { BsDot } from "react-icons/bs";

type Props = {};

function TrendingItem({}: Props) {
  return (
    <div className="px-4 rounded-sm cursor-pointer py-2 hover:bg-[rgb(239,243,244)]">
      <p className="text-[1.4rem] flex items-center space-x-2 text-[rgb(83,100,113)]">
        Entertainment <BsDot /> Trending
      </p>
      <p className="font-bold text-[1.4rem]">#Something</p>
      <p className="text-[1.2rem] flex items-center space-x-2 text-[rgb(83,100,113)]">
        1000 tweats
      </p>
    </div>
  );
}

export default TrendingItem;
