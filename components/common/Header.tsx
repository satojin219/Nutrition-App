import React, { useMemo, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Modal } from "./Modal";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IsModalShowContext } from "../../pages/_app";

type Props = {
  meal: string;
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
  const isModalShowContext = useContext(IsModalShowContext);
  const router = useRouter();
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
                  isModalShowContext.setIsModalShow(true);
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
          <div className="flex items-center font-bold text-3xl">
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
