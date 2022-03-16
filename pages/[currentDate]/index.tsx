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
import { fetchDishData } from "../../schema/dishData";
import DefaultErrorPage from "next/error";
const Home: NextPage = () => {
  const isModalShowContext = useContext(IsModalShowContext);
  const router = useRouter();
  const { data, error } = useSWR(
    `/api/dish/${router.query.currentDate}`,
    fetchDishData
  );

  const fixedClassNames = {
    "fixed w-full": isModalShowContext.currentState.isOpen,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

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
          <Header isEdit={false} />
          <DailylIntakeNutrition />
          <div className="lg:flex flex-wrap">
            <DishCard
              dishArray={data.breakfast}
              whenMeal={Object.keys(data)[0]}
            />
            <DishCard dishArray={data.lunch} whenMeal={Object.keys(data)[1]} />
            <DishCard dishArray={data.dinner} whenMeal={Object.keys(data)[2]} />
            <DishCard dishArray={data.snack} whenMeal={Object.keys(data)[3]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
