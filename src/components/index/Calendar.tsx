import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useCalendar } from "../../hooks/useCalendar";
import { DateType } from "../../shared/globalType";
import Router, { useRouter } from "next/router";
import { useDate } from "../../hooks/useDate";
import { useModal } from "../../hooks/useModal";
import { useRecoilValue } from "recoil";
import { currentDateSelector } from "../../states/currentDateState";
import { useState } from "react";

type datejsDateType = DateType & {
  type: string;
};

export const Calendar: React.VFC = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(
    useRecoilValue(currentDateSelector)
  );
  const { monthDatesArray } = useCalendar(currentDate);
  const { closeModal } = useModal();
  const setNextMonth = (): void => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const setLastMonth = (): void => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };
  const changeDateRoute = (date: string) => {
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
                {currentDate?.format("YYYY") +
                  "年" +
                  " " +
                  currentDate?.format("M") +
                  "月"}
              </div>
              {dayjs().month() <= currentDate.month() &&
              dayjs().year() <= currentDate.year() ? (
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
                    (dayjs().year() <= monthDate.year &&
                      dayjs().month() + 1 <= monthDate.month &&
                      dayjs().date() < monthDate.date)
                  )
                    return;
                  closeModal();
                  changeDateRoute(
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
      </table>
    </div>
  );
};
