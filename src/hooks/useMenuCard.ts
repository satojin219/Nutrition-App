import { DishData } from "./../shared/globalType";
import { currentDateSelector } from "./../states/currentDateState";
import { useEffect, useState } from "react";
import { mealTimeSelector, mealTimeState } from "./../states/MealTimeState";
import { currentDishSelector, currentDishState } from "./../states/dishState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Menu } from "../shared/globalType";
import { addElement, removeElemnt } from "../tools/HelpMethods";

export const useMenuCards = () => {
  const [dishData, setDishData] = useRecoilState(currentDishState);
  const [menuCards, setMenuCards] = useState<Menu[]>(
    useRecoilValue(currentDishSelector)
  );
  const mealTime = useRecoilValue(mealTimeState);

  const updateDishData = (newDishData: Menu[]) => {
    switch (mealTime) {
      case "breakfast":
        setDishData({
          ...dishData,
          breakfast: newDishData,
        });
      case "breakfast":
        setDishData({
          ...dishData,
          lunch: newDishData,
        });
      case "breakfast":
        setDishData({
          ...dishData,
          dinner: newDishData,
        });
      default:
        setDishData({
          ...dishData,
          snack: newDishData,
        });
    }
  };
  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };

  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  const updateMenuCard = (index: number, data: any, dataType: any) => {
    const copyMenuCard = [...menuCards];
    if (dataType == "recipeName") copyMenuCard[index].recipeName = data;
    if (dataType == "imgUrl") copyMenuCard[index].imgUrl = data;
    if (dataType == "foodstuffs") copyMenuCard[index].foodstuffs = data;
    if (dataType == "recipes") copyMenuCard[index].recipes = data;
    if (dataType == "tips") copyMenuCard[index].tips = data;
    if (dataType == "cost") copyMenuCard[index].cost = data;
    if (dataType == "time") copyMenuCard[index].time = data;
    if (dataType == "totalNutrition") copyMenuCard[index].totalNutrition = data;

    setMenuCards(copyMenuCard);
  };

  useEffect(() => {
    updateDishData(menuCards);
  }, [menuCards]);

  return { menuCards, addMenuCard, removeMenuCard, updateMenuCard };
};
