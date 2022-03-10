import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../../components/common/Header";
import { EditMenuCard } from "../../components/editMenu/EditMenuCard";
import { useState } from "react";
import { Menu } from "globalType";
import { addElement, removeElemnt } from "../../tools/HelpMethods";

const EditMenuPage: NextPage = () => {
  const [menuCards, setMenuCards] = useState<Menu[]>([]);
  let copyMenuCards = [...menuCards];

  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };
  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  return (
    <div>
      <Head>
        <title>Nutriton App</title>
      </Head>

      <Header isEdit={true} />

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
