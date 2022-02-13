import React, { useEffect, useState, useMemo } from "react";
import { UserData } from "globalType";
import { divideIconAndColor } from "../../tools/HelpComponents"
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { IoArrowBackCircleSharp } from "react-icons/io5";
type Props = {
  meal: string;
  isEdit: boolean;
};


export const Header: React.VFC<Props> = (props) => {

  const { headerIcon, headerColor } = useMemo(() => {
    return divideIconAndColor(props.meal);
  }, [props.meal]);

  return (
    <div>
      <header className={headerColor}>
        <div className="flex justify-around text-white font-bold py-5">
          {!props.isEdit ? (
            <button>
              <FaCalendarAlt size={40} />
            </button>
          ) : (
            <button>
              <IoArrowBackCircleSharp size={40} />
            </button>
          )}
          <div className="flex items-center  font-bold text-3xl ">
            {!props.isEdit ? (
              <button className="cursor-pointer mr-2 font-bold">
                <FaAngleLeft />
              </button>
            ) : null}

            <h1 className="text-2xl"> 2022 / 01 / 22 (土) </h1>
            {!props.isEdit ? (
              <button className=" ml-2 font-bold">
                <FaAngleRight />
              </button>
            ) : null}
          </div>
          {headerIcon}
        </div>
      </header>
    </div>
  );
};
