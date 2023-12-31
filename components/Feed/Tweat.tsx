import React from "react";
import Image from "next/image";

import { DocumentData } from "firebase/firestore";
import { iTweat } from "@/types";
import ActionBlock from "./ActionBlock";
import FollowButton from "./FollowButton";
import Link from "next/link";

type Props = {
  data: DocumentData | iTweat;
};

export default function Tweat({ data }: Props) {
  const { comments, description, from_data, image, likes, uid } =
    data as iTweat;
  console.log("di: ", from_data.docId);
  return (
    <div className="flex gap-4 my-8 border-b border-tweater-gray-dark items-start">
      <Link href={{ pathname: "/profile", query: { user: from_data.uid } }}>
        <div className="relative min-w-[3.6rem] w-[3.6rem] h-[3.6rem]">
          <Image
            alt="avatar"
            src={from_data.photo}
            fill={true}
            className="rounded-full object-cover"
          />
        </div>
      </Link>
      <div className="w-full">
        <div className="w-full flex items-center justify-between min-h-[3.6rem]">
          <Link href={{ pathname: "/profile", query: { user: from_data.uid } }}>
            <p className="flex text-[1.4rem] gap-2 items-center">
              <span className="text-black font-bold">{from_data.name}</span>{" "}
            </p>
          </Link>
          <FollowButton
            fromUserId={from_data.uid}
            fromDocId={from_data.docId}
          />
        </div>

        <p className="mt-1 text-[1.4rem] mb-4">{description}</p>
        {image && image.fileUrl.length > 0 ? (
          <div className="relative w-full aspect-video">
            <Image
              alt="tweat image"
              src={image.fileUrl}
              fill={true}
              className="object-cover rounded-3xl"
            />
          </div>
        ) : null}
        {/* viewer's action block: likes,comments */}
        <ActionBlock likes={likes} comments={comments} tweatId={uid} />
      </div>
    </div>
  );
}
