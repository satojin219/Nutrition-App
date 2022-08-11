import { atom, selector } from "recoil";
import { Modal } from "../shared/globalType";

export const modalState = atom<Modal>({
  key: "modalState",
  default: {
    isModal: false,
    modaltype: "calendar",
  },
});

export const modalSelctor = selector<Modal>({
  key: "modalSelector",
  get: ({ get }) => {
    return get(modalState);
  },
  set: ({ set }, newValue) => {
    set(modalState, newValue);
  },
});