import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../../components/common/Header";
import { EditMenuCard } from "../../components/editMenu/EditMenuCard";
import { useState } from "react";
import { Menu } from "../../shared/globalType";
import { addElement, removeElemnt } from "../../tools/HelpMethods";
import { useRouter } from "next/router";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../../components/common/Modal";
import useSWR, { useSWRConfig } from "swr";
import updateDishService from "../../server/services/updateDishService";
import { fetchDishData } from "../../schema/dishData";
import axios from "axios";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    `/api/dish/${router.query.currentDate}`,
    fetchDishData
  );
  const [menuCards, setMenuCards] = useState<Menu[]>([]);

  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };
  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  const handleOnSubmit = async () => {
    // await updateDishService(
    //   `${router.query.currentDate}`,
    //   `${router.query.whenMeal}`,
    //   menuCards[0]
    // );
    if (router.query.whenMeal == "breakfast") {
      await axios
        .post(`/api/dish/${router.query.currentDate}`, {
          breakfast: menuCards,
        })
        .then((res) => {
          console.log(res);
        })
        .catch(console.error);
      // mutate(
      //   `/api/dish/${router.query.currentDate}`,
      //   { ...data, breakfasst: menuCards },
      //   false
      // );
    } else if (router.query.whenMeal == "lunch")
      mutate(
        `/api/dish/${router.query.currentDate}`,
        { ...data, lunch: menuCards },
        false
      );
    else if (router.query.whenMeal == "dinner")
      mutate(
        `/api/dish/${router.query.currentDate}`,
        { ...data, dinner: menuCards },
        false
      );
    else
      mutate(
        `/api/dish/${router.query.currentDate}`,
        { ...data, snack: menuCards },
        false
      );
    mutate(`/api/dish/${router.query.currentDate}`);
  };

  return (
    <div>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {router.isReady && <Header isEdit={true} />}
      <button
        onClick={handleOnSubmit}
        className="bg-orange-500 text-white rounded-full p-3 mr-10 mb-5 fixed bottom-0 right-0 shadow-lg hover:opacity-80"
      >
        <BsCheckLg size={30} />
      </button>
      <Modal />
      {menuCards.map((menuCard: Menu, index: number) => (
        <EditMenuCard
          key={menuCard.id}
          index={index}
          menu={menuCard}
          removeMenuCard={removeMenuCard}
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
  );
};
export default EditMenuPage;
