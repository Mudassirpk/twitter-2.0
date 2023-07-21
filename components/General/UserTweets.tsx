import React from "react";
import { iTweat } from "@/types";
import Tweat from "../Feed/Tweat";

type Props = { tweats: iTweat[] };

 function UserTweets({ tweats }: Props) {
  return (
    <section className="w-full pb-[6rem] px-4">
      {tweats
        ? tweats.map((tweat) => <Tweat key={tweat.uid} data={tweat} />)
        : null}
    </section>
  );
}

export default UserTweets;
