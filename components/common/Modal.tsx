import { Calendar } from "../index/Calendar";
import { useContext } from "react";
import { IsModalShowContext } from "../../pages/_app";
import { NutritionList } from "../common/NutritionList";
import { BsXLg } from "react-icons/bs";
type Props = {
  modalType: string;
};
export const Modal: React.VFC<Props> = (props) => {
  const isModalShowContext = useContext(IsModalShowContext);

  return (
    <div id={isModalShowContext.isModalShow ? "overlay" : "unoverlay"}>
      <div className="grid justify-items-end">
        <button
          className=" absolute top-0 right-0 text-3xl md:text-7xl font-extrabold text-white md:mx-20 mx-10 my-10"
          onClick={() => {
            isModalShowContext.setIsModalShow(false);
          }}
        >
          <BsXLg />
        </button>
      </div>
      {props.modalType == "calendar" ? (
        <Calendar />
      ) : props.modalType == "nutritonList" ? (
        <NutritionList />
      ) : null}
    </div>
  );
};
