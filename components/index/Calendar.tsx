import dayjs from "dayjs";
import { weekdaysShort as weekdays } from "dayjs/locale/ja";
import { useState, useCallback, useEffect, useMemo, useContext } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { start } from "repl";
import { text } from "stream/consumers";
import { useCalendar } from "../../hooks/useCalendar";
import { DateType } from "globalType";
import { isFixedContext } from "../../pages/index";

type Props = {
  isModalShow: boolean;
  setModalShow(isShow: boolean): void;
};
type datejsDateType = DateType & {
  type: string;
};

export const Calendar: React.VFC<Props> = (props) => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());
  const { monthDatesArray } = useCalendar(currentDate);
  const { isFixed, setIsFixed } = useContext(isFixedContext);
  const setNextMonth = (): void => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const setLastMonth = (): void => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const closeModal = () => {
    props.setModalShow(false);
    setIsFixed(false);
  };
  useEffect(() => {
    console.log(currentDate.month());
    console.log(dayjs().month());
  }, [currentDate]);

  return (
    <div className="transition duration-1000 text-2xl">
      <table className="shadow-lg bg-white rounded-br-xl rounded-bl-xl">
        <caption className="rounded-tr-xl rounded-tl-xl bg-orange-500 text-white p-3">
          <div className="flex justify-between">
            <div></div>
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
