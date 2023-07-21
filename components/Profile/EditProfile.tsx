"use client";
import React from "react";
import Button from "../ui/button";
import { useAuth } from "@/context/authContext";
type Props = { currentProfile: string };

function EditProfile({ currentProfile }: Props) {
  const authStore = useAuth();
  if (authStore?.user?.uid !== currentProfile) return null;
  return (
    <Button classes="border hover:bg-tweater-gray-medium border-tweater-gray-medium px-6 py-2 rounded-[2rem] text-[1.4rem] font-semibold">
      Edit Profile
    </Button>
  );
}

export default EditProfile;
