import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../../components/common/Header";
import { EditMenuCard } from "../../components/editMenu/EditMenuCard";
import { useState, useContext } from "react";
import { Menu } from "../../shared/globalType";
import { addElement, removeElemnt } from "../../tools/HelpMethods";
import { useRouter } from "next/router";
import { BsCheckLg } from "react-icons/bs";
import { Modal } from "../../components/common/Modal";

const EditMenuPage: NextPage = () => {
  const [menuCards, setMenuCards] = useState<Menu[]>([]);

  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };
  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {router.isReady && <Header isEdit={true} />}
      <button className="bg-orange-500 text-white rounded-full p-3 mr-10 mb-5 fixed bottom-0 right-0 shadow-lg hover:opacity-80">
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
