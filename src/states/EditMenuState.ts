import { RecipeType, Foodstuff } from "../shared/globalType";

import { initialNutrition } from "../tools/dummyMenu";
import { atom, atomFamily, selectorFamily, useRecoilValue } from "recoil";
import { Menu } from "../shared/globalType";

type ID = number;

export const editMenuState = atomFamily<Menu, ID>({
  key: "MenuAtom",
  default: selectorFamily({
    key: "MenuSelector",
    get: (id) => () => {
      const recipeName = useRecoilValue(recipeNameState);
      const imgUrl = useRecoilValue(imgUrlState);
      const foodstuffs = useRecoilValue(foodstuffsState);
      const recipes = useRecoilValue(recipeState);
      const tips = useRecoilValue(tipsState);
      const cost = useRecoilValue(costState);
      const time = useRecoilValue(timeState);

      return {
        id: id,
        totalNutrition: initialNutrition,
        recipeName: recipeName,
        imgUrl: imgUrl,
        foodstuffs: foodstuffs,
        recipes: recipes,
        tips: tips,
        cost: cost,
        time: time,
      };
    },
  }),
});

export const recipeNameState = atom<string>({
  key: "recipeNameAtom",
  default: "",
});

export const imgUrlState = atom<string>({
  key: "imgUrlAtom",
  default: "",
});

export const foodstuffsState = atom<Foodstuff[]>({
  key: "foodstuffAtom",
  default: [],
});

export const tipsState = atom<string>({
  key: "tipsAtom",
  default: "",
});

export const costState = atom<number>({
  key: "costAtom",
  default: 0,
});

export const timeState = atom<number>({
  key: "timeAtom",
  default: 0,
});

export const recipeState = atom<RecipeType[]>({
  key: "recipeAtom",
  default: [],
});
