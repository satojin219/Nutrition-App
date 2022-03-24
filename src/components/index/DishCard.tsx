import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { NutritionList } from "../common/NutritionList";
import { DishType } from "../../shared/globalType";
import { calSumNutrition } from "../../tools/HelpMethods";
import { BsPencilFill } from "react-icons/bs";

type Props = {
  dishArray: DishType[];
  whenMeal: string;
};

export const DishCard: React.VFC<Props> = (props) => {
  const renderSwitch = (param: string): JSX.Element => {
    switch (param) {
      case "breakfast":
        return <p className="text-xs">あなたの朝ごはん</p>;
      case "lunch":
        return <p className="text-xs">あなたの昼ごはん</p>;
      case "dinner":
        return <p className="text-xs">あなたの夜ごはん</p>;
      case "snack":
        return <p className="text-xs">あなたの間食</p>;
      default:
        return <Fragment />;
    }
  };
  // const { headerIcon } = useMemo(() => {
  //   return divideIconAndColor(props.whenMeal);
  // }, [props.whenMeal]);

  const router = useRouter();

  return (
    <div>
      <div className="m-2">
        <div className="w-full flex justify-between my-2">
          {renderSwitch(props.whenMeal)}
          <Link href="">
            <p className="text-xs text-base-brown">一覧を見る</p>
          </Link>
        </div>
        <div>
          <article className="rounded border-2 w-80 h-auto">
            <Image
              src={"/20180308-futako01-2.jpg"}
              alt="no image"
              width={320}
              height={200}
              objectFit={`cover`}
              className="rounded-t"
            />
            <div className="items-center h-10 flex">
              <p className="text-base-dark text-sm ml-4">料理名などなど</p>
            </div>
          </article>
        </div>
        {/* <div className="bg-orange-50 rounded-tr-lg rounded-b-lg shadow-md p-5 sm:p-10 container">
          {!!props.dishArray.length && (
            <div className="flex justify-end mb-3">
              <Link href={`/${router.query.currentDate}/${props.whenMeal}`}>
                <a className="hover:text-orange-700 opacity-50">
                  <BsPencilFill size={30} />
                </a>
              </Link>
            </div>
          )}
          {!!props.dishArray.length && (
            <div>
              <div className="xl:flex flex-row justify-around">
                <div className="basis-1/2 flex justify-center">
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
              <NutritionList nutrition={calSumNutrition(props.dishArray)} />
            </div>
          )} */}
        {/* // <div className="flex justify-center">
            //   <Link href={`/${router.query.currentDate}/${props.whenMeal}`}>
            //     <a className="bg-orange-500 text-white text-center p-2 rounded-full w-full">
            //       + 献立を追加する
            //     </a>
            //   </Link>
            // </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};
