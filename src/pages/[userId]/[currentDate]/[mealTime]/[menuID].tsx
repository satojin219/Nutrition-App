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
import { useModal } from "../../../../hooks/useModal";
import classNames from "classnames";
const Edit: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const { menuCards, removeMenuCard } = useMenuCards();
  const menuCard = useRecoilValue(editMenuState);
  const index = menuCards.findIndex(
    (menuCard) => menuCard.id == Number(router.query.menuID)
  );
  const { modal } = useModal();
  const fixedClassNames = {
    "fixed w-full": modal.isOpen,
  };

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  return (
    <div className={classNames(fixedClassNames)}>
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
    </div>
  );
};

export default Edit;
