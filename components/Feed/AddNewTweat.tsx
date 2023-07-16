"use client";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import user_image from "@/public/profile.jpg";
import { FaRegImage } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { addDoc } from "firebase/firestore";
import { tweatCollectionRef } from "@/configs/firebase";
import { useAuth } from "@/context/authContext";
import { iTweat } from "@/types";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { tweatContext } from "@/context/tweatContext";
import Loading from "@/helper/Loading";
import ImageSelectorModal from "./ImageSelectorModal";
import { uploadImage } from "@/services/tweats/image";

type Props = {};

function AddNewTweat({}: Props) {
  const authContext = useAuth();
  const tweatStore = useContext(tweatContext);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<{
    image: File | null;
    preview: string | ArrayBuffer;
  } | null>(null);

  const [tweatText, setTweatText] = useState<string>("");
  const tweatBoxRef = useRef<HTMLTextAreaElement>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const createTweat = async () => {
    if (tweatText.length > 0) {
      try {
        if (authContext?.user) {
          setIsLoading(true);
          // the new tweet
          const newTweet = {
            comments: [],
            createdAt: { nanoseconds: 0, seconds: 0 },
            description: tweatText,
            from: authContext.user.uid,
            image: image?.image ? await uploadImage(image.image) : null,
            likes: [],
            uid: "",
          };
          // add the tweet to firestore
          const response = await addDoc(tweatCollectionRef, newTweet);
          // set up the new tweet for client tweet list
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
          setImage(null)
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

  // handle emoji functionality
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  function getEmoji({ emoji }: EmojiClickData, e: MouseEvent) {
    const textAreaElement = tweatBoxRef.current;
    if (textAreaElement) {
      const textAreaValue = textAreaElement.value;
      setTweatText(
        textAreaValue.substring(0, textAreaElement.selectionStart) +
          emoji +
          textAreaValue.substring(textAreaElement.selectionEnd)
      );
    }
  }

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
            ref={tweatBoxRef}
            value={tweatText}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setTweatText(e.target.value);
            }}
            placeholder="What's happening?!"
            className={` outline-none border-none w-full text-[1.8rem] text-black`}
          ></textarea>
        </div>
        {/* image preview for the new tweat */}
        {image ? (
          <div className="w-full relative aspect-video">
            <Image
              className="object-cover rounded-[2rem]"
              alt="tweat preview image"
              src={image?.preview as string}
              fill={true}
            />
          </div>
        ) : null}
        <div className="w-full flex gap-2 items-center justify-between pl-4 py-2">
          <div className="flex gap-2 items-center">
            {" "}
            <div className="p-4 rounded-full cursor-pointer hover:bg-[rgba(29,155,240,.1)]">
              <FaRegImage
                onClick={() => setIsImageModalOpen(!isImageModalOpen)}
                fontSize={18}
                color="rgb(29,155,240)"
              />
              {isImageModalOpen ? (
                <ImageSelectorModal
                  exitModal={setIsImageModalOpen}
                  returnImage={setImage}
                />
              ) : null}
            </div>
            {/* emoji section */}
            <div className="relative w-auto h-auto">
              <div
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                className="p-4 rounded-full cursor-pointer hover:bg-[rgba(29,155,240,.1)]"
              >
                <GrEmoji fontSize={18} color="rgb(29,155,240)" />
              </div>
              {isEmojiPickerOpen ? (
                <div className="absolute left-[.5rem] top-[2.5rem}">
                  <EmojiPicker onEmojiClick={getEmoji} />
                </div>
              ) : null}
            </div>
            {/* ---- emoji section */}
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
