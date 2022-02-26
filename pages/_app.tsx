import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { createContext } from "react";
import { useSelectDay } from "../hooks/useSelectDay";
import { dayData, DateType } from "globalType";
type DayContextType = {
  selectedDayData: dayData;
  setSelectedDayData: React.Dispatch<React.SetStateAction<dayData>>;
  changeDay: (date: DateType) => void;
};
export const DayContext = createContext({} as DayContextType);
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const { selectedDayData, setSelectedDayData, changeDay } = useSelectDay();

  return (
    <DayContext.Provider
      value={{ selectedDayData, setSelectedDayData, changeDay }}
    >
      <Component {...pageProps} />
    </DayContext.Provider>
  );
}

export default MyApp;
