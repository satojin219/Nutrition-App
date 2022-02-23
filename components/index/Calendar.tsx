import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { useCallback, useEffect, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { start } from "repl";
import { text } from "stream/consumers";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { DateType } from "globalType";

type Props = {
  isModalShow: boolean;
  setModalShow(isShow: boolean): void;
};
type datejsDateType = DateType & {
  type: string;
};
export const Calendar: React.VFC<Props> = (props) => {
  const [currentDate, { setNextMonth, setLastMonth }] = useCurrentDate();
  const closeModal = () => {
    document.querySelector("body")?.classList.remove("fixed");
    props.setModalShow(false);
  };

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

  return (
    <div className="transition duration-1000 text-2xl">
      <table className="shadow-lg bg-white rounded-br-xl rounded-bl-xl">
        <caption className="rounded-tr-xl rounded-tl-xl bg-orange-500 text-white p-3 ">
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
            <button onClick={closeModal}>
              <MdCancel />
            </button>
          </div>
        </caption>
        <tbody className="">
          <tr className="grid grid-cols-7 p-5">
            {weekdays?.map((weekday: string) => (
              <td
                key={weekday}
                className={`${
                  weekday == "土"
                    ? "text-sky-600"
                    : weekday == "日"
                    ? "text-red-500"
                    : "text-black"
                } px-5 pb-3`}
              >
                {weekday}
              </td>
            ))}

            {monthDatesArray.map((monthDate: datejsDateType) => (
              <td
                key={
                  monthDate.year +
                  "-" +
                  monthDate.month +
                  "-" +
                  monthDate.date +
                  "-" +
                  monthDate.day
                }
                className={`${
                  monthDate.type != "current"
                    ? "text-gray-400"
                    : monthDate.day == 0
                    ? "text-red-500"
                    : monthDate.day == 6
                    ? "text-sky-500"
                    : "text-black"
                } pt-8 pl-5 pr-2 border-dashed border border-gray-200 hover:bg-gray-300 cursor-pointer text-right`}
              >
                {monthDate.date}
              </td>
            ))}
          </tr>
        </tbody>
        <tfoot className="flex justify-center text-sm">
          <tr className="flex p-3">
            <td className="mx-3 text-black">
              <span className="text-red-400">■</span> 編集済み
            </td>
            <td className="mx-3 text-black">
              <span className="text-yellow-400">■</span> 現在選択中
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
