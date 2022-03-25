import dayjs from "dayjs";

export const isExistDate = (text: string): boolean => {
  const formatText = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return formatText === text;
};
export const isBeforeToday = (text: string): boolean => {
  const today = dayjs().format("YYYYMMDD");
  const requestedDate = dayjs(text, "YYYYMMDD").format("YYYYMMDD");
  return parseInt(requestedDate) <= parseInt(today);
};
