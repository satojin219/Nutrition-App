import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import { IsModalShowContext } from "../../_app";
import { useRouter, Router } from "next/router";
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
import { useAuthContext } from "../../../../context/AuthContext";
const Home: NextPage = () => {
  const { user } = useAuthContext();
  const isModalShowContext = useContext(IsModalShowContext);
  const router = useRouter();
  const { data, error } = useSWR<DishData>(
    `/api/dish/${router.query.userId}/${router.query!.currentDate!}`,
    fetchDishData
  );

  if (data && router.query.currentDate && checkBlankDishData(data)) {
    // 初アクセスで、全てのプロパティが空ならfirestoreにデータをPOST
    postData(
      `/api/dish/${router.query.userId}/${router.query.currentDate}`,
      data
    );
  }

  const fixedClassNames = {
    "fixed w-full": isModalShowContext.currentState?.isOpen,
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  useEffect(() => {
    fetch("/api/authors").then((res) => res.json());
  }, []);
  const handleClick = async () => {
    await fetch("/api/authors", {
      method: "POST",
    });
  };

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
          <DishCard menus={data.breakfast} whenMeal={"breakfast"} />
          <DishCard menus={data.lunch} whenMeal={"lunch"} />
          <DishCard menus={data.dinner} whenMeal={"dinner"} />
          <DishCard menus={data.snack} whenMeal={"snack"} />
          <button onClick={handleClick}>post</button>
        </div>
      )}
    </div>
  );
};

export default Home;
