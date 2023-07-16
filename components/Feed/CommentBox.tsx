"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/button";
import Comments from "./Comments";
import { useAuth } from "@/context/authContext";
import { iComment, iCommentWithUser } from "@/types";
import Loading from "@/helper/Loading";
import { addComment } from "@/services/tweats/comments";
import { getCommentsWithUser } from "@/services/tweats/comments";

type Props = { tweatId: string; tweatComments: iComment[] };

function CommentBox({ tweatId, tweatComments }: Props) {
  const authStore = useAuth();
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientComments, setClientComments] = useState<
    iCommentWithUser[] | null
  >(null);

  async function sendComment(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (authStore?.user) {
        const commentAdded = await addComment(
          authStore?.user,
          tweatId,
          comment
        );
        if (commentAdded) {
          if (clientComments) {
            setClientComments([...clientComments, commentAdded]);
          } else {
            setClientComments([commentAdded]);
          }
          setIsLoading(false);
          setComment("");
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function setCommnets() {
      setClientComments(await getCommentsWithUser(tweatComments));
    }
    setCommnets();
  }, []);

  return (
    <div>
      <div className="w-full my-4">
        <form onSubmit={sendComment} className="w-full">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full text-[1.4rem] px-4 py-2 border border-tweater-blue-normal rounded-[1.5rem] outline-none"
            name=""
            id=""
            placeholder="comment ...."
          ></textarea>
          <Button
            type="submit"
            disabled={comment.length === 0}
            classes={`${
              comment.length === 0
                ? "bg-tweater-gray-normal pointer-events-none"
                : ""
            } bg-tweater-blue-normal text-[1.4rem] my-2 font-semibold hover:bg-tweater-blue-dark text-white block float-right`}
          >
            {isLoading ? <Loading /> : "Send"}
          </Button>
        </form>
      </div>
      <Comments comments={clientComments} />
    </div>
  );
}

export default CommentBox;
