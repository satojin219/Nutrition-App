import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { NutritionList } from "../common/NutritionList";
import { Menu, Nutrition } from "globalType";
import { FoodImage } from "../editMenu/FoodImage";

type DishType = {
  title: string;
  nutrition: Nutrition;
};
type Props = {
  dishArray: DishType[];
  whenMeal: string;
};

export const DishCard: React.VFC<Props> = (props) => {
  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(props.whenMeal);
  }, [props.whenMeal]);

  const router = useRouter();
  return (
    <div className="basis-1/2">
      <div className="my-10 lg:mx-5 sm:mx-20 mx-10">
        <div className="md:w-1/4 w-1/2">
          <div
            className={`${props.whenMeal} rounded-t-lg text-white text-center p-5 text-3xl flex justify-center`}
          >
            {headerIcon}
          </div>
        </div>
        <div className="bg-orange-50 rounded-tr-lg rounded-b-lg shadow-md p-5 sm:p-10 container">
          {props.dishArray != [] ? (
            <div>
              <div className="md:flex flex-row justify-around">
                <div className="basisi-1/2 md:basis-1/3 p-3">
                  <div className="bg-stone-50">
                    <Image
                      src={"/20180308-futako01-2.jpg"}
                      className="text-center"
                      alt="No Image"
                      height={300}
                      width={500}
                      objectFit={"contain"}
                    />
                  </div>
                </div>
                <ul className="basisi-1/2 md:text-xl list-disc p-3">
                  {props.dishArray?.map((dish: DishType) => {
                    return (
                      <li
                        key={dish.title}
                        className="border-yellow-700/50 border-b-2 my-2"
                      >
                        {dish.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <NutritionList />
              {/* nutrition={props.dishArray[0].nutrition} */}
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href={`/${props.whenMeal}`}>
                <a className="bg-orange-500 text-white text-center p-2 rounded-full w-full">
                  + 献立を追加する
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
