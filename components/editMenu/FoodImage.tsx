import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdAddAPhoto, MdFlipCameraIos } from "react-icons/md";
export const FoodImage: React.VFC = () => {
  const [preview, setPreview] = useState("/public/m_e_others_501.png");
  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    setPreview(window.URL.createObjectURL(files![0]));
  };

  return (
    <div className="basis-1/3 md:basis-1/3 text-xl text-white">
      <Image
        src={preview}
        className="text-center"
        alt="No Image"
        height={300}
        width={500}
        objectFit={"contain"}
      />

      <div className="relative">
        <label className="cursor-pointer text-center bg-zinc-600 text-white p-2 rounded-full shadow-md w-13 font-bold mr-4 mb-3 absolute bottom-0 right-0 text-4xl">
          {preview == "/public/m_e_others_501.png" ? (
            <MdAddAPhoto />
          ) : (
            <MdFlipCameraIos />
          )}
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
