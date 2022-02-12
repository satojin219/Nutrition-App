import { useEffect, useState } from "react";
import { UserData, dayData,Date } from "globalType";
import {
  fetchUserData,
  getTodayData,
  isEditedDate,
} from "../tools/HelpMethods";

export const useSelectDay = () => {
  const [selectedDayData, setSelectedDayData] = useState<dayData>({selectedDay: getTodayData()});

  useEffect(() => {
    setSelectedDayData(selectedDayData);
  }, [selectedDayData]);

  const changeDay = (date :Date) =>{
    setSelectedDayData({selectedDay: date });
  }

  return [selectedDayData, {setSelectedDayData,changeDay}];
};
