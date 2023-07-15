"use client";
import { iComment } from "@/types";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/configs/firebase";
import { useAuth } from "@/context/authContext";
import Loading from "@/helper/Loading";
import CommentBox from "./CommentBox";

type Props = {
  likes: Array<string>;
  comments: Array<iComment>;
  tweatId: string;
};

function ActionBlock({ likes, comments, tweatId }: Props) {
  const authContext = useAuth();
  const [clientLikes, setClientLikes] = useState<Array<string>>([]);
  const [clientComments, setClientComments] = useState<Array<iComment>>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsBoxOpen, setIsCommentsBoxOpen] = useState(false);

  async function updateLikes() {
    try {
      setIsLoading(true);
      if (authContext?.user) {
        const docRef = doc(db, "tweats", tweatId);
        if (!isLiked) {
          await updateDoc(docRef, {
            likes: arrayUnion(authContext.user.uid),
          });
          setClientLikes([...clientLikes, authContext.user.uid]);
          setIsLoading(false);
        } else {
          const updatedLikes = likes.filter(
            (like) => like !== authContext?.user?.uid
          );
          await updateDoc(docRef, { likes: arrayRemove(authContext.user.uid) });
          setClientLikes(updatedLikes);
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setClientLikes(likes);
    setClientComments(comments);
  }, []);

  useEffect(() => {
    if (authContext?.user && clientLikes.includes(authContext?.user?.uid)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [clientLikes]);

  return (
    <>
      <div className="w-full flex gap-1 my-2 items-center">
        <div
          onClick={() => setIsCommentsBoxOpen(!isCommentsBoxOpen)}
          className="px-4 py-4 text-[rgb(83, 100, 113)] select-none flex items-center gap-2 max-w-fit cursor-pointer rounded-full hover:bg-[rgba(29,155,240,.1)]"
        >
          <FaRegComment size={18} />{" "}
          <span className="text-[1.4rem]">
            {clientComments ? clientComments.length : 0}
          </span>
        </div>
        {isLoading ? (
          <div className="px-4 py-4 flex items-center gap-2 max-w-fit cursor-pointer rounded-full hover:bg-[rgba(29,155,240,.1)]">
            <Loading />
          </div>
        ) : (
          <div
            onClick={updateLikes}
            className="px-4 py-4 flex items-center gap-2 max-w-fit cursor-pointer rounded-full hover:bg-[rgba(29,155,240,.1)]"
          >
            <AiOutlineHeart
              color={isLiked ? "red" : "rgb(83, 100, 113)"}
              size={18}
            />{" "}
            <span className="text-[1.4rem]">
              {clientLikes ? clientLikes.length : 0}
            </span>
          </div>
        )}
      </div>
      {isCommentsBoxOpen ? (
        <CommentBox tweatComments={comments} tweatId={tweatId} />
      ) : null}
    </>
  );
}

export default ActionBlock;
