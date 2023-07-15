"use client";

import React, { useContext } from "react";
import Loading from "@/helper/Loading";
import Tweat from "@/components/Feed/Tweat";
import { tweatContext } from "@/context/tweatContext";

type Props = {};

function TweatListClient({}: Props) {
  const tweatStore = useContext(tweatContext);
  return (
    <div className="w-full">
      {tweatStore?.tweats
        ? tweatStore.tweats.map((tweat) => {
            return tweat ? <Tweat key={tweat.uid} data={tweat} /> : <Loading />;
          })
        : null}
    </div>
  );
}

export default TweatListClient;
