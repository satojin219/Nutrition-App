import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../../components/editMenu/EditHeader";
import { EditMenuCard } from "../../../../components/editMenu/EditMenuCard";
import { useState, useEffect, useContext } from "react";
import { Menu } from "../../../../shared/globalType";
import { addElement, removeElemnt } from "../../../../tools/HelpMethods";
import { useRouter } from "next/router";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../../../../components/common/Modal";
import axios from "axios";
import { Loading } from "../../../../components/common/Loading";
import useSWR from "swr";
import { fetchDishData } from "../../../../schema/fetchDishData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../../../shared/globalType";
import { dummyMenu } from "../../../../tools/dummyMenu";
import { IsEditedContext } from "../../../_app";
import { useAuthContext } from "../../../../../context/AuthContext";
import MenuItem from "../../../../components/editMenu/MenuItem";
import { query } from "express";
import EditMenuItem from "../../../../components/editMenu/EditMenuItem";

const Edit: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { setIsEdited } = useContext(IsEditedContext);
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query.userId}/${router.query.currentDate}`,
    fetchDishData
  );
  const [isLoading, setIsLoading] = useState(true);
  const fetchedMenus: Menu[] | null =
    router.query.whenMeal == "breakfast"
      ? data!.breakfast
      : router.query.whenMeal == "lunch"
      ? data!.lunch
      : router.query.whenMeal == "dinner"
      ? data!.dinner
      : router.query.whenMeal == "snack"
      ? data!.snack
      : dummyMenu;

  const [menuCards, setMenuCards] = useState<Menu[]>(fetchedMenus);
  let menuCardIndex = 0;
  const menuCard = fetchedMenus.filter((fetchedMenu, index) => {
    if (fetchedMenu.id === Number(router.query.menuID)) {
      menuCardIndex = index;
      return true;
    }
  })[0];

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
    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);
  useEffect(() => {
    console.log(menuCards);
  });

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
            <EditMenuItem
              key={menuCard.id}
              index={menuCardIndex}
              menu={menuCard}
              removeMenuCard={removeMenuCard}
              updateMenuCard={updateMenuCard}
              handleOnSubmit={handleOnSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
