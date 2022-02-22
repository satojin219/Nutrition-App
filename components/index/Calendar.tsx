import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { useCallback, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { start } from "repl";
import { text } from "stream/consumers";
import { useCurrentDate } from "../../hooks/useCurrentDate";
type datejsDateType = {
  date: number;
  day?: number;
  type: string;
};
export const Calendar: React.VFC = () => {
  const [currentDate, { setNextMonth, setLastMonth }] = useCurrentDate();

  const lastMonthDates: datejsDateType[] = useMemo(() => {
    let lastMonthDates = [];
    for (
      let startWeekday = currentDate.startOf("month").get("day");
      startWeekday > 0;
      startWeekday--
    ) {
      lastMonthDates.push({
        date:
          currentDate.startOf("month").add(-1, "day").get("date") -
          startWeekday +
          1,
        type: "last",
      });
    }
    return lastMonthDates;
  }, [currentDate]);

  const currentMonthDates: datejsDateType[] = useMemo(() => {
    let currentMonthDates = [];
    for (let date = 1; date <= currentDate.endOf("month").get("date"); date++) {
      const current = currentDate.set("date", date);
      const weekday: number = current.get("day");
      currentMonthDates.push({ date: date, day: weekday, type: "current" });
    }
    return currentMonthDates;
  }, [currentDate]);

  const nextMonthDates: datejsDateType[] = useMemo(() => {
    let nextMonthDates = [];
    for (
      let date = 1;
      date < 7 - currentDate.endOf("month").get("day");
      date++
    ) {
      nextMonthDates.push({ date: date, type: "next" });
    }
    return nextMonthDates;
  }, [currentDate]);

  const monthDatesArray: datejsDateType[] = useMemo(() => {
    return lastMonthDates.concat(currentMonthDates, nextMonthDates);
  }, [currentDate]);

  const renderDate = (datesArray: datejsDateType[]) => {
    return (
      <tr>
        {datesArray.map((date: datejsDate) => (
          <td
            key={date.date}
            className={`${
              date.type != "current"
                ? "opacity-50"
                : date.day == 0
                ? "text-red-500"
                : date.day == 6
                ? "text-sky-500"
                : "text-black"
            } p-5`}
          >
            {date.date}
          </td>
        ))}
      </tr>
    );
  };
  return (
    <div className="flex justify-center items-center text-2xl">
      <table className="shadow-lg">
        <caption className="rounded-tr-xl rounded-tl-xl bg-orange-500 text-white p-3 my-3">
          <div className="flex justify-between">
            <div></div>
            <div className="flex items-center">
              <button className="mr-3">
                <FaAngleLeft onClick={setLastMonth} />
              </button>
              <div>
                {currentDate.format("YYYY") +
                  "年" +
                  " " +
                  currentDate.format("M") +
                  "月"}
              </div>
              <button className="ml-3">
                <FaAngleRight onClick={setNextMonth} />
              </button>
            </div>
            <button>
              <MdCancel />
            </button>
          </div>
        </caption>
        <tbody>
          <tr>
            {weekdays?.map((weekday: string) => (
              <th
                key={weekday}
                className={`${
                  weekday == "土"
                    ? "text-sky-600"
                    : weekday == "日"
                    ? "text-red-500"
                    : "text-black"
                } px-10`}
              >
                {weekday}
              </th>
            ))}
          </tr>
          {renderDate(monthDatesArray.slice(0, 7))}
          {renderDate(monthDatesArray.slice(7, 14))}
          {renderDate(monthDatesArray.slice(14, 21))}
          {renderDate(monthDatesArray.slice(21, 28))}
          {renderDate(monthDatesArray.slice(28, 35))}
        </tbody>
      </table>
    </div>
  );
};
