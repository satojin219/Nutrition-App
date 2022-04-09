import dayjs from "dayjs";
import { DishData } from "../shared/globalType";
import { db } from "./firebase";

export const isExistDate = (text: string): boolean => {
  const formatText = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return formatText === text;
};
export const isBeforeToday = (text: string): boolean => {
  const today = dayjs().format("YYYYMMDD");
  const requestedDate = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return parseInt(requestedDate) <= parseInt(today);
};
export const isAlreadyEditedDishData = (data: DishData) => {
  if (!data) return false;
};

export const checkBlankDishData = (dishDate: DishData) => {
  return (
    dishDate.breakfast.length == 0 &&
    dishDate.lunch.length == 0 &&
    dishDate.dinner.length == 0 &&
    dishDate.snack.length == 0
  );
};
/**
 * バイナリファイルをBase64エンコードする。
 */
export const changeImageToBase64 = (
  file: File
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = (event) => {
      resolve(event.target?.result as string); //FIXME
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
};
