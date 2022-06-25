import React, { useMemo, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { divideIconAndColor } from "../../tools/HelpComponents";
import { FaCalendarAlt, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IsModalShowContext, IsEditedContext } from "../../pages/_app";
import { useDate } from "../../hooks/useDate";
import dayjs from "dayjs";

type Props = {
  isEdit: boolean;
};

export const EditHeader: React.VFC<Props> = (props) => {
  const { openModal } = useContext(IsModalShowContext);
  const { isEdited } = useContext(IsEditedContext);
  const router = useRouter();
  const { currentDate, addOneDay, subtractOneDay, changeDate } = useDate(
    router.query.currentDate as string
  );

  useEffect(() => {
    if (router.query.currentDate && typeof router.query.currentDate == "string")
      changeDate(router.query.currentDate);
  }, [router.query.currentDate]);

  const { headerIcon } = useMemo(() => {
    return divideIconAndColor(router.query.whenMeal);
  }, [router.query.whenMeal]);

  return (
    <header
      className={`${
        router.query.whenMeal != undefined
          ? router.query.whenMeal
          : "defaultHeaderColor"
      } p-2 pt-8 text-white`}
    >
      <Link href="/">
        <a className="text-2xl font-bold text-white  ">Nutrition app</a>
      </Link>
      <div className="flex">
        <button
          className="mr-3"
          onClick={() => {
            if (isEdited) openModal("confirmEdit");
            else {
              router.push(
                `/${router.query.userId}/${router.query.currentDate}`
              );
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

// <div className="flex justify-around text-white font-bold py-5">
//   {!props.isEdit ? (
//     <div>
//       <button
//         onClick={() => {
//           openModal("calendar");
//         }}
//       >
//         <FaCalendarAlt size={40} />
//       </button>
//       <Modal />
//     </div>
//   ) : (
//     <div>
//       <button
//         onClick={() => {
//           if (isEdited) openModal("confirmEdit");
//           else {
//             router.push(
//               `/${router.query.userId}/${router.query.currentDate}`
//             );
//           }
//         }}
//       >
//         <IoArrowBackCircleSharp size={40} />
//       </button>

//       <Modal />
//     </div>
//   )}
//   <div className="flex items-center font-bold text-3xl">
//     {!props.isEdit ? (
//       <button
//         onClick={subtractOneDay}
//         className="cursor-pointer mr-2 font-bold"
//       >
//         <FaAngleLeft />
//       </button>
//     ) : null}

//     <h1 className="text-2xl">
//       {currentDate.format("YYYY") +
//         " / " +
//         currentDate.format("MM") +
//         " / " +
//         currentDate.format("DD") +
//         " (" +
//         currentDate.format("dd") +
//         ")"}
//     </h1>
//     {props.isEdit ? null : dayjs().add(1, "d").year() ==
//         currentDate.add(1, "d").year() &&
//       dayjs().add(1, "d").month() == currentDate.add(1, "d").month() &&
//       dayjs().add(1, "d").date() == currentDate.add(1, "d").date() ? (
//       <div></div>
//     ) : (
//       <button onClick={addOneDay} className="ml-2 font-bold">
//         <FaAngleRight />
//       </button>
//     )}
//   </div>
//   {headerIcon}
// </div>;
