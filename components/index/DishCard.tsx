import React from "react";
import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { NutritionList } from "../common/NutritionList";
import { Nutrition } from "globalType";

// ShowNutritionListに試しにpropsを渡す。ローカルストレージにあったものをコピペしたのでアルファベット順に慣れんでいますが、試作という事で今は目を瞑ってください
type DishType = {
  title: string;
  nutrition: Nutrition;
};
type Props = {
  dishArray: DishType[];
};

export const DishCard: React.VFC<Props> = (props) => {
  return (
    <div className="lg:flex flex-wrap">
      <div className="basis-1/2">
        <div className="my-10 lg:mx-5 sm:mx-20 mx-10">
          <div className="md:w-1/4 w-1/2">
            <div className="bg-red-500 rounded-t-lg text-white text-center p-5 text-3xl flex justify-center">
              <BsFillBrightnessAltHighFill size={40} className="mr-2" />
              <p>朝食</p>
            </div>
          </div>
          <div className="bg-orange-50 rounded-tr-lg rounded-b-lg shadow-md p-5 sm:p-10 container">
            <div className="md:flex flex-row justify-around">
              <div className="basisi-1/2 md:basis-1/3 p-3">
                <img src="/sp_detail_main_PS_KCF_1585M.jpg" alt="" />
              </div>
              <ul className="basisi-1/2 md:text-xl list-disc p-3">
                {props.dishArray.map((dish: DishType) => {
                  return (
                    <li
                      key={dish.title}
                      className="border-yellow-700/50    border-b-2 my-2"
                    >
                      {dish.title}
                    </li>
                  );
                })}
              </ul>
            </div>
            <NutritionList nutrition={props.dishArray[0].nutrition} />
          </div>
        </div>
      </div>
    </div>
  );
};
