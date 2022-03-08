export const fetchDishData = async (url: string): Promise<any> => {
  const res = await fetch(url);
  return res.json();
};
