import { initialNutrition } from "../tools/dummyMenu";
import { atom } from "recoil";
import { Menu } from "../shared/globalType";

export const editMenuState = atom<Menu>({
  key: "MenuAtom",
  default: {
    id: 0,
    totalNutrition: initialNutrition,
  },
});
