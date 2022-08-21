import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { NutritionList } from "../common/NutritionList";
import { EditRecipes } from "./EditRecipes";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import {
  Menu,
  RecipeType,
  Foodstuff,
  Nutrition,
} from "../../shared/globalType";
import { useRef } from "react";
import { useEffect } from "react";
import {
  addElement,
  removeElemnt,
  calSumNutritionFromFoodstuff,
} from "../../tools/HelpMethods";
import { dummyMenu, initialNutrition } from "../../tools/dummyMenu";
import { FoodImage } from "./FoodImage";
import { SuggestFood } from "./SuggestFood";
import { useRecoilState } from "recoil";
import { isEditedState } from "../../states/isEditedState";
import { editMenuState } from "../../states/EditMenuState";
import { SuggestFoods } from "./SuggestFoods";

type Props = {
  index: number;
  menu: Menu;
  removeMenuCard(id: number): void;
  updateMenuCard(index: number, data: any, dataType: any): void;
  handleOnSubmit(): void;
};
const EditMenuItem: NextPage<Props> = (props) => {
  const router = useRouter();
  const { whenMeal } = router.query;
  const [_, setIsEdited] = useRecoilState(isEditedState);
  const recipeNameRef = useRef<HTMLInputElement>(null!);
  const costRef = useRef<HTMLInputElement>(null!);
  const timeRef = useRef<HTMLInputElement>(null!);
  const tipsRef = useRef<HTMLTextAreaElement>(null!);

  const [menuState, setMenuState] = useRecoilState(editMenuState);

  const onImageChange = (imageUrl: string) => {
    // ここでmenuに差し込むと良さそう
    props.updateMenuCard(props.index, imageUrl, "imgUrl");
    setIsEdited(true);
    console.log("imageuUrl", imageUrl);
  };

  useEffect(() => {
    recipeNameRef.current.value = props.menu.recipeName ?? "";
    costRef.current.value = props.menu.cost?.toString() ?? "";
    timeRef.current.value = props.menu.time?.toString() ?? "";
    tipsRef.current.value = props.menu.tips ?? "";
  }, []);

  useEffect(() => {
    console.log(menuState);
  }, [menuState]);

  const renderSwitchImage = (): JSX.Element => {
    if (props.menu.imgUrl) {
      return <FoodImage menu={props.menu} onImageUrlChange={onImageChange} />;
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
  return (
    <article className="rounded-xl border-2 w-full h-auto my-5">
      {renderSwitchImage()}
      <div className="border-t-2 items-center h-16 flex justify-between">
        <input
          ref={recipeNameRef}
          className="text- sm:text-xl appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="料理名を入力して下さい"
          aria-label="Full name"
          onBlur={() => {
            setMenuState({
              ...menuState,
              recipeName: recipeNameRef?.current.value,
            });
          }}
          onChange={() => {
            setIsEdited(true);
          }}
        />
      </div>

      <div className="p-5">
        <SuggestFoods foodstuffs={props.menu.foodstuffs ?? []} />

        <section>
          <p className="mt-4">レシピ</p>
          <EditRecipes recipes={props.menu.recipes ?? []} />
        </section>
        <section>
          <p className="text-left mt-4 flex items-center">
            <AiOutlineExclamationCircle size={30} /> コツ・ポイント
          </p>
          <div className="text-right items-center border-b-2 border-yellow-700/50 py-2">
            <textarea
              ref={tipsRef}
              className="text-sm appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              aria-label="Full name"
              onBlur={() => {
                setMenuState({
                  ...menuState,
                  tips: tipsRef?.current.value,
                });
              }}
              onChange={() => {
                setIsEdited(true);
              }}
            />
          </div>
        </section>

        <section className="flex justify-around mt-4">
          <div>
            <p>調理時間</p>
            <input
              ref={timeRef}
              type="text"
              className="text-right border-2 rounded-sm p-1"
              size={15}
              onBlur={() => {
                setMenuState({
                  ...menuState,
                  time: Number(timeRef?.current.value),
                });
              }}
            />
            分
          </div>
          <div>
            <p>費用</p>
            <input
              ref={costRef}
              type="text"
              className="text-right border-2 rounded-sm p-1"
              size={15}
              onBlur={() => {
                setMenuState({
                  ...menuState,
                  cost: Number(costRef?.current.value),
                });
              }}
            />
            円
          </div>
        </section>

        <NutritionList nutrition={menuState.totalNutrition} isModal={false} />
        <button
          className="bg-pink-400 text-white p-2 mt-5  w-full rounded-md"
          onClick={() => {
            props.handleOnSubmit();
            setIsEdited(false);
          }}
        >
          保存する
        </button>
      </div>
    </article>
  );
};
export default EditMenuItem;
