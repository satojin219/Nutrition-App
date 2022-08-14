import React, { useMemo, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useDate } from "../../hooks/useDate";
import dayjs from "dayjs";
import { useModal } from "../../hooks/useModal";
import { useRecoilState } from "recoil";
import { isEditedState } from "../../states/isEditedState";
import { mealTimeState } from "../../states/MealTimeState";

type Props = {
  isEdit: boolean;
};

export const EditHeader: React.VFC<Props> = (props) => {
  const { openModal } = useModal();
  const [isEdited, _] = useRecoilState(isEditedState);
  const [mealTime, setMealTime] = useRecoilState(mealTimeState);
  const router = useRouter();
  const { currentDate, addOneDay, subtractOneDay, changeDate } = useDate();

  useEffect(() => {
    if (router.query.currentDate && typeof router.query.currentDate == "string")
      changeDate(router.query.currentDate);
  }, [router.query.currentDate]);

  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(mealTime);
  }, [mealTime]);

  return (
    <header className={`${mealTime} p-2 pt-8 text-white`}>
      {headerIcon}
      <div className="flex">
        <button
          className="mr-3"
          onClick={() => {
            if (isEdited) openModal("confirmEdit");
            else {
              router.push(
                `/${router.query.userId}/${router.query.currentDate}`
              );
              setMealTime("all");
            }
          }}
        >
          <IoArrowBackCircleSharp size={40} />
        </button>
        <button className="bg-white rounded w-full h-10 my-3 p-4 text-base mb-2 text-slate-400 flex items-center">
          <FaCalendarAlt />
          <p className="pl-3">{currentDate.format("YYYY年 MM月 DD日 (dd)")}</p>
        </button>
      </div>
    </header>
  );
};
