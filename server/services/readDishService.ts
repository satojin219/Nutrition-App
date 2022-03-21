import { DishData } from "globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isBeforeToday, isExistDate } from "../utils";

const emptyDishData: DishData = {
  lunch: [],
  breakfast: [],
  dinner: [],
  snack: [],
};

const readDishService = async (date: string): Promise<DishData> => {
  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not valid.");
  }

  const stream = await db.collection("user").doc("GZWJqh13Te0bIAk3zrlo").get();
  const data = stream.data();
  return data?.dishes?.[date] || emptyDishData;
};

export default readDishService;
