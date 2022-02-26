import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Header } from "../components/common/Header";
import { DailylIntakeNutrition } from "../components/index/DailylIntakeNutrition";
import { DishCard } from "../components/index/DishCard";
import { SuggestFood } from "../components/editMenu/SuggestFood";
import classnames from "classnames";

type isFixedContextType = {
  isModalShow: boolean;
  setIsModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export const isModalShowContext = React.createContext({} as isFixedContextType);

const Home: NextPage = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const value = {
    isModalShow,
    setIsModalShow,
  };
  const fixedClassNames = {
    fixed: isModalShow,
  };
  return (
    <div className={classnames(fixedClassNames, "font-fancy")}>
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@500&family=Yomogi&family=Zen+Maru+Gothic:wght@900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <isModalShowContext.Provider value={value}>
        <Header meal={""} isEdit={false} />
        <DailylIntakeNutrition />
        <DishCard />
      </isModalShowContext.Provider>
    </div>
  );
};

export default Home;
