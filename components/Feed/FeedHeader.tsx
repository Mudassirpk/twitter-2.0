"use client";
import React, { useState } from "react";
import Tab from "../ui/Tab";
import Image from "next/image";
import Link from "next/link";
import { GrTwitter } from "react-icons/gr";
import avatar from "@/public/profile.jpg";
import { useAuth } from "@/context/authContext";

export default function FeedHeader({}) {
  const authContext = useAuth();
  return (
    <div>
      <div
        className={`hidden sm:flex w-full items-center pt-2 border-b border-tweater-gray-dim`}
      >
        <div className="relative h-[3.6rem] w-[3.6rem]">
          <Image
            className="rounded-full"
            src={
              authContext?.user?.photoURL ? authContext.user.photoURL : avatar
            }
            alt="profile image"
            fill={true}
          />
        </div>
        <Link
          href={"/"}
          className="p-6 rounded-full flex-1 flex justify-center  cursor-pointer"
        >
          <GrTwitter className="text-[rgb(29,155,240)] text-[3rem]" />
        </Link>
      </div>
      <h1 className="text-[1.8rem] font-bold py-6">Home</h1>
      <Tab title="Tweats" selected={true} />
    </div>
  );
}
