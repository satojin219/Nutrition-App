import { Calendar } from "../index/Calendar";
import { useContext } from "react";
import { isModalShowContext } from "../../pages/index";
import { NutritionList } from "../common/NutritionList";
import { BsXLg } from "react-icons/bs";
type Props = {
  modalType: string;
};
export const Modal: React.VFC<Props> = (props) => {
  const { isModalShow, setIsModalShow } = useContext(isModalShowContext);

  return (
    <div id={isModalShow ? "overlay" : "unoverlay"}>
      <div className="grid justify-items-end">
        <button
          className=" absolute top-0 right-0 text-3xl md:text-7xl font-extrabold text-white md:mx-20 mx-10 my-10"
          onClick={() => {
            setIsModalShow(false);
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
