import React from "react";
import avatar from "@/public/profile.jpg";
import Image from "next/image";
type Props = {
  from: string;
  from_data: { name: string; email: string; photo: string; uid: string };
  text: string;
};

function Comment({ from, from_data, text }: Props) {
  return (
    <>
      <div className="w-full my-4 flex gap-4 items-start border-b border-tweater-gray-dim rounded-md pb-4">
        <div className="relative w-[5rem] h-[5rem]">
          <Image
            alt="avatar"
            src={from_data.photo}
            fill={true}
            className="object-cover rounded-full"
          />
        </div>
        <div>
          <p className="h-[5rem] flex  gap-2 items-center text-[1.4rem] font-semibold">
            {from_data.name}{" "}
            <span className="font-normal text-tweater-gray-normal">
              @{from_data.name}
            </span>
          </p>
          <p className="text-tweater-gray-dark text-[1.4rem]">{text}</p>
        </div>
      </div>
    </>
  );
}

export default Comment;
