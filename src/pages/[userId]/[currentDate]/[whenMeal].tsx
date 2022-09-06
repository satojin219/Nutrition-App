import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../components/editMenu/EditHeader";
import { useEffect } from "react";
import { Menu } from "../../../shared/globalType";
import { useRouter } from "next/router";
import MenuItem from "../../../components/editMenu/MenuItem";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useRecoilValue } from "recoil";
import { mealTimeState } from "../../../states/MealTimeState";
import { useMenuCards } from "../../../hooks/useMenuCard";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const mealTime = useRecoilValue(mealTimeState);
  const { menuCards, addMenuCard } = useMenuCards();

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  return (
    <>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <div>
        {router.isReady && <EditHeader />}
        <div className="m-10">
          {menuCards!.map((menuCard: Menu, index: number) => (
            <MenuItem key={menuCard.id} menu={menuCard} index={index} />
          ))}
        </div>

        <div className="flex justify-center my-5">
          <button
            onClick={() => {
              addMenuCard();
            }}
            className="active:scale-90 active:text-red-600 bg-orange-500 text-white text-center p-2 rounded-full w-1/2 shadow-lg"
          >
            + 料理を追加する
          </button>
        </div>
      </div>
    </>
  );
};
export default EditMenuPage;
