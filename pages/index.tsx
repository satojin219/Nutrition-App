import type { NextPage } from "next";
import React, { useContext, useMemo, useState } from "react";
import { DayContext, IsModalShowContext } from "./_app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { DailylIntakeNutrition } from "../components/index/DailylIntakeNutrition";
import { DishCard } from "../components/index/DishCard";
import { Meal } from "globalType";
import classnames from "classnames";

const Home: NextPage = () => {
  const dayContext = useContext(DayContext);
  const isModalShowContext = useContext(IsModalShowContext);
  const meals = useMemo(() => {
    dayContext.selectedDayData.meals = [
      { whenMeal: "breakfast" },
      { whenMeal: "lunch" },
      { whenMeal: "dinner" },
      { whenMeal: "snack" },
    ];
    return dayContext.selectedDayData.meals;
  }, [dayContext]);

  const fixedClassNames = {
    "fixed w-full": isModalShowContext.isModalShow,
  };
  return (
    <div className={classnames(fixedClassNames)}>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <Header meal={""} isEdit={false} />
      <DailylIntakeNutrition />
      <div className="lg:flex flex-wrap">
        {meals.map((meal: Meal, index: number) => (
          <DishCard meal={meal} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
