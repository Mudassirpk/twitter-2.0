import React from "react";
import Comment from "./Comment";
import { iCommentWithUser } from "@/types";
type Props = { comments: iCommentWithUser[] };

function Comments({ comments }: Props) {
  return (
    <div
      style={{
        boxShadow:
          " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
      className="max-h-[30rem] overflow-y-scroll px-4 py-4 bg-white my-[5rem] border border-tweater-blue-dim rounded-[1rem]"
    >
      <h2 className="text-[1.8rem] font-semibold text-tweater-gray-normal">
        Comments
      </h2>
      {comments
        ? comments.map((comment: iCommentWithUser) => (
            <Comment
              text={comment.text}
              from={comment.from}
              from_data={comment.from_data}
            />
          ))
        : null}
    </div>
  );
}

export default Comments;
