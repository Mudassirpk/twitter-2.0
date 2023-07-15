"use client";
import React from "react";
import AddNewTweat from "./Feed/AddNewTweat";
import FeedHeader from "./Feed/FeedHeader";
import TweatList from "./Feed/TweatList";
import TweatListClient from "@/components/Feed/TweatListClient";
export default function Feed() {

  return (
    <section
      className={`flex-1 scrollbar-none sm:mb-[6rem] max-h-[100vh] overflow-y-scroll relative border-x-tweater-gray-dim px-4 border border-[rgb(239,243,244)] max-w-[60rem]`}
    >
      <FeedHeader />
      <AddNewTweat />
      <TweatListClient />
      <TweatList />
    </section>
  );
}
