import dayjs from "dayjs";
import { useState, useMemo } from "react";
import { DateType } from "globalType";

type datejsDateType = DateType & {
  type: string;
};

export const useCalendar = (currentDate: dayjs.Dayjs) => {
  const lastMonthDates: datejsDateType[] = useMemo(() => {
    let lastMonthDates = [];
    const year = currentDate.subtract(1, "month").year();
    const month = currentDate.subtract(1, "month").month() + 1;
    const day = currentDate.subtract(1, "month").day();
    for (
      let startWeekday = currentDate.startOf("month").get("day");
      startWeekday > 0;
      startWeekday--
    ) {
      const date =
        currentDate.startOf("month").add(-1, "day").get("date") -
        startWeekday +
        1;
      const lastMonthDate: datejsDateType = {
        year: year,
        month: month,
        date: date,
        day: day,
        type: "last",
      };
      lastMonthDates.push(lastMonthDate);
    }
    return lastMonthDates;
  }, [currentDate]);

  const currentMonthDates: datejsDateType[] = useMemo(() => {
    let currentMonthDates = [];
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
      currentMonthDates.push(currentMonthDate);
    }
    return currentMonthDates;
  }, [currentDate]);

  const nextMonthDates: datejsDateType[] = useMemo(() => {
    let nextMonthDates = [];
    const year = currentDate.add(1, "month").year();
    const month = currentDate.add(1, "month").month() + 1;
    const day = currentDate.add(1, "month").day();
    for (
      let date = 1;
      date < 7 - currentDate.endOf("month").get("day");
      date++
    ) {
      const nextMonthDate: datejsDateType = {
        year: year,
        month: month,
        date: date,
        day: day,
        type: "next",
      };

      nextMonthDates.push(nextMonthDate);
    }
    return nextMonthDates;
  }, [currentDate]);

  const monthDatesArray: datejsDateType[] = useMemo(() => {
    return lastMonthDates.concat(currentMonthDates, nextMonthDates);
  }, [lastMonthDates, currentMonthDates, nextMonthDates]);

  return { monthDatesArray };
};
