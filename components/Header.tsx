import React, { useEffect, useState } from "react";
import { UserData } from "globalType";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdFastfood } from "react-icons/md";
type Props = {
  meal: string;
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  let headerColor!: string;
  let headerIcon!: JSX.Element | null;
  (function(){
    if (props.meal == "breakfast") {
      headerColor = "bg-red-500";
      headerIcon = (
        <div className="text-3xl flex">
          <BsFillBrightnessAltHighFill size={40} className="mr-2" />
          <p>朝食</p>
        </div>
      );
      return;
    } else if (props.meal == "lunch") {
      headerColor = "bg-yellow-400";
      headerIcon = (
        <div className="text-3xl flex">
          <BsFillSunFill size={40} className="mr-2" />
          <p>昼食</p>
        </div>
      );
      return;
    } else if (props.meal == "dinner") {
      headerColor = "bg-purple-500";
      headerIcon =  (
        <div className="text-3xl flex">
          <BsFillMoonFill size={40} className="mr-2" />
          <p>夕食</p>
        </div>
      );
      return;
    } else if (props.meal == "snack") {
      headerColor = "bg-sky-400";
      headerIcon = (
        <div className="text-3xl flex">
          <MdFastfood size={40} className="mr-2" />
          <p>間食</p>
        </div>
      );
      return;
    } else {
      headerColor = "bg-orange-500";
      headerIcon = <div></div>;
      return; 
    }
  }());


  return (
    <div>
      <header className={headerColor}>
        <div className="flex justify-around text-white font-bold py-5">
          {headerIcon}
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
          {!props.isEdit ? (
            <button>
              <FaCalendarAlt size={40} />
            </button>
          ) : (
            <button>
              <RiArrowGoBackFill size={40} />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};
