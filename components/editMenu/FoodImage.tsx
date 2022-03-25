import React, { useState } from "react";
import Image from "next/image";
import { MdAddAPhoto, MdFlipCameraIos } from "react-icons/md";

const NO_IMAGE_THUMBNAIL: string = "/m_e_others_501.png";
type Props = {
  index: number;
  updateMenuCard(index: number, data: any, dataType: any): void;
};

export const FoodImage: React.VFC<Props> = (props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.currentTarget;
    setThumbnailUrl(window.URL.createObjectURL(files![0]));
    props.updateMenuCard(
      props.index,
      window.URL.createObjectURL(files![0]),
      "imgUrl"
    );
  };

  return (
    <div className="basis-1/3 md:basis-1/3 text-xl text-white">
      <div className="bg-stone-50">
        <Image
          src={thumbnailUrl || NO_IMAGE_THUMBNAIL}
          className="text-center"
          alt="No Image"
          height={300}
          width={500}
          objectFit={"contain"}
        />
      </div>

      <div className="relative">
        <label className="cursor-pointer text-center bg-zinc-600 text-white p-2 rounded-full shadow-md w-13 font-bold mr-4 mb-3 absolute bottom-0 right-0 text-4xl">
          {thumbnailUrl === undefined ? <MdAddAPhoto /> : <MdFlipCameraIos />}
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
