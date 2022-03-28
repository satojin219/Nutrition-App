import { DishData } from "../shared/globalType";
export const postDishData = async (
  url: string,
  data: DishData
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
  } else {
    console.log(res);
  }
  return res.json();
};
