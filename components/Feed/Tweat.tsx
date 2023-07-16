import React from "react";
import Image from "next/image";

import { BsDot } from "react-icons/bs";
import { DocumentData } from "firebase/firestore";
import { iTweat } from "@/types";
import ActionBlock from "./ActionBlock";

type Props = {
  data: DocumentData | iTweat;
};

export default function Tweat({ data }: Props) {
  const {
    comments,
    createdAt,
    description,
    from,
    from_data,
    image,
    likes,
    uid,
  } = data as iTweat;
  return (
    <div className="flex gap-4 my-8 border-b border-tweater-gray-dark items-start">
      <div className="relative min-w-[3.6rem] w-[3.6rem] h-[3.6rem]">
        <Image
          alt="avatar"
          src={from_data.photo}
          fill={true}
          className="rounded-full object-cover"
        />
      </div>
      <div className="w-full">
        <p className="flex text-[1.4rem] gap-2 items-center">
          <span className="text-black font-bold">{from_data.name}</span>{" "}
          <span className="text-tweater-gray-normal flex gap-1 items-center">
            @{data.from_data.name} <BsDot /> 4m
          </span>
        </p>
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
