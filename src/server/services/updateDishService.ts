import { Menu } from "../../shared/globalType";
import MyAppError from "../customError";
import { db } from "../firebase";
import { isBeforeToday, isExistDate } from "../utils";

const updateDishService = async (
  date: string,
  whenDish: string,
  menu: Menu
): Promise<Menu> => {
  const admin = require("firebase-admin");
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
    menus: admin.firestore.FieldValue.arrayUnion(menu),
  });
  return menu;
};

export default updateDishService;
