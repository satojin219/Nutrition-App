import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../../components/editMenu/EditHeader";
import { useEffect } from "react";
import { useRouter } from "next/router";
import EditMenuItem from "../../../../components/editMenu/EditMenuItem";
import { useAuthenticate } from "../../../../hooks/useAuthenicate";
import { useRecoilValue } from "recoil";
import { useMenuCards } from "../../../../hooks/useMenuCard";
import { editMenuState } from "../../../../states/EditMenuState";
const Edit: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const { menuCards, removeMenuCard } = useMenuCards();
  const menuCard = useRecoilValue(editMenuState);
  const index = menuCards.findIndex(
    (menuCard) => menuCard.id == Number(router.query.menuID)
  );

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
          <EditMenuItem
            key={menuCard.id}
            index={index}
            menu={menuCard}
            removeMenuCard={removeMenuCard}
          />
        </div>
      </div>
    </>
  );
};

export default Edit;
