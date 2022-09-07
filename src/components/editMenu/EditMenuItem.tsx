import type { NextPage } from "next";
import { NutritionList } from "../common/NutritionList";
import { EditRecipes } from "./EditRecipes";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Menu } from "../../shared/globalType";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { FoodImage } from "./FoodImage";
import { useRecoilState, useRecoilValue } from "recoil";
import { isEditedState } from "../../states/isEditedState";
import { editMenuState } from "../../states/EditMenuState";
import { SuggestFoods } from "./SuggestFoods";
import { toast } from "react-toastify";
import { authUserState } from "../../states/authUserState";
import axios from "axios";
import { mealTimeState } from "../../states/MealTimeState";
import { currentDishState } from "../../states/dishState";
import { useMenuCards } from "../../hooks/useMenuCard";
import { useDate } from "../../hooks/useDate";
import { useSWRConfig } from "swr";
import { validateEditMenu } from "../../tools/validateEditMenu";

type Props = {
  index: number;
  menu: Menu;
  removeMenuCard(id: number): void;
};
const EditMenuItem: NextPage<Props> = (props) => {
  const [_, setIsEdited] = useRecoilState(isEditedState);
  const recipeNameRef = useRef<HTMLInputElement>(null!);
  const costRef = useRef<HTMLInputElement>(null!);
  const timeRef = useRef<HTMLInputElement>(null!);
  const tipsRef = useRef<HTMLTextAreaElement>(null!);
  const [menuState, setMenuState] = useRecoilState(editMenuState);
  const { menuCards, updateMenuCards } = useMenuCards();
  const user = useRecoilValue(authUserState);
  const { currentDate } = useDate();
  const mealTime = useRecoilValue(mealTimeState);
  const dishdata = useRecoilValue(currentDishState);
  const { mutate } = useSWRConfig();
  const [isDisable, setisDisable] = useState(false);

  const handleOnSubmit = async () => {
    await axios.put(
      `/api/dish/${user?.uid}/${currentDate.format("YYYYMMDD")}`,
      {
        [mealTime]: menuCards,
      }
    );
    // ローカルのキャッシュデータを更新
    await mutate(
      `/api/dish/${user?.uid}/${currentDate.format("YYYYMMDD")}`,
      dishdata
    );
  };

  useEffect(() => {
    updateMenuCards();
    setIsEdited(true);
    setisDisable(false);
  }, [menuState]);

  useEffect(() => {
    recipeNameRef.current.value = props.menu.recipeName ?? "";
    costRef.current.value = props.menu.cost?.toString() ?? "";
    timeRef.current.value = props.menu.time?.toString() ?? "";
    tipsRef.current.value = props.menu.tips ?? "";
  }, []);

  return (
    <article className="rounded-xl border-2 w-full h-auto my-5">
      <FoodImage imgUrl={props.menu.imgUrl} isEditPage={true} />
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
          required
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
              required
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
              required
            />
            円
          </div>
        </section>

        <NutritionList nutrition={menuState.totalNutrition} isModal={false} />
        <button
          disabled={isDisable}
          className="bg-pink-400 text-white p-2 mt-5  w-full rounded-md"
          onClick={() => {
            setisDisable(true);
            setIsEdited(false);
            validateEditMenu(menuState)
              ? toast.error(validateEditMenu(menuState))
              : toast.promise(handleOnSubmit(), {
                  pending: "保存中です",
                  error: "保存に失敗しました",
                  success: "登録に成功しました！",
                });
          }}
        >
          保存する
        </button>
      </div>
    </article>
  );
};
export default EditMenuItem;
