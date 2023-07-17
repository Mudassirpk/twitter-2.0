"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { addfollowing } from "@/services/users/following";
import Loading from "@/helper/Loading";

type Props = {
  fromDocId: string;
  fromUserId: string;
};

export default function FollowButton({ fromDocId, fromUserId }: Props) {
  const authStore = useAuth();
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function follow() {
    try {
      setIsLoading(true);
      if (authStore?.user) {
        const followed = await addfollowing(authStore.user.docId, fromDocId);
        if (followed) {
          setIsFollowed(true);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authStore?.user) {
      const ifFollowing = authStore.user.following.filter(
        (userId) => userId === fromDocId
      );
      if (ifFollowing && ifFollowing.length > 0) {
        setIsFollowed(true);
      }
    }
  }, [fromDocId]);

  if (fromUserId === authStore?.user?.uid) return null;

  return !isFollowed ? (
    <button
      onClick={follow}
      className="font-semibold text-[1.4rem] bg-tweater-blue-normal text-white rounded-[2rem] px-6 py-2 cursor-pointer hover:bg-tweater-blue-dark"
    >
      {isLoading ? <Loading /> : "Follow"}
    </button>
  ) : (
    <button className="font-semibold text-[1.4rem] bg-white text-tweater-gray-normal rounded-[2rem] px-6 py-2">
      following
    </button>
  );
}
