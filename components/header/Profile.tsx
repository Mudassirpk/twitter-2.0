"use client";
import React from "react";
import Image from "next/image";
type Props = {};
import { useAuth } from "@/context/authContext";
import profile_image from "@/public/profile.jpg";
import { BsThreeDots } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
function Profile({}: Props) {
  const authContext = useAuth();
  return (
    <div className="relative mt-auto sm:hidden cursor-pointer w-full xl:w-auto flex items-center justify-between gap-4 px-6 py-4 rounded-[2.5rem] hover:bg-tweater-gray-medium">
      <ProfileModal />
      <div className="flex gap-4 items-center">
        <div className="relative h-[3.6rem] w-[3.6rem]">
          <Image
            className="rounded-full"
            src={
              authContext?.user?.photoURL
                ? authContext?.user?.photoURL
                : profile_image
            }
            alt="profile image"
            fill={true}
          />
        </div>
        <div className="xl:hidden">
          <p className="text-black text-[1.2rem] font-semibold">
            {authContext?.user?.displayName}
          </p>
          <p className="text-gray-600 text-[1.2rem]">
            {authContext?.user?.email}
          </p>
        </div>
      </div>

      <BsThreeDots className="xl:hidden text-[2.5rem]" />
    </div>
  );
}

export default Profile;
