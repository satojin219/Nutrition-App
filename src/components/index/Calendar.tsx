import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { useState, useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useCalendar } from "../../hooks/useCalendar";
import { DateType } from "../../shared/globalType";
import Router, { useRouter } from "next/router";
import { IsModalShowContext } from "../../pages/_app";
import { useDate } from "../../hooks/useDate";

type datejsDateType = DateType & {
  type: string;
};

export const Calendar: React.VFC = () => {
  const router = useRouter();
  const { currentDate } = useDate(router.query.currentDate as string);
  const [currentDayJs, setCurrentDayJs] = useState<dayjs.Dayjs>(currentDate);
  const { monthDatesArray } = useCalendar(currentDayJs);
  const { closeModal } = useContext(IsModalShowContext);
  const setNextMonth = (): void => {
    setCurrentDayJs(currentDayJs.add(1, "month"));
  };
  const setLastMonth = (): void => {
    setCurrentDayJs(currentDayJs.subtract(1, "month"));
  };
  const changeDate = (date: string) => {
    console.log(router.query.userId);
    Router.push(`/${router.query.userId}/${date}`);
  };

  return (
    <div className="transition duration-1000 text-2xl">
      <table className="shadow-lg bg-white rounded-br-xl rounded-bl-xl">
        <caption className="rounded-tr-xl rounded-tl-xl bg-orange-500 text-white p-3">
          <div className="flex justify-center">
            <div className="flex items-center">
              <button className="mr-3">
                <FaAngleLeft onClick={setLastMonth} />
              </button>
              <div>
                {currentDayJs?.format("YYYY") +
                  "年" +
                  " " +
                  currentDayJs?.format("M") +
                  "月"}
              </div>
              {dayjs().month() <= currentDayJs.month() &&
              dayjs().year() <= currentDayJs.year() ? (
                <div></div>
              ) : (
                <button className="ml-3">
                  <FaAngleRight onClick={setNextMonth} />
                </button>
              )}
            </div>
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

            {monthDatesArray?.map((monthDate: datejsDateType) => (
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
                onClick={() => {
                  if (
                    monthDate.type != "current" ||
                    (dayjs().year() < monthDate.year &&
                      dayjs().month() < monthDate.month &&
                      dayjs().date() < monthDate.date)
                  )
                    return;
                  closeModal();
                  changeDate(
                    String(monthDate.year) +
                      String(monthDate.month).padStart(2, "0") +
                      String(monthDate.date).padStart(2, "0")
                  );
                }}
                className={`pt-8 pl-5 pr-2 border-dashed border border-gray-200 hover:bg-gray-300 cursor-pointer text-right ${
                  monthDate.type != "current"
                    ? "text-gray-400 hover:bg-white"
                    : monthDate.day == 0
                    ? "text-red-500"
                    : monthDate.day == 6
                    ? "text-sky-500"
                    : "text-black"
                } `}
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
