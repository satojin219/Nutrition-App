import dayjs from "dayjs";
import { useState } from "react";

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(dayjs());

  const setNextMonth = (): void => {
    setCurrentDate(currentDate.add(1, "month"));
  };
  const setLastMonth = (): void => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  return [currentDate, { setNextMonth, setLastMonth }];
};
