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

/**
 * バイナリファイルをBase64エンコードする。
 */
export const changeImageToBase64 = (
  file: File
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = (event) => {
      resolve(event.target?.result as string); //FIXME
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
};
