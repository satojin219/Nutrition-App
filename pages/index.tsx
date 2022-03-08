import type { NextPage } from "next";
import React, { useCallback, useContext, useEffect } from "react";
import { IsModalShowContext } from "./_app";
import Head from "next/head";
import { Header } from "../components/common/Header";
import { DailylIntakeNutrition } from "../components/index/DailylIntakeNutrition";
import { DishCard } from "../components/index/DishCard";
import classnames from "classnames";
import useSWR from "swr";
import { fetchDishData } from "../schema/dishData";
import Router from "next/router";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const today = dayjs().format("YYYYMMDD");
  useEffect(() => {
    Router.push(`/${today}`);
  }, [today]);

  return (
    <Head>
      <title>Nutriton App</title>
    </Head>
  );
};

export default Home;
