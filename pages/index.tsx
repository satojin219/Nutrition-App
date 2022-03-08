import type { NextPage } from "next";
import React, { useContext } from "react";
import { IsModalShowContext } from "./_app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { DailylIntakeNutrition } from "../components/index/DailylIntakeNutrition";
import { DishCard } from "../components/index/DishCard";
import classnames from "classnames";
import useSWR from "swr";
import { fetchDishData } from "../repo/dishData";

const Home: NextPage = () => {
  const isModalShowContext = useContext(IsModalShowContext);
  const { data } = useSWR("/api/dish/20220303", fetchDishData);

  const fixedClassNames = {
    "fixed w-full": isModalShowContext.isModalShow,
  };
  // if (!data) return <div>Loading...</div>;
  return (
    <div className={classnames(fixedClassNames)}>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <Header meal={""} isEdit={false} />
      <DailylIntakeNutrition />
      {data ? (
        <div className="lg:flex flex-wrap">
          <DishCard
            dishArray={data.breakfast}
            whenMeal={Object.keys(data)[0]}
          />
          <DishCard dishArray={data.lunch} whenMeal={Object.keys(data)[1]} />
          <DishCard dishArray={data.dinner} whenMeal={Object.keys(data)[2]} />
          <DishCard dishArray={data.snack} whenMeal={Object.keys(data)[3]} />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
