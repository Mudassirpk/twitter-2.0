"use client";
import React from "react";
import AddNewTweat from "./Feed/AddNewTweat";
import FeedHeader from "./Feed/FeedHeader";
import TweatList from "./Feed/TweatList";
import TweatListClient from "@/components/Feed/TweatListClient";

export default function Feed() {
  return (
    <section
      className={`h-full flex-1 scrollbar-none sm:pb-[6rem] max-h-[100vh] overflow-y-scroll relative border-x-tweater-gray-dim px-4 border border-[rgb(239,243,244)] max-w-[60rem]`}
    >
      <FeedHeader />
      <AddNewTweat />
      <TweatListClient />
      <TweatList />
      <p className="text-[1.4rem] text-center my-6 text-tweater-gray-normal font-semibold">
        You caught up for now
      </p>
    </section>
  );
}
