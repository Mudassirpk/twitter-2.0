"use client";
import React from "react";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { auth } from "@/configs/firebase";
type Props = {};

function ProfileModal({}: Props) {
  function logout() {
    signOut(auth)
  }
  const authContext = useAuth();
  return (
    <div className="absolute -top-[calc(100%_+_2.4rem)] left-0 p-6 bg-white shadow-2xl w-full">
      <div onClick={logout} className="font-semibold my-4 text-[1.4rem]">
        Logout @{authContext?.user?.displayName}
      </div>
    </div>
  );
}

export default ProfileModal;
