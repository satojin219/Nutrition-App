import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { NutritionList } from "../common/NutritionList";
import { Menu } from "../../shared/globalType";
import { calSumNutrition } from "../../tools/HelpMethods";
import { BsPencilFill } from "react-icons/bs";

type Props = {
  menus: Menu[];
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
          {props.menus.length != 0 ? (
            <div className="flex justify-end mb-3">
              <Link href={`/${router.query.currentDate}/${props.whenMeal}`}>
                <a className="hover:text-orange-700 opacity-50">
                  <BsPencilFill size={30} />
                </a>
              </Link>
            </div>
          ) : null}
          {props.menus.length != 0 ? (
            <div>
              <div className="xl:flex flex-row justify-around">
                <div className="basis-1/2  flex justify-center">
                  <div className="w-48 sm:w-64 md:w-80 snap-mandatory snap-x flex justify-between  flex-nowrap overflow-x-scroll">
                    <div className="snap-center flex flex-none  bg-stone-50">
                      <Image
                        src={"/20180308-futako01-2.jpg"}
                        alt="No Image"
                        height={200}
                        width={400}
                        objectFit={"contain"}
                      />
                    </div>
                    <div className="snap-center flex flex-none  bg-stone-50">
                      <Image
                        src={"/sp_detail_main_PS_KCF_1585M.jpg"}
                        alt="No Image"
                        height={200}
                        width={400}
                        objectFit={"contain"}
                      />
                    </div>
                    <div className="snap-center flex flex-none  bg-stone-50">
                      <Image
                        src={"/709186.jpg"}
                        alt="No Image"
                        height={200}
                        width={400}
                        objectFit={"contain"}
                      />
                    </div>
                  </div>
                </div>
                <ul className="basisi-1/2 md:text-xl p-3">
                  {props.menus?.map((dish: Menu) => {
                    return (
                      <li
                        key={dish.recipeName}
                        className="border-yellow-700/50 border-b-2 my-2"
                      >
                        {dish.recipeName}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <NutritionList
                nutrition={calSumNutrition(
                  props.menus.map((menu) => menu.totalNutrition)
                )}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Link href={`/${router.query.currentDate}/${props.whenMeal}`}>
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
