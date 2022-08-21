import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../../components/editMenu/EditHeader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Modal } from "../../../../components/common/Modal";
import axios from "axios";
import EditMenuItem from "../../../../components/editMenu/EditMenuItem";
import { useAuthenticate } from "../../../../hooks/useAuthenicate";
import { useRecoilState, useRecoilValue } from "recoil";
import { mealTimeState } from "../../../../states/MealTimeState";
import { useMenuCards } from "../../../../hooks/useMenuCard";
import { editMenuState } from "../../../../states/EditMenuState";
const Edit: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const mealTime = useRecoilValue(mealTimeState);
  const { menuCards, removeMenuCard, updateMenuCard } = useMenuCards();
  const [menuCard, setMenuCard] = useRecoilState(editMenuState);
  const index = menuCards.findIndex(
    (menuCard) => menuCard.id == Number(router.query.menuID)
  );

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

  // useEffect(() => {
  //   console.log(menuCards);
  // });

  return (
    <>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <div>
        {router.isReady && <EditHeader isEdit={true} />}
        <Modal />
        <div className="m-10">
          <EditMenuItem
            key={menuCard.id}
            index={index}
            menu={menuCard}
            removeMenuCard={removeMenuCard}
            updateMenuCard={updateMenuCard}
            handleOnSubmit={handleOnSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Edit;
