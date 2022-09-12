import type { NextPage } from "next";
import { EditHeader } from "../../../components/editMenu/EditHeader";
import { DishData, Menu } from "../../../shared/globalType";
import { useRouter } from "next/router";
import MenuItem from "../../../components/editMenu/MenuItem";
import { useMenuCards } from "../../../hooks/useMenuCard";
import { Container } from "../../../components/common/Container";
import classNames from "classnames";
import useSWR from "swr";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useDate } from "../../../hooks/useDate";
import { fetchDishData } from "../../../schema/fetchDishData";
import { useSetRecoilState } from "recoil";
import { currentDishState } from "../../../states/dishState";
import { Loading } from "../../../components/common/Loading";
import DefaultErrorPage from "next/error";
import { useEffect, useState } from "react";

const EditMenuPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthenticate();
  const { currentDate } = useDate();
  const { data, error } = useSWR<DishData>(
    `/api/dish/${user?.uid}/${currentDate.format("YYYYMMDD")}`,
    fetchDishData
  );
  const setDishdata = useSetRecoilState(currentDishState);
  const { menuCards, addMenuCard } = useMenuCards();
  const flexClassName = {
    "m-10 flex justify-center": menuCards.length == 1,
    "m-10 flex-none md:flex md:justify-between md:flex-wrap":
      menuCards.length > 1,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      setDishdata(data);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return <DefaultErrorPage statusCode={error.statusCode} />;
  return (
    <Container>
      {router.isReady && <EditHeader />}
      <div className={classNames(flexClassName)}>
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
    </Container>
  );
};
export default EditMenuPage;
