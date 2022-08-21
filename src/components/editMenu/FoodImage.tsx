import React, { useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { MdAddAPhoto, MdFlipCameraIos } from "react-icons/md";
import { changeImageToBase64 } from "../../server/utils";
import { useRecoilState } from "recoil";
import { isEditedState } from "../../states/isEditedState";
import { editMenuState } from "../../states/EditMenuState";

const NO_IMAGE_THUMBNAIL: string = "/m_e_others_501.png";
type Props = {
  imgUrl?: string;
  isEditPage: boolean;
};

export const FoodImage: React.VFC<Props> = (props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    props.imgUrl ?? ""
  );
  const [menuState, setMenuState] = useRecoilState(editMenuState);
  const [_, setIsEdited] = useRecoilState(isEditedState);

  const onImageUrlChange = (imageUrl: string) => {
    // ここでmenuに差し込むと良さそう
    // props.updateMenuCard(props.index, imageUrl, "imgUrl");
    setMenuState({
      ...menuState,
      imgUrl: imageUrl,
    });
    setIsEdited(true);
    console.log("imageuUrl", imageUrl);
  };
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
    onImageUrlChange(base64Image || "");
  };

  return props.isEditPage ? (
    <>
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
    </>
  ) : (
    <Image
      src={thumbnailUrl || NO_IMAGE_THUMBNAIL}
      alt="no image"
      width={380}
      height={240}
      layout="responsive"
      objectFit="cover"
      className="rounded-t"
    />
  );
};
