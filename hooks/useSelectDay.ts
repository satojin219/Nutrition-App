import { useEffect, useState } from "react";
import { UserData, dayData, DateType } from "globalType";
import { getTodayData } from "../tools/HelpMethods";

export const useSelectDay = () => {
  const [selectedDayData, setSelectedDayData] = useState<dayData>({
    selectedDay: getTodayData(),
  });

  useEffect(() => {
    setSelectedDayData(selectedDayData);
  }, [selectedDayData]);

  const changeDay = (date: DateType) => {
    setSelectedDayData({ selectedDay: date });
  };

  return [selectedDayData, { setSelectedDayData, changeDay }];
};
