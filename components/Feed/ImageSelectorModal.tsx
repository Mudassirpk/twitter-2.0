import React, { ChangeEvent, SetStateAction, useState } from "react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
type Props = {
  returnImage: React.Dispatch<SetStateAction<File | null>>;
};

function ImageSelectorModal({returnImage}: Props) {
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer>();

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    if (input.files) {
      returnImage(input.files[0]);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(input.files[0]);
      fileReader.onload = function () {
        if (fileReader.result) {
          setPreviewImage(fileReader.result);
        }
      };
    }
  }
  return (
    <div className="absolute z-50 mx-auto w-max-[40rem] top-[15rem] w-[80%] bg-white shadow-2xl border border-gray-300 p-4 rounded-[2rem]">
      <h2 className="text-[1.8rem] flex justify-between items-center font-semibold mb-4">
        Chose an image <MdCancel className="text-tweater-gray-normal" />{" "}
      </h2>
      <div className="w-full aspect-video flex items-center justify-center bg-tweater-blue-dim rounded-[2rem]">
        {!previewImage ? (
          <>
            {" "}
            <label
              className=" border border-gray-300 rounded-[2rem] text-[1.4rem] p-4 hover:bg-tweater-blue-dim cursor-pointer"
              htmlFor="file-input"
            >
              Browse
            </label>
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleImage}
            />
          </>
        ) : (
          <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
            <Image
              className="object-contain rounded-[2rem]"
              alt="preview image"
              src={previewImage as string}
              fill={true}
            />
            <div className="w-full z-20 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[rgba(0,0,0,.4)] h-full top-0 left-0 absolute">
              <label
                className=" border border-gray-300 text-white font-semibold rounded-[2rem] text-[1.4rem] p-4 hover:bg-tweater-blue-dim cursor-pointer"
                htmlFor="file-input"
              >
                Change
              </label>
              <input
                accept="image/*"
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleImage}
              />
            </div>
          </div>
        )}
      </div>
      <div className="pt-4">
        <button className="p-4 float-right text-[1.4rem] text-white bg-tweater-blue-normal hover:bg-tweater-blue-dark font-semibold rounded-[2rem]">
          confirm
        </button>
      </div>
    </div>
  );
}

export default ImageSelectorModal;
