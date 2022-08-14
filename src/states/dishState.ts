import { BiTimeFive } from "react-icons/bi";
import { atom, selector } from "recoil";
import { fetchDishData } from "../schema/fetchDishData";
import { DishData, Menu } from "../shared/globalType";
import { mealTimeState } from "./MealTimeState";

const initaldata: DishData = {
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
};
export const currentDishState = atom<DishData>({
  key: "currentDishAtom",
  default: initaldata,
});

export const currentDishSelector = selector<Menu[]>({
  key: "currentMeal",
  get: ({ get }) => {
    const dishData = get(currentDishState);
    const mealTime = get(mealTimeState);
    switch (mealTime) {
      case "breakfast":
        return dishData.breakfast;
      case "lunch":
        return dishData.lunch;
      case "dinner":
        return dishData.dinner;
      default:
        return dishData.snack;
    }
  },
});
