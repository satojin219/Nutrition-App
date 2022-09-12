import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header } from "../../../components/common/Header";
import { DailylIntakeNutrition } from "../../../components/index/DailylIntakeNutrition";
import { DishCard } from "../../../components/index/DishCard";
import { Loading } from "../../../components/common/Loading";
import useSWR from "swr";
import { fetchDishData } from "../../../schema/fetchDishData";
import { postData } from "../../../schema/postData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../../shared/globalType";
import { calSumDailyIntakeNutrition } from "../../../tools/HelpMethods";
import { checkBlankDishData } from "../../../server/utils";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useRecoilState } from "recoil";
import { currentDishState } from "../../../states/dishState";
import { useDate } from "../../../hooks/useDate";
import { Container } from "../../../components/common/Container";

const Home: NextPage = () => {
  const { user } = useAuthenticate();
  const router = useRouter();
  const { currentDate } = useDate();

  const { data, error } = useSWR<DishData>(
    `/api/dish/${user?.uid}/${currentDate.format("YYYYMMDD")}`,
    fetchDishData
  );
  const [dishdata, setDishdata] = useRecoilState(currentDishState);

  if (data && checkBlankDishData(data)) {
    // 初アクセスで、全てのプロパティが空ならfirestoreにデータをPOST
    postData(`/api/dish/${user?.uid}/${currentDate.format("YYYYMMDD")}`, data);
  }

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
      <div>
        {router.isReady && <Header />}
        <DailylIntakeNutrition
          totalNutrition={calSumDailyIntakeNutrition(dishdata)}
        />
        <div className="px-5 py-3">
          <DishCard menus={dishdata.breakfast} mealTime={"breakfast"} />
          <DishCard menus={dishdata.lunch} mealTime={"lunch"} />
          <DishCard menus={dishdata.dinner} mealTime={"dinner"} />
          <DishCard menus={dishdata.snack} mealTime={"snack"} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
