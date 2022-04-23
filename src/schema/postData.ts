import { DishData, UserData } from "../shared/globalType";
export const postData = async (
  url: string,
  data: DishData | UserData
): Promise<any> => {
  const param = {
    method: "POST",
    body: JSON.stringify(data),
  };
  const res = await fetch(url, param);
  if (!res.ok) {
    const error: any = new Error("An error occurred while posting the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
};
