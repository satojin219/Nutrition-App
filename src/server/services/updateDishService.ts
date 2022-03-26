import { DishData, Menu } from "../../shared/globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isBeforeToday, isExistDate } from "../utils";
import firebase from "firebase/compat/app";

const updateDishService = async (
  date: string,
  whenDish: string,
  menu: Menu
): Promise<Menu> => {
  if (!isExistDate(date) || !isBeforeToday(date)) {
    throw new MyAppError("Parameter date is not valid.");
  }
  (Object.keys(menu) as (keyof Menu)[]).map((key: keyof Menu) => {
    menu[key]?.toString();
  });

  const menuField = db
    .collection("user")
    .doc("GZWJqh13Te0bIAk3zrlo")
    .collection(date)
    .doc(whenDish);

  await menuField.update({
    menus: firebase.firestore.FieldValue.arrayUnion(menu),
  });
  return menu;
};

export default updateDishService;
