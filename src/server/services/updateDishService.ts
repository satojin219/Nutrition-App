import { Menu } from "../../shared/globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isBeforeToday, isExistDate } from "../utils";

const updateDishService = async (
  date: string,
  userId: string,
  whenDish: string,
  menus: Menu[]
): Promise<Menu[]> => {
  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not valid.");
  }
  const menuField = db
    .collection("user")
    .doc(userId)
    .collection(date)
    .doc(whenDish);

  await menuField.update({
    menus: menus,
  });

  return menus;
};

export default updateDishService;
