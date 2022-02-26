import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { NutritionList } from "../common/NutritionList";
import { Meal, Menu, Nutrition } from "globalType";

type Props = {
  meal: Meal;
};

export const DishCard: React.VFC<Props> = (props) => {
  const  {headerIcon} = useMemo(() => {
    return divideIconAndColor(props.meal.whenMeal);
  }, [props.meal.whenMeal]);

  const router = useRouter();
  return (
    <div className="basis-1/2">
      <div className=" my-10 lg:mx-5 sm:mx-20 mx-10">
        <div className="md:w-1/4 w-1/2">
          <div className={`${props.meal.whenMeal} rounded-t-lg text-white text-center p-5 text-3xl flex justify-center`}>{headerIcon}</div>
        </div>
        <div className="bg-orange-50  rounded-tr-lg rounded-b-lg shadow-md  p-5 sm:p-10 container">
          {props.meal.menus == [] ? (
            <div>
              <div className=" md:flex flex-row justify-around">
                <div className="basisi-1/2 md:basis-1/3 p-3">
                  <img src="/sp_detail_main_PS_KCF_1585M.jpg" alt="" />
                </div>
                <ul className="basisi-1/2 md:text-xl list-disc p-3">
                  {props.meal.menus?.map((menu: Menu) => {
                    <li
                      key={menu.recipeName}
                      className="border-yellow-700/50 border-b-2  my-2"
                    >
                      {menu.recipeName}
                    </li>;
                  })}
                </ul>
              </div>
              <NutritionList nutrition={props.meal.mealTotalNutrition} />
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href={`/${props.meal.whenMeal}`}>
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
