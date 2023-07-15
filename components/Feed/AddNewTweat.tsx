"use client";
import React, { ChangeEvent, useState, useContext } from "react";
import Image from "next/image";
import user_image from "@/public/profile.jpg";
import { FaRegImage } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { addDoc, collection } from "firebase/firestore";
import { tweatCollectionRef } from "@/configs/firebase";
import { useAuth } from "@/context/authContext";
import { iTweat } from "@/types";

import { tweatContext } from "@/context/tweatContext";
import Loading from "@/helper/Loading";

type Props = {};

function AddNewTweat({}: Props) {
  const authContext = useAuth();
  const tweatStore = useContext(tweatContext);
  const [isLoading, setIsLoading] = useState(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [tweatText, setTweatText] = useState<string>("");
  const createTweat = async () => {
    if (tweatText.length > 0) {
      try {
        const description = tweatText;
        if (authContext?.user) {
          setIsLoading(true);
          // the new tweet
          const newTweet = {
            comments: [],
            createdAt: { nanoseconds: 0, seconds: 0 },
            description: description,
            from: authContext.user.uid,
            image: { filekey: "", fileurl: "" },
            likes: [],
            uid: "",
          };
          // add the tweet to firestore
          const response = await addDoc(tweatCollectionRef, newTweet);
          // setup the new tweet for client tweet list
          const newClientTweet: iTweat = {
            ...newTweet,
            from_data: {
              name: authContext.user.displayName as string,
              email: authContext.user.email as string,
              photo: authContext.user.photoURL as string,
              uid: authContext.user.uid,
              followers: [],
              following: [],
            },
            uid: response.id,
          };
          setTweatText("");
          // set the client tweet list
          if (tweatStore?.tweats) {
            tweatStore?.setTweats([newClientTweet, ...tweatStore.tweats]);
            setIsLoading(false);
          } else {
            tweatStore?.setTweats([newClientTweet]);
            setIsLoading(false);
          }
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full border-b border-tweater-gray-dim my-10 flex gap-4">
      <div className="relative rounded-full overflow-hidden min-w-[3.6rem] h-[3.6rem]">
        <Image
          src={
            authContext?.user?.photoURL
              ? authContext?.user?.photoURL
              : user_image
          }
          alt="user image"
          fill={true}
        />
      </div>
      <div className="w-full">
        <div className="w-full py-2 h-auto min-h-[3.6rem]">
          <textarea
            value={tweatText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setTweatText(e.target.value);
            }}
            placeholder="What's happening?!"
            className={` outline-none border-none w-full text-[1.8rem] text-black`}
          ></textarea>
        </div>
        <div className="w-full flex gap-2 items-center justify-between pl-4 py-2">
          <div className="flex gap-2 items-center">
            {" "}
            <div className="p-4 rounded-full cursor-pointer hover:bg-[rgba(29,155,240,.1)]">
              <FaRegImage fontSize={18} color="rgb(29,155,240)" />
              {/* <ImageSelectorModal returnImage={setImage} /> */}
            </div>
            <div className="p-4 rounded-full cursor-pointer hover:bg-[rgba(29,155,240,.1)]">
              <GrEmoji fontSize={18} color="rgb(29,155,240)" />
            </div>
          </div>
          <button
            onClick={createTweat}
            disabled={tweatText.length === 0}
            className={`px-4 py-2 rounded-[2rem] justify-self-end text-[1.4rem] font-semibold ${
              tweatText.length > 0
                ? "bg-tweater-blue-normal text-white"
                : "bg-tweater-blue-dim text-tweater-gray-normal"
            }`}
          >
            {isLoading ? <Loading /> : "Tweet"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewTweat;
