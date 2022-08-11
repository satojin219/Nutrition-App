import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../states/modalState";

export type ModalType = "nutritonList" | "calendar" | "confirmEdit";

export const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState);
  console.log(modal);
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
