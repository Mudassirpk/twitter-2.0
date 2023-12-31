"use client";
import {iComment} from "@/types";
import React, {useEffect, useState} from "react";
import {AiOutlineHeart} from "react-icons/ai";
import {FaRegComment} from "react-icons/fa";
import {useAuth} from "@/context/authContext";
import Loading from "@/helper/Loading";
import CommentBox from "./CommentBox";
import {addLike, updateLike} from "@/services/tweats/likes";

type Props = {
    likes: Array<string>;
    comments: Array<iComment>;
    tweatId: string;
};

function ActionBlock({likes, comments, tweatId}: Props) {
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

                if (!isLiked) {
                    const likeAdded = await addLike(tweatId, authContext.user)
                    if (likeAdded) {
                        setClientLikes([...clientLikes, likeAdded]);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false)
                        console.log('Error while updating likes')
                    }
                } else {
                    const updatedLikes = await updateLike(tweatId, authContext.user, likes);
                    if (updatedLikes) {
                        setClientLikes(updatedLikes);
                        setIsLoading(false);
                    } else {
                        console.log('Error while updating likes')
                    }
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
    }, [comments, likes]);

    useEffect(() => {
        if (authContext?.user && clientLikes.includes(authContext?.user?.uid)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [clientLikes, authContext?.user]);

    return (
        <>
            <div className="w-full flex gap-1 my-2 items-center">
                <div
                    onClick={() => setIsCommentsBoxOpen(!isCommentsBoxOpen)}
                    className="px-4 py-4 text-[rgb(83, 100, 113)] select-none flex items-center gap-2 max-w-fit cursor-pointer rounded-full hover:bg-[rgba(29,155,240,.1)]"
                >
                    <FaRegComment size={18}/>{" "}
                    <span className="text-[1.4rem]">
            {clientComments ? clientComments.length : 0}
          </span>
                </div>
                {isLoading ? (
                    <div
                        className="px-4 py-4 flex items-center gap-2 max-w-fit cursor-pointer rounded-full hover:bg-[rgba(29,155,240,.1)]">
                        <Loading/>
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
                <CommentBox tweatComments={comments} tweatId={tweatId}/>
            ) : null}
        </>
    );
}

export default ActionBlock;
