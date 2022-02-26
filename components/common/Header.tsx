import React, { useEffect, useState, useMemo, useContext } from "react";
import { UserData } from "globalType";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  BsFillBrightnessAltHighFill,
  BsFillSunFill,
  BsFillMoonFill,
} from "react-icons/bs";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { isModalShowContext } from "../../pages/index";
import { Modal } from "../common/Modal";

type Props = {
  meal: string;
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  const { headerIcon, headerColor } = useMemo(() => {
    switch (props.meal) {
      case "breakfast": {
        return {
          headerColor: "bg-red-500",
          headerIcon: (
            <div className="text-3xl flex">
              <BsFillBrightnessAltHighFill size={40} className="mr-2" />
              <p>朝食</p>
            </div>
          ),
        };
      }
      case "lunch": {
        return {
          headerColor: "bg-yellow-400",
          headerIcon: (
            <div className="text-3xl flex">
              <BsFillSunFill size={40} className="mr-2" />
              <p>昼食</p>
            </div>
          ),
        };
      }
      case "dinner": {
        return {
          headerColor: "bg-purple-500",
          headerIcon: (
            <div className="text-3xl flex">
              <BsFillMoonFill size={40} className="mr-2" />
              <p>夕食</p>
            </div>
          ),
        };
      }
      case "snack": {
        return {
          headerColor: "bg-sky-400",
          headerIcon: (
            <div className="text-3xl flex">
              <MdFastfood size={40} className="mr-2" />
              <p>間食</p>
            </div>
          ),
        };
      }
      default: {
        return {
          headerColor: "bg-orange-500",
          headerIcon: <div></div>,
        };
      }
    }
  }, [props.meal]);

  const { isModalShow, setIsModalShow } = useContext(isModalShowContext);

  return (
    <div>
      <header className={headerColor}>
        <div className="flex justify-around text-white font-bold py-5">
          {!props.isEdit ? (
            <div>
              <button
                onClick={() => {
                  setIsModalShow(true);
                }}
              >
                <FaCalendarAlt size={40} />
              </button>
              <Modal modalType="calendar" />
            </div>
          ) : (
            <button>
              <IoArrowBackCircleSharp size={40} />
            </button>
          )}
          <div className="flex items-center font-bold text-3xl ">
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
