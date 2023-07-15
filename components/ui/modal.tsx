"use client";
import React, { SetStateAction } from "react";
export default function Modal({
  close,
}: {
  close: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => close(false)}
      id="modal-overlay"
      className="fixed w-full h-full top-0 left-0 flex justify-center items-center"
      style={{
        background: "rgba(0,0,0,.1)",
      }}
    >
      <div className="bg-white border border-tweater-blue-dim w-[40rem] p-4 rounded-[2rem]"></div>
    </div>
  );
}
