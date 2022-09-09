import type { NextPage } from "next";
import Head from "next/head";
import { EditHeader } from "../../../components/editMenu/EditHeader";
import { useEffect } from "react";
import { Menu } from "../../../shared/globalType";
import { useRouter } from "next/router";
import MenuItem from "../../../components/editMenu/MenuItem";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useMenuCards } from "../../../hooks/useMenuCard";
import classNames from "classnames";
import { useModal } from "../../../hooks/useModal";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const { menuCards, addMenuCard } = useMenuCards();
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
    </div>
  );
};
export default EditMenuPage;
