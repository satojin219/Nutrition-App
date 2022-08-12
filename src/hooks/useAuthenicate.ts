import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authUserState } from "../states/authUserState";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../client/firebase";

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(authUserState);
  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    return () => {
      authStateChanged();
    };
  }, []);

  return { user, setUser };
};
