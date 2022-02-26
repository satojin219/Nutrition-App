import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { IoArrowBackCircleSharp } from "react-icons/io5";
type Props = {
  meal: string;
  isEdit: boolean;
};

export const Header: React.VFC<Props> = (props) => {
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
            <button>
              <FaCalendarAlt size={40} />
            </button>
          ) : (
            <Link href="/">
              <a>
                <IoArrowBackCircleSharp size={40} />
              </a>
            </Link>
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
