import React, { useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useDate } from "../../hooks/useDate";
import { useModal } from "../../hooks/useModal";

export const Header: React.VFC = () => {
  const { openModal } = useModal();
  const router = useRouter();
  const { currentDate, addOneDay, subtractOneDay, changeDate } = useDate();

  useEffect(() => {
    if (router.query.currentDate && typeof router.query.currentDate == "string")
      changeDate(router.query.currentDate);
  }, [router.query.currentDate]);

  return (
    <header className={"defaultHeaderColor p-2 pt-8"}>
      <Link href="/">
        <a className="text-2xl font-bold text-white  ">Nutrition app</a>
      </Link>
      <button
        className="bg-white rounded w-full h-10 my-3 p-4 text-base mb-2 text-slate-400 flex items-center"
        onClick={() => {
          openModal("calendar");
        }}
      >
        <FaCalendarAlt />
        <p className="pl-3">{currentDate.format("YYYY年 MM月 DD日 (dd)")}</p>
      </button>

      <div className="flex justify-between text-white my-2">
        <button
          onClick={subtractOneDay}
          className="rounded-3xl text-base text-base-white border-2 w-full flex justify-between items-center px-5 py-1"
        >
          <FaAngleLeft size={20} />
          <p>{currentDate.add(-1, "d").format("M月 DD日 (dd)")}</p>
          {/* 間隔を空けるために追加 */}
          <div></div>
        </button>
        {/* ボタンの間を開けるために追加 */}
        <div className="w-4 h-full"></div>
        <button
          onClick={addOneDay}
          className="rounded-3xl text-base text-base-white border-2 w-full flex justify-between items-center px-5 py-1"
        >
          {/* 間隔を空けるために追加 */}
          <div></div>
          <p>{currentDate.add(1, "d").format("M月 DD日 (dd)")}</p>
          <FaAngleRight size={20} />
        </button>
      </div>
    </header>
  );
};
