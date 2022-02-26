import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo, useContext } from "react";
import { UserData } from "globalType";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdFastfood } from "react-icons/md";
import { isModalShowContext } from "../../pages/index";
import { Modal } from "../common/Modal";

type Props = {
  meal: string;
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  const router = useRouter();
  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(router.query.whenMeal);
  }, [router.query.whenMeal]);

  const { isModalShow, setIsModalShow } = useContext(isModalShowContext);

  return (
    <div>
      <header
        className={
          router.query.whenMeal != undefined
            ? router.query.whenMeal
            : "defaultHeaderColor"
        }
      >
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
            <Link href="/">
              <a>
                <IoArrowBackCircleSharp size={40} />
              </a>
            </Link>
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
