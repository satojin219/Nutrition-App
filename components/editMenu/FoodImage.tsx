import React, { useState } from "react";
import Image from "next/image";
import { MdAddAPhoto, MdFlipCameraIos } from "react-icons/md";
export const FoodImage: React.VFC = () => {
  const [preview, setPreview] = useState("");
  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    setPreview(window.URL.createObjectURL(files![0]));
  };
  return (
    <div className="basis-1/3 md:basis-1/3 text-xl bg-gray-400 text-white ">
      <div className="flex justify-center items-center">
        {preview != "" ? (
          <Image
            src={preview}
            className="object-fill w-full h-full"
            alt="preview"
          />
        ) : (
          <div className="flex justify-center items-center h-48">
            <Image src="" alt="No image" />
          </div>
        )}
      </div>

      <div className="relative">
        <label className="cursor-pointer text-center bg-zinc-600 text-white p-2 rounded-full shadow-md w-13 font-bold mr-4 mb-3 absolute bottom-0 right-0 text-4xl">
          {preview == "" ? <MdAddAPhoto /> : <MdFlipCameraIos />}
          <input
            type="file"
            name="photo"
            onChange={handleChangeFile}
            className="hidden"
            accept=".jpg, .jpeg, .png, .gif"
          />
        </label>
      </div>
    </div>
  );
};
