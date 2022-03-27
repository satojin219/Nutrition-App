import { DishData, Menu } from "../../shared/globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isBeforeToday, isExistDate } from "../utils";

const readDishService = async (date: string): Promise<DishData> => {
  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not valid.");
  }
  const collection = db
    .collection("user")
    .doc("GZWJqh13Te0bIAk3zrlo")
    .collection(date);

  const breakfastStream = collection.doc("breakfast").get();
  const lunchStream = collection.doc("lunch").get();
  const dinnerStream = collection.doc("dinner").get();
  const snackStream = collection.doc("snack").get();
  const docs = await Promise.all([
    breakfastStream,
    lunchStream,
    dinnerStream,
    snackStream,
  ]);
  const data = {
    breakfast: (docs[0].data()?.menus as Menu[]) || [],
    lunch: (docs[1].data()?.menus as Menu[]) || [],
    dinner: (docs[2].data()?.menus as Menu[]) || [],
    snack: (docs[3].data()?.menus as Menu[]) || [],
  };
  return data;
};

export default readDishService;
