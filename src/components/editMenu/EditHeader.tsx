import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useDate } from "../../hooks/useDate";
import { useModal } from "../../hooks/useModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { isEditedState } from "../../states/isEditedState";
import { mealTimeState } from "../../states/MealTimeState";
import { useAuthenticate } from "../../hooks/useAuthenicate";

export const EditHeader: React.VFC = () => {
  const { openModal } = useModal();
  const isEdited = useRecoilValue(isEditedState);
  const [mealTime, setMealTime] = useRecoilState(mealTimeState);
  const router = useRouter();
  const { currentDate, changeDate } = useDate();
  const { user } = useAuthenticate();

  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(mealTime);
  }, [mealTime]);

  useEffect(() => {
    if (router.query.currentDate && typeof router.query.currentDate == "string")
      changeDate(router.query.currentDate);
  }, [router.query.currentDate]);

  useEffect(() => {
    console.log(router.query);
  }, [router.query]);

  return (
    <header className={`${mealTime} p-2 pt-8 text-white`}>
      {headerIcon}
      <div className="flex">
        <button
          className="mr-3"
          onClick={() => {
            console.log(router.query);
            if (isEdited) openModal("confirmEdit");
            else if (router.query.menuID) {
              router.push(
                `/${user?.uid}/${currentDate.format("YYYYMMDD")}/${mealTime}`
              );
            } else {
              router.push(`/${user?.uid}/${currentDate.format("YYYYMMDD")}`);
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
