import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../../components/common/Header";
import { EditMenuCard } from "../../components/editMenu/EditMenuCard";
import { useState, useEffect, useContext } from "react";
import { Menu } from "../../shared/globalType";
import { addElement, removeElemnt } from "../../tools/HelpMethods";
import { useRouter } from "next/router";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../../components/common/Modal";
import axios from "axios";
import { Loading } from "../../components/common/Loading";
import useSWR from "swr";
import { fetchDishData } from "../../schema/fetchDishData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../shared/globalType";
import { dummyMenu } from "../../tools/dummyMenu";
import { IsEditedContext } from "../../pages/_app";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { setIsEdited } = useContext(IsEditedContext);
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query.currentDate}`,
    fetchDishData
  );
  const fetchedMenu: Menu[] | null =
    router.query.whenMeal == "breakfast"
      ? data!.breakfast
      : router.query.whenMeal == "lunch"
      ? data!.lunch
      : router.query.whenMeal == "dinner"
      ? data!.dinner
      : router.query.whenMeal == "snack"
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
        `/api/dish/${router.query.currentDate}`,
        router.query.whenMeal == "breakfast"
          ? { breakfast: menuCards }
          : router.query.whenMeal == "lunch"
          ? { lunch: menuCards }
          : router.query.whenMeal == "dinner"
          ? { dinner: menuCards }
          : router.query.whenMeal == "snack"
          ? { snack: menuCards }
          : null
      )
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  };
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
          {router.isReady && <Header isEdit={true} />}
          <button
            onClick={() => {
              handleOnSubmit();
              setIsEdited(false);
            }}
            className="bg-orange-500 text-white rounded-full p-3 mr-10 mb-5 fixed bottom-0 right-0 shadow-lg hover:opacity-80"
          >
            <BsCheckLg size={30} />
          </button>
          <Modal />
          {menuCards!.map((menuCard: Menu, index: number) => (
            <EditMenuCard
              key={menuCard.id}
              index={index}
              menu={menuCard}
              removeMenuCard={removeMenuCard}
              updateMenuCard={updateMenuCard}
            />
          ))}
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
