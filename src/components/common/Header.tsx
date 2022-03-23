import React, { useContext } from "react";
import { useRouter } from "next/router";
import { IsModalShowContext } from "../../pages/_app";
import { useDate } from "../../hooks/useDate";

type Props = {
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  const { openModal } = useContext(IsModalShowContext);
  const router = useRouter();
  const { currentDate } = useDate(router.query.currentDate as string);

  return (
    <div>
      <header
        className={`${
          router.query.whenMeal != undefined
            ? router.query.whenMeal
            : "bg-primary"
        }`}
      >
        <div className="pt-5 px-2 pb-2 h-full">
          <p className="text-2xl font-bold text-white mb-2">Nutrition App</p>
          <input
            type="text"
            placeholder="カレンダーで日付を選ぶ"
            className="rounded w-full h-10 pl-4 text-base"
            value={currentDate.format("YYYY/MM/DD")}
            onClick={() => {
              openModal("calendar");
            }}
          />
        </div>
        {/* <div className="flex justify-around text-white font-bold py-5">
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
                  openModal("confirmEdit");
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
        </div> */}
      </header>
    </div>
  );
};
