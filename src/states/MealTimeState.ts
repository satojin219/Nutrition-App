import dayjs from "dayjs";
import { atom, selector } from "recoil";
import { CurrentDateData, MealTime } from "../shared/globalType";

export const mealTimeState = atom<MealTime>({
  key: "currentMealTimeAtom",
  default: "all",
});

export const mealTimeSelector = selector<MealTime>({
  key: "currentMealTimeSelector",
  get: ({ get }) => {
    return get(mealTimeState);
  },
  set: ({ set }, newValue) => {
    set(mealTimeState, newValue);
    return newValue;
  },
});
