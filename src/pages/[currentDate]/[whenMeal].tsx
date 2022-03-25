import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Header } from "../../components/common/Header";
import { EditMenuCard } from "../../components/editMenu/EditMenuCard";
import { useState, useContext, Fragment } from "react";
import { Menu } from "../../shared/globalType";
import { addElement, removeElemnt } from "../../tools/HelpMethods";
import { useRouter } from "next/router";
import { IsModalShowContext } from "../../pages/_app";
import { Modal } from "../../components/common/Modal";

const EditMenuPage: NextPage = () => {
  const renderSwitch = (param: string): JSX.Element => {
    switch (param) {
      case "breakfast":
        return <p className="text-base">あなたの朝ごはん</p>;
      case "lunch":
        return <p className="text-base">あなたの昼ごはん</p>;
      case "dinner":
        return <p className="text-base">あなたの夜ごはん</p>;
      case "snack":
        return <p className="text-base">あなたの間食</p>;
      default:
        return <Fragment />;
    }
  };
  const [menuCards, setMenuCards] = useState<Menu[]>([]);
  const { openModal } = useContext(IsModalShowContext);

  const addMenuCard = () => {
    addElement(menuCards, setMenuCards);
  };
  const removeMenuCard = (index: number) => {
    removeElemnt(menuCards, setMenuCards, index);
  };
  const router = useRouter();
  const { whenMeal } = router.query;
  const [open, setOpen] = useState(false);
  const onToggle = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {router.isReady && <Header isEdit={true} />}
      <div className="w-full mt-5 px-2">
        {renderSwitch(whenMeal as string)}
        <article className="rounded border-2 w-full h-auto">
          <Image
            src={"/20180308-futako01-2.jpg"}
            alt="no image"
            width={380}
            height={240}
            layout="responsive"
            objectFit="cover"
            className="rounded-t"
          />
          <div className="items-center h-16 flex justify-between">
            <p className="text-base-dark text-sm ml-4">料理名などなど</p>
            <button onClick={(e) => onToggle(e)} className="mr-4">
              toggle
            </button>
          </div>
          <details open={open} onClick={onToggle}>
            <summary className="hidden"></summary>
            <hr />
            <div className="px-1">
              <section>
                <p className="mt-4">食材リスト（1人前）</p>
                <ul>
                  <li className="text-sm border-2 rounded-md p-1 my-1">
                    大根　1/6本（200g）
                  </li>
                  <li className="text-sm border-2 rounded-md p-1 my-1">
                    大根　1/6本（200g）
                  </li>
                  <li className="text-sm border-2 rounded-md p-1 my-1">
                    大根　1/6本（200g）
                  </li>
                  <li className="text-sm border-2 rounded-md p-1 my-1">
                    大根　1/6本（200g）
                  </li>
                </ul>
              </section>
              <section>
                <p className="mt-4">レシピ</p>
              </section>
              <section className="flex justify-around">
                <div>
                  <p>調理時間</p>
                  <input
                    type="text"
                    className="border-2 rounded-sm p-1"
                    size={15}
                  />
                </div>
                <div>
                  <p>費用</p>
                  <input
                    type="text"
                    className="border-2 rounded-sm p-1"
                    size={15}
                  />
                </div>
              </section>
              <button className="bg-secondary w-full h-10 rounded-md text-center text-base-white my-4">
                料理を編集する
              </button>
            </div>
          </details>
        </article>
      </div>
      {/* <button className="bg-orange-500 text-white rounded-full p-3 mr-10 mb-5 fixed bottom-0 right-0 shadow-lg hover:opacity-80">
        <BsCheckLg size={30} />
      </button> */}
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
