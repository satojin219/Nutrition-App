import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Foodstuff, Menu, RecipeType } from "../../shared/globalType";
import { LinkButton } from "../common/Button";
import { Recipe } from "./Recipe";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { NutritionList } from "../common/NutritionList";
import { useSetRecoilState } from "recoil";
import { editMenuState } from "../../states/EditMenuState";
type Props = {
  menu: Menu;
  index: number;
};
const MenuItem: NextPage<Props> = (props) => {
  const router = useRouter();
  const { whenMeal } = router.query;
  const [open, setOpen] = useState(false);
  const setMenuCard = useSetRecoilState(editMenuState);
  const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };
  const renderSwitchImage = (): JSX.Element => {
    if (props.menu.imgUrl) {
      return (
        <Image
          src={props.menu.imgUrl}
          alt="no image"
          width={380}
          height={240}
          layout="responsive"
          objectFit="cover"
          className="rounded-t"
        />
      );
    } else {
      return (
        <Image
          src="/public/m_e_others_501.png"
          alt="no image"
          width={380}
          height={240}
          layout="responsive"
          objectFit="cover"
          className="rounded-t"
        />
      );
    }
  };
  if (Object.keys(props.menu).length == 1) return <div></div>;
  return (
    <article className="rounded-xl border-2 w-full h-auto my-5">
      {renderSwitchImage()}
      <div className="border-t-2 items-center h-16 flex justify-between">
        <p className=" text-base-dark text-xl ml-4">{props.menu.recipeName}</p>
        <button onClick={(e) => onToggle(e)} className="mr-4">
          {open ? <FaAngleUp size={25} /> : <FaAngleDown size={25} />}
        </button>
      </div>
      <details open={open}>
        <summary className="hidden"></summary>
        <hr />
        <div className="p-5">
          <section>
            <p className="mt-4">
              食材リスト
              <span className="text-red-500 font-bold">（1人前）</span>
            </p>
            <ul>
              {props.menu.foodstuffs?.map((foodstuff: Foodstuff) => {
                return (
                  <li
                    key={foodstuff.id}
                    className="text-sm border-2 rounded-md p-1 my-1 flex justify-between"
                  >
                    <p>{foodstuff.name}</p>
                    <p className="mr-5">({foodstuff.weight}g)</p>
                  </li>
                );
              })}
            </ul>
          </section>
          <section>
            <p className="mt-4">レシピ</p>
            {props.menu.recipes?.map((recipe: RecipeType, index: number) => {
              return <Recipe key={recipe.id} recipe={recipe} index={index} />;
            })}
          </section>
          <section className="flex justify-around">
            <div>
              <p>調理時間</p>
              <input
                disabled
                type="text"
                value={props.menu.time + " 分"}
                className="text-right border-2 rounded-sm p-1"
                size={15}
              />
            </div>
            <div>
              <p>費用</p>
              <input
                disabled
                type="text"
                value={props.menu.cost + " 円"}
                className="text-right border-2 rounded-sm p-1"
                size={15}
              />
            </div>
          </section>
          <NutritionList
            nutrition={props.menu.totalNutrition}
            isModal={false}
          />
          <button
            className="bg-orange-500 text-white p-2 mt-5  w-full rounded-md"
            onClick={() => {
              setMenuCard(props.menu);
              router.push(
                `/${router.query.userId}/${router.query.currentDate}/${whenMeal}/${props.menu.id}`
              );
            }}
          >
            料理を編集する
          </button>
        </div>
      </details>
    </article>
  );
};
export default MenuItem;
