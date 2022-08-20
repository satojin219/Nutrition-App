import { initialNutrition } from "./../tools/dummyMenu";
import { useEffect, useState } from "react";
import { mealTimeState } from "./../states/MealTimeState";
import { currentDishSelector, currentDishState } from "./../states/dishState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Menu } from "../shared/globalType";
import { addElement, removeElemnt } from "../tools/HelpMethods";
import { editMenuState } from "../states/EditMenuState";
import Router from "next/router";

export const useMenuCards = () => {
  const [dishData, setDishData] = useRecoilState(currentDishState);
  const [menuCards, setMenuCards] = useState<Menu[]>(
    useRecoilValue(currentDishSelector)
  );
  const setEditMenuCard = useSetRecoilState(editMenuState);

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
    let copyArray = [...menuCards];

    const uniqeID: number = new Date().getTime();
    const newMenu: Menu = { id: uniqeID, totalNutrition: initialNutrition };

    copyArray.push(newMenu);
    setEditMenuCard(newMenu);
    setMenuCards(copyArray);
    updateDishData(copyArray);
    Router.push(
      `/${Router.query.userId}/${Router.query.currentDate}/${mealTime}/${
        copyArray[copyArray.length - 1].id
      }`
    );
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

  // useEffect(() => {
  //   updateDishData(menuCards);
  // }, [menuCards]);

  return { menuCards, addMenuCard, removeMenuCard, updateMenuCard };
};
