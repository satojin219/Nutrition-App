import { DishCard } from "./../../Nutrition-App/components/DishCard";
import { DishData } from "./../shared/globalType";
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
  const [dishCard, setDishCard] = useRecoilState(currentDishState);
  const [menuCards, setMenuCards] = useRecoilState(currentDishSelector);
  const [editMenuCard, setEditMenuCard] = useRecoilState(editMenuState);
  const mealTime = useRecoilValue(mealTimeState);

  const addMenuCard = () => {
    let copyArray = [...menuCards];

    const uniqeID: number = new Date().getTime();
    const newMenu: Menu = { id: uniqeID, totalNutrition: initialNutrition };

    copyArray.push(newMenu);
    Router.push(
      `/${Router.query.userId}/${Router.query.currentDate}/${mealTime}/${
        copyArray[copyArray.length - 1].id
      }`
    );
    setEditMenuCard(newMenu);
    setMenuCards(copyArray);
  };

  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  const updateMenuCards = () => {
    const copyMenuCards = [...menuCards];
    const index = copyMenuCards.findIndex(
      (copyMenuCard) => copyMenuCard.id === editMenuCard.id
    );
    copyMenuCards.splice(index, 1, editMenuCard);
    setMenuCards(copyMenuCards);
    setDishCard({ ...dishCard, [mealTime]: copyMenuCards });
  };

  return { menuCards, addMenuCard, removeMenuCard, updateMenuCards };
};
