import dayjs from "dayjs";
import { useMemo } from "react";
import { DateType } from "../shared/globalType";

type datejsDateType = DateType & {
  type: string;
};

export const useCalendar = (currentDate: dayjs.Dayjs) => {
  const lastMonthDates: datejsDateType[] = useMemo(() => {
    let lastMonthDates = [];
    const lastOrThisyear = currentDate.subtract(1, "month").year();
    const lastMonth = currentDate.subtract(1, "month").month() + 1;
    const lastDay = currentDate.subtract(1, "month").day();
    for (
      let startWeekday = currentDate.startOf("month").get("day");
      startWeekday > 0;
      startWeekday--
    ) {
      const lastDate =
        currentDate.startOf("month").add(-1, "day").get("date") -
        startWeekday +
        1;
      const lastMonthDate: datejsDateType = {
        year: lastOrThisyear,
        month: lastMonth,
        date: lastDate,
        day: lastDay,
        type: "last",
      };
      lastMonthDates.push(lastMonthDate);
    }
    return lastMonthDates;
  }, [currentDate]);

  const thisMonthDates: datejsDateType[] = useMemo(() => {
    let thisMonthDates = [];
    for (let date = 1; date <= currentDate.endOf("month").get("date"); date++) {
      const current = currentDate.set("date", date);
      const weekday: number = current.get("day");
      const currentMonthDate: datejsDateType = {
        year: currentDate.year(),
        month: currentDate.month() + 1,
        date: date,
        day: weekday,
        type: "current",
      };
      thisMonthDates.push(currentMonthDate);
    }
    return thisMonthDates;
  }, [currentDate]);

  const nextMonthDates: datejsDateType[] = useMemo(() => {
    let nextMonthDates = [];
    const nextOrThisyear = currentDate.add(1, "month").year();
    const nextMonth = currentDate.add(1, "month").month() + 1;
    const nextDay = currentDate.add(1, "month").day();
    for (
      let date = 1;
      date < 7 - currentDate.endOf("month").get("day");
      date++
    ) {
      const nextMonthDate: datejsDateType = {
        year: nextOrThisyear,
        month: nextMonth,
        date: date,
        day: nextDay,
        type: "next",
      };

      nextMonthDates.push(nextMonthDate);
    }
    return nextMonthDates;
  }, [currentDate]);

  const monthDatesArray: datejsDateType[] = useMemo(() => {
    return lastMonthDates.concat(thisMonthDates, nextMonthDates);
  }, [lastMonthDates, thisMonthDates, nextMonthDates]);

  return { monthDatesArray };
};
