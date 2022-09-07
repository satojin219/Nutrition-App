import { useRecoilState } from "recoil";
import { modalState } from "../states/modalState";

export type ModalType = "nutritonList" | "calendar" | "confirmEdit";

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const openModal = (modalType: ModalType) => {
    setModal({
      isOpen: true,
      modalType: modalType,
    });
  };
  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };
  return { modal, openModal, closeModal };
};
