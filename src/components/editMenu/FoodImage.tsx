import React, { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { MdAddAPhoto, MdFlipCameraIos } from "react-icons/md";
import { changeImageToBase64 } from "../../server/utils";
import { Menu } from "../../shared/globalType";

const NO_IMAGE_THUMBNAIL: string = "/m_e_others_501.png";
type Props = {
  menu: Menu;
  onImageUrlChange: (p: string) => void;
};

export const FoodImage: React.VFC<Props> = (props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    props.menu.imgUrl
  );

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    const { files } = e.currentTarget;
    const file = files![0];
    const minifiedImage = await imageCompression(file, {
      maxSizeMB: 0.7,
    });
    const base64Image = await changeImageToBase64(minifiedImage);
    setThumbnailUrl(base64Image || "");
    props.onImageUrlChange(base64Image || "");
  };

  return (
    <div>
      <Image
        src={thumbnailUrl || NO_IMAGE_THUMBNAIL}
        alt="No Image"
        width={380}
        height={240}
        layout="responsive"
        objectFit="cover"
        className="rounded-t"
      />

      <div className="relative">
        <label className="cursor-pointer text-center bg-zinc-600 text-white p-2 rounded-full shadow-md w-13 font-bold mr-4 mb-3 absolute bottom-0 right-0 text-4xl">
          {thumbnailUrl ? <MdFlipCameraIos /> : <MdAddAPhoto />}
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
