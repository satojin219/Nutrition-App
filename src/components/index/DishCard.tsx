import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { MealTime, Menu } from "../../shared/globalType";
import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { Modal } from "../common/Modal";
import { useModal } from "../../hooks/useModal";
import { useRecoilState } from "recoil";
import { mealTimeState } from "../../states/MealTimeState";

type Props = {
  menus: Menu[];
  mealTime: string;
};

export const DishCard: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { openModal } = useModal();
  const [_, setMealTime] = useRecoilState(mealTimeState);

  const renderSwitch = (): JSX.Element => {
    return (
      <>
        <div className="flex">
          <BsFillBrightnessAltHighFill className="mr-2" />
          <p className="text-xs">
            `あなたの
            {props.mealTime == "breakfast"
              ? "朝ごはん"
              : props.mealTime == "lunch"
              ? "昼ごはん"
              : props.mealTime == "dinner"
              ? "夜ごはん"
              : "間食"}
          </p>
        </div>
        <Link
          href={`/${router.query.userId}/${router.query.currentDate}/${props.mealTime}`}
          passHref
        >
          <a
            className="text-yellow-600 text-xs text-base-brown"
            onClick={() => {
              setMealTime(props.mealTime as MealTime);
            }}
          >
            一覧を見る
          </a>
        </Link>
      </>
    );
  };
  return (
    <div>
      <div className="m-2">
        <div className="w-full flex justify-between my-2">{renderSwitch()}</div>
        <div className="snap-x flex overflow-x-auto">
          {props.menus.map((menu: Menu) => {
            if (!menu.imgUrl) {
              return <div className="flex flex-nonebg-stone-50"></div>;
            } else {
              return (
                <div key={menu.id} className="snap-center">
                  <article className="rounded-lg border-2 w-80 h-auto mx-2">
                    <Image
                      src={menu.imgUrl}
                      alt="no image"
                      width={320}
                      height={200}
                      objectFit={"cover"}
                      className="rounded-lg"
                    />
                    <div className="border-t items-center h-10 flex justify-between px-3">
                      <p className=" text-base-dark text-sm ml-4">
                        {menu.recipeName}
                      </p>
                      <button
                        onClick={() => {
                          openModal("nutritonList");
                        }}
                      >
                        <AiFillFileText size={20} />
                      </button>
                      <Modal nutrition={menu.totalNutrition} />
                    </div>
                  </article>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
