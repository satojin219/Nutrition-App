import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { NutritionList } from "../common/NutritionList";
import { Menu } from "../../shared/globalType";
import { calSumNutrition } from "../../tools/HelpMethods";
import { BsPencilFill } from "react-icons/bs";
import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { AiFillFileText } from "react-icons/ai";
import { IsModalShowContext } from "../../pages/_app";
import { useContext } from "react";
import { Modal } from "../common/Modal";

type Props = {
  menus: Menu[];
  whenMeal: string;
};

export const DishCard: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { openModal } = useContext(IsModalShowContext);

  const renderSwitch = (param: string): JSX.Element => {
    switch (param) {
      case "breakfast":
        return (
          <>
            <div className="flex">
              <BsFillBrightnessAltHighFill className="mr-2" />
              <p className="text-xs">あなたの朝ごはん</p>
            </div>
            <Link
              href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
              passHref
            >
              <p className="text-yellow-600 text-xs text-base-brown">
                一覧を見る
              </p>
            </Link>
          </>
        );
      case "lunch":
        return (
          <>
            <div className="flex">
              <BsFillSunFill className="mr-2" />
              <p className="text-xs">あなたの昼ごはん</p>
            </div>
            <Link
              href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
              passHref
            >
              <p className="text-yellow-600 text-xs text-base-brown">
                一覧を見る
              </p>
            </Link>
          </>
        );
      case "dinner":
        return (
          <>
            <div className="flex">
              <BsFillMoonFill className="mr-2" />
              <p className="text-xs">あなたの夜ごはん</p>
            </div>
            <Link
              href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
              passHref
            >
              <p className="text-yellow-600 text-xs text-base-brown">
                一覧を見る
              </p>
            </Link>
          </>
        );
      case "snack":
        return (
          <>
            <div className="flex">
              <MdFastfood className="mr-2" />
              <p className="text-xs">あなたの間食</p>
            </div>
            <Link
              href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
              passHref
            >
              <p className="text-yellow-600 text-xs text-base-brown">
                一覧を見る
              </p>
            </Link>
          </>
        );
      default:
        return <Fragment />;
    }
  };
  return (
    <div>
      <div className="m-2">
        <div className="w-full flex justify-between my-2">
          {renderSwitch(props.whenMeal)}
        </div>
        <div className="snap-x flex overflow-x-auto">
          {props.menus.map((menu: Menu) => {
            if (!menu.imgUrl) {
              return <div className="flex flex-nonebg-stone-50"></div>;
            } else {
              return (
                <div className="snap-center">
                  <article
                    key={menu.id}
                    className="centerrounded border-2 w-80 h-auto mx-2"
                  >
                    <Image
                      src={menu.imgUrl}
                      alt="no image"
                      width={320}
                      height={200}
                      objectFit={"cover"}
                      className="rounded-t"
                    />
                    <div className="items-center h-10 flex justify-between px-3">
                      <p className="text-base-dark text-sm ml-4">
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

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useMemo } from "react";
// import { divideIconAndColor } from "../../tools/HelpComponents";
// import { NutritionList } from "../common/NutritionList";
// import { Menu } from "../../shared/globalType";
// import { calSumNutrition } from "../../tools/HelpMethods";
// import { BsPencilFill } from "react-icons/bs";

// type Props = {
//   menus: Menu[];
//   whenMeal: string;
// };

// export const DishCard: React.VFC<Props> = (props) => {
//   const { headerIcon } = useMemo(() => {
//     return divideIconAndColor(props.whenMeal);
//   }, [props.whenMeal]);

//   const router = useRouter();
//   return (
//     <div className="basis-1/2">
//       <div className="my-10 lg:mx-5 sm:mx-20 mx-10">
//         <div className="md:w-1/4 w-1/2">
//           <div
//             className={`${props.whenMeal} rounded-t-lg text-white text-center p-5 text-3xl flex justify-center`}
//           >
//             {headerIcon}
//           </div>
//         </div>
//         <div className="bg-orange-50 rounded-tr-lg rounded-b-lg shadow-md p-5 sm:p-10 container">
//           {props.menus.length != 0 ? (
//             <div className="flex justify-end mb-3">
//               <Link
//                 href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
//               >
//                 <a className="hover:text-orange-700 opacity-50">
//                   <BsPencilFill size={30} />
//                 </a>
//               </Link>
//             </div>
//           ) : null}
//           {props.menus.length != 0 ? (
//             <div>
//               <div className="xl:flex flex-row justify-around">
//                 <div className="basis-1/2  flex justify-center">
//                   <div className="w-48 sm:w-64 md:w-80 snap-mandatory snap-x flex justify-between  flex-nowrap overflow-x-scroll">
//                     {props.menus.map((menu: Menu) => {
//                       if (!menu.imgUrl)
//                         return (
//                           <div className="snap-center flex flex-none  bg-stone-50"></div>
//                         );
//                       else
//                         return (
//                           <div className="snap-center flex flex-none  bg-stone-50">
//                             <Image
//                               src={menu.imgUrl}
//                               alt="No Image"
//                               height={200}
//                               width={400}
//                               objectFit={"contain"}
//                             />
//                           </div>
//                         );
//                     })}
//                   </div>
//                 </div>
//                 <ul className="basisi-1/2 md:text-xl p-3">
//                   {props.menus?.map((dish: Menu) => {
//                     return (
//                       <li
//                         key={dish.recipeName}
//                         className="border-yellow-700/50 border-b-2 my-2"
//                       >
//                         {dish.recipeName}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//               <NutritionList
//                 nutrition={calSumNutrition(
//                   props.menus.map((menu: Menu) => menu.totalNutrition)
//                 )}
//               />
//             </div>
//           ) : (
//             <div className="flex justify-center">
//               <Link
//                 href={`/${router.query.userId}/${router.query.currentDate}/${props.whenMeal}`}
//               >
//                 <a className="bg-orange-500 text-white text-center p-2 rounded-full w-full">
//                   + 献立を追加する
//                 </a>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
