import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { IsModalShowContext } from "../_app";
import { useRouter } from "next/router";
import Head from "next/head";
import { Header } from "../../components/common/Header";
import { DailylIntakeNutrition } from "../../components/index/DailylIntakeNutrition";
import { DishCard } from "../../components/index/DishCard";
import { Loading } from "../../components/common/Loading";
import classnames from "classnames";
import useSWR from "swr";
import { fetchDishData } from "../../schema/fetchDishData";
import { postDishData } from "../../schema/postDishData";
import DefaultErrorPage from "next/error";
import { DishData } from "../../shared/globalType";
import { calSumDailyIntakeNutrition } from "../../tools/HelpMethods";
const Home: NextPage = () => {
  const isModalShowContext = useContext(IsModalShowContext);
  const router = useRouter();
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query!.currentDate!}`,
    fetchDishData
  );

  if (data) {
    postDishData(`/api/dish/${router.query.currentDate!}`, data!);
  }

  const fixedClassNames = {
    "fixed w-full": isModalShowContext.currentState?.isOpen,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className={classnames(fixedClassNames)}>
      <Head>
        <title>Nutriton App</title>
      </Head>
      {!!isLoading && <Loading />}
      {!!error && <DefaultErrorPage statusCode={error.statusCode} />}
      {!!data && (
        <div>
          {router.isReady && <Header isEdit={false} />}
          <DailylIntakeNutrition
            totalNutrition={calSumDailyIntakeNutrition(data)}
          />
          <div className="lg:flex flex-wrap">
            <DishCard menus={data.breakfast} whenMeal={"breakfast"} />
            <DishCard menus={data.lunch} whenMeal={"lunch"} />
            <DishCard menus={data.dinner} whenMeal={"dinner"} />
            <DishCard menus={data.snack} whenMeal={"snack"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
