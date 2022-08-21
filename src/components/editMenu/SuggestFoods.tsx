import React, { useState, useCallback, useEffect } from "react";
import { Foodstuff } from "../../shared/globalType";
import { useRecoilState } from "recoil";
import { SuggestFood } from "./SuggestFood";
import {
  addElement,
  calSumNutritionFromFoodstuff,
  removeElemnt,
} from "../../tools/HelpMethods";
import { editMenuState } from "../../states/EditMenuState";

type Props = {
  foodstuffs: Foodstuff[];
};

export const SuggestFoods: React.VFC<Props> = (props) => {
  const [foodstuffs, setFoodstuff] = useState<Foodstuff[]>(
    props.foodstuffs ?? []
  );
  const [menuState, setMenuState] = useRecoilState(editMenuState);

  const addFoodstuff = useCallback(() => {
    addElement(props.foodstuffs, setFoodstuff);
  }, [props.foodstuffs]);

  const removeFoodstuff = (index: number) => {
    removeElemnt(props.foodstuffs, setFoodstuff, index);
  };

  const updateFoodstuff = (data: Foodstuff) => {
    let copyFoodstuffs = [...foodstuffs];
    copyFoodstuffs.map((copyFoodstuff: Foodstuff, index: number) => {
      if (copyFoodstuff.id == data.id) {
        copyFoodstuffs[index] = data;
      }
    });
    setFoodstuff(copyFoodstuffs);
  };

  useEffect(() => {
    if (!props.foodstuffs || props.foodstuffs.length == 0) addFoodstuff();
    setMenuState({
      ...menuState,
      foodstuffs: foodstuffs,
      totalNutrition: calSumNutritionFromFoodstuff(foodstuffs)!,
    });
  }, [props.foodstuffs, foodstuffs]);

  return (
    <section>
      <div className="flex justify-between">
        <p>
          食材リスト
          <span className="text-red-500 font-bold">（1人前）</span>
        </p>
        <button
          className="text-yellow-600 text-sm text-base-brown"
          onClick={addFoodstuff}
        >
          食材を追加する
        </button>
      </div>
      <ul>
        {foodstuffs?.map((foodstuff: Foodstuff, index: number) => {
          return (
            <li
              key={foodstuff.id}
              className="text-sm border-2 rounded-md p-1 my-1 flex justify-between"
            >
              <SuggestFood
                foodstuff={foodstuff}
                index={index}
                removeFoodstuff={removeFoodstuff}
                updateFoodstuff={updateFoodstuff}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
