import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import dayjs from "dayjs";

const Home: NextPage = () => {
  const today = dayjs().format("YYYYMMDD");
  useEffect(() => {
    // Router.push(`/${today}`);
    Router.push("/signUp");
  }, [today]);

  return (
    <Head>
      <title>Nutriton App</title>
    </Head>
  );
};

export default Home;
