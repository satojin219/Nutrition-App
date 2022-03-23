import { useState } from "react";
type ModalType = "nutritonList" | "calendar" | "confirmEdit";
export const useModal = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("calendar");
  const openModal = (modalType: ModalType) => {
    setIsModalShow(true);
    setModalType(modalType);
  };
  const closeModal = () => {
    setIsModalShow(false);
  };
  return { isModalShow, modalType, openModal, closeModal };
};
