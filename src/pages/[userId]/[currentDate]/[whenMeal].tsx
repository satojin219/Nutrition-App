import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../components/editMenu/EditHeader";
import { EditMenuCard } from "../../../components/editMenu/EditMenuCard";
import { useState, useEffect, useContext } from "react";
import { Menu } from "../../../shared/globalType";
import { addElement, removeElemnt } from "../../../tools/HelpMethods";
import { useRouter } from "next/router";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../../../components/common/Modal";
import axios from "axios";
import { Loading } from "../../../components/common/Loading";
import useSWR from "swr";
import { fetchDishData } from "../../../schema/fetchDishData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../../shared/globalType";
import { dummyMenu } from "../../../tools/dummyMenu";
import MenuItem from "../../../components/editMenu/MenuItem";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useRecoilValue } from "recoil";
import { mealTimeState } from "../../../states/MealTimeState";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query.userId}/${router.query.currentDate}`,
    fetchDishData
  );
  const mealTime = useRecoilValue(mealTimeState);
  const fetchedMenu: Menu[] | null =
    mealTime == "breakfast"
      ? data!.breakfast
      : mealTime == "lunch"
      ? data!.lunch
      : mealTime == "dinner"
      ? data!.dinner
      : mealTime == "snack"
      ? data!.snack
      : dummyMenu;

  const [isLoading, setIsLoading] = useState(true);

  const [menuCards, setMenuCards] = useState<Menu[]>(fetchedMenu);

  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };

  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  const updateMenuCard = (index: number, data: any, dataType: any) => {
    const copyMenuCard = [...menuCards];
    if (dataType == "recipeName") copyMenuCard[index].recipeName = data;
    if (dataType == "imgUrl") copyMenuCard[index].imgUrl = data;
    if (dataType == "foodstuffs") copyMenuCard[index].foodstuffs = data;
    if (dataType == "recipes") copyMenuCard[index].recipes = data;
    if (dataType == "tips") copyMenuCard[index].tips = data;
    if (dataType == "cost") copyMenuCard[index].cost = data;
    if (dataType == "time") copyMenuCard[index].time = data;
    if (dataType == "totalNutrition") copyMenuCard[index].totalNutrition = data;

    setMenuCards(copyMenuCard);
  };

  const handleOnSubmit = async () => {
    await axios
      .put(
        `/api/dish/${router.query.userId}/${router.query.currentDate}`,
        mealTime == "breakfast"
          ? { breakfast: menuCards }
          : mealTime == "lunch"
          ? { lunch: menuCards }
          : mealTime == "dinner"
          ? { dinner: menuCards }
          : mealTime == "snack"
          ? { snack: menuCards }
          : null
      )
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };
  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    console.log(menuCards);
  }, [menuCards]);

  return (
    <div>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {!!isLoading && <Loading />}
      {!!error && <DefaultErrorPage statusCode={error.statusCode} />}
      {!!data && (
        <div>
          {router.isReady && <EditHeader isEdit={true} />}
          <Modal />
          <div className="m-10">
            {menuCards!.map((menuCard: Menu) => (
              <MenuItem key={menuCard.id} menu={menuCard} />
            ))}
          </div>

          <div className="flex justify-center my-5">
            <button
              onClick={addMenuCard}
              className="active:scale-90 active:text-red-600 bg-orange-500 text-white text-center p-2 rounded-full w-1/2 shadow-lg"
            >
              <div>+ 料理を追加する</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditMenuPage;
