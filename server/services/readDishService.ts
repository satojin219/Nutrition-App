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

const readDishService = async (date: string | string[]): Promise<DishData> => {
  if (typeof date !== "string") {
    throw new MyAppError("Parameter date must be string");
  }

  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not exist.");
  }

  const stream = await db.collection("user").doc("GZWJqh13Te0bIAk3zrlo").get();
  const data = stream.data();
  return data?.dishes?.[date] || emptyDishData;
};

export default readDishService;
