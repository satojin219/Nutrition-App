import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { createContext, useState } from "react";
import { useSelectDay } from "../hooks/useSelectDay";
import { dayData, DateType } from "../shared/globalType";
import type { AppProps } from "next/app";
import { useModal, ModalType } from "../hooks/useModal";
import { AuthProvider } from "../../context/AuthContext";

type DayContextType = {
  selectedDayData: dayData;
  setSelectedDayData: React.Dispatch<React.SetStateAction<dayData>>;
  changeDay: (date: DateType) => void;
};
type isFixedContextType = {
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  currentState: {
    isOpen: boolean;
    modalType: ModalType;
  };
};
type isEditedContextType = {
  isEdited: boolean;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DayContext = createContext({} as DayContextType);
export const IsModalShowContext = React.createContext({} as isFixedContextType);
export const IsEditedContext = React.createContext({} as isEditedContextType);
const MyApp = ({ Component, pageProps }: AppProps) => {
  const { selectedDayData, setSelectedDayData, changeDay } = useSelectDay();
  const { isModalShow, modalType, openModal, closeModal } = useModal();
  const [isEdited, setIsEdited] = useState(false);

  const isModalShowContext = {
    openModal,
    closeModal,
    currentState: {
      isOpen: isModalShow,
      modalType: modalType,
    },
  };
  return (
    <AuthProvider>
      <IsModalShowContext.Provider value={isModalShowContext}>
        <DayContext.Provider
          value={{ selectedDayData, setSelectedDayData, changeDay }}
        >
          <IsEditedContext.Provider value={{ isEdited, setIsEdited }}>
            <Component {...pageProps} />
          </IsEditedContext.Provider>
        </DayContext.Provider>
      </IsModalShowContext.Provider>
    </AuthProvider>
  );
};

export default MyApp;
