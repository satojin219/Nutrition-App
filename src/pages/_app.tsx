import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { createContext, useState } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../../context/AuthContext";
import { RecoilRoot } from "recoil";

type isEditedContextType = {
  isEdited: boolean;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

export const IsEditedContext = React.createContext({} as isEditedContextType);
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isEdited, setIsEdited] = useState(false);

  return (
    <RecoilRoot>
      <AuthProvider>
        <IsEditedContext.Provider value={{ isEdited, setIsEdited }}>
          <Component {...pageProps} />
        </IsEditedContext.Provider>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default MyApp;
