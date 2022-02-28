import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { createContext, useState } from "react";
import { useSelectDay } from "../hooks/useSelectDay";
import { dayData, DateType } from "globalType";
import type { AppProps } from "next/app";

type DayContextType = {
  selectedDayData: dayData;
  setSelectedDayData: React.Dispatch<React.SetStateAction<dayData>>;
  changeDay: (date: DateType) => void;
};
type isFixedContextType = {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DayContext = createContext({} as DayContextType);
export const IsModalShowContext = React.createContext({} as isFixedContextType);

function MyApp({ Component, pageProps }: AppProps) {
  const { selectedDayData, setSelectedDayData, changeDay } = useSelectDay();
  const [isModalShow, setIsModalShow] = useState(false);
  const value = {
    isModalShow,
    setIsModalShow,
  };

  return (
    <IsModalShowContext.Provider value={value}>
      <DayContext.Provider
        value={{ selectedDayData, setSelectedDayData, changeDay }}
      >
        <Component {...pageProps} />
      </DayContext.Provider>
    </IsModalShowContext.Provider>
  );
}

export default MyApp;
