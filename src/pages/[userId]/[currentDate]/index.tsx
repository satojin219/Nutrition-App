import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "../../../components/common/Header";
import { DailylIntakeNutrition } from "../../../components/index/DailylIntakeNutrition";
import { DishCard } from "../../../components/index/DishCard";
import { Loading } from "../../../components/common/Loading";
import classnames from "classnames";
import useSWR from "swr";
import { fetchDishData } from "../../../schema/fetchDishData";
import { postData } from "../../../schema/postData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../../shared/globalType";
import { calSumDailyIntakeNutrition } from "../../../tools/HelpMethods";
import { checkBlankDishData } from "../../../server/utils";
import { useModal } from "../../../hooks/useModal";
import { useAuthenticate } from "../../../hooks/useAuthenicate";
import { useRecoilState } from "recoil";
import { currentDishState } from "../../../states/dishState";

const Home: NextPage = () => {
  const { user } = useAuthenticate();
  const { modal } = useModal();
  const router = useRouter();
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query.userId}/${router.query!.currentDate!}`,
    fetchDishData
  );
  const [dishdata, setDishdata] = useRecoilState(currentDishState);

  if (data && router.query.currentDate && checkBlankDishData(data)) {
    // 初アクセスで、全てのプロパティが空ならfirestoreにデータをPOST
    postData(
      `/api/dish/${router.query.userId}/${router.query.currentDate}`,
      data
    );
  }

  const fixedClassNames = {
    "fixed w-full": modal.isOpen,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setDishdata(data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  return (
    <div className={classnames(fixedClassNames)}>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {!!isLoading && <Loading />}
      {!!error && <DefaultErrorPage statusCode={error.statusCode} />}
      {!!dishdata && (
        <div>
          {router.isReady && <Header />}
          <DailylIntakeNutrition
            totalNutrition={calSumDailyIntakeNutrition(dishdata)}
          />
          <DishCard menus={dishdata.breakfast} mealTime={"breakfast"} />
          <DishCard menus={dishdata.lunch} mealTime={"lunch"} />
          <DishCard menus={dishdata.dinner} mealTime={"dinner"} />
          <DishCard menus={dishdata.snack} mealTime={"snack"} />
        </div>
      )}
    </div>
  );
};

export default Home;
