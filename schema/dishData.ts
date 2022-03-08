export const fetchDishData = async (url: string): Promise<any> => {
  const res = await fetch(url);
  console.log(res);
  return res.json();
};
