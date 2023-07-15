import React from "react";
import TrendingItem from "./TrendingItem";

type Props = {};

function Trending({}: Props) {
  return (
    <div>
      <h2 className="font-bold mt-10 mb-8 text-[1.8rem] ">Trending for you</h2>
      <div>
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
        <TrendingItem />
      </div>
    </div>
  );
}

export default Trending;
