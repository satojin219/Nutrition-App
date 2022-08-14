import {
  currentDateSelector,
  currentDateState,
} from "./../states/currentDateState";
import dayjs from "dayjs";
import Router from "next/router";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";

export const useDate = () => {
  const [_, setCurrentDateFormat] = useRecoilState(currentDateState);
  const currentDate = useRecoilValue(currentDateSelector);

  const router = useRouter();
  const addOneDay = () => {
    // 未来の日付に進もうとしたら実行を強制終了
    if (
      currentDate.add(1, "d").year() &&
      dayjs().add(1, "d").month() == currentDate.add(1, "d").month() &&
      dayjs().add(1, "d").date() == currentDate.add(1, "d").date()
    )
      return;
    const nextDay = currentDate.add(1, "d");
    setCurrentDateFormat(nextDay.format("YYYYMMDD"));
    Router.push(`/${router.query.userId}/${nextDay.format("YYYYMMDD")}`);
  };
  const subtractOneDay = () => {
    const lastDay = currentDate.subtract(1, "d");
    setCurrentDateFormat(lastDay.format("YYYYMMDD"));
    Router.push(`/${router.query.userId}/${lastDay.format("YYYYMMDD")}`);
  };
  const changeDate = (queryParameter: string) => {
    setCurrentDateFormat(queryParameter);
  };

  return { currentDate, addOneDay, subtractOneDay, changeDate };
};
