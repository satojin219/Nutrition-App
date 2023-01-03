import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../client/firebase";
import React, { useRef } from "react";
import dayjs from "dayjs";
import Router from "next/router";
import { useAuthenticate } from "../../hooks/useAuthenicate";

const Login: NextPage = () => {
  const today = dayjs().format("YYYYMMDD");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { user, setUser } = useAuthenticate();
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const loginAuth = await signInWithEmailAndPassword(
      auth,
      emailRef.current!.value,
      passwordRef.current!.value
    );
    setUser(loginAuth.user);
    Router.push(`/${auth.currentUser?.uid}/${today}`);
  };

  return (
    <>
      <Head>
        <title>Nutriton App</title>
      </Head>
      <div className="bg-orange-500 flex justify-center items-center h-screen flex-col">
        <h1 className="text-3xl text-white mb-10">Nutrition App</h1>
        <form className="bg-white p-5 rounded-md w-1/2">
          <div className="flex flex-col my-3">
            <label>メールアドレス</label>
            <input
              ref={emailRef}
              className="border-yellow-700/50 border-b-2 my-2"
              name="email"
              type="email"
              placeholder=""
              defaultValue="example.com"
              required
            />
          </div>
          <div className="flex flex-col my-3">
            <label>パスワード</label>
            <input
              ref={passwordRef}
              className="border-yellow-700/50 border-b-2 my-2"
              name="password"
              type="password"
              defaultValue="123456789"
              required
            />
          </div>
          <div>
            <div className="flex justify-end">
              <p className="text-xs">
                <Link href={"/signUp"}>
                  <a className="text-blue-400">新規登録</a>
                </Link>
                はこちらから
              </p>
            </div>
            <div className="flex justify-center ">
              <button
                onClick={handleSubmit}
                className="my-3 w-full bg-orange-500 text-white px-3 py-2 rounded-md"
              >
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
