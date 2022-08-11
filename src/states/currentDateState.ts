import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { atom, selector } from "recoil";
import { json } from "stream/consumers";
import { CurrentDateData } from "../shared/globalType";

export const currentDateState = atom<string>({
  key: "currentDateAtom",
  default: dayjs().format("YYYYMMDD"),
});

export const currentDateSelector = selector({
  key: "dayJsDate",
  get: ({ get }) => {
    let currentDateFormat = get(currentDateState);
    currentDateFormat =
      currentDateFormat.substring(0, 4) +
      "-" +
      currentDateFormat.substring(4, 6) +
      "-" +
      currentDateFormat.substring(6, 8);
    dayjs.locale(ja);
    return dayjs(currentDateFormat);
  },
});
