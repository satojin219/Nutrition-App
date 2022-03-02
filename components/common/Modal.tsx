import { Calendar } from "../index/Calendar";
import { useContext } from "react";
import { IsModalShowContext } from "../../pages/_app";
import { NutritionList } from "../common/NutritionList";
import { BsXLg } from "react-icons/bs";
import { Nutrition } from "globalType";
type Props = {
  nutrition?: Nutrition;
};
export const Modal: React.VFC<Props> = (props) => {
  const isModalShowContext = useContext(IsModalShowContext);

  return (
    <div id={isModalShowContext.isModalShow ? "overlay" : "unoverlay"}>
      <div className="absolute top-0 right-0">
        <button
          className="text-3xl xs:text-7xl font-extrabold text-white md:mx-20 mx-10 my-10"
          onClick={() => {
            isModalShowContext.setIsModalShow(false);
          }}
        >
          <BsXLg />
        </button>
      </div>
      {isModalShowContext.modalType == "calendar" ? (
        <Calendar />
      ) : isModalShowContext.modalType == "nutritonList" ? (
        <NutritionList />
      ) : null}
    </div>
  );
};
