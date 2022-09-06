import { Menu } from "../shared/globalType";
import { initialNutrition } from "./dummyMenu";

export const validateEditMenu = (editMenu: Menu) => {
  let errorMessage = "";
  if (editMenu.recipeName === "") errorMessage = "料理名を入力して下さい";
  else if (editMenu.totalNutrition == initialNutrition)
    errorMessage = "使用した食材名、重量を入力して下さい";
  else if (editMenu.recipes![0].content === "")
    errorMessage = "調理手順を入力して下さい";
  else if (!editMenu.cost || editMenu.cost === 0)
    errorMessage = "費用を入力して下さい";
  else if (!editMenu.time || editMenu.time === 0)
    errorMessage = "調理時間を入力して下さい";

  return errorMessage;
};
