import type { User } from "firebase/auth";
import { atom } from "recoil";

export type UserType = User | null;

export const authUserState = atom<UserType>({
  key: "authUser",
  default: null,
});
