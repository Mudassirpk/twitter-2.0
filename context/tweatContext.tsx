"use client";

import { iTweat } from "@/types";
import React, { SetStateAction, createContext, useState } from "react";

type tTweatContext = {
  tweats: iTweat[] | null;
  setTweats: React.Dispatch<SetStateAction<iTweat[] | null>>;
  commentsModal: boolean;
  setCommentsModal: React.Dispatch<SetStateAction<boolean>>;
};

export const tweatContext = createContext<tTweatContext | null>(null);

export default function TweatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tweats, setTweats] = useState<Array<iTweat> | null>(null);
  const [commentsModal, setCommentsModal] = useState(true);

  const value = {
    tweats,
    setTweats,
    commentsModal,
    setCommentsModal,
  };

  return (
    <tweatContext.Provider value={value}>{children}</tweatContext.Provider>
  );
}
