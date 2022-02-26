import { Calendar } from "../index/Calendar";
import { useContext } from "react";
import { isModalShowContext } from "../../pages/index";
import { NutritionList } from "../common/NutritionList";
type Props = {
  modalType: string;
};
export const Modal: React.VFC<Props> = (props) => {
  const { isModalShow, setIsModalShow } = useContext(isModalShowContext);

  return (
    <div id={isModalShow ? "overlay" : "unoverlay"}>
      {props.modalType == "calendar" ? (
        <Calendar />
      ) : props.modalType == "nutritonList" ? (
        <NutritionList />
      ) : null}
    </div>
  );
};
