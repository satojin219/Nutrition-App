import { DishData } from "../../shared/globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isExistDate, isBeforeToday } from "../utils";

const createDishService = async (
  date: string,
  data: DishData
): Promise<void> => {
  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not valid.");
  }

  const collection = db
    .collection("user")
    .doc("GZWJqh13Te0bIAk3zrlo")
    .collection(date);

  const breakfastMenus = data.breakfast;
  const lunchMenus = data.lunch;
  const dinnerMenus = data.dinner;
  const snackMenus = data.snack;

  await Promise.all([
    collection.doc("breakfast").set({ menus: breakfastMenus }),
    collection.doc("lunch").set({ menus: lunchMenus }),
    collection.doc("dinner").set({ menus: dinnerMenus }),
    collection.doc("snack").set({ menus: snackMenus }),
  ]);
};

export default createDishService;
