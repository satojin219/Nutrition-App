import { useState } from "react";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import Router from "next/router";
import { useRouter } from "next/router";
export const useDate = (queryParameter: string) => {
  queryParameter =
    queryParameter.substring(0, 4) +
    "-" +
    queryParameter.substring(4, 6) +
    "-" +
    queryParameter.substring(6, 8);
  dayjs.locale(ja);
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(
    dayjs(queryParameter)
  );
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
    setCurrentDate(nextDay);
    Router.push(`/${router.query.userId}/${nextDay.format("YYYYMMDD")}`);
  };
  const subtractOneDay = () => {
    const lastDay = currentDate.subtract(1, "d");
    setCurrentDate(lastDay);
    Router.push(`/${router.query.userId}/${lastDay.format("YYYYMMDD")}`);
  };

  return { currentDate, addOneDay, subtractOneDay };
};
