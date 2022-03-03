import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { createContext, useState } from "react";
import { useSelectDay } from "../hooks/useSelectDay";
import { dayData, DateType } from "globalType";
import type { AppProps } from "next/app";
import { useModal } from "../hooks/useModal";

type DayContextType = {
  selectedDayData: dayData;
  setSelectedDayData: React.Dispatch<React.SetStateAction<dayData>>;
  changeDay: (date: DateType) => void;
};
type ModalType = "nutritonList" | "calendar";
type isFixedContextType = {
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  currentState: {
    isOpen: boolean;
    modalType: ModalType;
  };
};

export const DayContext = createContext({} as DayContextType);
export const IsModalShowContext = React.createContext({} as isFixedContextType);

function MyApp({ Component, pageProps }: AppProps) {
  const { selectedDayData, setSelectedDayData, changeDay } = useSelectDay();
  const { isModalShow, modalType, openModal, closeModal } = useModal();

  const isModalShowContext = {
    openModal,
    closeModal,
    currentState: {
      isOpen: isModalShow,
      modalType: modalType,
    },
  };
  return (
    <IsModalShowContext.Provider value={isModalShowContext}>
      <DayContext.Provider
        value={{ selectedDayData, setSelectedDayData, changeDay }}
      >
        <Component {...pageProps} />
      </DayContext.Provider>
    </IsModalShowContext.Provider>
  );
}

export default MyApp;
