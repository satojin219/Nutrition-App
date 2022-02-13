// import '../styles/globals.css'
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import { useState, useContext, createContext } from "react";
import { useSelectDay, useEffect } from "../hooks/useSelectDay";
import { dayData } from "globalType";

export const DayContext = createContext(null);
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedDayData, { setSelectedDayData, changeDay }] = useSelectDay();

  return (
    <DayContext.Provider
      value={[selectedDayData, { setSelectedDayData, changeDay }]}
    >
      <Component {...pageProps} />
    </DayContext.Provider>
  );
}

export default MyApp;
