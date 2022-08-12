import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../client/firebase";
import React, { useRef } from "react";
import dayjs from "dayjs";
import Router from "next/router";
import { postData } from "../../schema/postData";
import { UserData } from "../../shared/globalType";
import { useAuthenticate } from "../../hooks/useAuthenicate";

const SignUp: NextPage = () => {
  const today = dayjs().format("YYYYMMDD");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const weightRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const activeLevelRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const { user, setUser } = useAuthenticate();

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    const signUpAuth = await createUserWithEmailAndPassword(
      auth,
      emailRef.current!.value,
      passwordRef.current!.value
    );
    const userData: UserData = {
      id: auth.currentUser!.uid!,
      name: nameRef.current?.value!,
      age: ageRef.current?.value!,
      gender: genderRef.current?.value!,
      weight: weightRef.current?.value!,
      height: heightRef.current?.value!,
      activeLevel: activeLevelRef.current?.value!,
    };
    setUser(signUpAuth.user);
    await postData("/api/user", userData);
    Router.push(`/${userData.id}/${today}`);
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
              required
            />
          </div>
          <div className="flex flex-col my-3">
            <label>名前</label>
            <input
              ref={nameRef}
              className="border-yellow-700/50 border-b-2 my-2"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col my-3">
              <label>年齢</label>
              <input
                ref={ageRef}
                className="border-yellow-700/50 border-b-2 my-2"
                name="age"
                type="number"
                required
              />
            </div>
            <div className="flex flex-col my-3">
              <label>性別</label>
              <select
                ref={genderRef}
                className="border-yellow-700/50 border-b-2 my-2"
                name="age"
                required
              >
                <option value="male">男性</option>
                <option value="female">女性</option>
              </select>
            </div>
            <div className="flex flex-col my-3">
              <label>運動レベル</label>
              <select
                ref={activeLevelRef}
                className="border-yellow-700/50 border-b-2 my-2"
                name="activeLevel"
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col my-3">
              <label>身長(cm)</label>
              <input
                ref={weightRef}
                className="border-yellow-700/50 border-b-2 my-2"
                name="weight"
                type="number"
                required
              />
            </div>
            <div className="flex flex-col my-3">
              <label>体重(kg)</label>
              <input
                ref={heightRef}
                className="border-yellow-700/50 border-b-2 my-2"
                name="height"
                type="number"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex justify-end">
              <p className="text-xs">
                <Link href={"/login"}>
                  <a className="text-blue-400">ログイン</a>
                </Link>
                はこちらから
              </p>
            </div>
            <div className="flex justify-center ">
              <button
                onClick={handleSubmit}
                className="my-3 w-full bg-orange-500 text-white px-3 py-2 rounded-md"
              >
                登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
