import React, { useMemo, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Modal } from "./Modal";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IsModalShowContext, IsEditedContext } from "../../pages/_app";
import { useDate } from "../../hooks/useDate";
import dayjs from "dayjs";

type Props = {
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  const { openModal } = useContext(IsModalShowContext);
  const { isEdited } = useContext(IsEditedContext);
  const router = useRouter();
  const { currentDate, addOneDay, subtractOneDay } = useDate(
    router.query.currentDate as string
  );

  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(router.query.whenMeal);
  }, [router.query.whenMeal]);

  return (
    <div>
      <header
        className={`${
          router.query.whenMeal != undefined
            ? router.query.whenMeal
            : "defaultHeaderColor"
        }`}
      >
        <div className="flex justify-around text-white font-bold py-5">
          {!props.isEdit ? (
            <div>
              <button
                onClick={() => {
                  openModal("calendar");
                }}
              >
                <FaCalendarAlt size={40} />
              </button>
              <Modal />
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  if (isEdited) openModal("confirmEdit");
                  else router.push(`/${router.query.currentDate}`);
                }}
              >
                <IoArrowBackCircleSharp size={40} />
              </button>

              <Modal />
            </div>
          )}
          <div className="flex items-center font-bold text-3xl">
            {!props.isEdit ? (
              <button
                onClick={subtractOneDay}
                className="cursor-pointer mr-2 font-bold"
              >
                <FaAngleLeft />
              </button>
            ) : null}

            <h1 className="text-2xl">
              {currentDate.format("YYYY") +
                " / " +
                currentDate.format("MM") +
                " / " +
                currentDate.format("DD") +
                " (" +
                currentDate.format("dd") +
                ")"}
            </h1>
            {props.isEdit ? null : dayjs().add(1, "d").year() ==
                currentDate.add(1, "d").year() &&
              dayjs().add(1, "d").month() == currentDate.add(1, "d").month() &&
              dayjs().add(1, "d").date() == currentDate.add(1, "d").date() ? (
              <div></div>
            ) : (
              <button onClick={addOneDay} className="ml-2 font-bold">
                <FaAngleRight />
              </button>
            )}
          </div>
          {headerIcon}
        </div>
      </header>
    </div>
  );
};
