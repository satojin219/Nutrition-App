import { Calendar } from "../index/Calendar";
import { useRouter } from "next/router";
import { NutritionList } from "../common/NutritionList";
import { ConfirmEdit } from "../editMenu/ConfirmEidt";
import { BsXLg } from "react-icons/bs";
import { Nutrition } from "../../shared/globalType";
import { useModal } from "../../hooks/useModal";
import { useEffect } from "react";

type Props = {
  nutrition?: Nutrition;
};
export const Modal: React.VFC<Props> = (props) => {
  const { modal, closeModal } = useModal();
  const router = useRouter();

  return (
    <div id={modal.isOpen ? "overlay" : "unoverlay"}>
      <div className="absolute top-0 right-0">
        <button
          className="text-3xl xs:text-7xl font-extrabold text-white md:mx-20 mx-10 my-10"
          onClick={() => {
            closeModal();
          }}
        >
          <BsXLg />
        </button>
      </div>
      {modal.modalType == "calendar"
        ? router.isReady && <Calendar />
        : modal.modalType == "nutritonList"
        ? router.isReady && (
            <NutritionList nutrition={props.nutrition} isModal={true} />
          )
        : modal.modalType == "confirmEdit"
        ? router.isReady && <ConfirmEdit />
        : null}
    </div>
  );
};
