import { atom, selector } from "recoil";

export const isEditedState = atom<boolean>({
  key: "isEditedState",
  default: false,
});
