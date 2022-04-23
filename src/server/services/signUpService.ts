import { UserData } from "../../shared/globalType";
import { db } from "../firebase";
export const signUpService = (usreData: UserData) => {
  const docRef = db.collection("user").doc(usreData.id);
  docRef.set(usreData);
};
